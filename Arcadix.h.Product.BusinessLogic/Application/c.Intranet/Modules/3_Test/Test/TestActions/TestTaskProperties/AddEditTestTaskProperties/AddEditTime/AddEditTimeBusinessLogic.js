import { useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            intranettesttask: DataRef(state.Entity, "intranettesttask", true)
        };
    }
    else {
        Logger.Log("not mapping class");
        return {};
    }
}

/**
* @param {*} objContext
* @summary Setting up TabData and RibbonData
*/
export function useInitializeRibbon(objContext) {
    let arrTabData = [
        { "text": "ACTIONS", "type": "ribbon" }
    ];
    let arrRibbonData = [
        {//Group1
            "vGroupName": objContext.props.Data.objTextResource["ToSave"],
            "t_GroupData": [
                {
                    "vTextName": objContext.props.Data.objTextResource["ToSave"],
                    "uImageUrl": "Save_Large.svg",
                    "type": "single",
                    "OnClick": () => {
                        AddMethod(objContext)
                    }
                },
                {
                    "vTextName": objContext.props.Data.objTextResource["SaveAndClose"],
                    "uImageUrl": "SaveAndClose_Large.svg",
                    "type": "single",
                    "OnClick": () => {
                        AddMethod(objContext, true)
                    }
                }
            ]
        },
    ];

    //this is done to update the reference 
    useEffect(() => {
        let objOldPopupTabData = ApplicationState.GetProperty("PopupTabData");
        let objOldPopupRibbonData = ApplicationState.GetProperty("PopupRibbonData");
        ApplicationState.SetProperty("PopupTabData", { ...objOldPopupTabData, "addedittime_popup": arrTabData });
        ApplicationState.SetProperty("PopupRibbonData", { ...objOldPopupRibbonData, "addedittime_popup": arrRibbonData });
    }, [objContext.state]);
}

/**
* @param {*} objContext
* @summary Setting up Content Data
*/
export function useInitializeTabs(objContext) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Data.objTextResource["Time"],
            "Id": "Time",
            "Children": [
                {
                    "Text": objContext.props.Data.objTextResource["Time"],
                    "Id": "Time",
                    "Event": () => {
                        ShowDiv("Time", objContext)
                    }
                }
            ]
        },
        {//Group1
            "Text": objContext.props.Data.objTextResource["Audit"],
            "Id": "Audit",
            "Children": [
                {
                    "Text": objContext.props.Data.objTextResource["Audit"],
                    "Id": "Audit",
                    "Event": () => {
                        ShowDiv("Audit", objContext)
                    }
                }
            ]
        }
    ];
    useEffect(() => {
        let objOldPopupTimeData = ApplicationState.GetProperty("PopupNavigationData");
        ApplicationState.SetProperty("PopupNavigationData", { ...objOldPopupTimeData, "addedittime_popup": arrContentData });
    },
        [])
}

/**
* Setting up objData state and objValidationColumnTabMapping state
*/
export function useInitializeData(objContext) {
    //the key fields should be in serial order with the div it is present in
    let arrSelectedRows = objContext.props.Data.SelectedRows;
    let objTempEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};
    let objNewEditData = ModifyEditData(objContext, arrSelectedRows, objTempEditData)
    let tempObjData = objNewEditData;

    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objData": tempObjData } });
    }, []);
}

/**
 * @param {*} props
* modifying the subject table of edit row data to sync with multi language data
 */

export function ModifyEditData(objContext, arrSelectedRows, objTempEditData) {
    let objNewEditData = {}
    if (objContext.props.Data.blnIsEdit && arrSelectedRows) {
        objNewEditData = { ...objTempEditData }
    }
    return objNewEditData
}


/**
* @param {*} vColumnName
* @param {*} objContext
* return the respective object of the metadata
*/
export const GetObjectHeader = (vColumnName, objContext) => {
    return objContext.props.Data.arrHeaderData.filter((objHeader) => objHeader["vColumnName"] === vColumnName)[0]
}

/**
* @param {*} strId
* @param {*} strValue
* @param {*} strId
* @param {*} objContext
* @param blnChecked
* @summary Handle change method to handle changes in the jsx elements
*/

export function HandleChange(strId, strValue, objContext) {
    var objNewData;       
    objNewData = { ...objContext.state.objData, [strId]: strValue };
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { objData: objNewData } });
}

/**
* @param {*} objContext
* hits the add/edit api after validation succeeds
*/
export const AddMethod = (objContext, blnClose = false) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnSaveClicked": true } });
    let arrParams = [];
    //if (objContext.state.blnAddedOnce) {
    //    var objEditData = JSON.parse(JSON.stringify(objContext.state.objData));
    //    objEditData["iTestTaskId"] = objContext.state.objData["iTestTaskId"];
    //    objEditData = { ...objEditData, "vAction": "Edit" };
    //}

    var objTempData = { ...objContext.state.objData, "vAction": "Edit" };
    let objHierarchyParams = {
        //"vEditData": objContext.state.blnAddedOnce ? [objEditData] : [objTempData],
        "vEditData": [objTempData],
        "uTestId": objContext.state.objData["uTestId"],
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "uTestId": objContext.props.Data.uTestId
                    }
                }
            ]
        }

    };
    console.log("objHierarchy", objHierarchyParams);
    arrParams = [...arrParams,
    {
        "URL": "API/Object/Intranet/Test/IntranetTestTask",
        "Params": objHierarchyParams,
        "MethodType": "Put"
    }];

    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, cIsNewData) {
        if (cIsNewData) {
            if (blnClose) {
                ApplicationState.SetProperty("SelectedRows", [])
                objContext.props.closePopUp(objContext.props.objModal);
            }
        }
    });

}

/**
* @param {*} strDivId
* @param {*} objContext
* Show div method to show different divs div when defferent competencies and audits are selected
*/
export const ShowDiv = (strDivId, objContext) => {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "strDivToShow": strDivId } });
}

export function HandleChangeCheckBox(strTimeLimit, strMinimumTime, strGroupTime, objContext, blnCheckBox) {
    var objNewData;  
    //var strTaskTimeLimit = objContext.state.objData["iTaskTimeLimit"];
    if (blnCheckBox) {
        objNewData = { ...objContext.state.objData, [strTimeLimit]: -1, [strMinimumTime]: null, [strGroupTime]: null };
    }
    else {
        objNewData = { ...objContext.state.objData,[strTimeLimit]: null};
    }
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { objData: objNewData } });
}

/**
* @param {*} arrSubjectFieldName
* @param {*} objField
* @param {*} objContext
* @summary   Gets the datas for the dropdown
*/
export const GetDropDownData = (objContext) => {
    var arrDropDownData = [], blnIsLanguageDependent = "", strDisplayColumn = "", strDependingTableName = "", strValueColumn = "";
    var objDropDownData = GetAddEditDropdownObject(objContext);
    arrDropDownData = objDropDownData["Data"];
    blnIsLanguageDependent = objDropDownData["cISLanguageDependent"];
    strDisplayColumn = objDropDownData["DisplayColumn"];
    strValueColumn = objDropDownData["ValueColumn"];
    strDependingTableName = objDropDownData["DependingTableName"];
    const objDataDropDown = JSON.parse(JSON.stringify(objContext.state.objData));

    return { arrDropDownData, blnIsLanguageDependent, strDisplayColumn, strDependingTableName, strValueColumn, objDataDropDown };
}

/**
* @param {*} objChangeData 
* @param {*} props 
* @param {*} objContext
* @summary   To change the row Data on change of the dropdown value
*/
export const DropDownChange = (objChangeData, props, objContext) => {
    var strCellName = props["ValueColumn"];
    var objEditData = JSON.parse(JSON.stringify(objContext.state.objData));
    objEditData["iTestProgressDisplayId"] = objChangeData[strCellName];

    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "objData": objEditData } });
}

/**
* @param {*} objContext
* @summary Return subject dropdown object
*/
function GetAddEditDropdownObject(objContext) {
    let objDropDownData = {
        "cISLanguageDependent": "Y",
        "DependingTableName": "t_TestDrive_Test_TestProgressDisplay_Data",
        "ValueColumn": "iTestProgressDisplayId",
        "DisplayColumn": "vTestProgressDisplay",
        "Data": objContext.props.Data.testprogressdisplay 
    };

    return objDropDownData;
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        objData: {},
        blnAddedOnce: false,
        blnSaveClicked: false,
        strDivToShow: "Time"
    };
}

export const Reducer = (state, action) => {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE":
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            }
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
    }
}