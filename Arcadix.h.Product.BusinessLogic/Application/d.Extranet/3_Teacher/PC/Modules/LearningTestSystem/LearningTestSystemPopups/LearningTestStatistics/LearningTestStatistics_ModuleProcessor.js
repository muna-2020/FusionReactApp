
//Objects required for module.
import Extranet_Pupil_PupilLearningTest from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystemPopups/LearningTestStatistics/LearningTestStatistics_Module';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
* @name LearningTestStatistics_ModuleProcessor
* @summary Class for LearningTestStatistics_ModuleProcessor module display and manipulate.
*/
class LearningTestStatistics_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name InitialDataParams
    * @param {*} objContext objContext
    * @summary Get initials request params for the component.
    */
    LoadInitialTestData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
        let uSchoolId = ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let uTeacherId = ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uTeacherId"];
        let strTestId = objContext.props.Data.objTestData["uTestId"];
        let uPupilId = objContext.props.Data.objPupilData["uPupilId"];
        let iTestUsageId = objContext.props.Data.objTestData["t_TestDrive_Test_TestProperty"][0]["iTestUsageId"];
        let objTestStatisticsParams = {
            "SearchQuery": {},
            objData: {
                uTestId: strTestId,
                uClassId: strClassId,
                uSchoolId: uSchoolId,
                iStateId: iStateId,
                uCycleId: objContext.props.Data.strCycleId,
                uPupilId: uPupilId,
                uTeacherId: uTeacherId,
                iTestUsageId: iTestUsageId
            }
        };

        Extranet_Pupil_PupilLearningTest.PupilLearningTestStatistics(objTestStatisticsParams, (objReturn) => {
            let arrTaskData = DataRef(objReturn.Extranet_Pupil_PupilLearningTestStatistics_Module)["Data"];
            let arrTaskModifiedData = arrTaskData.map(tsk => {
                return {
                    ...tsk,
                    isSelected: false
                };
            });
            objContext.dispatch({ type: 'SET_STATE', payload: { arrTaskData: arrTaskModifiedData, isLoadComplete: true } });
        });
    }

    /**
     * @name OpenTestPopUp
     * @param {any} vTestLink 
     * @summary For open test popup
     */
    OpenTestPopUp(objContext) {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestTeacher", objContext.props);

        Popup.ShowPopup({
            Meta: {
                Height: "98%",
                Width: "98%",
                ShowHeader: false,
                PopupName: "TestPopUp",
                CssClassName: "task-popup"
            },
            Events: {
                OnClickClsoePopUp: (objDeletedTest) => {
                }
            },
            Data: {
                "ClientUserDetails": objContext.props.ClientUserDetails,
                "TestId": strTestId,
                "TextResource": objTextResource,
                "LearningTestSkinId": objContext.props.Data.LearningTestSkinId,
                "SkinName": objContext.props.Data.SkinName
            },
            CallBacks: {
            }
        });
    }

    /**
    * @name ShowTaskImagePopup
    * @param {*} objContext 
    * @param {*} objTaskDetails 
    * @summary   Shows the task image poup when a selected task is clicked.
    */
    ShowTaskImagePopup(objContext, objTaskDetails) {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestSystem", objContext.props);
        Popup.ShowPopup({
            Meta: {
                Height: "50%",
                Width: "50%",
                ShowHeader: false,
                PopupName: "TaskPopup",
                CssClassName: "task-popup"
            },
            Events: {},
            Data: {
                TextResource: objTextResource,
                TaskId: objTaskDetails.iPageId,
                "LearningTestSkinId": objContext.props.Data.LearningTestSkinId,
                "SkinName": objContext.props.Data.SkinName
            },
            CallBacks: {},
            popupClassName: "task-image-parent"
        });
    }

    /**
     * @name GetMetaDataFillheightTestStatistics
     * @param {*} objContext objContext
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
    */
    GetMetaDataFillheightTestStatistics(objContext) {
        return {
            HeaderIds: [[`EditorPopup_Header_Id${objContext.props.Id}`, "TestStatisticsHeader", "TestStatisticsTabsHeader", "ulBlock"]],
            FooterIds: [`EditorPopup_Footer_Id${objContext.props.Id}`, "test-statistics-popup-footer"]
        };
    }

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
export default LearningTestStatistics_ModuleProcessor;