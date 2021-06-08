
//Module specific imports
import Extranet_Teacher_TeacherLearningTest_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTest_Module'

/**
 * @name LearningTestPreview_ModuleProcessor
 * @summary module processor for  learning test creation.
 * */
class LearningTestPreview_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Intranet_Task_TaskDifficultyLevel", "Object_Extranet_Teacher_SchoolYear"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {
        let arrDataRequest = [];
        // test preview link
        let objTestPreviewLinkParams = {
            "uTestId": props.Data.TestId
        };

        Extranet_Teacher_TeacherLearningTest_Module.GetTestPreviewLink(objTestPreviewLinkParams)

        return arrDataRequest;
    };

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }

}

export default LearningTestPreview_ModuleProcessor 
