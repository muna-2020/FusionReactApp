//Objects required for module.
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher'


/**
 * @name ClassManagementSearch_ModuleProcessor
 * @summary Class for Test module display.
 */
class ClassManagementSearch_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name LoadSelectedStateSchools
     * @param {object} objContext Context Object
     * @summary To set state data after the load is complete.
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
            "OutputColumns": ["uSchoolId", "vSchoolName", "iStateId", "cIsTestSchool", "cIsDeleted","cIsStellwerk"]
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_School_School.GetData(objSchoolParam, (objReturnData) => {
            let arrSchoolData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSchoolData": arrSchoolData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true);
    }

    /**
     * @name AddSearchFilters
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To set the Search filter in the state
     */
    AddSearchFilters(event, objContext) {
        var cIsYorN;
        if (event.target.type === "text") {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [event.target.id]: event.target.value } } });
        }
        else {
            if (event.target.id === "cIsTestSchool" || event.target.id =="cIsStellwerk") {
                cIsYorN = event.target.checked ? 'Y' : 'N';
                objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [event.target.id]: cIsYorN, "uSchoolId": -1, "uTeacherId": -1 } } });
            }
        }
    }

    /**
     * @name HandleDropDownChange
     * @param {string} strType dropdown type
     * @param {object} objContext objChangeData
     * @param {object} objChangeData objChangeData
     * @summary   To change the Classtype Dropdown Data on change of the state dropdown value
     */
    HandleDropDownChange(strType, objChangeData, objContext) {
        switch (strType) {
            case "state":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, "iStateId": objChangeData["iStateId"], "uSchoolId": -1, "uTeacherId": -1 }, "strStateId": objChangeData["iStateId"] } });
                break;
            case "school":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, "uSchoolId": objChangeData["uSchoolId"], "uTeacherId": -1 } } });
                this.LoadSelectedSchoolTeacher(objContext, objChangeData["uSchoolId"]);
                break;
            case "Teacher":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, "uTeacherId": objChangeData["uTeacherId"] } } });
                break;
            case "SchoolYear":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, "iSchoolYear": objChangeData["iSchoolYear"] } } });
                break;
        }
    }

    /**
     * @name LoadSelectedStateSchools
     * @param {object} objContext Context Object
     * @summary To set state data after the load is complete.
     */
    LoadSelectedSchoolTeacher(objContext, uSchoolId) {
        let objTeacherParam = {
            "SearchQuery": {
                "must": [
                    //{
                    //    "match": {
                    //        "uSchoolId": uSchoolId
                    //    }
                    //},
                    {
                        "nested": {
                            "path": "t_TestDrive_Member_Teacher_School",
                            "query": {
                                "bool": {
                                    "must": [{
                                        "match": {
                                            "t_TestDrive_Member_Teacher_School.uSchoolId": uSchoolId
                                        }
                                    },
                                    {
                                        "match": {
                                            "t_TestDrive_Member_Teacher_School.cIsDeleted": "N"
                                        }
                                    }]
                                }
                            }
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "vName": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["uTeacherId", "vName", "uSchoolId", "cIsDeleted"]
        }
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_Teacher_Teacher.GetData(objTeacherParam, (objReturnData) => {
            let arrTeacherData = objReturnData[Object.keys(objReturnData)[0]]["Data"];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTeacherData": arrTeacherData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }, true);
    }
}

export default ClassManagementSearch_ModuleProcessor;