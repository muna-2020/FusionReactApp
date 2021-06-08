//Base class imports
import LearningTestSystem_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystem_ModuleProcessor';

/**
* @name LearningTestSystem_ModuleProcessor
* @summary Class for LearningTestSystem_ModuleProcessor module display and manipulate.
*/
class LearningTestSystem_ModuleProcessor extends LearningTestSystem_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
     GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/LearningTestSystem/LearningTestSystem.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestSystem/LearningTestSystemPopups/TestStatistics/TestStatistics.css",
            // props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestSystem/LearningTestSystemPopups/LearningTestSettings/LearningTestSettings.css"
        ];
    }

    SetTestToShow(objContext, objTest) {
        if(objContext.state.objSelectedTestToShow["uTestId"] == objTest["uTestId"])
            objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedTestToShow": {uTestId: "00000000-0000-0000-0000-000000000000"} } });
        else
            objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedTestToShow": objTest } });

    }

}

export default LearningTestSystem_ModuleProcessor;