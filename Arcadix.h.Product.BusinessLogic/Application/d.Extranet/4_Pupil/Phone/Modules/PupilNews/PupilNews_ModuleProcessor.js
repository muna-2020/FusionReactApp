//Base class imports
import PupilNews_ModuleProcessor_Browser from "@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews_ModuleProcessor";

/**
 * @name PupilNews_ModuleProcessor.
 * @summary business layer for schoolnews.
 * */
class PupilNews_ModuleProcessor extends PupilNews_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/SchoolNews/SchoolNews.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilNews/PupilNews.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilNews/PupilAddContactPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilNews/PupilShareNewsPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css"
        ];
    }

    /**
    * @name GetSelectedMessages
    * @summary updates the chat type, selected chatType Id and forwardMesaageList as empty  to state
    * @param {any} objContext
    * @param {any} strType
    * @param {any} strSelectedId
    */
    GetSelectedMessages(objContext, strType, strSelectedId) {
        objContext.dispatch({ type: "SET_STATE", payload: { strType: strType, strSelectedId: strSelectedId, arrForwardMessagesId: [], strMessagetext: "", blnFileReload: true, blnShowChat: true } });
    }

    /**
   * @name GetGroupLastMessage
   * @summary returns the last message sent from group
   * @param {any} strTeacherId
   */
    GetGroupLastMessage(strGroupId, arrAllGroupNews) {
        var objLastMessage = arrAllGroupNews.filter(item => {
            return (item.t_LearnCoacher_News_ToUser.find(usr => usr.uGroupId === strGroupId));
        }).sort((a, b) => new Date(b.dtCreatedOn) - new Date(a.dtCreatedOn))[0];
        return objLastMessage;
    };

    /**
   * @name GetPupilLastMessage
   * @summary returns the last message sent from pupil
   * @param {any} strTeacherId
   */
    GetPupilLastMessage(strPupilId, arrAllNewsData){
        var objLastMessage = {};
        if (arrAllNewsData) {
            var objLastMessage = arrAllNewsData.filter(item => {
                return item.uUserId === strPupilId || (item.t_LearnCoacher_News_ToUser.find(usr => usr.uUserId === strPupilId));
            }).sort((a, b) => new Date(b.dtCreatedOn) - new Date(a.dtCreatedOn))[0];
        }
        return objLastMessage;
    };    
}

export default PupilNews_ModuleProcessor;