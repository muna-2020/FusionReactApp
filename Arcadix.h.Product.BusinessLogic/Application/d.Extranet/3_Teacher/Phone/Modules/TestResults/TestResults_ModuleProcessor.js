//Base class imports
import TestResults_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResults_ModuleProcessor';

/**
 * @name TestResults_ModuleProcessor
 * @summary module processor for Test results.
 * */
class TestResults_ModuleProcessor extends TestResults_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/TestResults/TestResults.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestResults/TestResultsPopup/AllPdfTest/AllPdfTest.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestResults/TestResultsPopup/MoveResults/MoveResults.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/WeekDisplay/WeekDisplay.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestSystem/LearningTestSystemPopups/LearningTestSettings/LearningTestSettings.css" // LearningTestSettings  popup is used
        ];
    }

    SetSelectedHeaderTest(objContext, objTest) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedHeaderTest": objTest } });
    }

}

export default TestResults_ModuleProcessor;