//Objects required for module.
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';

//Module Related Files.
import * as AddCycleSchool_MetaData from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleSchool/AddCycleSchool/AddCycleSchool_MetaData';


/**
* @name AddCycleSchool_ModuleProcessor
* @param NA
* @summary Class forAddCycleSchool popup.
* @return NA
*/
class AddCycleSchool_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
                objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedState": objChangeData, "objSelectedSchool": {}  ,"arrSchoolData": []} });
                strId = "iStateId";
                strValue = objChangeData["iStateId"];
                break;
            case "school":
                objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedSchool": objChangeData } });
                strId = "uSchoolId";
                strValue = objChangeData["uSchoolId"];
                break;
        }
        if (objContext.state.blnIsAddClicked) {
            FieldValidator.ValidateClientSide(AddCycleSchool_MetaData.GetAddCycleSchoolMetaData(), objContext.props.Resource.Text, { [strId]: strValue }, strId, false)
        }
    }

    /**
     * @name SetSelectedSchool
     * @param {object} objContext objChangeData
     * @summary Handles validation and Sets the selected state and school on click of Add.
     */
    SetSelectedSchool(objContext) {
        let objData = {
            "iStateId": objContext.state.objSelectedState["iStateId"] ? objContext.state.objSelectedState["iStateId"] : -1,
            "uSchoolId": objContext.state.objSelectedSchool["uSchoolId"] ? objContext.state.objSelectedSchool["uSchoolId"] : -1           
        }
        let objValidationObject = this.Validate(objContext, objData);
        if (!objValidationObject) {
            objContext.props.Events.SetSelectedSchool(objContext.state.objSelectedState, objContext.state.objSelectedSchool);
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
        let objNewValidationObject = FieldValidator.ValidateClientSide(AddCycleSchool_MetaData.GetAddCycleSchoolMetaData(), objContext.props.Resource.Text, objData, "", true);
        //objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
    }
}

export default AddCycleSchool_ModuleProcessor;