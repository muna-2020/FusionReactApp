//React related imports
import React from 'react';
import ReactDOM from 'react-dom';

import { createRef } from 'react';

//Base Component related import
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ServerRenderedComponentLoader from '@root/Core/5_ServerRender/ServerRenderedComponentLoader/ServerRenderedComponentLoader';
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
  * @name ComponentLoader
  * @param {object} props props
  * @summary to update state
  * @returns {object} returns a updated state
  */
const ComponentLoader = (props) => {

    /**
     * @name GetComponent
     * @returns {JSX} returns the Jsx from the component.
     * @summary get the Jsx for the component to load.
     */
    const GetContent = () => {
        let strComponentName = props.IsFromRouteLoader && props.IsFromRouteLoader === true ? props.match.params.strComponentName.split('?')[0] : props.ComponentName;
        Performance.GetTotalPerformanceData(strComponentName);
        let blnShowServerRender = false;

        if (!props.IsForceServerRender && (!props.JConfiguration.IsSSREnabled || props.IsForceClientRender || arrModulesRendered.includes(strComponentName))) {
            arrModulesRendered = [...arrModulesRendered.filter(strComponent => strComponent != strComponentName), strComponentName];//Maintaining list of modules rendered in order
            if (props.IsFromRouteLoader === true && props.InitialHtml != undefined && props.InitialHtml != "")
                blnShowServerRender = true;
            props = { ...props, ServerRenderedHTML: props.InitialHtml }
        }
        else {
            blnShowServerRender = true;
            //To Preform SSR if Prefetch of Component has not happened.
            if (props.IsFromRouteLoader === true || props.DivName=="divOutlet") {
                let objPrefetchLink = document.getElementById(strComponentName + ".chunk.js");
                if (objPrefetchLink) {
                    props = { ...props, ServerRenderedHTML: props.InitialHtml }
                }
            }
        }
        if (!blnShowServerRender || props.IsModuleReload==true) {
            let objDom = document.getElementById("Client_" + props.DivName);
            if (objDom !== null)
                ReactDOM.unmountComponentAtNode(objDom);
           
            let RenderComponent = props.ComponentController.GetComponent(strComponentName);
            if (RenderComponent !== "undefined") {
                let objJConfiguration = { ...props.JConfiguration, "IsProfilerEnabled": true };
                let intCurrentDivCount = ApplicationState.GetProperty("SSRedDivDetails") ? ApplicationState.GetProperty("SSRedDivDetails").CurrentDivCount + 1 : 0;
                ApplicationState.SetProperty("SSRedDivDetails", { ...ApplicationState.GetProperty("SSRedDivDetails"), ["CurrentDivCount"]: intCurrentDivCount });
                return (
                    <PerformanceProfiler ComponentName={strComponentName} IsMainModule={true} JConfiguration={objJConfiguration} >
                        <RenderComponent id={props.DivName} {...props} ComponentController={props.ComponentController} JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} />
                    </PerformanceProfiler>
                );
            }
            else
                return <div>Yet to be implemented</div>;
        }
        else {
            let objRef = createRef();
            ApplicationState.SetProperty("SSRedDivDetails", { "ServerRenderRef": objRef, "TotalDivCount": 0, "CurrentDivCount": 0 })
            //------------Maintaining list of ServerRendered Modules---------------------------
            if (arrModulesRendered.filter(strComponent => strComponent == strComponentName).length == 0) {
                arrModulesRendered = [...arrModulesRendered, strComponentName];
                ApplicationState.SetProperty("FullServerRenderedModules", arrModulesRendered);
            }
            //---------------------------------------------------------------------------------
            if (props.IsForceServerRender) {
                ApplicationState.SetProperty("IsSSRReload", false);
            }
            return (
                <ServerRenderedComponentLoader ServerRenderRef={objRef} {...props} ComponentName={strComponentName} iReloadCount={ApplicationState.GetProperty('iReloadCount')} />
            );
        }
    };

    return (
        <div id={props.ComponentName !== "Master" ? "ModuleContainerParent" : "MasterContainerParent"} className="h-100 w-100" type="RDiv"> <div className="h-100" id={props.ComponentName !== "Master" ? "ModuleContainer" : "MasterContainer"}>
            {GetContent()}
        </div>
        </div>
    );
};

export default React.memo(ComponentLoader);