import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData , { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 *
 * @param {*} state
 * @summary   maps entity/application state to props of the component.
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        Logger.Log("Mapping");
        return {
            classtype: DataRef(state.Entity, "classtype", true),
            pupilsubjectclasstype: DataRef(state.Entity, "pupilsubjectclasstype", true),
        };
    }
    else {
        Logger.Log("not mapping");
        return {};
    }
};

/**
 *
 * @param {*} JConfiguration
 * @param {*} props
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props){
    // let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let iStateId = props.Data.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let objClassTypeParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iStateId": iStateId
                    }
                },
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
    };
    let arrParams = [
        {
            "URL": "API/Object/Extranet/Teacher/ClassType",
            "Params": objClassTypeParams,
            "MethodType": "Get"
        }
    ];
    return {
        "DataCalls": arrParams
    };
};

/**
 *
 * @param {*} arrParams
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(objContext, arrParams, strToggleExecute = 'FetchAndCacheExecute'){
    switch(strToggleExecute)
    {
        case 'FetchAndCacheExecute':
            let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
            objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
                //Do something
            });
        break;
        case 'FetchExecute':
            ArcadixFetchData.Execute(arrParams, function (objReturn) {
                //Do something
            });
        break;
    }
};

/**
 *
 * @param {*} objContext
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext){
    useLayoutEffect(()=>{
        DataCall(objContext, InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }, []);
};

/**
 *
 * @param {*} objContext
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext)
{
    let iStateId = objContext.props.Data.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    useEffect(() => {
        if(DataRef(objContext.props.classtype, "classtype;istateid;" + iStateId + ";cisdeleted;n") && !objContext.state.blnIsDataCalledForSave)
        {
            if(!objContext.state.isLoadComplete)
            {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        if(objContext.state.isLoadComplete && DataRef(objContext.props.classtype, "classtype;istateid;" + iStateId + ";cisdeleted;n") && objContext.state.blnIsDataCalledForSave)
        {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "blnIsDataCalledForSave": false }});
            objContext.props.closePopUp(objContext.props.objModal)
            objContext.props.passedEvents.OnClickSaveButton(true);
        }
    }, [objContext.props.classtype, objContext.props.pupilsubjectclasstype]);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Return the classtype data.
 */
export function GetClassType(objContext)
{
    let iStateId = objContext.props.Data.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let arrClassType = DataRef(objContext.props.classtype, "classtype;istateid;" + iStateId + ";cisdeleted;n").Data;
    return arrClassType;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} blnIsSelectAll 
 * @param {*} blnIsChecked 
 * @param {*} iClassTypeId 
 * @param {*} uPupilId 
 * @summary   Trigerred when the check-box/select all radio button is clicked.
 */
export function OnChangeSelection(objContext, blnIsSelectAll, blnIsChecked, iClassTypeId, uPupilId)
{
    if(blnIsSelectAll)//Select All is checked
    {
        let arrData = [];
        objContext.props.Data.PupilAndTestData.forEach(objTempData => {
            arrData = [...arrData, {
                "iClassTypeId": iClassTypeId,
                "uPupilId": objTempData["Pupil"]["uPupilId"]
            }];
        });
        objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "blnIsSelectAll": true, "arrSelectedData": arrData, "intSelectAllClassTypeId": iClassTypeId, "blnShowValidationMessage": false }});
    }
    else
    {
        if(blnIsSelectAll === false && blnIsChecked === null)//Select all is un-checked
        {
            let arrData = [];
            objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "blnIsSelectAll": false, "arrSelectedData": arrData, "intSelectAllClassTypeId": -1, "blnShowValidationMessage": false }});
        }
        else if(blnIsSelectAll === false && blnIsChecked ===  true)//A class type is checked.
        {
            let arrNewData = [];
            objContext.state.arrSelectedData.forEach(objTempData => 
                {
                    if(objTempData["iClassTypeId"] !== iClassTypeId && objTempData["uPupilId"] !== uPupilId)
                    {
                        arrNewData = [...arrNewData, objTempData];
                    }
                }
            );
            let arrData = [...arrNewData, {
                "iClassTypeId": iClassTypeId,
                "uPupilId": uPupilId
            }];
            if(arrData.length === objContext.props.Data.PupilAndTestData.length)
            {
                objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "blnIsSelectAll": true, "arrSelectedData": arrData, "intSelectAllClassTypeId": iClassTypeId, "blnShowValidationMessage": false }});
            }
            else
            {
                objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "blnIsSelectAll": false, "arrSelectedData": arrData, "intSelectAllClassTypeId": -1, "blnShowValidationMessage": false }});
            }
        }
        else if(blnIsSelectAll === false && blnIsChecked === false)//A class type is un-checked.
        {
            let arrNewData = [];
            objContext.state.arrSelectedData.forEach(objTempData => 
                {
                    if(objTempData["iClassTypeId"] !== iClassTypeId && objTempData["uPupilId"] !== uPupilId)
                    {
                        arrNewData = [...arrNewData, objTempData];
                    }
                }
            );
            objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "blnIsSelectAll": false, "arrSelectedData": arrNewData, "intSelectAllClassTypeId": -1, "blnShowValidationMessage": false }});
        }
    }
};

/**
 * 
 * @param {*} objContext 
 * @summary   Forms the data to save.
 */
function GetDataToSave(objContext)
{
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrData = objContext.state.arrSelectedData.map(objTempData => {
        return {
            "iClassTypeId": objTempData["iClassTypeId"], 
            "uPupilId": objTempData["uPupilId"], 
            "iSubjectId": objContext.props.Data.SubjectId,
            "uClassId": strClassId
        };
    })
    return arrData;
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the data to save and makes the API call to save that data.
 */
export function SaveData(objContext)
{
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrDataToSave = GetDataToSave(objContext);
    if(arrDataToSave.length > 0)
    {
        let objPupilSubjectClassTypeParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            "vEditData": GetDataToSave(objContext)
        };
        let arrParams = [
            {
                "URL": "API/Object/Extranet/Pupil/PupilSubjectClassType",
                "Params": objPupilSubjectClassTypeParams,
                "MethodType": "Put"
            }
        ];
        Logger.Log("arrParams",arrParams);
        ApplicationState.SetProperty("blnShowAnimation", true);
        DataCall(objContext, arrParams);
        objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "blnIsDataCalledForSave": true }});
    }
    else
    {
        objContext.dispatch({ type: "SET_STATE_VALUES", payload:{ "blnShowValidationMessage": true }});
    }
};

/**
 * @summary   returns the component initial state
 */
export function GetInitialState()
{
    return {
        isLoadComplete: false,
        blnIsDataCalledForSave: false,
        arrSelectedData: [],//[{"iClassTypeId": iClassTypeId, "uPupilId": uPupilId}]
        blnIsSelectAll: false,
        intSelectAllClassTypeId: -1,
        blnShowValidationMessage: false
    };
};

/**
 *
 * @param {*} state
 * @param {*} action
 * @summary   Sets the component state
 */
export function Reducer(state, action)
{
    switch(action.type)
    {
        case 'SET_STATE_VALUES':
        return{
            ...state,
            ...action.payload
        };
        case 'DATA_LOAD_COMPLETE':
        return{
            ...state,
            ["isLoadComplete"]: action.payload
        };
    }
};
