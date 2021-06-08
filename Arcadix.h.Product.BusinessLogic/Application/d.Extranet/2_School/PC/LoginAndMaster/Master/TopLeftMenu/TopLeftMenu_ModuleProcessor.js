//Base class imports
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';


/**
 * @name TopLeftMenu_ModuleProcessor
 * @summary module processor for Top left menu.
 * */
class TopLeftMenu_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name GetUserName
     * @summary returns the User name based admin
     * @param {any} objContext
     */
    GetUserName(objContext) {
        let strUserName = "";
        if (objContext.props.ClientUserDetails) {
            strUserName = objContext.props.ClientUserDetails.UserName;
            if (objContext.props.ClientUserDetails.ApplicationTypeId == "1") {
                strUserName += objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y" ? " (" + objContext.props.TextResource["Admin"] + ")" : ''
            }
        }
        return strUserName;
    }

    /**
     * @name UpdateState
     * @summary updates the state by data sent in parameters.
     * @param {any} objContext
     * @param {any} blnToggler
     * @param {any} strListClass
     * @param {any} strActiveClass
     */
    UpdateState(objContext, blnToggler, strListClass, strActiveClass) {
        objContext.dispatch({ type: 'SET_STATE', payload: { blnToggler: blnToggler, classTrigger: strListClass, classActive: strActiveClass } });
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/LoginAndMaster/Master/TopLeftMenu/TopLeftMenu.css"
        ];
    }
}

export default TopLeftMenu_ModuleProcessor