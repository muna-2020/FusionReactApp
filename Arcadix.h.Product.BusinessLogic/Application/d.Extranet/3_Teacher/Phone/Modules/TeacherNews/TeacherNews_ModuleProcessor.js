//Base class imports
import TeacherNews_ModuleProcessor_Browser from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNews_ModuleProcessor";

/**
 * @name TeacherNews_ModuleProcessor.
 * @summary business layer for news.
 * */
class TeacherNews_ModuleProcessor extends TeacherNews_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/Phone/Modules/TeacherNews/TeacherNews.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherNews/TeacherAddContactPopup/AddContactPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherNews/TeacherShareNewsPopup/TeacherShareNewsPopup.css"
        ];
    }

    /**
    * @name GetPupilLastMessage
    * @summary returns the last message sent from pupil
    * @param {String} strPupilId Pupil Id
    * @param {Array} arrAllNewsData All the news data
    * @returns {object} Last message
    */
    GetPupilLastMessage(strPupilId, arrAllNewsData) {
        var objLastMessage = {};
        if (arrAllNewsData) {
            var objLastMessage = arrAllNewsData.filter(item => {
                return item.uUserId === strPupilId || (item.t_LearnCoacher_News_ToUser.find(usr => usr.uUserId === strPupilId));
            }).sort((a, b) => new Date(b.dtCreatedOn) - new Date(a.dtCreatedOn))[0];
        }
        return objLastMessage;
    }

    /**
    * @name GetGroupLastMessage
    * @summary returns the last message sent from group
    * @param {String} strGroupId Group Id
    * @param {Array} arrAllGroupNews All the news group data
    * @returns {object} Last message
    */
    GetGroupLastMessage(strGroupId, arrAllGroupNews) {
        var objLastMessage = arrAllGroupNews.filter(item => {
            return (item.t_LearnCoacher_News_ToUser.find(usr => usr.uGroupId === strGroupId));
        }).sort((a, b) => new Date(b.dtCreatedOn) - new Date(a.dtCreatedOn))[0];
        return objLastMessage;
    }

    /**
    * @name GetSelectedMessages
    * @summary updates the chat type, selected chatType Id and forwardMesaageList as empty  to state
    * @param {object} objContext Context object
    * @param {String} strType Type 
    * @param {String} strSelectedId Selected Id
    */
    GetSelectedMessages(objContext, strType, strSelectedId) {
        objContext.dispatch({ type: "SET_STATE", payload: { strType: strType, strSelectedId: strSelectedId, arrForwardMessagesId: [], strMessagetext: "", blnFileReload: true, blnShowChat: true } });
    }
}

export default TeacherNews_ModuleProcessor;