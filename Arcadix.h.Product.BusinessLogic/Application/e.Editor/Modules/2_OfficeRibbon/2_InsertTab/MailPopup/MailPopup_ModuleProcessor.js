//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
* @name MailPopup_ModuleProcessor
* @param NA
* @summary Class for Clipart module display.
* @return NA
*/
class MailPopup_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetDynamicStyles
     * @param {object} props
     * @summary returns the styles.
     * @returns {Array} Array of style list.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/2_OfficeRibbon/2_Insert/MailPopup/MailPopup.css"];
    }

    /**
     * @name ValidateEmail
     * @param {object} objContext passes Context object
     * @param {string} strEmail
     * @summary this validate the email.
     * @returns {boolean} true if email is valid else false.
     */
    ValidateEmail(objContext, strEmail) {
        let isValid = false;
        if (strEmail && strEmail != null) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(String(strEmail).toLowerCase());
        }
        objContext.setState({
            ...objContext.state,
            "isValidEmail": isValid,
            "inputStarted" : true
        });
    }

    /**
     * @name OnOkClick
     * @summary Ok Click event.
     */
    OnOkClick(objContext) {
        if (objContext.state.isValidEmail) {
            if (objContext.props.Data.objTargetMail) {
                objContext.props.CallBacks.InsertMail(objContext.refEmail.current.value, objContext.props.Data.objTargetMail);
            } else {
                objContext.props.CallBacks.InsertMail(objContext.refEmail.current.value);
            }
            editorPopup.ClosePopup(objContext.props.Id);
        }else{
            objContext.setState({
                ...objContext.state,
                "inputStarted" : true
            });
        }
    }
}

export default MailPopup_ModuleProcessor; 