//React imports.
import React, { useRef, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

//Module specific imports
import * as TeacherNews_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNews_Hook';
import TeacherNews_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNews_ModuleProcessor';

//controls
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';


//Inline Images import
import AttachmentImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/attachment.png?inline';
import ForwardGreyImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/forwardGrey.svg?inline';
import SmallCrossGreyImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/cross_smallGrey.png?inline';
import ForwardImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/forward.png?inline';
import SmallCrossImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/cross_small.png?inline';
import SchoolImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/School.svg?inline';
import EditGroupImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/Edit_Group.svg?inline';
import WhiteDeleteImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/delete_white.svg?inline';
import SmallSearchImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/search_small.png?inline';
import WhitePlusImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/pluswhite.svg?inline';
import ClassTeacherImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/ClassTeacher.svg?inline';
import SubjectExpertImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/SubjectExpert.svg?inline';
import ProfileMaleImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/profile1.png?inline';
import ProfileFemaleImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/profile10.png?inline';
import SharedGroupBrownImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/icon_shared_group_brown.png?inline';


const TeacherNews = props => {

    /**
     * @name reference of the file upload control
     * */
    const domFileUploadRef = useRef(null);

    const txtAreaMessageRef = useRef(null);

    /**
    * @name Reduce Initializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TeacherNews_Hook.GetInitialState(props));

    /**
      * @name objContext
      * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
      */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TeacherNews", ["TeacherNews_ModuleProcessor"]: new TeacherNews_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TeacherNews_ModuleProcessor.Initialize(objContext, objContext.TeacherNews_ModuleProcessor);

    /**
    * @name HookInitializer.
    * @summary Initializes the all hooks.
    */
    TeacherNews_Hook.Initialize(objContext);

    /**
    * @name Resize
    * @summary dispatches the resize event.
    * */
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, [state.strSelectedId]);

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
                        <img src={AttachmentImage} alt="" />
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
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherNews", props);
        var strAuthor = "";
        let arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + state.objSelectedClass.uClassId)["Data"];
        let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.ClientUserDetails.TeacherDetails.uSchoolId)["Data"];
        let arrNewsData = DataRef(props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + state.objSelectedClass.uClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N")["Data"];
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
                <span className="time">{objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objSchoolNews.dtCreatedOn)}</span>
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
                    <div className="checkbox-chat-baloon-flex">
                        <div className="time-flex">
                            <span className="time">{GetAuthor(objPupilNews)}</span>
                            <span className="time">{objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objPupilNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            {blnShowCheckBox ?
                                <div className="check-list">
                                    <input type="checkbox" id={"name" + i} />
                                    <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                        objContext.TeacherNews_ModuleProcessor.GetForwardMessagesId(objContext, objPupilNews.uNewsId)
                                    }} />
                                </div>
                                :
                                <React.Fragment />
                            }
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment>
                                    <img src={ForwardGreyImage} onClick={() => {
                                            if (state.arrForwardMessagesId.length === 0) {
                                                objContext.TeacherNews_ModuleProcessor.GetForwardMessagesId(objContext, objPupilNews.uNewsId)
                                            }}
                                        }
                                        alt=""
                                    />
                                    <img onClick={(event) => { objContext.TeacherNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objPupilNews) }} id={objPupilNews.uNewsId}
                                        src={SmallCrossGreyImage} alt="" />
                                </React.Fragment> : <React.Fragment />}
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
                    <div className="time-flex">
                        <span className="time">{GetAuthor(objPupilNews)}</span>
                        <span className="time">{objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objPupilNews.dtCreatedOn)}</span>
                    </div>
                    <div className="checkbox-chat-baloon-flex">
                        {blnShowCheckBox ?
                            <div className="check-list">
                                <input type="checkbox" id={"name" + i} />
                                <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                    objContext.TeacherNews_ModuleProcessor.GetForwardMessagesId(objContext, objPupilNews.uNewsId)
                                }} />
                            </div>
                            :
                            <React.Fragment />
                        }

                        <div className="baloon-flex">
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment>
                                    <img src={ForwardImage}
                                        onClick={() => {
                                            if (state.arrForwardMessagesId.length === 0) {
                                                objContext.TeacherNews_ModuleProcessor.GetForwardMessagesId(objContext, objPupilNews.uNewsId)
                                            }
                                        }
                                        }
                                        alt=""
                                    />
                                    <img onClick={(event) => { objContext.TeacherNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objPupilNews) }}
                                        id={objPupilNews.uNewsId}
                                        src={SmallCrossImage} alt="" />
                                </React.Fragment> : <React.Fragment />}
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
                    <div className="checkbox-chat-baloon-flex">
                        <div className="time-flex">
                            <span className="time">{GetAuthor(objCoTeacherNews)}</span>
                            <span className="time">{objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objCoTeacherNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            {blnShowCheckBox ?
                                <div className="check-list">
                                    <input type="checkbox" id={"name" + i} />
                                    <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                        objContext.TeacherNews_ModuleProcessor.GetForwardMessagesId(objContext, objCoTeacherNews.uNewsId)
                                    }} />
                                </div>
                                :
                                <React.Fragment />
                            }
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment>
                                    <img src={ForwardGreyImage}
                                        onClick={() => {
                                            if (state.arrForwardMessagesId.length === 0) {
                                                objContext.TeacherNews_ModuleProcessor.GetForwardMessagesId(objContext, objCoTeacherNews.uNewsId)
                                            }
                                        }
                                        }
                                        alt=""
                                    />
                                    <img onClick={(event) => { objContext.TeacherNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objCoTeacherNews) }}
                                        id={objCoTeacherNews.uNewsId}
                                        src={SmallCrossGreyImage} alt="" />
                                </React.Fragment> : <React.Fragment />}
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
                    <div className="time-flex">
                        <span className="time">{GetAuthor(objCoTeacherNews)}</span>
                        <span className="time">{objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objCoTeacherNews.dtCreatedOn)}</span>
                    </div>

                    <div className="checkbox-chat-baloon-flex">

                        {blnShowCheckBox ?
                            <div className="check-list">
                                <input type="checkbox" id={"name" + i} />
                                <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                    objContext.TeacherNews_ModuleProcessor.GetForwardMessagesId(objContext, objCoTeacherNews.uNewsId)
                                }} />
                            </div>
                            :
                            <React.Fragment />
                        }

                        <div className="baloon-flex">
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment>
                                    <img src={ForwardImage} />
                                    <img onClick={(event) => { objContext.TeacherNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objCoTeacherNews) }} id={objCoTeacherNews.uNewsId}
                                        src={SmallCrossImage} alt="" />
                                </React.Fragment> : <React.Fragment />}
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
                    <div className="checkbox-chat-baloon-flex">
                        <div className="time-flex">
                            <span className="time">{GetAuthor(objGroupNews)}</span>
                            <span className="time">{objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objGroupNews.dtCreatedOn)}</span>
                        </div>
                        <div className="baloon-flex">
                            {blnShowCheckBox ?
                                <div className="check-list">
                                    <input type="checkbox" id={"name" + i} />
                                    <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                        objContext.TeacherNews_ModuleProcessor.GetForwardMessagesId(objContext, objGroupNews.uNewsId)
                                    }} />
                                </div>
                                :
                                <React.Fragment />
                            }
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment>
                                    <img src={ForwardGreyImage}
                                        onClick={() => {
                                            if (state.arrForwardMessagesId.length === 0) {
                                                objContext.TeacherNews_ModuleProcessor.GetForwardMessagesId(objContext, objGroupNews.uNewsId)
                                            }
                                        }
                                        }
                                        alt=""
                                    />
                                    <img onClick={(event) => { objContext.TeacherNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objGroupNews) }}
                                        id={objGroupNews.uNewsId} src={SmallCrossGreyImage} alt="" />
                                </React.Fragment> : <React.Fragment />}
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
                    <div className="time-flex">
                        <span className="time">{GetAuthor(objGroupNews)}</span>
                        <span className="time">{objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objGroupNews.dtCreatedOn)}</span>
                    </div>
                    <div className="checkbox-chat-baloon-flex">
                        {blnShowCheckBox ?
                            <div className="check-list">
                                <input type="checkbox" id={"name" + i} />
                                <label className={blnMarked ? "checkmark checked" : "checkmark unchecked"} for={"name" + i} onClick={() => {
                                    objContext.TeacherNews_ModuleProcessor.GetForwardMessagesId(objContext, objGroupNews.uNewsId)
                                }} />
                            </div>
                            :
                            <React.Fragment />
                        }

                        <div className="baloon-flex">
                            <div className="icons">
                                {state.blnCurrentSchoolYearPeriod ? <React.Fragment>
                                    <img src={ForwardImage} />
                                    <img onClick={(event) => { objContext.TeacherNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "News", objGroupNews) }}
                                        id={objGroupNews.uNewsId} src={SmallCrossImage} alt="" />
                                </React.Fragment> : <React.Fragment />}
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
        if (objContext.TeacherNews_ModuleProcessor.IsExternalUser) {
            return <React.Fragment />;
        } else {
            var objlastSchoolmessage = arrNews ? arrNews[arrNews.length - 1] : {};
            let objSchool = {};
            if (DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + props.ClientUserDetails.TeacherDetails.uSchoolId)) {
                objSchool = DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + props.ClientUserDetails.TeacherDetails.uSchoolId)["Data"][0];
            }

            return <li type="school" className={state.strType === "school" ? "selected" : ""} onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "school", "") }}>
                <div className="left-div">
                    <img src={SchoolImage}
                        className="thumbnail"
                        draggable="false"
                    />
                    <div className="text">
                        <span>
                            {objSchool.vFirstName + " " + objSchool.vName}
                        </span>
                        <p>{objlastSchoolmessage ? objlastSchoolmessage.vText : ''}</p>
                    </div>
                </div>
                <div className="right-div">

                    <span className="last-seen">{objlastSchoolmessage ? objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objlastSchoolmessage.dtCreatedOn) : ''}</span>
                </div>
            </li>
        }
    };

    /**
     * @name GetTeacherName
     * @summary get teacher name by TeacherId
     * @param {any} strTeacherId
     * @returns {string}
     */
    let GetTeacherName = (strTeacherId) => {
        return objContext.TeacherNews_ModuleProcessor.GetTeacherName(objContext, strTeacherId);
    }

    /**
     * @name GetTeachersLastMessage
     * @summary returns the last message sent by teacher
     * @param {any} strTeacherId
     */
    let GetTeachersLastMessage = (strTeacherId) => {
        return objContext.TeacherNews_ModuleProcessor.GetTeachersLastMessage(objContext, strTeacherId);
    }

    /**
     * @name GetMainTeacherLi
     * @summary returns the main teacher chat name.
     * */
    const GetMainTeacherLi = () => {
        var objMainTeacher = objContext.TeacherNews_ModuleProcessor.GetMainTeacher(objContext);
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
                ReturnLi = <li id={objMainTeacher.uTeacherId} type="mainteacher" className={state.strSelectedId === objMainTeacher.uTeacherId ? "selected" : ""} onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "mainteacher", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img src={objMainTeacher.iGenderId == 0 ? ProfileMaleImage :ProfileFemaleImage}
                            className="thumbnail"
                            draggable="false"
                        />
                        <div className="text">
                            <span>
                                {GetTeacherName(objMainTeacher.uTeacherId)}
                            </span>
                            <p>{objMainTeacherLastMessage ? objMainTeacherLastMessage.vText : ""}</p>
                        </div>
                    </div>
                    <div className="right-div">
                        <span className="last-seen">{objMainTeacherLastMessage ? objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objMainTeacherLastMessage.dtCreatedOn) : ""}</span>
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
    const GetCoTeachersLis = () => {
        var arrCoTeachers = objContext.TeacherNews_ModuleProcessor.GetCoTeachers(objContext);
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
                var SingleLi = <li id={objCoTeacher.uTeacherId} type="coteacher" className={state.strSelectedId === objCoTeacher.uTeacherId ? "selected" : ""} onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "coteacher", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img src={objCoTeacher.iGenderId == 0 ? ProfileMaleImage : ClassTeacherImage}                            
                            className="thumbnail"
                            draggable="false"
                        />
                        <div className="text">
                            <span>
                                {GetTeacherName(objCoTeacher.uTeacherId)}
                            </span>
                            <p>{objCoTeacherLastMessage ? objCoTeacherLastMessage.vText : ""}</p>
                        </div>
                    </div>
                    <div className="right-div">
                        <span className="last-seen">{objCoTeacherLastMessage ? objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objCoTeacherLastMessage.dtCreatedOn) : ""}</span>
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
    const GetSubjectExpertsLis = () => {
        var arrSubjectExperts = objContext.TeacherNews_ModuleProcessor.GetSubjectExperts(objContext);
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
                var SingleLi = <li id={objSubjectExpert.uTeacherId} type="subjectexpert" className={state.strSelectedId === objSubjectExpert.uTeacherId ? "selected" : ""} onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "subjectexpert", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img src={objSubjectExpert.iGenderId == 0 ? ProfileMaleImage : SubjectExpertImage}
                            className="thumbnail"
                            draggable="false"
                        />
                        <div className="text">
                            <span>
                                {strTeacherName}
                            </span>
                            <p>{objSubjectExpertLastMessage ? objSubjectExpertLastMessage.vText : ""}</p>
                        </div>
                    </div>
                    <div className="right-div">
                        <span className="last-seen">{objSubjectExpertLastMessage ? objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objSubjectExpertLastMessage.dtCreatedOn) : ""}</span>
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
    const GetGroupLis = (arrGroupData, arrNewsData) => {
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
                    var SingleLi = <li id={objGroupData.uNewsGroupId} type="group" className={state.strSelectedId === objGroupData.uNewsGroupId ? "selected" : ""} onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "group", event.currentTarget.id) }}>
                        <div className="left-div">
                            <img src={SharedGroupBrownImage}
                                className="thumbnail"
                                draggable="false"
                            />
                            <div className="text">
                                <span>
                                    {objGroupData.vGroupName}
                                </span>
                                <p>{objGroupLastMessage ? objGroupLastMessage.vText : ""}</p>
                            </div>
                        </div>
                        <div className="right-div">
                            <span className="last-seen">{objGroupLastMessage ? objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objGroupLastMessage.dtCreatedOn) : ""}</span>
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
    const GetPupilLis = (arrPupil, arrNewsData) => {
        var PupilLis = [];
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
                    var SingleLi = <li id={objPupilData.uPupilId} className={state.strSelectedId === objPupilData.uPupilId ? "selected" : ""} type="pupil" onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "pupil", event.currentTarget.id) }}>
                        <div className="left-div"> 
                            <img src={objPupilData.iGenderId == 0 ? ProfileMaleImage : ProfileFemaleImage}
                                className="thumbnail"
                                draggable="false"
                            />
                            <div className="text">
                                <span>
                                    {objPupilData.vFirstName + " " + objPupilData.vName}
                                </span>
                                <p>{objPupilLastMessage ? objPupilLastMessage.vText : ""}</p>
                            </div>
                        </div>
                        <div className="right-div">
                            <span className="last-seen">{objPupilLastMessage ? objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objPupilLastMessage.dtCreatedOn) : ""}</span>
                        </div>
                    </li>
                    PupilLis = [...PupilLis, SingleLi];
                }
            });
        }
        return PupilLis;
    };

    /**
     * @name GetHeader
     * @summary gets the header w.r.t type
     * @param {any} objTextResource
     */
    const GetHeader = (objTextResource) => {
        var strImage = "", strDisplayName = "";
        switch (state.strType) {
            case "school":
                strImage = SchoolImage;
                let objSchool = {};
                if (DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + props.ClientUserDetails.TeacherDetails.uSchoolId)) {
                    objSchool = DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + props.ClientUserDetails.TeacherDetails.uSchoolId)["Data"][0];
                }
                strDisplayName = objSchool.vFirstName + " " + objSchool.vName
                break;
            case "pupil":
                var objSelectedPupil = objContext.TeacherNews_ModuleProcessor.GetPupilObject(objContext, state.strSelectedId);
                strImage = objSelectedPupil.iGenderId === 0 ? ProfileMaleImage : ProfileFemaleImage;
                strDisplayName = objSelectedPupil.vFirstName + " " + objSelectedPupil.vName;
                break;
            case "coteacher":
                strImage = ClassTeacherImage;
                strDisplayName = GetTeacherName(state.strSelectedId);  //objSelectedPupil.vFirstName +" "+ objSelectedPupil.vName;
                break;
            case "subjectexpert":
                strImage = SubjectExpertImage;
                strDisplayName = GetTeacherName(state.strSelectedId);
                break;
            case "group":
                strImage = SharedGroupBrownImage;
                strDisplayName = objContext.TeacherNews_ModuleProcessor.GetGroup(objContext).vGroupName;
                break;
        }

        return <div className="chat-head-padd padding-top-20" id="chatBoxHeader">
            <div className="chat-recipient">
                <div className="recipient-left">
                    <img src={strImage} draggable="false" alt="" />
                    <span>{strDisplayName}</span>
                </div>
                <div className="news-control">
                    {state.strType === "group" && state.blnCurrentSchoolYearPeriod ?
                        <React.Fragment>
                            <img src={EditGroupImage} onClick={() => { objContext.TeacherNews_ModuleProcessor.OpenAddGroupPopup(objContext, "Edit") }} />
                            <img src={WhiteDeleteImage} onClick={() => { objContext.TeacherNews_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Group") }} />
                        </React.Fragment>
                        :
                        <React.Fragment />
                    }
                </div>
            </div>
        </div>
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
        return <div className="chat-controls" id="chatBoxFooter">
            {state.blnCurrentSchoolYearPeriod ? <div className="chat-controls-bg">
                <textarea id="TextAreaMessageInput"
                    ref={txtAreaMessageRef}
                    className="send-message"
                    placeholder={Localization.TextFormatter(objTextResource, 'write_a_message')}
                    value={state.strMessagetext}
                    onChange={() => { objContext.TeacherNews_ModuleProcessor.MessageTextChangeHandler(objContext, event.target.value) }}
                />
                <div ref={domFileUploadRef} className="control-flex">
                    <FileUpload
                        Id="FileUpload_TeacherNews"
                        ref={domFileUploadRef}
                        Resource={objContext.TeacherNews_ModuleProcessor.GetFileUploadResourceData(objTextResource)}
                        Meta={objContext.TeacherNews_ModuleProcessor.GetFillHeightMetaData()}
                        ParentProps={{ ...props }}
                        Data={{ FileData: [], Reload: state.blnFileReload, FileUpload: [] }}
                        Reload={state.strReloadToggle}
                    />
                    <div className="send-btn-flex">
                        {state.blnShowEmptyTextValidationMessage && <span className="no-message-alert">{Localization.TextFormatter(objTextResource, 'EmptyTextValidationMessage')}</span>}
                        <button className="send button brown-button"
                            onClick={() => {
                                let strFile = domFileUploadRef.current.GetUploadedFileDetails ? domFileUploadRef.current.GetUploadedFileDetails() : '[]';
                                let arrFile = JSON.parse(strFile);
                                if (state.strMessagetext !== "" || (arrFile && arrFile.length > 0)) {
                                    objContext.TeacherNews_ModuleProcessor.SendMessage(objContext, strFile)

                                }
                                else {
                                    //document.getElementById("TextAreaMessageInput").focus();
                                    txtAreaMessageRef.current.focus()
                                    dispatch({ type: "SET_STATE", payload: { blnShowEmptyTextValidationMessage: true } });
                                }
                            }}
                           >{Localization.TextFormatter(objTextResource, 'send')} </button>
                    </div>
                </div>
            </div> : <React.Fragment />}
        </div >
    };

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
                    <button className="send button brown-button" onClick={() => {
                        objContext.TeacherNews_ModuleProcessor.OpenForwardMessagePopup(objContext)
                    }}>Weiterleiten</button>
                    {strMessageCount === 1 ?
                        <span>{strMessageCount + " " + Localization.TextFormatter(objTextResource, 'message') + " " + Localization.TextFormatter(objTextResource, 'marked')} </span>
                        :
                        <span>{strMessageCount + " " + Localization.TextFormatter(objTextResource, 'messages') + " " + Localization.TextFormatter(objTextResource, 'marked')}</span>}
                    <button className="send button brown-button" onClick={() => {
                        objContext.TeacherNews_ModuleProcessor.AbortForward(objContext);
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
    const GetContent = (props) => {
        let strClassId = state.objSelectedClass.uClassId;
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherNews", props)
        let arrSchoolYearPeriodData = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        let arrAllNewsData = DataRef(props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N")["Data"];
        let arrNewsData = [];
        if (arrAllNewsData == undefined)
            arrNewsData = [];
        else
            arrNewsData = arrAllNewsData.filter(objNews => objNews.cIsDeleted == 'N');
        let arrClassData = DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId)["Data"];
        let arrClassDataForDropDown = objContext.TeacherNews_ModuleProcessor.GetClassDropDownData(objContext,arrClassData, objTextResource);
        let arrAllNewsGroupData = DataRef(props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
        let arrNewsGroupData = [];
        if (arrAllNewsGroupData)
            arrNewsGroupData = arrAllNewsGroupData.filter(grp => grp.cIsDeleted == 'N');
        let arrPupilData = objContext.TeacherNews_ModuleProcessor.GetPupilData(objContext, strClassId);// DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId)["Data"];

        return (
            <div className="light-brown-bg TeacherNews" id="parentComp">
                <div className="padding-20" id="topHead">
                    <div className="topHead">
                        <div className="left-panel">
                            <span >{Localization.TextFormatter(objTextResource, 'class') + ":"}</span>
                            <div className="content-dropdown">
                                <PerformanceProfiler ComponentName={"TeacherNewsClassDropDown"} JConfiguration={props.JConfiguration} >
                                    <ClassDropDown
                                        id="TeacherNewsClassDropDown"
                                        SelectedValue={strClassId}
                                        DisplayColumn="vClassName"
                                        ValueColumn="uClassId"
                                        Data={arrClassDataForDropDown}
                                        UserPreference={state.objUserPreference}
                                        JConfiguration={props.JConfiguration}
                                        ClientUserDetails={props.ClientUserDetails}
                                        OnChangeEventHandler={(objItem, dropdownProps) => { objContext.TeacherNews_ModuleProcessor.HandleDropDownForClass(objContext, objItem) }}
                                    />
                                </PerformanceProfiler>
                            </div>
                            <span>{Localization.TextFormatter(objTextResource, 'SchoolYear')}</span>
                            <div className="content-dropdown">
                                <PerformanceProfiler ComponentName={"TeacherNews_SchoolYearPeriod"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id={"TeacherNews_SchoolYearPeriod"}
                                        Meta={objContext.TeacherNews_ModuleProcessor.GetSchoolYearPeriodDropdownMetaData()}
                                        Data={objContext.TeacherNews_ModuleProcessor.GetSchoolYearPeriodDropdownData(arrSchoolYearPeriodData)}
                                        Resource={objContext.TeacherNews_ModuleProcessor.GetResourceData()}
                                        Events={objContext.TeacherNews_ModuleProcessor.GetSchoolYearPeriodDropdownEvents(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>
                        <div className="right-panel activeRadioButton">
                            <div className="message-to-class">{Localization.TextFormatter(objTextResource, 'MessagesToClass')}</div>
                            <label className="label-container">
                                <input type="radio" value="Y"
                                    checked={state.strClassNewsStatus === 'Y'}
                                    onChange={(event) => { objContext.TeacherNews_ModuleProcessor.HandleActiveInactiveChange(objContext, event) }}
                                />
                                <span className="radio-checkmark" />
                            </label>
                            <span>{Localization.TextFormatter(objTextResource, 'Enabled')}</span>
                            <label className="label-container">
                                <input type="radio" value="N"
                                    checked={state.strClassNewsStatus === 'N'}
                                    onChange={(event) => { objContext.TeacherNews_ModuleProcessor.HandleActiveInactiveChange(objContext, event) }}
                                />
                                <span className="radio-checkmark" />
                            </label>
                            <span>{Localization.TextFormatter(objTextResource, 'Disabled')}</span>
                        </div>
                    </div>

                </div>
                <div className="news-flex">
                    <div className="news-left">
                        <div className="news-header-padd padding-top-20" id="newsHeader">
                            <div className="news-header">
                                <div className="search-box">
                                    <input type="text" name="" id="" placeholder={Localization.TextFormatter(objTextResource, 'search_placeholder')} onChange={(e) => { objContext.TeacherNews_ModuleProcessor.UpdateSearchText(objContext, e.target.value) }} />
                                    <img src={SmallSearchImage} alt="" draggable="false" />
                                </div>
                                {state.blnCurrentSchoolYearPeriod ? <button className="button brown-button new-group-button" onClick={() => {
                                    objContext.TeacherNews_ModuleProcessor.OpenAddGroupPopup(objContext, "Add");
                                }}>
                                    <img src={WhitePlusImage} alt="" />
                                    <span>{Localization.TextFormatter(objTextResource, 'new_group')}</span>
                                </button> : <React.Fragment />}
                            </div>
                        </div>

                        <div className="chat-list padding-bottom-20" id="chatListParent">
                            <WrapperComponent
                                ComponentName={"FillHeight"}
                                Id="TeacherNewsChatList" Meta={objContext.TeacherNews_ModuleProcessor.GetFillHeightChatListMetaData()} ParentProps={{ ...props }}>
                                <ul>
                                    {GetSchoolLi(arrNewsData)}
                                    {/*GetMainTeacherLi() main teacher means logged in teacher */}
                                    {GetCoTeachersLis()}
                                    {GetSubjectExpertsLis()}
                                    {GetGroupLis(arrNewsGroupData, arrNewsData)}
                                    {GetPupilLis(arrPupilData, arrNewsData)}

                                </ul>
                            </WrapperComponent>
                        </div>
                    </div>
                    <div className="news-right">
                        {GetHeader(objTextResource)}
                        <div className="chat-box">
                            <div className="chat-padding" id="chatBoxParent">
                                <WrapperComponent
                                    ComponentName={"FillHeight"}
                                    Id="TeacherNewsChatBox" Meta={objContext.TeacherNews_ModuleProcessor.GetFillHeightChatBoxMetaData()} ParentProps={{ ...props }}>
                                    <div className="chat-log">
                                        {GetNewsOrEmptyMessage(arrNewsData, objTextResource)}
                                    </div>
                                </WrapperComponent>
                                {state.strType !== "school" ? (state.arrForwardMessagesId.length === 0 ? GetSendMessageDiv(objTextResource) : GetForwardMessageDiv(objTextResource)) : <React.Fragment />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrap padding-bottom-20" id="bottomSpacing" />
            </div>)
    }

    return (
        <React.Fragment>
            {props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <div> </div>}
        </React.Fragment>
    );
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(TeacherNews_ModuleProcessor.StoreMapList()))(TeacherNews);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TeacherNews_ModuleProcessor; 