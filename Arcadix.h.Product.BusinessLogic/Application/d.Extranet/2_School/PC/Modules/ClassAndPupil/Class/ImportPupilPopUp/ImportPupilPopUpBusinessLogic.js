import { useEffect } from 'react';
import ArcadixFetchAndCacheData , { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        Logger.Log("Mapping Pupil");
        return {
            textresource: DataRef(state.Entity,"textresource",true),
            pupil: DataRef(state.Entity,"pupil",true)
        };
    }
    else {
        Logger.Log("not mapping pupil");
        return {};
    }
}

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
function DataCall(arrParams){
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.ExecuteCustom(arrParams[0].URL, "POST", arrParams[0], function (objReturn) {
        //Do something
    });
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data(text resource, grid config, class group, gender) is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{
    useEffect(()=>{
        if(DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.Data.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/classandpupil/class") &&
        DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.Data.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/classandpupil/pupil"))
        {
            let strClassId = objContext.props.Data.ClassData["uClassId"];
            if(DataRef(objContext.props.pupil, "pupil;t_testdrive_member_class_pupil.uclassid;" + strClassId) && objContext.state.blnIsFileUploadAttempted)
            {
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"blnIsReportGenerated": true, "blnShowReportHref": true, "blnIsFileUploadAttempted": false} });
            }
            if(!objContext.state.isLoadComplete)
            {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
    },[objContext.props.textresource, objContext.props.pupil]);
}

/**
 * 
 * @param {*} objContext 
 * @param {*} strFiles 
 * @summary   Imports the pupil from pupil import sheet. 
 */
export function ImportData(objContext, strFiles) {
    let arrFiles = JSON.parse(strFiles);
    let strFileName = arrFiles[0] ? arrFiles[0].FileName : "";
    let objClass = objContext.props.Data.ClassData;
    let strClassId = objClass["uClassId"];
    let strTeacherId = objClass["t_TestDrive_Member_Class_Teacher"][0]["uTeacherId"];
    let arrParamsImportPupil =[{
        "URL": "API/Object/Extranet/Pupil/Pupil/SavePupilDetailsFromExcel",
        "Params": {
            ["ClassId"]: strClassId,
            ["ImportExcelName"]: strFileName,
            ["TeacherId"]: strTeacherId,
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        }
    }];
    if(strFileName !== ""){
        ApplicationState.SetProperty("blnShowAnimation", true);
        DataCall(arrParamsImportPupil);
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"blnIsFileUploadAttempted": true} });
    }
}

/**
 * 
 * @param {*} objContext 
 * @summary   Shows next slide on the click of -> button
 */
export function ShowNextSlide(objContext){
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"classContent": "hideContent", "classNextSlideContent": ""} });
}

/**
 * 
 * @param {*} objContext 
 * @summary   Shows next slide on the click of <- button
 */
export function ShowPreviousSlide(objContext){
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: {"classContent": "", "classNextSlideContent": "hideContent"} });
}

/**
 * @summary Returns Initial state of the component.
 */
export function GetInitialState(){
    return {
        isLoadComplete: false,
        classContent: "",
        classNextSlideContent: "hideContent",
        blnShowReportHref: false,
        blnIsReportGenerated: false,
        blnIsFileUploadAttempted: false
    };
}

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Maintain component state
 */
export const Reducer = (state, action) =>{
    switch(action.type)
    {
        case "DATA_LOAD_COMPLETE":
        return{
            ...state,
            ["isLoadComplete"]:action.payload
        };
        case "SET_STATE_VALUES":
        return {
            ...state,
            ...action.payload
        };
    }
};


