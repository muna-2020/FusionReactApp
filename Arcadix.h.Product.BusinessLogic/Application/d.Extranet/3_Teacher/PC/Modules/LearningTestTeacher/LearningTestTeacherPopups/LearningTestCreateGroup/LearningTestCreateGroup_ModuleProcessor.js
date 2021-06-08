//Module specific imports
import Object_Extranet_Teacher_LearningTestPupilGroup from '@shared/Object/d.Extranet/3_Teacher/LearningTestPupilGroup/LearningTestPupilGroup'

/**
 * @name LearningTestCreateGroup_ModuleProcessor
 * @summary module processor for  learnign Test pupil create group.
 * */
class LearningTestCreateGroup_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
    * @name GetSaveData
    * @param {*} objContext 
    * @summary   Forms and Returns the data to save.
    */
    GetSaveData(objContext) {
        let arrPupilIds = objContext.props.Data.SelectedPupilIds.map(strTempId => {
            return {
                "uPupilId": strTempId
            };
        });
        let strUserId = objContext.props.Data.ClientUserDetails.UserId;
        let objAddData = {
            "uUserId": strUserId,
            "uClassId": objContext.props.Data.SelectedClass["uClassId"],
            "t_TestDrive_LearningTest_PupilGroup_Data": [
                {
                    "iLanguageId": parseInt(objContext.props.JConfiguration.InterfaceLanguageId),
                    "vPupilGroupName": objContext.state.strGroupName
                }
            ],
            "t_TestDrive_LearningTest_PupilGroup_Pupils": arrPupilIds
        };
        return objAddData;
    };

    /**
    * @name GetDynamicStyles
    * @summary Css files specific to this module
    * @param {any} props
    * @returns {Array}
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/LearningTestTeacher/LearningTestTeacherPopups/LearningTestCreateGroup/LearningTestCreateGroup.css"
        ];
    };

    /**
    * @name LoadInitialData 
    * @param {object} objContext context object
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
        return [];
    }

    /**
     * @name SavePupilGroup
     * @param {*} objContext 
     * @summary   Makes an API call and saves the data to DB.
     */
    SavePupilGroup(objContext) {
        let strGroupName = objContext.state.strGroupName ? objContext.state.strGroupName.trim() : "";
        if (strGroupName !== "") {
            let objAddData = this.GetSaveData(objContext);
            let strUserId = objContext.props.Data.ClientUserDetails.UserId;
            let objParams = {
                "ForeignKeyFilter": {
                    "uUserId": strUserId
                },
                "vAddData": objAddData
            };

            Object_Extranet_Teacher_LearningTestPupilGroup.AddData(objParams, () => {
                Popup.ClosePopup(objContext.props.Id)
            });
        }
    };

    /**
     * @name GetFillHeightMeta
     * @summary returns the fill height meta.
     * */
    GetFillHeightMeta() {
        return {
            HeaderIds: ["LearningTestGroupCreationHeader"],
            FooterIds: ["LearningTestCreategroupFooter"]
        }
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

    /**
     * @name OnChangeGroupNameInput
     * @param {*} objContext 
     * @param {*} strValue 
     * @summary   Trigerred when the TestName is entered.
     */
    OnChangeGroupNameInput(objContext, strValue) {
        objContext.dispatch({ type: "SET_STATE", payload: { "strGroupName": strValue } });
    };
}

export default LearningTestCreateGroup_ModuleProcessor