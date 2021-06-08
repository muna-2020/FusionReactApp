//react imports.
import React, { useReducer, useRef, useEffect, forwardRef } from "react";
import { connect } from "react-redux";

//Module specific imports
import * as PupilNews_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews_Hook';
import PupilNews_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews_ModuleProcessor';

//controls
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';

//Inline Images import
import imgAttachmentBrown from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/attachmentBrown.svg?inline';
import imgForwardGrey from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/forwardGrey.svg?inline';
import imgCrossSmallGrey from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/cross_smallGrey.svg?inline';
import imgForward from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/forward.png?inline';
import imgCrossSmall from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/cross_small.png?inline';
import imgSchool from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/School.svg?inline';
import imgSearchSmall from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/search_small.png?inline';
import imgPlusWhite from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/pluswhite.svg?inline';
import imgEditGroup from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/Edit_Group.svg?inline';
import imgDeleteWhite from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/delete_white.svg?inline';
import imgProfile1 from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/profile1.png?inline';
import imgProfile10 from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/profile10.png?inline';

import imgMainTeacher from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/MainTeacher.svg?inline';
import imgClassTeacher from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/ClassTeacher.svg?inline';
import imgSubjectExpert from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/SubjectExpert.svg?inline';
import imgIconSharedGroupBrown from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/icon_shared_group_brown.png?inline';

const PupilNews = props => {

    /**
     * @summary reference of file upload control.
     * */
    const domFileUploadRef = useRef(null);

    const TextAreaMessageInputRef = useRef(null);

    /**
    * @name Reduce Initializer.
    * 
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilNews_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "PupilNews", ["PupilNews_ModuleProcessor"]: new PupilNews_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PupilNews_ModuleProcessor.Initialize(objContext, objContext.PupilNews_ModuleProcessor);

    /**
     * @summary class of the pupil
     * */
    let objClassPupil = objContext.PupilNews_ModuleProcessor.GetPupilClass(props);

    /**
    * @name Resize
    * @summary dispatches the resize event.
    * */
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, [state.strSelectedId]);

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    PupilNews_Hook.Initialize(objContext);

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
                    <a href={props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objAttachment.vFileId + "&Type=News&DisplayFileName=" + objAttachment.vAttachmentFileName} >
                        <img src={imgAttachmentBrown} alt="" />
                        <span className="attached-file-name">{objAttachment.vAttachmentFileName}</span>
                    </a>
                </label>
            );
        })
        return AttachmentDiv;
    }

    /**
     * @name GetAuthor
     * @summary returns the owner of the message
     * @param {any} objNews
     * @returns {string}
     */
    const GetAuthor = (objNews) => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilNews", props);
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");
        var strAuthor = "";
        let arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + state.objSelectedClass.uClassId)["Data"];
        let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"];
        let arrNewsData = DataRef(props.Extranet_Pupil_PupilNews_Module, "Extranet_Pupil_PupilNews_Module;uClassId;" + state.objSelectedClass.uClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N")["Data"];
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
    }

    /**
     * @name GetSchoolMessages
     * @summary returns the messages sent by school.
     * @param {any} arrSchoolNews
     * @returns {Array}
     */
    const GetSchoolMessages = (arrSchoolNews) => {
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
                        {GetAttachMent(props, objSchoolNews.t_LearnCoacher_News_Attachment)}
                    </div>
                </div>
            </div>;
            DivSchoolNews = [...DivSchoolNews, DivSingleMessage];
        })
        return DivSchoolNews;
    };

    /**
     * @name GetPupilMessages
     * @summary returns the pupil messages
     * @param {any} arrAllNewsData
     * @param {any} objTextResource
     * @returns {Array}
     */
    const GetPupilMessages = (arrAllNewsData, objTextResource) => {
        var DivPupilNews = [];
        console.log(props.ClientUserDetails.UserId, state.strSelectedId)
        var arrSelectedPupilNews = arrAllNewsData.filter(item => {
            return item.uUserId === state.strSelectedId || (item.t_LearnCoacher_News_ToUser.find(usr => usr.uUserId === state.strSelectedId));
        }).sort((a, b) => new Date(a.dtCreatedOn) - new Date(b.dtCreatedOn));

        arrSelectedPupilNews.map((objPupilNews, i) => {
            var SingleDiv = [];
            var blnShowCheckBox = state.arrForwardMessagesId.length > 0 ? true : false;
            var blnMarked = state.arrForwardMessagesId.indexOf(objPupilNews.uNewsId) !== -1 ? true : false;
            if (objPupilNews.uUserId != props.ClientUserDetails.UserId) {
                SingleDiv = <div className="chat-baloon received">
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
                    <div className="checkbox-chat-baloon-flex">
                        <div className="timeauthor-flex">
                            <span className="time">{GetAuthor(objPupilNews)}</span>
                            <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objPupilNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment> <img
                                    src={
                                        imgForwardGrey
                                    }
                                    onClick={() => {
                                        if (state.arrForwardMessagesId.length === 0) {
                                            objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objPupilNews.uNewsId)
                                        }
                                    }
                                    }
                                    alt=""
                                />
                                    <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objPupilNews) }} id={objPupilNews.uNewsId}
                                        src={imgCrossSmallGrey} alt="" />
                                </React.Fragment> : ''}
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
            else {
                SingleDiv = <div className="chat-baloon sent">
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
                    <div className="checkbox-chat-baloon-flex">
                        <div className="timeauthor-flex">
                            <span className="time">{GetAuthor(objPupilNews)}</span>
                            <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objPupilNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment>  <img
                                    src={
                                        imgForward
                                    }
                                    onClick={() => {
                                        if (state.arrForwardMessagesId.length === 0) {
                                            objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objPupilNews.uNewsId)
                                        }
                                    }
                                    }
                                    alt=""
                                />
                                    <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objPupilNews) }} id={objPupilNews.uNewsId} src={imgCrossSmall} alt="" />
                                </React.Fragment> : ''}
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
     * @summary returns the teacher messages
     * @param {any} arrAllNewsData
     * @param {any} objTextResource
     * @returns {Array}
     */
    const GetTeacherMessages = (arrAllNewsData, objTextResource) => {
        var DivCoTeachersNews = [];
        var arrSelectedCoTeacherlNews = arrAllNewsData.filter(item => {
            return item.uUserId === state.strSelectedId || (item.t_LearnCoacher_News_ToUser.find(usr => usr.uUserId === state.strSelectedId));
        }).sort((a, b) => new Date(a.dtCreatedOn) - new Date(b.dtCreatedOn));

        arrSelectedCoTeacherlNews.map((objCoTeacherNews, i) => {
            var SingleDiv = [];
            var blnShowCheckBox = state.arrForwardMessagesId.length > 0 ? true : false;
            var blnMarked = state.arrForwardMessagesId.indexOf(objCoTeacherNews.uNewsId) !== -1 ? true : false;
            if (objCoTeacherNews.uUserId != props.ClientUserDetails.UserId) {
                SingleDiv = <div className="chat-baloon received">
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
                    <div className="checkbox-chat-baloon-flex">
                        <div className="timeauthor-flex">
                            <span className="time">{GetAuthor(objCoTeacherNews)}</span>
                            <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objCoTeacherNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment> <img
                                    src={
                                        imgForwardGrey
                                    }
                                    onClick={() => {
                                        if (state.arrForwardMessagesId.length === 0) {
                                            objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objCoTeacherNews.uNewsId)
                                        }
                                    }
                                    }
                                    alt=""
                                />
                                    <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objCoTeacherNews) }} id={objCoTeacherNews.uNewsId} src={imgCrossSmallGrey} alt="" />
                                </React.Fragment> : ''}
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
            else {
                SingleDiv = <div className="chat-baloon sent">
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
                    <div className="checkbox-chat-baloon-flex">
                        <div className="timeauthor-flex">
                            <span className="time">{GetAuthor(objCoTeacherNews)}</span>
                            <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objCoTeacherNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment>
                                    <img
                                        src={
                                            imgForward
                                        }
                                        alt=""
                                        onClick={() => {
                                            if (state.arrForwardMessagesId.length === 0) {
                                                objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objCoTeacherNews.uNewsId)
                                            }
                                        }
                                        }

                                    />
                                    <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objCoTeacherNews) }} id={objCoTeacherNews.uNewsId} src={imgCrossSmall} alt="" />
                                </React.Fragment> : ''}
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
     * @summary returns the group messages
     * @param {any} arrAllNewsData
     * @param {any} objTextResource
     * @returns {Array}
     */
    const GetGroupMessages = (arrAllNewsData, objTextResource) => {
        var DivGroupNews = [];
        var arrSelectedGroupNews = arrAllNewsData.filter(item => {
            return (item.t_LearnCoacher_News_ToUser.find(usr => usr.uGroupId === state.strSelectedId));
        }).sort((a, b) => new Date(a.dtCreatedOn) - new Date(b.dtCreatedOn));

        arrSelectedGroupNews.map((objGroupNews, i) => {
            var SingleDiv = [];
            var blnShowCheckBox = state.arrForwardMessagesId.length > 0 ? true : false;
            var blnMarked = state.arrForwardMessagesId.indexOf(objGroupNews.uNewsId) !== -1 ? true : false;
            if (objGroupNews.uUserId != props.ClientUserDetails.UserId) {
                SingleDiv = <div className="chat-baloon received">
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
                    <div className="checkbox-chat-baloon-flex">
                        <div className="timeauthor-flex">
                            <span className="time">{GetAuthor(objGroupNews)}</span>
                            <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objGroupNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment> <img
                                    src={
                                        imgForwardGrey
                                    }
                                    onClick={() => {
                                        if (state.arrForwardMessagesId.length === 0) {
                                            objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objGroupNews.uNewsId)
                                        }
                                    }
                                    }
                                    alt=""
                                />
                                    <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objGroupNews) }} id={objGroupNews.uNewsId} src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_smallGrey.svg"} alt="" />
                                </React.Fragment> : ''}
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
                    <div className="checkbox-chat-baloon-flex">
                        <div className="timeauthor-flex">
                            <span className="time">{GetAuthor(objGroupNews)}</span>
                            <span className="time">{objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objGroupNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment> <img
                                    src={
                                        imgForward
                                    }
                                    alt=""
                                    onClick={() => {
                                        if (state.arrForwardMessagesId.length === 0) {
                                            objContext.PupilNews_ModuleProcessor.GetForwardMessagesId(objContext, objGroupNews.uNewsId)
                                        }
                                    }
                                    }
                                />
                                    <img onClick={(event) => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objGroupNews) }} id={objGroupNews.uNewsId} src={imgCrossSmall} alt="" />
                                </React.Fragment> : ''}
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
    }

    /**
     * @name GetMessages
     * @summary Calls the returns the messages w.r.t type (GetPupilMessages and GetTeacherMessages apply the same logic)
     * @param {any} arrNews
     * @param {any} objTextResource
     */
    const GetMessages = (arrNews, objTextResource) => {
        var MessagesDiv = [];
        switch (state.strType) {
            case "school":
                MessagesDiv = GetSchoolMessages(arrNews);
                break;
            case "pupil":
                MessagesDiv = GetPupilMessages(arrNews, objTextResource);
                break;
            case "mainteacher":
                MessagesDiv = GetTeacherMessages(arrNews, objTextResource);
                break;
            case "coteacher":
                MessagesDiv = GetTeacherMessages(arrNews, objTextResource);
                break;
            case "subjectexpert":
                MessagesDiv = GetTeacherMessages(arrNews, objTextResource);
                break;
            case "group":
                MessagesDiv = GetGroupMessages(arrNews, objTextResource);
                break;
            default:
                break;
        }
        return MessagesDiv;
    }

    /**
     * @name GetSchoolLi
     * @summary returns the school header
     * @param {any} arrNews
     */
    const GetSchoolLi = (arrNews) => {
        if (objContext.PupilNews_ModuleProcessor.IsExternalUser) {
            return <React.Fragment />;
        } else {
            let objSchool = {};
            let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");
            if (DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + strSchoolId)) {
                objSchool = DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + strSchoolId)["Data"][0];
            }
            var objlastSchoolmessage = arrNews ? arrNews.find(x => x["uUserId"] == objSchool.uSchoolId) : {};// objContext.PupilNews_ModuleProcessor.GetSchoolLastMessage(objContext, objSchool.uSchoolId, arrNews);
            return (
                <li type="school" className={state.strType === "school" ? "active" : ""}
                    onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "school", "") }}>
                    <div className="left-div">
                        <img
                            src={
                                imgSchool
                            }
                            alt=""
                            className="thumbnail"
                            draggable="false"
                        />
                        <div className="text">
                            <span>
                                <b>{objSchool.vFirstName + " " + objSchool.vName}</b>
                            </span>
                            <p>{objlastSchoolmessage ? objlastSchoolmessage.vText : ''}</p>
                        </div>
                    </div>
                    <div className="right-div">
                        <span className="last-seen">{objlastSchoolmessage ? objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objlastSchoolmessage.dtCreatedOn) : ''}</span>
                    </div>
                </li>
            )
        }
    };

    /**
     * @name GetTeacherName
     * @summary get teacher name by TeacherId
     * @param {any} strTeacherId
     * @returns {string}
     */
    let GetTeacherName = (strTeacherId) => {
        return objContext.PupilNews_ModuleProcessor.GetTeacherName(objContext, strTeacherId);
    }

    /**
     * @name GetTeachersLastMessage
     * @summary returns the last message sent by teacher
     * @param {any} strTeacherId
     */
    let GetTeachersLastMessage = (strTeacherId) => {
        return objContext.PupilNews_ModuleProcessor.GetTeachersLastMessage(objContext, strTeacherId);
    }

    /**
     * @name GetMainTeacherLi
     * @summary returns the main teacher chat name.
     * */
    const GetMainTeacherList = () => {
        var objMainTeacher = objContext.PupilNews_ModuleProcessor.GetMainTeacher(objContext);
        var ReturnLi = [];
        if (objMainTeacher && objMainTeacher.uTeacherId) {
            let strTeacherName = GetTeacherName(objMainTeacher.uTeacherId);
            let add = false;
            if (state.searchFilter != '') {
                if (strTeacherName.includes(state.searchFilter))
                    add = true;
            }
            else
                add = true;
            if (add) {
                var objMainTeacherLastMessage = GetTeachersLastMessage(objMainTeacher.uTeacherId);
                ReturnLi = <li id={objMainTeacher.uTeacherId} type="mainteacher" className={state.strSelectedId === objMainTeacher.uTeacherId ? "active" : ""} onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "mainteacher", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img
                            src={
                                objMainTeacher.iGenderId === 0 ? imgProfile1 : imgMainTeacher
                            }
                            alt=""
                            className="thumbnail"
                            draggable="false"
                        />
                        <div className="text">
                            <span>
                                <b>{strTeacherName}</b>
                            </span>
                            <p>{objMainTeacherLastMessage ? objMainTeacherLastMessage.vText : ""}</p>
                        </div>
                    </div>
                    <div className="right-div">
                        <span className="last-seen">{objMainTeacherLastMessage ? objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objMainTeacherLastMessage.dtCreatedOn) : ""}</span>
                    </div>
                </li>
            }
        }
        return ReturnLi;
    };

    /**
     * @name GetCoTeachersLis
     * @summary returns the main co-teachers chat names.
     * */
    const GetCoTeachersList = () => {
        var arrCoTeachers = objContext.PupilNews_ModuleProcessor.GetCoTeachers(objContext);
        var CoTeachersLis = [];
        arrCoTeachers.map(objCoTeacher => {
            let add = false;
            let strTeacherName = GetTeacherName(objCoTeacher.uTeacherId)
            if (state.searchFilter != '') {
                if (strTeacherName.includes(state.searchFilter))
                    add = true;
            }
            else
                add = true;
            if (add) {
                var objCoTeacherLastMessage = GetTeachersLastMessage(objCoTeacher.uTeacherId);
                var SingleLi = <li id={objCoTeacher.uTeacherId} type="coteacher" className={state.strSelectedId === objCoTeacher.uTeacherId ? "active" : ""} onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "coteacher", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img
                            src={

                                objCoTeacher.iGenderId === 0 ? imgProfile1 : imgClassTeacher
                            }
                            alt=""
                            className="thumbnail"
                            draggable="false"
                        />
                        <div className="text">
                            <span>
                                <b>{strTeacherName}</b>
                            </span>
                            <p>{objCoTeacherLastMessage ? objCoTeacherLastMessage.vText : ""}</p>
                        </div>
                    </div>
                    <div className="right-div">
                        <span className="last-seen">{objCoTeacherLastMessage ? objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objCoTeacherLastMessage.dtCreatedOn) : ""}</span>
                    </div>
                </li>
                CoTeachersLis = [...CoTeachersLis, SingleLi];
            }
        });
        return CoTeachersLis;
    };

    /**
     * @name GetSubjectExpertsLis
     * @summary returns the subject experts teachers chat names.
     * */
    const GetSubjectExpertsList = () => {
        var arrSubjectExperts = objContext.PupilNews_ModuleProcessor.GetSubjectExperts(objContext);
        var SubjectExpertsLis = [];
        arrSubjectExperts.map(objSubjectExpert => {
            let add = false;
            let strTeacherName = GetTeacherName(objSubjectExpert.uTeacherId)
            if (state.searchFilter != '') {
                if (strTeacherName.includes(state.searchFilter))
                    add = true;
            }
            else
                add = true;
            if (add) {
                var objSubjectExpertLastMessage = GetTeachersLastMessage(objSubjectExpert.uTeacherId);
                var SingleLi = <li id={objSubjectExpert.uTeacherId} type="subjectexpert" className={state.strSelectedId === objSubjectExpert.uTeacherId ? "active" : ""} onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "subjectexpert", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img
                            src={

                                objSubjectExpert.iGenderId === 0 ? imgProfile1 : imgSubjectExpert
                            }
                            alt=""
                            className="thumbnail"
                            draggable="false"
                        />
                        <div className="text">
                            <span>
                                <b>{strTeacherName}</b>
                            </span>
                            <p>{objSubjectExpertLastMessage ? objSubjectExpertLastMessage.vText : ""}</p>
                        </div>
                    </div>
                    <div className="right-div">
                        <span className="last-seen">{objSubjectExpertLastMessage ? objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objSubjectExpertLastMessage.dtCreatedOn) : ""}</span>
                    </div>
                </li>
                SubjectExpertsLis = [...SubjectExpertsLis, SingleLi];
            }
        });
        return SubjectExpertsLis;
    };

    /**
    * @name GetGroupLastMessage
    * @summary returns the last message sent from group
    * @param {any} strTeacherId
    */
    const GetGroupLastMessage = (strGroupId, arrAllGroupNews) => {
        var objLastMessage = arrAllGroupNews.filter(item => {
            return (item.t_LearnCoacher_News_ToUser.find(usr => usr.uGroupId === strGroupId));
        }).sort((a, b) => new Date(b.dtCreatedOn) - new Date(a.dtCreatedOn))[0];
        return objLastMessage;
    };

    /**
     * @name GetGroupLis
     * @summary returns the group chat names.
     * */
    const GetGroupList = (arrGroupData, arrNewsData) => {
        var GroupLis = [];
        if (arrGroupData) {
            arrGroupData.map(objGroupData => {
                let add = false;
                if (state.searchFilter != '') {
                    if (objGroupData.vGroupName.includes(state.searchFilter))
                        add = true;
                }
                else
                    add = true;
                if (add) {
                    var objGroupLastMessage = GetGroupLastMessage(objGroupData.uNewsGroupId, arrNewsData);
                    var SingleLi = <li id={objGroupData.uNewsGroupId} type="group" className={state.strSelectedId === objGroupData.uNewsGroupId ? "active" : ""} onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "group", event.currentTarget.id) }}>
                        <div className="left-div">
                            <img
                                src={imgIconSharedGroupBrown}
                                alt=""
                                className="thumbnail"
                                draggable="false"
                            />
                            <div className="text">
                                <span>
                                    <b>{objGroupData.vGroupName}</b>
                                </span>
                                <p>{objGroupLastMessage ? objGroupLastMessage.vText : ""}</p>
                            </div>
                        </div>
                        <div className="right-div">
                            <span className="last-seen">{objGroupLastMessage ? objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objGroupLastMessage.dtCreatedOn) : ""}</span>
                        </div>
                    </li>
                    GroupLis = [...GroupLis, SingleLi];
                }
            });
        }
        return GroupLis;
    };

    /**
    * @name GetPupilLastMessage
    * @summary returns the last message sent from pupil
    * @param {any} strTeacherId
    */
    const GetPupilLastMessage = (strPupilId, arrAllNewsData) => {
        var objLastMessage = {};
        if (arrAllNewsData) {
            var objLastMessage = arrAllNewsData.filter(item => {
                return item.uUserId === strPupilId || (item.t_LearnCoacher_News_ToUser.find(usr => usr.uUserId === strPupilId));
            }).sort((a, b) => new Date(b.dtCreatedOn) - new Date(a.dtCreatedOn))[0];
        }
        return objLastMessage;
    };

    /**
     * @name GetPupilLis
     * @summary returns the pupil chat names.
     * */
    const GetPupilList = (arrPupil, arrNewsData) => {
        var PupilList = [];
        if (arrPupil) {
            arrPupil.map(objPupilData => {
                let add = false;
                if (state.searchFilter != '') {
                    if ((objPupilData.vFirstName + " " + objPupilData.vName).includes(state.searchFilter))
                        add = true;
                }
                else
                    add = true;
                if (add) {
                    var objPupilLastMessage = GetPupilLastMessage(objPupilData.uPupilId, arrNewsData);
                    var SingleLi = <li id={objPupilData.uPupilId} className={state.strSelectedId === objPupilData.uPupilId ? "active" : ""} type="pupil" onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "pupil", event.currentTarget.id) }}>
                        <div className="left-div">
                            <img
                                src={

                                    objPupilData.iGenderId === 0 ? imgProfile1 : imgProfile10
                                }
                                alt=""
                                className="thumbnail"
                                draggable="false"
                            />
                            <div className="text">
                                <span>
                                    <b>{objPupilData.vFirstName + " " + objPupilData.vName}</b>
                                </span>
                                <p>{objPupilLastMessage ? objPupilLastMessage.vText : ""}</p>
                            </div>
                        </div>
                        <div className="right-div">
                            <span className="last-seen">{objPupilLastMessage ? objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objPupilLastMessage.dtCreatedOn) : ""}</span>
                        </div>
                    </li>
                    PupilList = [...PupilList, SingleLi];
                }
            });
        }
        return PupilList;
    };

    /**
     * @name GetHeader
     * @summary gets the header w.r.t type
     * @param {any} objTextResource
     */
    const GetHeader = (objTextResource) => {
        var strImage = "", strDisplayName = "";
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");
        switch (state.strType) {
            case "school":
                strImage = imgSchool;
                let objSchool = {};
                if (DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + strSchoolId)) {
                    objSchool = DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + strSchoolId)["Data"][0];
                }
                strDisplayName = objSchool.vFirstName + " " + objSchool.vName
                break;
            case "pupil":
                var objSelectedPupil = objContext.PupilNews_ModuleProcessor.GetPupilObject(objContext, state.strSelectedId);
                strImage = props.JConfiguration.ExtranetSkinPath + (objSelectedPupil.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/profile10.png");
                strDisplayName = objSelectedPupil.vFirstName + " " + objSelectedPupil.vName;
                break;
            case "coteacher":
                strImage = imgClassTeacher;
                strDisplayName = GetTeacherName(state.strSelectedId);  //objSelectedPupil.vFirstName +" "+ objSelectedPupil.vName;
                break;
            case "subjectexpert":
                strImage = imgSubjectExpert;
                strDisplayName = GetTeacherName(state.strSelectedId);
                break;
            case "group":
                strImage = imgIconSharedGroupBrown;
                let objGroup = objContext.PupilNews_ModuleProcessor.GetGroup(objContext);
                let strAutorName = objContext.PupilNews_ModuleProcessor.GetGroupAuthorName(objContext, objGroup);
                strDisplayName = objGroup["vGroupName"] + " (" + objTextResource["OwnerText"] + " " + strAutorName + ")";
                break;
            case "mainteacher":
                strImage = imgMainTeacher;
                strDisplayName = GetTeacherName(state.strSelectedId);
                break;
        }

        return <React.Fragment>
            <div className="recipient-left">
                <img src={strImage} alt="" draggable="false" />
                <span>{strDisplayName}</span>
            </div>
            <div className="news-control">
                {state.strType === "group" && state.blnCurrentSchoolYearPeriod ?
                    <React.Fragment>
                        <img src={imgEditGroup} onClick={() => { objContext.PupilNews_ModuleProcessor.OpenAddGroupPopup(objContext, "Edit") }} />
                        <img src={imgDeleteWhite} onClick={() => { objContext.PupilNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Group") }} />
                    </React.Fragment>
                    :
                    <React.Fragment />
                }
            </div>
        </React.Fragment>
    }

    /**
     * @name GetSendMessageDiv
     * @summary returns the send message div
     * @param {any} objTextResource
     */
    const GetSendMessageDiv = (objTextResource) => {
        setTimeout(function () {
            if (state.blnFileReload) {
                dispatch({ type: "SET_STATE", payload: { blnFileReload: false } });
            }
        }, 500);
        return state.blnCurrentSchoolYearPeriod && state.strSelectedId != props.ClientUserDetails.UserId ? <div className="chat-controls" id="chatBoxFooter">
            <div className="chat-controls-bg">
                <textarea id="TextAreaMessageInput"
                    ref={TextAreaMessageInputRef}
                    className="send-message"
                    placeholder={Localization.TextFormatter(objTextResource, 'write_a_message')}
                    value={state.strMessagetext}
                    onChange={() => { objContext.PupilNews_ModuleProcessor.MessageTextChangeHandler(objContext, event.target.value) }}
                />
                <div ref={domFileUploadRef} className="control-flex file-upload-flex">
                    <PerformanceProfiler ComponentName={"FileUpload_PupilNews"} JConfiguration={props.JConfiguration} >
                        <FileUpload
                            ref={domFileUploadRef}
                            Id="FileUpload_PupilNews"
                            Data={{
                                "Reload": state.blnFileReload
                            }}
                            Meta={objContext.PupilNews_ModuleProcessor.GetMetaFileUploadData()}
                            Resource={objContext.PupilNews_ModuleProcessor.GetResourceFileUploadData(objTextResource)}
                            ParentProps={{ JConfiguration: { ...props.JConfiguration } }}
                            CallBacks={{ OnUploadComplete: (objFile, arrFiles) => { window.dispatchEvent(new Event('resize')); dispatch({ type: 'SET_STATE', payload: { blnShowEmptyTextValidationMessage: false } }) } }}
                        />
                    </PerformanceProfiler>
                </div>
                <div ref={domFileUploadRef} className="control-flex send-button-flex">
                    {state.blnShowEmptyTextValidationMessage && <span>{Localization.TextFormatter(objTextResource, 'EmptyTextValidationMessage')}</span>}

                    <button className="send button brown-button" onClick={() => {
                        let strFile = domFileUploadRef.current.GetUploadedFileDetails ? domFileUploadRef.current.GetUploadedFileDetails() : '[]';
                        let arrFile = JSON.parse(strFile);
                        if (state.strMessagetext !== "" || (arrFile && arrFile.length > 0)) {
                            objContext.PupilNews_ModuleProcessor.SendMessage(objContext, strFile)

                        }
                        else {
                            //document.getElementById("TextAreaMessageInput").focus();
                            TextAreaMessageInputRef.current.focus()
                            dispatch({ type: "SET_STATE", payload: { blnShowEmptyTextValidationMessage: true } });
                        }
                    }}>{Localization.TextFormatter(objTextResource, 'send')} </button>
                </div>
            </div>
        </div>
            : ''
    };

    /**
     * @name GetMessageDiv
     * @summmary returns the send or forward or pupil disabled notification div based on conditions.
     * @param {any} objTextResource
     */
    let GetMessageDiv = (objTextResource) => {
        if (state.strType == 'school')
            return <div id="chatBoxFooter" />
        if (state.strType == 'pupil') {
            if (state.objSelectedClass["cIsNewsEnabled"] && state.objSelectedClass["cIsNewsEnabled"] == 'N') {
                return state.arrForwardMessagesId.length === 0 ? GetPupilDisabledDiv() : GetForwardMessageDiv(objTextResource);
            }
        }
        return state.arrForwardMessagesId.length === 0 ? GetSendMessageDiv(objTextResource) : GetForwardMessageDiv(objTextResource);
    }

    /**
     * @name GetPupilDisabledDiv
     * @summary returns the disabled div
     * @param {any} objTextResource
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
     * @summary returns forward message div.
     * @param {any} objTextResource
     */
    const GetForwardMessageDiv = (objTextResource) => {
        var strMessageCount = state.arrForwardMessagesId.length;
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
     * @name GetNewsOrEmptyMessage
     * @summary returns the messages or no messages text.
     * @param {any} arrNews
     * @param {any} objTextResource
     */
    let GetNewsOrEmptyMessage = (arrNews, objTextResource) => {
        if (arrNews && arrNews.length > 0) {
            let arrMessages = GetMessages(arrNews, objTextResource);
            if (arrMessages.length > 0)
                return arrMessages;
            else
                return <span>{Localization.TextFormatter(objTextResource, 'NoMessagesText')}</span>
        } else {
            return <span>{Localization.TextFormatter(objTextResource, 'NoMessagesText')}</span>
        }
    }

    /**
     * @name GetContent
     * @summary returns the jsx.
     * @param {any} props
     * @returns {Element}
     */
    const GetContent = () => {
        let strClassId = objClassPupil.uClassId;
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilNews", props);
        let arrSchoolYearPeriodData = [];
        if (DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")) {
            arrSchoolYearPeriodData = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        }

        let arrAllNewsData = [];
        if (DataRef(props.Extranet_Pupil_PupilNews_Module, "Extranet_Pupil_PupilNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N")) {
            arrAllNewsData = DataRef(props.Extranet_Pupil_PupilNews_Module, "Extranet_Pupil_PupilNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N")["Data"];
        }

        let arrNewsData = [];
        if (arrAllNewsData == undefined)
            arrNewsData = [];
        else
            arrNewsData = arrAllNewsData.filter(objNews => objNews.cIsDeleted == 'N');
        let arrAllNewsGroupData = [];
        if (DataRef(props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)) {
            arrAllNewsGroupData = DataRef(props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
        }

        let arrNewsGroupData = [];
        if (arrAllNewsGroupData)
            arrNewsGroupData = arrAllNewsGroupData.filter(grp => grp.cIsDeleted == 'N');
        let arrPupilData = DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId)["Data"];
        let arrFilteredPupilData = [];
        if (arrPupilData) {
            arrFilteredPupilData = arrPupilData.filter(x => x["uPupilId"] != props.ClientUserDetails.UserId);
        }

        let objSchoolYearPeriodDropdownData = {
            DropdownData: arrSchoolYearPeriodData,
            SelectedValue: objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId != "" ? objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId : arrSchoolYearPeriodData.length > 0 ? arrSchoolYearPeriodData[0]["uSchoolYearPeriodId"] : ""
        };

        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100)


        return (
            <div className="news-wrapper pupilparent-wrapper">
                <div className="toplan-border" id="NavigationSecondaryMenu" />
                <div className="news-flex">
                    <div className="news-left">
                        <div className="news-header-padd" id="newsHeader">
                            <div className="news-header">
                                <div className="search-box">
                                    <input type="text" name="" id="" placeholder="Suchen" onChange={(e) => { objContext.PupilNews_ModuleProcessor.UpdateSearchText(objContext, e.target.value) }} />
                                    <img
                                        src={
                                            imgSearchSmall
                                        }
                                        alt=""
                                    />
                                </div>
                                {state.blnCurrentSchoolYearPeriod ?
                                    <button className="button new-group-button" onClick={() => {
                                        objContext.PupilNews_ModuleProcessor.OpenAddGroupPopup(objContext, "Add");
                                    }}>
                                        <img
                                            src={
                                                imgPlusWhite
                                            }
                                            alt=""
                                        />
                                        <span>{Localization.TextFormatter(objTextResource, 'NewContactOrGroup')}</span>
                                    </button> : ''}
                            </div>
                            <span>{Localization.TextFormatter(objTextResource, 'SchoolYear')}</span>
                            <PerformanceProfiler ComponentName={"PupilNewsSchoolYearPeriodDropdown"} JConfiguration={props.JConfiguration} >
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="PupilNewsSchoolYearPeriodDropdown"
                                    Meta={objContext.PupilNews_ModuleProcessor.GetMetaDataSchoolYearPeriodDropdown()}
                                    Data={objSchoolYearPeriodDropdownData}
                                    Resource={objContext.PupilNews_ModuleProcessor.GetResourceDataSchoolYearPeriodDropdown()}
                                    Events={objContext.PupilNews_ModuleProcessor.GetEventsDataSchoolYearPeriodDropdown(objContext)}
                                    ParentProps={{ ...props }}
                                />
                            </PerformanceProfiler>
                        </div>

                        <div className="chat-list pupil-table-section" id="chatListParent">
                            <WrapperComponent
                                ComponentName={"FillHeight"}
                                Id="PupilNews_FillHeight"
                                Meta={{
                                    HeaderIds: ["PupilHeader", "newsHeader", "NavigationSecondaryMenu"],
                                    FooterIds: ["BgFooter", "bottomSpacing", "LeftBlockFooter"]
                                }}
                                ParentProps={{ ...props }}>
                                <ul>
                                    {GetSchoolLi(arrNewsData)}
                                    {GetMainTeacherList()}
                                    {GetCoTeachersList()}
                                    {GetSubjectExpertsList()}
                                    {GetGroupList(arrNewsGroupData, arrNewsData)}
                                    {GetPupilList(arrFilteredPupilData, arrNewsData)}
                                </ul>
                            </WrapperComponent>
                        </div>
                        <div className="left-block-footer" id="LeftBlockFooter"></div>
                    </div>

                    <div className="news-right">
                        <div className="chat-head-padd" id="chatBoxHeader">
                            <div className="chat-recipient">
                                {GetHeader(objTextResource)}
                            </div>
                        </div>
                        <div className="chat-padding" id="chatBoxParent"></div>
                        <div className="chat-box">
                            <WrapperComponent
                                ComponentName={"FillHeight"}
                                Id="PupilNews_FillHeight"
                                Meta={{
                                    HeaderIds: ["PupilHeader", "chatBoxHeader", "NavigationSecondaryMenu", "chatBoxParent"],
                                    FooterIds: ["chatBoxFooter", "BgFooter", "bottomSpacing", "RightBlockFooter"]
                                }}
                                ParentProps={{ ...props }}>

                                <div className="chat-log">
                                    {GetNewsOrEmptyMessage(arrNewsData, objTextResource)}
                                </div>
                            </WrapperComponent>
                            {GetMessageDiv(objTextResource)}
                        </div>
                        <div className="right-block-footer" id="RightBlockFooter"></div>
                    </div>
                </div>
                <div className="bgfooter" id="BgFooter"></div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />}
        </React.Fragment>
    );
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilNews_ModuleProcessor.StoreMapList()))(PupilNews);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilNews_ModuleProcessor;