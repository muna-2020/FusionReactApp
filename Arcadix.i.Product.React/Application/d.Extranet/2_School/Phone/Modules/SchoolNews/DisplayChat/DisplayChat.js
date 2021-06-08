//React related imports
import React from 'react';

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
    * @param {String} strImagePath Image path
    * @summary returns the attachment elements of message.
    * @returns {Array} JSX of News Attachments
    */
    const GetAttachment = (arrNewsAttachment, strImagePath) => {
        var arrAttachmentDiv = [];
        arrNewsAttachment.map(objAttachment => {
            arrAttachmentDiv.push(
                <label className="attached-file">
                    <a href={JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objAttachment.uNewsAttachmentId + "." + objAttachment.vFileType + "&Type=News&DisplayFileName=" + objAttachment.vAttachmentFileName} >
                        <img src={strImagePath + "/attachment.png"} alt="" />
                        <input type="file" name="" id="" />
                        <span className="attached-file-name">{objAttachment.vAttachmentFileName}</span>
                    </a>
                </label>
            );
        });
        return arrAttachmentDiv;
    };

    /**
    * @name GetMessage
    * @param {object} objContext Context object
    * @param {Array} arrNews News data
    * @param {String} strImagePath Image path
    * @summary returns the array of message.
    * @returns {Array} Messages JSX
    */
    const GetMessage = (objContext, arrNews, strImagePath) => {
        var arrMessageDiv = [];
        arrNews.map(objNews => {
            arrMessageDiv.push(
                <div className="chat-baloon sent">
                    <span className="time">
                        {objContext.SchoolNews_ModuleProcessor.GetIsAttachmentCreatedToday(objNews.dtCreatedOn) && "Heute"} {Localization.GetFormattedDate(objNews.dtCreatedOn)}
                    </span>
                    <div className="checkbox-chat-baloon-flex">
                        <div className="check-list">
                            <input type="checkbox" id="name2" />
                            <label className="checkmark" />
                        </div>
                        <div className="baloon-flex">
                            <div className="icons">
                                <img
                                    onClick={(event) => { objContext.SchoolNews_ModuleProcessor.OpenDeleteConfirmationPopup(objContext, objNews); }} //objContext.SchoolNews_ModuleProcessor.OpenDeleteConfirmationPopup(objContext, objNews);
                                    id={objNews.uNewsId}
                                    src={strImagePath + "/cross_small.png"}
                                />
                            </div>
                            <div className="baloon">
                                <p>
                                    {objNews.vText}
                                </p>
                                {GetAttachment(objNews.t_LearnCoacher_News_Attachment, strImagePath)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return arrMessageDiv;
    };

    /**
    * @name GetNewsOrEmptyMessage
    * @summary returns the messages or no messages text.
    * @param {object} objContext Context object
    * @param {Array} arrNews News Data
    * @param {object} objTextResource Text Resource
    * @param {String} strImagePath Image path
    * @return {object} Returns JSX of either The messages or No message text
    */
    let GetNewsOrEmptyMessage = (objContext, arrNews, objTextResource, strImagePath) => {
        if (arrNews && arrNews.length > 0) {
            let arrMessages = GetMessage(objContext, arrNews, strImagePath);
            if (arrMessages.length > 0)
                return arrMessages;
            else
                return <span>{Localization.TextFormatter(objTextResource, 'NoMessagesText')}</span>;
        } else {
            return <span>{Localization.TextFormatter(objTextResource, 'NoMessagesText')}</span>;
        }
    };

    /**
    * @name GetMessageTextArea
    * @param {object} objContext Context object
    * @param {object} objTextResource Text Resource
    * @summary returns Chat message text area and file upload
    * @return {object} Returns JSX of text area
    */
    let GetMessageTextArea = (objContext, objTextResource) => {
        let domFileUploadRef = props.Ref;
        return (
            <div className="chat-controls" id="chatBoxFooter">
                <div className="chat-controls-bg">
                    <textarea
                        id="TextAreaMessageInput"
                        className="send-message"
                        placeholder={Localization.TextFormatter(objTextResource, 'write_a_message')}
                        value={props.Messagetext}
                        onChange={() => { objContext.SchoolNews_ModuleProcessor.MessageTextChangeHandler(objContext, event.target.value); }}
                    />
                    <div ref={domFileUploadRef} className="control-flex">
                        <FileUpload
                            Id="FileUpload_SchoolNews"
                            ref={domFileUploadRef}
                            Resource={objContext.SchoolNews_ModuleProcessor.GetResourceData(objTextResource)}
                            Meta={objContext.SchoolNews_ModuleProcessor.GetMetaData()}
                            CallBacks={{ OnUploadComplete: (eventFile, arrFilteredFiles) => { window.dispatchEvent(new Event('resize')); } }}
                            ParentProps={{ ...props, JConfiguration }}
                            Data={{
                                Reload: props.Reload,
                                FileUpload: []
                            }}
                        />
                        <button
                            className="send button brown-button"
                            onClick={() => {
                                if (props.Messagetext !== "") {
                                    let arrFiles = domFileUploadRef.current.GetUploadedFileDetails ? domFileUploadRef.current.GetUploadedFileDetails() : '[]';
                                    objContext.SchoolNews_ModuleProcessor.SendMessage(objContext, arrFiles);
                                }

                                else
                                    document.getElementById("TextAreaMessageInput").focus();
                            }}
                        >
                            {Localization.TextFormatter(objTextResource, 'send')}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const GetContent = () => {
        let strImagePath = JConfiguration.ExtranetSkinPath + "/Images/Common/Icons";
        let objContext = props.objContext;
        let objTextResource = props.TextResource;
        let arrNews = props.NewsData;
        let objSchoolYearPeriodData = props.SchoolYearPeriod;
        return (
            <div className="news-chatbox">
                {/* <div className="no-message-selected">
                    Keine Nachrichten ausgewählt
                </div> */}
                <div className="chat-head-padd padding-top-20" id="chatBoxHeader">
                    <div className="chat-recipient">
                        <div className="recipient-left">
                            <img
                                src={JConfiguration.ExtranetSkinPath +
                                    "/Images/Common/Icons/" + (props.TeacherOrPupil === "teacher" ? "AlleLehrpersonen_new.svg" : "AlleLernenden.svg")}
                                alt=""
                            />
                            <span>{props.TeacherOrPupil === "teacher" ? Localization.TextFormatter(objTextResource, 'all_teacher') : Localization.TextFormatter(objTextResource, 'all_student')}</span>
                        </div>
                        <div className="news-control">
                            <img
                                src={strImagePath + "/Edit_Group.svg"}
                            />
                            <img
                                src={strImagePath + "/delete_white.svg"}
                            />
                        </div>
                    </div>
                </div>

                <div className="chat-box">
                    <div className="chat-padding" id="chatBoxParent">
                        {/*Chat Message*/}
                        <div className="chat-log">
                            {GetNewsOrEmptyMessage(objContext, arrNews, objTextResource, strImagePath)}
                        </div>

                        {/*FileUpload*/}
                        {objSchoolYearPeriodData && objSchoolYearPeriodData["iDisplayOrder"] == 1 ?
                            GetMessageTextArea(objContext, objTextResource) : <React.Fragment />
                        }
                    </div>
                </div>
            </div>
        );
    };
    
    return GetContent();
};

export default DisplayChat;