// React related imports.
import { useEffect, useLayoutEffect, useRef } from 'react';

//Common helper class method.
import SignalRClass from '@shared/Framework/Services/SignalRClass/SignalRClass';

/**
 * @name GetInitialState
 * @param null
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/SoftwareEngineerSupport/DevLinkRefreshr", props)
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        isServiceStatusLoaded: false,
        isServiceStatus: false,
        ServiceType: null,        
        //status refs        
        objServiceStatusRefs: {
            "VsDocman": useRef("-"),
            "JSDoc": useRef("-"),
            "Arcadix_Fusion_Cockpit_Export": useRef("-"),
            "Arcadix_Fusion_Editor_Export": useRef("-"),
            "Arcadix_Fusion_Extranet_Export": useRef("-"),
            "Arcadix_Fusion_Intranet_Export": useRef("-"),
            "Arcadix_Fusion_Test_Export": useRef("-")
        }
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useRegisterOfflineEvents(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.DevLinkRefresh_ModuleProcessor.LoadInitialData(objContext);
        ApplicationState.SetProperty("OfficeRibbonData", [{}])
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/SoftwareEngineerSupport/DevLinkRefresh", objContext.props)
            && objContext.state.isServiceStatus
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Cockpit/Modules/SoftwareEngineerSupport/DevLinkRefresh"],
            objContext.state.isServiceStatus
    ]);
}

/**
* @name useRegisterOfflineEvents
* @param {any} objContext
* @summary Register Signalr(offline) Events
*/
export function useRegisterOfflineEvents(objContext){
    useEffect(() => {
        let arrServices = ["VsDocman", "JSDoc", "Arcadix_Fusion_Cockpit_Export", "Arcadix_Fusion_Editor_Export", "Arcadix_Fusion_Extranet_Export", "Arcadix_Fusion_Intranet_Export", "Arcadix_Fusion_Test_Export"];
        //arrServices = ["GoogleUpdateTaskMachineCore", "GoogleUpdateTaskMachineUA"];
        let objSignalR = new SignalRClass();
        objSignalR.ConnectToHub(objContext);
        arrServices.map(strService => {
            objSignalR.EventListener(strService, (objResponse) => {
                let objData = JSON.parse(objResponse).Data;
                console.log(strService,objData);
                //ref approach
                objContext.state.objServiceStatusRefs[strService].current = objData.Status;
                objContext.dispatch({ type: "SET_STATE", payload: { "isServiceStatusLoaded": true } });
            });
        });
    }, []);      
}