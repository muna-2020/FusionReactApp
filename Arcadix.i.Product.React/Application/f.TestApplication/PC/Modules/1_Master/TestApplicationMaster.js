//React Related imports
import React, { useReducer, useRef, useEffect } from 'react';
import { connect } from "react-redux";

//Initialize Method and  First Render implementation
import * as TestApplicationMaster_Hook from '@shared/Application/f.TestApplication/PC/Modules/1_Master/TestApplicationMaster_Hook';
import TestApplicationMaster_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/1_Master/TestApplicationMaster_ModuleProcessor';

//Drag drop Import
import Dragdrop from '@root/Framework/Controls/Dragdrop/Dragdrop';

//PerformanceProfiler
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

//global imports
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";
//Common methods for all components in TestApplication are implemented here
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';

//global imports
global.TestApplicationBase_Hook = TestApplicationBase_Hook;
global.IntranetBase_Hook = IntranetBase_Hook;
global.IntranetBase_ModuleProcessor = IntranetBase_ModuleProcessor;

//Store related imports
import { Provider } from 'react-redux';

/**
 * @name TestApplicationMaster
 * @param {object} props Component props
 * @summary TestApplicationMaster that contains all the first render implementation.
 * @returns {component} TestApplicationMaster
 */
const TestApplicationMaster = (props) => {

    let objClientDivRef = useRef(null);
    let objServerDivRef = useRef(null);

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, TestApplicationMaster_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch which can be passed across method in the module and used
     */
    const objContext = { state, props, dispatch, "ModuleName": "TestApplicationMaster", ["TestApplicationMaster_ModuleProcessor"]: new TestApplicationMaster_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestApplicationMaster_ModuleProcessor.Initialize(objContext, objContext.TestApplicationMaster_ModuleProcessor);

    /**
     * @name useInitialize
     * @param {object} objContext Component objContext
     * @summary useInitialize  method implemented in TestApplicationMaster_Hook which contains the Initialize Method call.
     * @returns null
     */
    TestApplicationMaster_Hook.Initialize(objContext);

    /**
     * @name useEffect
     * @param {object}
     * @summary For loading the component
     * @returns null
     */
    useEffect(() => {
        GetHydrate();
    }, [props.CurrentRoute && props.CurrentRoute.RouteName])

    /**
     * @name GetHydrate
     * @param {object}
     * @summary For loading the component
     * @returns null
     */
    function GetHydrate() {
        if (objClientDivRef.current == undefined) {
            setTimeout(function () {
                GetHydrate();
            }, 500)
        }
        else if (props.CurrentRoute && props.CurrentRoute.RouteName !== "" && props.CurrentRoute.SSRData !== undefined) {
            var RenderComponent = props.ComponentController.GetComponent(props.CurrentRoute.RouteName);
             if (RenderComponent) {
                ReactDOM.hydrate(
                    <Provider store={store}>
                        <BrowserRouter>
                            <PerformanceProfiler ComponentName="TestApplicationMaster" JConfiguration={props.JConfiguration} >
                                <RenderComponent
                                    {...props}
                                    ClientUserDetails={props.ClientUserDetails}
                                    ComponentController={props.ComponentController}
                                    JConfiguration={props.JConfiguration}
                                />
                            </PerformanceProfiler>
                        </BrowserRouter>
                    </Provider>
                    ,
                    objClientDivRef.current, function () {
                        HideServerDiv(objClientDivRef.current, objServerDivRef.current);
                    });
            }
        }

    }

    /**
    * @name HideServerDiv
    * @param {object}
    * @summary For Hiding the div
    * @returns null
    */
    function HideServerDiv(objClientDom, objServerDom) {
        if (objClientDom.childElementCount > 0) {
            objServerDom.style.display = "none";
            objServerDom.innerHTML = "<div></div>";
        }
        else {
            window.setTimeout(function () {
                HideServerDiv(objClientDom, objServerDom);
            }, 100);
        }
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        if (props.CurrentRoute != undefined) {
             var RenderComponent = props.ComponentController.GetComponent(props.CurrentRoute.RouteName);
            return (
                <React.Fragment>
                    <PerformanceProfiler ComponentName="TestApplicationMaster" JConfiguration={props.JConfiguration} >
                        <div id="TestApplicationMasterWrapper" className="test-application-master-wrapper">
                            <WrapperComponent
                                ComponentName={"Animation"} ParentProps={props} Resource={{ "ImagePath": props.JConfiguration.TestApplicationSkinPath + '/Images/Common/Icons/clock.gif' }} Meta={{ "ShowAnimationImage": true }} Id={"AnimationDivId"} />
                            <Dragdrop ApplicationName="TestApplication">
                                {
                                    props.CurrentRoute.SSRData ?
                                        <div className="parent-div">
                                            <div id={"Server_" + props.CurrentRoute.RouteName} className="server-render" ref={objServerDivRef} dangerouslySetInnerHTML={{ __html: props.CurrentRoute.SSRData.Html }} style={{ position: "absolute", height: "100%", width: "100%", top: 0 }}></div>
                                            <div id={"Client_" + props.CurrentRoute.RouteName} className="client-render" ref={objClientDivRef} style={{ "width": "100%" }}></div>
                                        </div>
                                        :
                                        <div className="parent-div">
                                            <div id={"Client_" + props.CurrentRoute.RouteName} className="client-render" ref={objClientDivRef} style={{ "width": "100%" }}>
                                                {
                                                    (RenderComponent !== undefined) ?
                                                        <RenderComponent
                                                            {...props}
                                                            ClientUserDetails={props.ClientUserDetails}
                                                            ComponentController={props.ComponentController}
                                                            JConfiguration={props.JConfiguration}
                                                        /> : <React.Fragment />
                                                }
                                            </div>
                                        </div>
                                }
                            </Dragdrop>
                        </div>
                    </PerformanceProfiler>
                </React.Fragment>
            );
        }
    };

    return <React.Fragment>
        <WrapperComponent
            ComponentName={"Popup"}
            Id="PopupId"
            Meta={{ GroupName: "TestApplicationPopup" }}
            Resource={{ SkinPath: props.JConfiguration.TestApplicationSkinPath }}
            ParentProps={props} />
        {state.blnIsLoadComplete || props.isLoadComplete ? GetContent() : <React.Fragment />}
    </React.Fragment>
};

export default connect(TestApplicationBase_Hook.MapStoreToProps(TestApplicationMaster_ModuleProcessor.StoreMapList()))(TestApplicationMaster);
