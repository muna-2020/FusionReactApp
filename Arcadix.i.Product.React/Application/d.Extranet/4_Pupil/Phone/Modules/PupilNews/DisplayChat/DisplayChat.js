//React related imports
import React from 'react';

//common functionality imports.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

//Components used in module.
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

/**
 * @name DisplayChat
 * @param {any} props props
 * @summary Consists of E-mail id field and password field
 * @returns {object} React.Fragement that encapsulated div.
 */
const DisplayChat = (props) => {

    /**
    * @name GetAttachment
    * @param {Array} arrNewsAttachment All the news attachment from the sub table of News data
    * @summary returns the attachment elements of message.
    * @returns {Array} JSX of News Attachments
    */
    const GetAttachment = (arrNewsAttachment) => {
        var arrAttachmentDiv = [];
        arrNewsAttachment.map(objAttachment => {
            arrAttachmentDiv.push(
                <label className="attached-file">
                    <a href={JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objAttachment.uNewsAttachmentId + "." + objAttachment.vFileType + "&Type=News&DisplayFileName=" + objAttachment.vAttachmentFileName} >
                        <img src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/attachmentBrown.png"} alt="" />
                        <span className="attached-file-name">{objAttachment.vAttachmentFileName}</span>
                    </a>
                </label>
            );
        });
        return arrAttachmentDiv;
    };

    /**
    * @name GetSchoolMessages
    * @param {object} objContext Context object
    * @param {Array} arrSchoolNews School News Data
    * @summary returns the messages sent by school.
    * @returns {Array} jsx, Div
    */
    const GetSchoolMessages = (objContext, arrSchoolNews) => {
        let arrNewsFiltered = arrSchoolNews.filter(objNews => objNews.cIsSchool === "Y");
        let arrNewsSorted = arrNewsFiltered.sort((a, b) => new Date(a.dtCreatedOn) - new Date(b.dtCreatedOn));
        let DivSchoolNews = [];
        arrNewsSorted.map(objSchoolNews => {
            var DivSingleMessage = <div className="chat-baloon received">
                <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objSchoolNews.dtCreatedOn)}</span>
                <div className="baloon-flex">
                    <div className="baloon">
                        <p>
                            {objSchoolNews.vText}
                        </p>
                        {GetAttachment(objSchoolNews.t_LearnCoacher_News_Attachment)}
                    </div>
                </div>
            </div>;
            DivSchoolNews = [...DivSchoolNews, DivSingleMessage];
        });
        return DivSchoolNews;
    };

    /**
    * @name GetAuthor
    * @param {object} objContext Context object
    * @param {object} objNews News
    * @summary returns the owner of the message
    * @returns {string} Author
    */
    const GetAuthor = (objContext, objNews) => {
        let objTextResource = props.TextResource;
        var strAuthor = "";
        let objClassPupil = objContext.PupilNews_ModuleProcessor.GetPupilClass({ ...props, ClientUserDetails });
        let arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + props.objSelectedClass.uClassId)["Data"];
        let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objClassPupil.uSchoolId)["Data"];
        let arrNewsData = DataRef(objContext.props.Extranet_Pupil_PupilNews_Module, "Extranet_Pupil_PupilNews_Module;uClassId;" + props.objSelectedClass.uClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N")["Data"];
        if (objNews.uOriginalNewsItemId !== "00000000-0000-0000-0000-000000000000") {
            var allUserData = [...arrTeacherData, ...arrPupilData];
            var objOriginalNews = arrNewsData.find(item => { return item.uNewsId === objNews.uOriginalNewsItemId });
            var objAuthor;
            if (objOriginalNews.cIsTeacher === "Y") {
                objAuthor = allUserData.find(item => { return item.uTeacherId === objOriginalNews.uUserId });
            }
            else if (objOriginalNews.cIsPupil === "Y") {
                objAuthor = allUserData.find(item => { return item.uPupilId === objOriginalNews.uUserId });
            }
            strAuthor = Localization.TextFormatter(objTextResource, 'author') + ": " + objAuthor.vFirstName + " " + objAuthor.vName;
        }
        return strAuthor;
    };

    /**
    * @name GetAttachMent
    * @param {any} props
    * @param {any} arrNewsAttachment
    * @summary returns the file elements of news
    * @returns {Array}
    */
    const GetAttachMent = (props, arrNewsAttachment) => {
        var AttachmentDiv = [];
        arrNewsAttachment.map(objAttachment => {
            AttachmentDiv.push(
                <label className="attached-file">
                    <a href={props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objAttachment.uNewsAttachmentId + "." + objAttachment.vFileType + "&Type=News&DisplayFileName=" + objAttachment.vAttachmentFileName} >
                        <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/attachmentBrown.png"} alt="" />
                        <span className="attached-file-name">{objAttachment.vAttachmentFileName}</span>
                    </a>
                </label>
            );
        })
        return AttachmentDiv;
    }


    /**
    * @name GetPupilMessages
    * @param {object} objContext Context object
    * @param {Array} arrAllNewsData All News Data
    * @param {object} objTextResource Text Resource
    * @summary returns the pupil messages
    * @returns {Array} jsx, Div
    */
    const GetPupilMessages = (objContext, arrAllNewsData, objTextResource) => {
        var DivPupilNews = [];
        console.log(ClientUserDetails.UserId, props.strSelectedId)
        var arrSelectedPupilNews = arrAllNewsData.filter(item => {
            return item.uUserId === props.strSelectedId || (item.t_LearnCoacher_News_ToUser.find(usr => usr.uUserId === props.strSelectedId));
        }).sort((a, b) => new Date(a.dtCreatedOn) - new Date(b.dtCreatedOn));

        arrSelectedPupilNews.map((objPupilNews, i) => {
            var SingleDiv = [];
            var blnShowCheckBox = props.arrForwardMessagesId.length > 0 ? true : false;
            var blnMarked = props.arrForwardMessagesId.indexOf(objPupilNews.uNewsId) !== -1 ? true : false;
            if (objPupilNews.uUserId === props.strSelectedId) {
                SingleDiv = <div className="chat-baloon received">
                    <div className="checkbox-chat-baloon-flex">
                        <div className="timeauthor-flex">
                            <span className="time">{GetAuthor(objContext, objPupilNews)}</span>
                            <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objPupilNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            {blnShowCheckBox ?
                                <div className="check-list">
                                    <input type="checkbox" id={"name" + i} />
                                    <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                        objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objPupilNews.uNewsId)
                                    }} />
                                </div>
                                :
                                <React.Fragment />
                            }
                            <div className="icons">
                                <img
                                    src={
                                        JConfiguration.ExtranetSkinPath +
                                        "/Images/Common/Icons/forwardGrey.svg"
                                    }
                                    onClick={() => {
                                        if (props.arrForwardMessagesId.length === 0) {
                                            objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objPupilNews.uNewsId)
                                        }
                                    }
                                    }
                                    alt=""
                                />
                                <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objPupilNews) }} id={objPupilNews.uNewsId}
                                    src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_smallGrey.png"} alt="" />
                            </div>
                            <div className="baloon">
                                <p>
                                    {objPupilNews.vText}
                                </p>
                                {GetAttachMent(props, objPupilNews.t_LearnCoacher_News_Attachment)}
                            </div>
                        </div>
                    </div>
                </div>
            }
            else if (objPupilNews.uUserId === ClientUserDetails.UserId) {
                SingleDiv = <div className="chat-baloon sent">
                    <div className="timeauthor-flex">
                        <span className="time">{GetAuthor(objContext, objPupilNews)}</span>
                        <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objPupilNews.dtCreatedOn)}</span>
                    </div>
                    <div className="checkbox-chat-baloon-flex">
                        <div className="baloon-flex">
                            {blnShowCheckBox ?
                                <div className="check-list">
                                    <input type="checkbox" id={"name" + i} />
                                    <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                        objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objPupilNews.uNewsId)
                                    }} />
                                </div>
                                :
                                <React.Fragment />
                            }
                            <div className="icons">
                                <img
                                    src={
                                        JConfiguration.ExtranetSkinPath +
                                        "/Images/Common/Icons/forward.png"
                                    }
                                    onClick={() => {
                                        if (props.arrForwardMessagesId.length === 0) {
                                            objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objPupilNews.uNewsId)
                                        }
                                    }
                                    }
                                    alt=""
                                />
                                <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objPupilNews) }} id={objPupilNews.uNewsId} src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_small.png"} alt="" />
                            </div>
                            <div className="baloon">
                                <p>
                                    {objPupilNews.vText}
                                </p>
                                {GetAttachMent(props, objPupilNews.t_LearnCoacher_News_Attachment)}
                            </div>
                        </div>
                    </div>
                </div>

            }
            DivPupilNews = [...DivPupilNews, SingleDiv];
        })
        return DivPupilNews;
    };

    /**
    * @name GetTeacherMessages
    * @param {object} objContext Context object
    * @param {Array} arrAllNewsData All News Data
    * @param {object} objTextResource Text Resource
    * @summary returns the teacher messages
    * @returns {Array} jsx, Div
    */
    const GetTeacherMessages = (objContext, arrAllNewsData, objTextResource) => {
        var DivCoTeachersNews = [];
        var arrSelectedCoTeacherlNews = arrAllNewsData.filter(item => {
            return item.uUserId === props.strSelectedId || (item.t_LearnCoacher_News_ToUser.find(usr => usr.uUserId === props.strSelectedId));
        }).sort((a, b) => new Date(a.dtCreatedOn) - new Date(b.dtCreatedOn));

        arrSelectedCoTeacherlNews.map((objCoTeacherNews, i) => {
            var SingleDiv = [];
            var blnShowCheckBox = props.arrForwardMessagesId.length > 0 ? true : false;
            var blnMarked = props.arrForwardMessagesId.indexOf(objCoTeacherNews.uNewsId) !== -1 ? true : false;
            if (objCoTeacherNews.uUserId === props.strSelectedId) {
                SingleDiv = <div className="chat-baloon received">
                    <div className="checkbox-chat-baloon-flex">
                        <div className="timeauthor-flex">
                            <span className="time">{GetAuthor(objContext, objCoTeacherNews)}</span>
                            <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objCoTeacherNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            {blnShowCheckBox ?
                                <div className="check-list">
                                    <input type="checkbox" id={"name" + i} />
                                    <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                        objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objCoTeacherNews.uNewsId)
                                    }} />
                                </div>
                                :
                                <React.Fragment />
                            }
                            <div className="icons">
                                <img
                                    src={
                                        JConfiguration.ExtranetSkinPath +
                                        "/Images/Common/Icons/forwardGrey.svg"
                                    }
                                    onClick={() => {
                                        if (props.arrForwardMessagesId.length === 0) {
                                            objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objCoTeacherNews.uNewsId)
                                        }
                                    }
                                    }
                                    alt=""
                                />
                                <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objCoTeacherNews) }} id={objCoTeacherNews.uNewsId} src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_smallGrey.svg"} alt="" />
                            </div>
                            <div className="baloon">
                                <p>
                                    {objCoTeacherNews.vText}
                                </p>
                                {GetAttachMent(props, objCoTeacherNews.t_LearnCoacher_News_Attachment)}
                            </div>
                        </div>
                    </div>
                </div>
            }
            else if (objCoTeacherNews.uUserId === ClientUserDetails.UserId) {
                SingleDiv = <div className="chat-baloon sent">
                    <div className="timeauthor-flex">
                        <span className="time">{GetAuthor(objContext, objCoTeacherNews)}</span>
                        <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objCoTeacherNews.dtCreatedOn)}</span>
                    </div>
                    <div className="checkbox-chat-baloon-flex">
                        <div className="baloon-flex">
                            {blnShowCheckBox ?
                                <div className="check-list">
                                    <input type="checkbox" id={"name" + i} />
                                    <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                        objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objCoTeacherNews.uNewsId)
                                    }} />
                                </div>
                                :
                                <React.Fragment />
                            }
                            <div className="icons">
                                <img
                                    src={
                                        JConfiguration.ExtranetSkinPath +
                                        "/Images/Common/Icons/forward.png"
                                    }
                                    alt=""
                                    onClick={() => {
                                        if (props.arrForwardMessagesId.length === 0) {
                                            objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objCoTeacherNews.uNewsId)
                                        }
                                    }
                                    }

                                />
                                <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objCoTeacherNews) }} id={objCoTeacherNews.uNewsId} src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_small.png"} alt="" />
                            </div>
                            <div className="baloon">
                                <p>
                                    {objCoTeacherNews.vText}
                                </p>
                                {GetAttachMent(props, objCoTeacherNews.t_LearnCoacher_News_Attachment)}
                            </div>
                        </div>
                    </div>
                </div>
            }
            DivCoTeachersNews = [...DivCoTeachersNews, SingleDiv];
        })
        return DivCoTeachersNews;
    };

    /**
    * @name GetGroupMessages
    * @param {object} objContext Context object
    * @param {Array} arrAllNewsData All News Data
    * @param {object} objTextResource Text Resource
    * @summary returns the group messages
    * @returns {Array} jsx, Div
    */
    const GetGroupMessages = (objContext, arrAllNewsData, objTextResource) => {
        var DivGroupNews = [];
        var arrSelectedGroupNews = arrAllNewsData.filter(item => {
            return (item.t_LearnCoacher_News_ToUser.find(usr => usr.uGroupId === props.strSelectedId));
        }).sort((a, b) => new Date(a.dtCreatedOn) - new Date(b.dtCreatedOn));

        arrSelectedGroupNews.map((objGroupNews, i) => {
            var SingleDiv = [];
            var blnShowCheckBox = props.arrForwardMessagesId.length > 0 ? true : false;
            var blnMarked = props.arrForwardMessagesId.indexOf(objGroupNews.uNewsId) !== -1 ? true : false;
            if (objGroupNews.uUserId === ClientUserDetails.UserId) {
                SingleDiv = <div className="chat-baloon received">
                    <div className="checkbox-chat-baloon-flex">
                        <div className="timeauthor-flex">
                            <span className="time">{GetAuthor(objContext, objGroupNews)}</span>
                            <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objGroupNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            {blnShowCheckBox ?
                                <div className="check-list">
                                    <input type="checkbox" id={"name" + i} />
                                    <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                        objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objGroupNews.uNewsId)
                                    }} />
                                </div>
                                :
                                <React.Fragment />
                            }
                            <div className="icons">
                                <img
                                    src={
                                        JConfiguration.ExtranetSkinPath +
                                        "/Images/Common/Icons/forwardGrey.svg"
                                    }
                                    onClick={() => {
                                        if (props.arrForwardMessagesId.length === 0) {
                                            objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objGroupNews.uNewsId)
                                        }
                                    }
                                    }
                                    alt=""
                                />
                                <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objGroupNews) }} id={objGroupNews.uNewsId} src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_smallGrey.svg"} alt="" />
                            </div>
                            <div className="baloon">
                                <p>
                                    {objGroupNews.vText}
                                </p>
                                {GetAttachMent(props, objGroupNews.t_LearnCoacher_News_Attachment)}
                            </div>
                        </div>
                    </div>
                </div>

            }
            else {
                SingleDiv = <div className="chat-baloon sent">
                    <div className="timeauthor-flex">
                        <span className="time">{GetAuthor(objContext, objGroupNews)}</span>
                        <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objGroupNews.dtCreatedOn)}</span>
                    </div>
                    <div className="checkbox-chat-baloon-flex">
                        <div className="baloon-flex">
                            {blnShowCheckBox ?
                                <div className="check-list">
                                    <input type="checkbox" id={"name" + i} />
                                    <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                        objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objGroupNews.uNewsId)
                                    }} />
                                </div>
                                :
                                <React.Fragment />
                            }
                            <div className="icons">
                                <img
                                    src={
                                        JConfiguration.ExtranetSkinPath +
                                        "/Images/Common/Icons/forward.png"
                                    }
                                    alt=""
                                    onClick={() => {
                                        if (props.arrForwardMessagesId.length === 0) {
                                            objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objGroupNews.uNewsId)
                                        }
                                    }
                                    }
                                />
                                <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objGroupNews) }} id={objGroupNews.uNewsId} src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_small.png"} alt="" />
                            </div>
                            <div className="baloon">
                                <p>
                                    {objGroupNews.vText}
                                </p>
                                {GetAttachMent(props, objGroupNews.t_LearnCoacher_News_Attachment)}
                            </div>
                        </div>
                    </div>
                </div>
            }
            DivGroupNews = [...DivGroupNews, SingleDiv];
        })
        return DivGroupNews;
    };

    /**
    * @name GetMessage
    * @param {object} objContext Context object
    * @param {Array} arrNews News data
    * @summary returns the array of message.
    * @returns {Array} Messages JSX
    */
    const GetMessage = (objContext, arrNews) => {
        let objTextResource = props.TextResource;
        var MessagesDiv = [];
        switch (props.strType) {
            case "school":
                MessagesDiv = GetSchoolMessages(objContext, arrNews);
                break;
            case "pupil":
                MessagesDiv = GetPupilMessages(objContext, arrNews, objTextResource);
                break;
            case "mainteacher":
                MessagesDiv = GetTeacherMessages(objContext, arrNews, objTextResource);
                break;
            case "coteacher":
                MessagesDiv = GetTeacherMessages(objContext, arrNews, objTextResource);
                break;
            case "subjectexpert":
                MessagesDiv = GetTeacherMessages(objContext, arrNews, objTextResource);
                break;
            case "group":
                MessagesDiv = GetGroupMessages(objContext, arrNews, objTextResource);
                break;
            default:
                break;
        }
        return MessagesDiv;
    };

    /**
    * @name GetNewsOrEmptyMessage
    * @param {object} objContext Context object
    * @param {Array} arrNewsData News Data
    * @param {object} objTextResource Text Resource
    * @param {String} strImagePath Image path
    * @summary returns the messages or no messages text.
    * @return {object} Returns JSX of either The messages or No message text
    */
    let GetNewsOrEmptyMessage = (objContext, arrNewsData, objTextResource) => {
        if (arrNewsData && arrNewsData.length > 0) {
            let arrMessages = GetMessage(objContext, arrNewsData);
            if (arrMessages.length > 0)
                return arrMessages;
            else
                return <span>{Localization.TextFormatter(objTextResource, 'NoMessagesText')}</span>;
        } else {
            return <span>{Localization.TextFormatter(objTextResource, 'NoMessagesText')}</span>;
        }
    };      

    /**
    * @name GetPupilDisabledDiv
    * @param {object} objTextResource Text Resource
    * @returns {object} jsx, Div
    * @summary returns the disabled div
    */
    let GetPupilDisabledDiv = (objTextResource) => {
        return (
            <div id="chatBoxFooter">
                {Localization.TextFormatter(objTextResource, 'PupilDisabledNotification')}
            </div>
        )
    }

    /**
    * @name GetForwardMessageDiv
    * @param {object} objTextResource Text Resource
    * @return {object} Returns JSX of forward message
    * @summary returns forward message div.
    */
    const GetForwardMessageDiv = (objContext, objTextResource) => {
        var strMessageCount = props.arrForwardMessagesId.length;
        return <div className="chat-controls" id="chatBoxFooter">
            <div className="chat-controls-bg-white">
                <div className="control-flex">
                    <button className="send button" onClick={() => {
                        objContext.PupilNews_ModuleProcessor.OpenForwardMessagePopup(objContext)
                    }}>Weiterleiten</button>
                    {strMessageCount === 1 ?
                        <span>{strMessageCount + " " + Localization.TextFormatter(objTextResource, 'message') + " " + Localization.TextFormatter(objTextResource, 'marked')} </span>
                        :
                        <span>{strMessageCount + " " + Localization.TextFormatter(objTextResource, 'messages') + " " + Localization.TextFormatter(objTextResource, 'marked')}</span>}
                    <button className="send button brown-button" onClick={() => {
                        objContext.PupilNews_ModuleProcessor.AbortForward(objContext);
                    }}>{Localization.TextFormatter(objTextResource, 'abort')} </button>
                </div>
            </div>
        </div>
    }

    /**
    * @name GetMessageTextArea
    * @param {object} objContext Context object
    * @param {object} objTextResource Text Resource
    * @summary returns Chat message text area and file upload
    * @return {object} Returns JSX of text area
    */
    let GetMessageTextArea = (objContext, objTextResource) => {
        let domFileUploadRef = props.Ref;
        setTimeout(function () {
            if (props.FileReload) {
                props.UpdateFileReload();
            }
        }, 500);
        return (
            <div className="chat-controls" id="chatBoxFooter">
                <div className="chat-controls-bg">
                    <textarea
                        id="TextAreaMessageInput"
                        className="send-message"
                        placeholder={Localization.TextFormatter(objTextResource, 'write_a_message')}
                        value={props.Messagetext}
                        onChange={() => { objContext.PupilNews_ModuleProcessor.MessageTextChangeHandler(objContext, event.target.value); }}
                    />
                    <div ref={domFileUploadRef} className="control-flex">
                        <FileUpload
                            ref={domFileUploadRef}
                            Id="FileUpload_PupilNews"
                            Data={{
                                "Reload": props.blnFileReload
                            }}
                            Meta={objContext.PupilNews_ModuleProcessor.GetMetaFileUploadData()}
                            Resource={objContext.PupilNews_ModuleProcessor.GetResourceFileUploadData(objTextResource)}
                            ParentProps={{ JConfiguration: { ...JConfiguration } }}
                        />

                        <div ref={domFileUploadRef} className="send-btn-flex">
                            {props.blnShowEmptyTextValidationMessage && <span className="no-message-alert">{Localization.TextFormatter(objTextResource, 'EmptyTextValidationMessage')}</span>}
                            <button
                                className="send button brown-button"
                                onClick={() => {
                                    if (props.Messagetext !== "") {
                                        let arrFiles = domFileUploadRef.current.GetUploadedFileDetails ? domFileUploadRef.current.GetUploadedFileDetails() : '[]';
                                        objContext.PupilNews_ModuleProcessor.SendMessage(objContext, arrFiles);
                                    }
                                    else {
                                        document.getElementById("TextAreaMessageInput").focus();
                                        props.ShowEmptyTextValidationMessage();
                                    }
                                }}
                            >
                                {Localization.TextFormatter(objTextResource, 'send')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    /**
    * @name GetMessageDiv
    * @param {object} objContext Context object
    * @param {object} objTextResource Text Resource
    * @summmary returns the send or forward or pupil disabled notification div based on conditions.
    * @returns {object} jsx, Div
    */
    let GetMessageDiv = (objContext, objTextResource) => {
        if (props.strType == 'school')
            return <div id="chatBoxFooter" />
        if (props.strType == 'pupil') {
            if (props.objSelectedClass["cIsNewsEnabled"] && props.objSelectedClass["cIsNewsEnabled"] == 'N') {
                return props.arrForwardMessagesId.length === 0 ? GetPupilDisabledDiv() : GetForwardMessageDiv(objContext, objTextResource);
            }
        }
        return props.arrForwardMessagesId.length === 0 ? GetMessageTextArea(objContext, objTextResource) : GetForwardMessageDiv(objContext, objTextResource);
    }

    /**
    * @name GetHeader
    * @param {object} objContext Context object
    * @param {object} objTextResource Text Resource
    * @summary gets the header w.r.t type
    * @returns {object} jsx, Div
    */
    const GetHeader = (objContext, objTextResource) => {
        var strImage = "", strDisplayName = "";
        let objClassPupil = objContext.PupilNews_ModuleProcessor.GetPupilClass({ ...props, ClientUserDetails });
        switch (props.strType) {
            case "school":
                strImage = JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/School.svg";
                let objSchool = DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + objClassPupil.uSchoolId)["Data"][0];
                strDisplayName = objSchool.vFirstName + " " + objSchool.vName
                break;
            case "pupil":
                var objSelectedPupil = objContext.PupilNews_ModuleProcessor.GetPupilObject(objContext, props.strSelectedId);
                strImage = JConfiguration.ExtranetSkinPath + (objSelectedPupil.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/profile10.png");
                strDisplayName = objSelectedPupil.vFirstName + " " + objSelectedPupil.vName;
                break;
            case "coteacher":
                strImage = JConfiguration.ExtranetSkinPath + "/Images/Background/ClassTeacher.svg";
                strDisplayName = objContext.PupilNews_ModuleProcessor.GetTeacherName(objContext, props.strSelectedId)
                break;
            case "subjectexpert":
                strImage = JConfiguration.ExtranetSkinPath + "/Images/Background/SubjectExpert.svg";
                strDisplayName = objContext.PupilNews_ModuleProcessor.GetTeacherName(objContext, props.strSelectedId);
                break;
            case "group":
                strImage = JConfiguration.ExtranetSkinPath + "/Images/Background/icon_shared_group_brown.png";
                strDisplayName = objContext.PupilNews_ModuleProcessor.GetGroup(objContext).vGroupName;
                break;
        }

        return <div className="chat-head-padd padding-top-20" id="chatBoxHeader">
            <div className="chat-recipient">
                <div className="recipient-left">
                    <img src={strImage} draggable="false" alt="" />
                    <span>{strDisplayName}</span>
                </div>
                <div className="news-control">
                    {props.strType === "group" ?
                        <React.Fragment>
                            <img src={JConfiguration.ExtranetSkinPath + "/Images/Background/Edit_Group.svg"} onClick={() => { objContext.PupilNews_ModuleProcessor.OpenAddGroupPopup(objContext, "Edit") }} />
                            <img src={JConfiguration.ExtranetSkinPath + "/Images/Background/delete_white.svg"} onClick={() => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Group") }} />
                        </React.Fragment>
                        :
                        <React.Fragment />
                    }
                </div>
            </div>
        </div>
    }

    const GetContent = () => {
        let objContext = props.objContext;
        let objTextResource = props.TextResource;
        let arrNewsData = props.arrNewsData;
        return (
            <div className="news-chatbox">
                {GetHeader(objContext, objTextResource)}

                <div className="chat-box">
                    <div className="chat-padding" id="chatBoxParent">
                        {/*Chat Message*/}
                        <div className="chat-log">
                            {GetNewsOrEmptyMessage(objContext, arrNewsData, objTextResource)}
                        </div>

                        {/*FileUpload*/}
                        {GetMessageDiv(objContext, objTextResource)}
                    </div>
                </div>
            </div>
        );
    };

    return GetContent();
};

export default DisplayChat;