//Base class imports
import CoTeacherAndSubjectExpert_ModuleProcessor_Browser from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert_ModuleProcessor";

/**
* @name CoTeacherAndSubjectExpert_ModuleProcessor
* @summary Class for CoTeacherAndSubjectExpert module display and manipulate.
*/
class CoTeacherAndSubjectExpert_ModuleProcessor extends CoTeacherAndSubjectExpert_ModuleProcessor_Browser {

    /**
     * @name GetDynamicStyles
     * @param {*} props props
     * @summary Gets dynamic styles for the component.
     * @returns {*} array
     */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert.css",
           // JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/MultiSelectDropDown/MultiSelectDropDown.css"
        ];
    };

    UpdateCoTeacherAndSubjectExpertDisplay(objContext, blnClassTimeVisible, blnSubjectTimeVisible, blnRemoveHeight) {
        objContext.dispatch({ type: "SET_STATE", payload: { 
            "blnClassTimeVisible": blnClassTimeVisible, 
            "blnSubjectTimeVisible": blnSubjectTimeVisible,
            "blnRemoveHeight": blnRemoveHeight 
        } });
    }

}

export default CoTeacherAndSubjectExpert_ModuleProcessor;