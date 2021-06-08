// React related imports.
import { useEffect, useRef } from 'react';

//Core Imports.
import { LoadPrefetchLinksForNavigation } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        isLoadComplete: false,
        blnDropdownDataLoaded: false,
        blnOpenSideNav: true,
        arrLanguageData: [],
        arrCountryData: [],
        refOnlineHelp: useRef(null)
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
    useLoadProcessCount(objContext);
    useLoadPrefetchLinks(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.Master_ModuleProcessor.LoadInitialData(objContext);
    }, []);

    useEffect(() => {
        if (objContext.state.arrCountryData.length > 0 && objContext.state.arrLanguageData.length > 0) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
        }
    }, [objContext.state.arrLanguageData,
    objContext.state.arrCountryData]);
}



/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)["Data"]
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/LoginAndMaster/Master", objContext.props)
            && Object_Framework_Services_TextResource.GetData("/c.Intranet/LoginAndMaster/Navigation", objContext.props)
            && DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"]
        ) {
            if (objContext.state.blnDropdownDataLoaded) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
            else {
                LoadDropdown(objContext);
            }
        }
    }, [
            objContext.props.Object_Framework_Services_FrameworkNavigation,
            objContext.props.Object_Cockpit_MainClient_MainClientLanguage,
            objContext.state.blnDropdownDataLoaded,
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/LoginAndMaster/Master"],
            objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.Intranet/LoginAndMaster/Navigation"]
    ]);
}

export function LoadDropdown(objContext) {

    let arrCountryParams = [
        {
            "URL": "API/Object/Cockpit/Language",
            "Params": {
                "SortKeys": [
                    {
                        "iFrameworkLanguageId": {
                            "order": "asc"
                        }
                    }
                ]
            },
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": "Cockpit"
        },
        {
            "URL": "API/Object/Cockpit/Country",
            "Params": {
                "SortKeys": [
                    {
                        "iCountryId": {
                            "order": "asc"
                        }
                    }
                ]
            },
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": "Cockpit"
        },
        {
            "URL": "API/Object/Cockpit/MainClient/MainClientCountry",
            "Params": {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "iMainClientId": objContext.props.ClientUserDetails.MainClientId,
                            }
                        },
                        {
                            "match": {
                                "iApplicationTypeId": objContext.props.ClientUserDetails.ApplicationTypeId
                            }
                        },
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
                }},
            "MethodType": "Get",
            "UseFullName": true,
            "MainClientIdentifier": "Cockpit"
        }
    ];
    ArcadixFetchData.Execute(arrCountryParams, (objCountryData) => {
        console.log(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"])
        objContext.dispatch({ type: "SET_STATE", payload: { "arrLanguageData": objCountryData.Object_Cockpit_Language.Data } });
        objContext.dispatch({ type: "SET_STATE", payload: { "arrCountryData": objCountryData.Object_Cockpit_Country.Data } });
        let arrMainClientLanguageData = objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"].filter((objData) =>objData["iApplicationTypeId"] == objContext.props.ClientUserDetails.ApplicationTypeId && objData["cIsDeleted"] == "N");
        objContext.dispatch({ type: "SET_STATE", payload: { arrMainClientLanguageData: arrMainClientLanguageData } });
        objContext.dispatch({ type: "SET_STATE", payload: { arrMainClientCountryData: objCountryData.Object_Cockpit_MainClient_MainClientCountry["Object_Cockpit_MainClient_MainClientCountry;iMainClientId;" + objContext.props.ClientUserDetails.MainClientId + ";iApplicationTypeId;" + objContext.props.ClientUserDetails.ApplicationTypeId + ";cIsDeleted;N"].Data} });
        objContext.dispatch({ type: "SET_STATE", payload: { "blnDropdownDataLoaded": true } });
            
        }) 
}

/**
 * @name useLoadProcessCount
 * @param {object} objContext  objContext
 * @summary.
 */
export function useLoadProcessCount(objContext) {
    useEffect(() => {
        objContext.Master_ModuleProcessor.LoadOfflineProcessCount(objContext);
    }, []);
}

/**
 * @name useLoadPrefetchLinks
 * @param {object} objContext takes objContext
 * @summary Loads the Prefetch link tags into the DOM.
 */
export function useLoadPrefetchLinks(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let arrNavigation = DataRef(objContext.props.Object_Framework_Services_FrameworkNavigation, "Object_Framework_Services_FrameworkNavigation;ApplicationType;" + objContext.props.JConfiguration.ApplicationTypeId)["Data"];
            let arrPrefetchNavigations = objContext.Master_ModuleProcessor.GetPrefetchNavigations(arrNavigation);
            LoadPrefetchLinksForNavigation(arrPrefetchNavigations, objContext);
        }
    }, [objContext.state.isLoadComplete]);
}