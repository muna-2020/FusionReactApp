//module specific imports.
import Object_Extranet_Teacher_ClassType from '@shared/Object/d.Extranet/3_Teacher/ClassType/ClassType'
import Object_Extranet_Pupil_PupilSubjectClassType from '@shared/Object/d.Extranet/4_Pupil/PupilSubjectClassType/PupilSubjectClassType';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name TestLoginsAssignClassType_ModuleProcessor
 * @summary module processor for Test logins.
 * */
class TestLoginsAssignClassType_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Extranet_Teacher_ClassType"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name GetDynamicStyles
    * @summary Css files specific to this module
    * @param {any} props
    * @returns {Array}
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/HighStakeTestLogins/HighStakeTestLoginsPopups/TestLoginsAssignClassType/TestLoginsAssignClassType.css"
        ];
    }

    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {
        let arrDataRequest = [];
        let iStateId = GetStateIdBasedOnSchool(props.Data.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
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
        Object_Extranet_Teacher_ClassType.Initialize(objClassTypeParams)
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_ClassType];
        return arrDataRequest;
    }

    /**
    * 
    * @param {*} objContext 
    * @summary   Return the classtype data.
    */
    GetClassType(objContext) {
        let iStateId = GetStateIdBasedOnSchool(objContext.props.Data.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let arrClassType = DataRef(objContext.props.Object_Extranet_Teacher_ClassType, "Object_Extranet_Teacher_ClassType;iStateId;" + iStateId + ";cIsDeleted;N").Data;
        return arrClassType;
    };

    /**
     * @name OnChangeSelectionAll
     * @param {*} objContext 
     * @param {*} blnIsSelectAll 
     * @param {*} blnIsChecked 
     * @param {*} iClassTypeId 
     * @param {*} uPupilId 
     * @summary   Trigerred when the check-box/select all radio button is clicked.
     */
    OnChangeSelectionAll(objContext, blnIsSelectAll, iClassTypeId) {
        if (blnIsSelectAll)//Select All is checked
        {
            let arrData = [];
            objContext.props.Data.PupilAndTestData.forEach(objTempData => {
                arrData = [...arrData, {
                    "iClassTypeId": iClassTypeId,
                    "uPupilId": objTempData["Pupil"]["uPupilId"]
                }];
            });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSelectAll": true, "arrSelectedData": arrData, "intSelectAllClassTypeId": iClassTypeId, "blnShowValidationMessage": false } });
        }
        else {
            let arrData = [];
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSelectAll": false, "arrSelectedData": arrData, "intSelectAllClassTypeId": -1, "blnShowValidationMessage": false } });
        }
    };

    /**
     * @name OnChangeSelection
     * @param {*} objContext 
     * @param {*} blnIsSelectAll 
     * @param {*} blnIsChecked 
     * @param {*} iClassTypeId 
     * @param {*} uPupilId 
     * @summary   Trigerred when the check-box/select all radio button is clicked.
     */
    OnChangeSelection(objContext, blnIsChecked, iClassTypeId, uPupilId) {
        if (blnIsChecked === true)//A class type is checked.
        {
            let arrData = objContext.state.arrSelectedData.filter(objTempData => objTempData["uPupilId"] != uPupilId);
            let arrNewData = [
                ...arrData,
                {
                    "iClassTypeId": iClassTypeId,
                    "uPupilId": uPupilId
                }];
            if (arrNewData.length === objContext.props.Data.PupilAndTestData.length) {
                objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSelectAll": true, "arrSelectedData": arrNewData, "intSelectAllClassTypeId": iClassTypeId, "blnShowValidationMessage": false } });
            }
            else {
                objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSelectAll": false, "arrSelectedData": arrNewData, "intSelectAllClassTypeId": -1, "blnShowValidationMessage": false } });
            }
        }
        else if (blnIsChecked === false)//A class type is un-checked.
        {
            let arrNewData = objContext.state.arrSelectedData.filter(objTempData => objTempData["uPupilId"] == uPupilId);
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsSelectAll": false, "arrSelectedData": arrNewData, "intSelectAllClassTypeId": -1, "blnShowValidationMessage": false } });
        }
    };

    /**
     * @name GetDataToSave
     * @param {*} objContext 
     * @summary   Forms the data to save.
     */
    GetDataToSave(objContext) {
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
     * @name SaveData
     * @param {*} objContext 
     * @summary   Gets the data to save and makes the API call to save that data.
     */
    SaveData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrDataToSave = this.GetDataToSave(objContext);
        if (arrDataToSave.length > 0) {
            let objPupilSubjectClassTypeParams = {
                "ForeignKeyFilter": {
                    "uClassId": strClassId
                },
                "vEditData": this.GetDataToSave(objContext)
            };
            ApplicationState.SetProperty("blnShowAnimation", true);
            Object_Extranet_Pupil_PupilSubjectClassType.EditData(objPupilSubjectClassTypeParams, () => {
                Logger.Log("objPupilSubjectClassTypeParams", objPupilSubjectClassTypeParams);
                ApplicationState.SetProperty("blnShowAnimation", false);
                Popup.ClosePopup(objContext.props.Id);
                objContext.props.Data.PopupId != -1 ? Popup.ClosePopup(objContext.props.Data.PopupId) : null;
                objContext.props.Data.OnClickSaveButton(true);
            })
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsDataCalledForSave": true } });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowValidationMessage": true } });
        }
    };


    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown" ],
            "Files": []
        }
    }
}

export default TestLoginsAssignClassType_ModuleProcessor