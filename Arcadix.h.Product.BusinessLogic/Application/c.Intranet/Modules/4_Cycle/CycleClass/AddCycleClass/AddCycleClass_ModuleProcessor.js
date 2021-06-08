//Objects required for module.
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';

//Module Related Files.
import * as AddCycleClass_MetaData from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleClass/AddCycleClass/AddCycleClass_MetaData';


/**
* @name AddCycleClass_ModuleProcessor
* @param NA
* @summary Class forAddCycleClass popup.
* @return NA
*/
class AddCycleClass_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
    * @name LoadSelectedStateSchools
    * @param {object} objContext objContext
    * @param {string} strStateId uCycleId
    * @summary Loads the Test data based on selected CycleId
    * @returns {object} return objDataCalls
    */
    LoadSelectedStateSchools(objContext, strStateId) {
        let objSchoolParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": strStateId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "vSchoolName": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": ["uSchoolId", "vSchoolName", "iStateId", "cIsDeleted"]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_School_School.GetData(objSchoolParam, (objReturnData) => {
            let arrSchoolData = objReturnData[Object.keys(objReturnData)[0]]["Data"] ? objReturnData[Object.keys(objReturnData)[0]]["Data"] : [];          
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSchoolData": arrSchoolData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true);
    }

    /**
     * @name LoadFoldersAndTaskse
     * @param {object} objContext Context Object
     * @summary To set state data after the load is complete.
     */
    LoadSelectedSchoolTeachers(objContext, strSchoolId) {
        let objTeacherParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolId": strSchoolId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "vName": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": ["uTeacherId", "vName", "cIsDeleted"]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_Teacher_Teacher.GetData(objTeacherParam, (objReturnData) => {
            let arrTeacherData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTeacherData": arrTeacherData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true);
    }

    /**
     * @name LoadFoldersAndTaskse
     * @param {object} objContext Context Object
     * @summary To set state data after the load is complete.
     */
    LoadSelectedTeacherClass(objContext, strTeacherId) {
        let objClassParam = {
            "SearchQuery": {
                "must": [
                    {
                        "nested": {
                            "path": "t_TestDrive_Member_Class_Teacher",
                            "query": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "t_TestDrive_Member_Class_Teacher.uTeacherId": strTeacherId
                                            }
                                        }
                                    ]
                                }                                
                            }
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "vClassName": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": ["uClassId", "vClassName", "cIsDeleted"]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_Teacher_Class.GetData(objClassParam, (objReturnData) => {
            let arrClassData = objReturnData[Object.keys(objReturnData)[0]]["Data"];            
            objContext.dispatch({ type: "SET_STATE", payload: { "arrClassData": arrClassData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true);
    }

    /**
    * @name HandleDropDownChange
    * @param {string} strType dropdown type
    * @param {object} objContext objChangeData
    * @param {object} objChangeData objChangeData
    * @summary   To change the School Dropdown Data on change of state dropdown value
    */
    HandleDropDownChange(strType, objChangeData, objContext) {
        let strId = "", strValue = "";
        switch (strType) {
            case "state":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedState": objChangeData, "objSelectedSchool": {}, "arrSchoolData": [] } });
                strId = "iStateId";
                strValue = objChangeData["iStateId"];
                break;
            case "school":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedSchool": objChangeData, "objSelectedTeacher": {}, "objSelectedClass": {} } });
                strId = "uSchoolId";
                strValue = objChangeData["uSchoolId"];
                break;
            case "teacher":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedTeacher": objChangeData, "objSelectedClass": {} } });
                strId = "uTeacherId";
                strValue = objChangeData["uTeacherId"];
                break;
            case "class":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedClass": objChangeData } });
                strId = "uClassId";
                strValue = objChangeData["uClassId"];
                break;
        }
        if (objContext.state.blnIsAddClicked) {
            FieldValidator.ValidateClientSide(AddCycleClass_MetaData.GetAddCycleClassMetaData(), objContext.props.Resource.Text, { [strId]: strValue }, strId, false)
        }
    }

    SetSelectedClass(objContext) {
        let objData = {
            "iStateId": objContext.state.objSelectedState["iStateId"] ? objContext.state.objSelectedState["iStateId"] : -1,
            "uSchoolId": objContext.state.objSelectedSchool["uSchoolId"] ? objContext.state.objSelectedSchool["uSchoolId"] : -1,
            "uTeacherId": objContext.state.objSelectedTeacher["uTeacherId"] ? objContext.state.objSelectedTeacher["uTeacherId"] : -1,
            "uClassId": objContext.state.objSelectedClass["uClassId"] ? objContext.state.objSelectedClass["uClassId"] : -1 
        }
        let objValidationObject = this.Validate(objContext, objData);
        if (!objValidationObject) {
        //if (objContext.state.objSelectedState["iStateId"] != -1 && objContext.state.objSelectedSchool["uSchoolId"] != -1 && objContext.state.objSelectedTeacher["uTeacherId"] != -1 && objContext.state.objSelectedClass["uClassId"] != -1) {
            objContext.props.Events.SetSelectedClass(objContext.state.objSelectedState, objContext.state.objSelectedSchool, objContext.state.objSelectedTeacher, objContext.state.objSelectedClass);
            Popup.ClosePopup(objContext.props.Id)
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnIsAddClicked": true } });
        }
    }

    /**
     * @name Validate
     * @param {object} objContext takes objContext
     * @param {object} objData takes objData
     * @param {string}  strColumnName takes strColumnName
     * @summary Validate
     * @returns {object} objNewValidationObject
     */
    Validate(objContext, objData) {        
        let objNewValidationObject = FieldValidator.ValidateClientSide(AddCycleClass_MetaData.GetAddCycleClassMetaData(), objContext.props.Resource.Text, objData, "", true);
        //objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
    }
}

export default AddCycleClass_ModuleProcessor;