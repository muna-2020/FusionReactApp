//Base class imports
import TestLogins_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLogins_ModuleProcessor';

/**
 * @name TestLogins_ModuleProcessor
 * @summary module processor for Test logins.
 * */
class TestLogins_ModuleProcessor extends TestLogins_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        if (this.blnIsOrientationTest) {
            return [
                props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/TestLogins/TestLogins.css",
                // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestLogins/TestLoginsPopups/AllPdfTest/AllPdfTest.css",
                // props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/WeekDisplay/WeekDisplay.css",
                // JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css"
            ];
        } else {
            return [
                props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/TestLogins/TestLogins.css",
                //props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/HighStakeTestLogins/HighStakeTestLogins.css",
                // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestLogins/TestLoginsPopups/AllPdfTest/AllPdfTest.css",
                // JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css"
            ];
        }
    }

    SetSelectedHeaderTest(objContext, objTest) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedHeaderTest": objTest } });
    }
}

export default TestLogins_ModuleProcessor