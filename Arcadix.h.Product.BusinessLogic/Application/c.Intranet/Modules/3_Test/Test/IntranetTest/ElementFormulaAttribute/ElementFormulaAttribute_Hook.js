// React related imports.
import { useEffect, useLayoutEffect } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    if (
        DataRef(props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"]
        && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute", props)
        && DataRef(props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        && DataRef(props.Object_Cockpit_Language)["Data"]
    ) {
        blnIsLoadComplete = true;
    }
    return {
        isLoadComplete: blnIsLoadComplete,
        strcIsForWholeTask: "Y",
        strcIsDefaultSelected: "Y",
        objselectedElementAttribute: { "t_TestDrive_Test_ResultAttribute_ElementRule": [], "t_TestDrive_Test_ResultAttribute_ElementRule": [] },
        arrElementAttributeData: [],
        objData: {}
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize method call to load the initial data
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useSetRibbonData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        objContext.ElementFormulaAttribute_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "objselectedElementAttribute": DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId)[0] != undefined ? DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId)[0] : DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == 0)[0],
                    "arrElementAttributeData": DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"]//objElementFormulaAttributeData["Data"]
                }
            })
        }
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
            && DataRef(objContext.props.Object_Cockpit_Language)["Data"]
        ) {
            //To set state data after the load is complete
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true } });
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "objselectedElementAttribute": DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId)[0] != undefined ? DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId)[0] : DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == 0)[0],
                    "arrElementAttributeData": DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"]//objElementFormulaAttributeData["Data"]
                }
            })
        }
    }, [
            Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute", objContext.props),
            objContext.props.Object_Cockpit_Language,
            objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
            objContext.props.Object_Intranet_Setting_ElementFormulaAttribute
    ]);
}

/**
* @name useSetRibbonData.
* @param {object} objContext takes  objContext.
* @summary To set and update the Ribbon Data when the State changes.
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.ElementFormulaAttribute_ModuleProcessor.SetRibbonData(objContext);
        }
    }, [objContext.state]);

    if (objContext.props.IsForServerRenderHtml) {
        objContext.ElementFormulaAttribute_ModuleProcessor.SetRibbonData(objContext);
    }
}
