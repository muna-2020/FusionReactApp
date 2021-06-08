//React related imports
import React, { Profiler } from 'react';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name ProfilerWrapper
 * @param {any} props
 * @summary Wrap the component to Profiler by checking the condition IsProfilerEnabled
 */
const PerformanceProfile = (props) => {

    /**
      * @name onRenderCallback
      * @param {any} id
      * @param {any} phase
      * @param {any} actualDuration
      * @param {any} baseDuration
      * @param {any} startTime
      * @param {any} commitTime
      * @param {any} interactions
      * @summary call back to be executed on render of profiler.
      */
    const onRenderCallback = (
        id, // the "id" prop of the Profiler tree that has just committed
        phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
        actualDuration, // time spent rendering the committed update
        baseDuration, // estimated time to render the entire subtree without memoization
        startTime, // when React began rendering this update
        commitTime, // when React committed this update
        interactions // the Set of interactions belonging to this update
    ) => {
        id = id.toString().toUpperCase();
        let objComponent = {
            "ComponentName": id,
            "phase": phase,
            "actualDuration": actualDuration,
            "baseDuration": baseDuration,
            "startTime": startTime,
            "commitTime": commitTime,
            "interactions": interactions
        };

        //Get ModuleProps props application state.
        let objModuleProps = ApplicationState.GetProperty("ModuleProps");

        //Initialize variables
        let arrTotalCSR = Performance.GetProperty("TotalCSRPerformanceLog") ? Performance.GetProperty("TotalCSRPerformanceLog") : [];
        let arrCSRPerformance = arrTotalCSR[arrTotalCSR.length - 1];
        let arrPerformance = Performance.GetProperty("PerformanceLog");
        let arrPerformanceFilter = arrPerformance.filter(p => objComponent.ComponentName && p ? Object.keys(p)[0] == ["CSR_" + objComponent.ComponentName] : []);

        if (objModuleProps && objModuleProps[id.toUpperCase()]) {
            if (objComponent.ComponentName != 'PERFORMANCERESPONSE' && objComponent.ComponentName != 'VIEWCSRSTATEPROPS') {

                if (props.IsMainModule && window.ResetLogFile != undefined) {
                    //window.ResetLogFile();
                }

                //Nested Component.
                if (arrTotalCSR.length != 0) {
                    let intCSRValue = Math.round(baseDuration);
                    arrCSRPerformance = [...arrCSRPerformance, { ["CSR_" + objComponent.ComponentName]: intCSRValue, StateAndProps: { [id]: objModuleProps[id] }, ["IsMainModule"]: props.IsMainModule }]
                    arrTotalCSR[arrTotalCSR.length - 1] = arrCSRPerformance;
                    Performance.SetProperty("TotalCSRPerformanceLog", arrTotalCSR);
                }
                //Component First Render.
                if (arrTotalCSR.length == 0) {
                    let intCSRValue = Math.round(baseDuration);
                    let arrCSRPerformanceModule = [{ ["CSR_" + objComponent.ComponentName]: intCSRValue, StateAndProps: { [id]: objModuleProps[id] }, ["IsMainModule"]: props.IsMainModule }];
                    Performance.SetProperty("TotalCSRPerformanceLog", [arrCSRPerformanceModule]);
                }
                else if (arrCSRPerformance && arrCSRPerformance.length == 0) {
                    let intCSRValue = Math.round(baseDuration);
                    let objCSRPerformance = { ["CSR_" + objComponent.ComponentName]: intCSRValue, StateAndProps: { [id]: objModuleProps[id] }, ["IsMainModule"]: props.IsMainModule };
                    let arrModifiedTotalCSR = arrTotalCSR;
                    arrModifiedTotalCSR[arrTotalCSR.length - 1] = objCSRPerformance
                    Performance.SetProperty("TotalCSRPerformanceLog", arrModifiedTotalCSR);
                }
            }

            //Component re-render update.
            if (arrPerformanceFilter.length == 0) {
                let arrCSRValue = [Math.round(baseDuration)];
                Performance.SetProperty("PerformanceLog", [...arrPerformance, { ["CSR_" + objComponent.ComponentName]: arrCSRValue, StateAndProps: { [id]: objModuleProps[id] }, ["IsMainModule"]: props.IsMainModule }]);
            }
            else {
                arrTotalCSR = Performance.GetProperty("TotalCSRPerformanceLog");

                if (phase == 'update') {
                    let arrModifiedData = arrPerformance.map(objData => {
                        if (objComponent.ComponentName && objData) {
                            if (Object.keys(objData)[0] == "CSR_" + objComponent.ComponentName) {
                                let iCSRTime = Math.round(baseDuration);
                                let arrCSRValue = Object.values(objData)[0];
                                let arrCurrentValue = [...arrCSRValue, iCSRTime];
                                let objNewData = { ["CSR_" + objComponent.ComponentName]: arrCurrentValue, ["IsMainModule"]: props.IsMainModule };
                                return objNewData;
                            }
                            else {
                                return objData;
                            }
                        }
                    })
                    Performance.SetProperty("PerformanceLog", arrModifiedData);
                }
            }
            let objModifiedModulProps = {};
            Object.keys(objModuleProps).map((strKey) => {
                if (strKey != id) {
                    objModifiedModulProps = { ...objModifiedModulProps, [strKey]: objModuleProps[strKey] }
                }
            })
            ApplicationState.SetProperty("ModuleProps", objModifiedModulProps);
        }
    };


    let jsxWrappedComponent = (
        <Profiler id={props.ComponentName} onRender={onRenderCallback}>
            {props.children}
        </Profiler>);

    if (props.JConfiguration.Performance) {
        return jsxWrappedComponent;
    }
    else {
        return (
            <React.Fragment>
                {props.children}
            </React.Fragment>
        );
    }
}

export default PerformanceProfile;
