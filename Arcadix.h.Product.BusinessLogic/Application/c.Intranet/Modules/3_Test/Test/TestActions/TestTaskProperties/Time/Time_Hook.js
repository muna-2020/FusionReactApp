// React related imports.
import { useEffect, useLayoutEffect } from 'react';

//Module related imports.
import * as Time_OfficeRibbon from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Time/Time_OfficeRibbon';


/**
* @name GetInitialState
* @param null
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState() {
    return {
        isLoadComplete: false,
        arrTaskProgressDisplaydata:[]
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
    useSetRibbonData(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["TimeGrid"];
        let objData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objData, "arrtasktotestData": objContext.props.arrtasktotestData } });
    }, [objContext.props.arrtasktotestData]);
}

/**
 * @name useDataLoaded
 * @param {object} objContext  objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete
            && objContext.state.arrtasktotestData
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "arrTaskProgressDisplaydata": [...objContext.props.Object_Intranet_Test_TestProgressDisplay["Data"], {
                        "iTestProgressDisplayId": 0,
                        "t_TestDrive_Test_TestProgressDisplay_Data": [{
                            "cIsTranslatedBySystem": "Y",
                            "iLanguageId": 1,
                            "iTestProgressDisplayDataId": 102,
                            "iTestProgressDisplayId": 0,
                            "vTestProgressDisplay": "End Progress"
                        }, {
                                "cIsTranslatedBySystem": "Y",
                                "iLanguageId": 2,
                                "iTestProgressDisplayDataId": 103,
                                "iTestProgressDisplayId": 0,
                                "vTestProgressDisplay": "End Progress"
                        }, {
                                "cIsTranslatedBySystem": "Y",
                                "iLanguageId": 3,
                                "iTestProgressDisplayDataId": 104,
                                "iTestProgressDisplayId": 0,
                                "vTestProgressDisplay": "End Progress"
                        }, {
                                "cIsTranslatedBySystem": "Y",
                                "iLanguageId": 4,
                                "iTestProgressDisplayDataId": 105,
                                "iTestProgressDisplayId": 0,
                                "vTestProgressDisplay": "End Progress"
                            }, {
                                "cIsTranslatedBySystem": "Y",
                                "iLanguageId": 5,
                                "iTestProgressDisplayDataId": 106,
                                "iTestProgressDisplayId": 0,
                                "vTestProgressDisplay": "End Progress"
                            }
                        ]
                    }]
                }
            });
        }
    }, [
        objContext.state.arrtasktotestData
    ]);
}


/**
* @name useSetRibbonData
* @param {object} objContext objContext
* @summary Setting up TabData and RibbonData
*/
export function useSetRibbonData(objContext) {
    useEffect(() => {
        var objData = {
            objContext,
            "EditPopup": () => objContext.Time_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "MoveUp": () => objContext.Time_ModuleProcessor.MoveSelectedRow(objContext, "Up"),
            "MoveDown": () => objContext.Time_ModuleProcessor.MoveSelectedRow(objContext, "Down"),
            "SaveData": () => objContext.Time_ModuleProcessor.SaveData(objContext)
        };
        let arrRibbonData = Time_OfficeRibbon.GetOfficeRibbonData(objData);
        objContext.props.Callbacks.SetOfficeRibbonData(arrRibbonData);
    }, [objContext.state]);
}
