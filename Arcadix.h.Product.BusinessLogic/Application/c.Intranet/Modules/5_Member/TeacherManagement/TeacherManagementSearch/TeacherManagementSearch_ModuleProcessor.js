//Objects required for module.
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name TeacherManagementSearch_ModuleProcessor
* @summary Class for Test module display.
*/
class TeacherManagementSearch_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
                objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [event.target.id]: cIsYorN, "uSchoolId": -1 }, "intSelectedSchoolId": -1 } });
            }
            else {
                cIsYorN = event.target.checked ? null : "";
                objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [event.target.id]: cIsYorN } } });
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
                objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, "iStateId": objChangeData["iStateId"], "uSchoolId": -1 }, "strStateId": objChangeData["iStateId"]  } });
                break;
            case "school":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, "uSchoolId": objChangeData["uSchoolId"], "vSchoolName": objChangeData["vSchoolName"] } } });
                break;           
        }
    }
}

export default TeacherManagementSearch_ModuleProcessor;