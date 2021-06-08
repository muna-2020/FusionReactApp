import LearningTestTeacher_ModuleProcessor_Browser from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacher_ModuleProcessor';

/**
 * @name LearningTestTeacher_ModuleProcessor
 * @summary module processor for  Learning Test Teacher results.
 * */
class LearningTestTeacher_ModuleProcessor extends LearningTestTeacher_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/LearningTestTeacher/LearningTestTeacher.css"
        ];
    }

    SetTestToShow(objContext, strTestId) {
        if(objContext.state.strSelectedTestToShow == strTestId)
            objContext.dispatch({ type: "SET_STATE", payload: { "strSelectedTestToShow": "00000000-0000-0000-0000-000000000000" } });
        else
            objContext.dispatch({ type: "SET_STATE", payload: { "strSelectedTestToShow": strTestId } });
    }
}

export default LearningTestTeacher_ModuleProcessor;