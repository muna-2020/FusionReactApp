/**
* @name SelectTeacherSchool_ModuleProcessor
* @summary Class for SelectTeacherSchool module popup.
*/
class SelectTeacherSchool_ModuleProcessor extends IntranetBase_ModuleProcessor {

    HandleCheckBoxClick(blnChecked, strSchoolId, objContext) {
        let arrNewSelectedSchools = [];
        if (objContext.props.Meta.InputType == "Radio") {
            arrNewSelectedSchools = [{ "uSchoolId": strSchoolId }];
        }
        else {
            arrNewSelectedSchools = blnChecked ? [...objContext.state.arrSelectedSchools, { "uSchoolId": strSchoolId }] : objContext.state.arrSelectedSchools.filter(objTemp => objTemp["uSchoolId"] != strSchoolId);
        }
        objContext.dispatch({ type: "SET_STATE", payload: { arrSelectedSchools: arrNewSelectedSchools} });
    }   
}

export default SelectTeacherSchool_ModuleProcessor;