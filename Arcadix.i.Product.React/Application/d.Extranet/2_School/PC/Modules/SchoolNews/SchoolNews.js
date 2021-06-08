//React imports
import React, { useReducer, useRef, useEffect } from "react";
import { connect } from "react-redux";

//Module specific imports
import * as SchoolNews_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolNews/SchoolNews_Hook';
import SchoolNews_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolNews/SchoolNews_ModuleProcessor';

//Components used in module.
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';

//Inline Images import
import imgAlleLehrperson from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/SchoolNews/AlleLehrpersonen_new.svg?inline';
import imgLernende from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/SchoolNews/AlleLernenden.svg?inline';

const SchoolNews = props => {

    /**
     * @summary reference of file uploader to read selected files.
     * */
    const domFileUploadRef = useRef(null);

    const textMessageRef = useRef(null);

    /**
    * @name ReduceInitializer.
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, SchoolNews_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Combines state, props and dispatch to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "SchoolNews", ["SchoolNews_ModuleProcessor"]: new SchoolNews_ModuleProcessor() };

    useEffect(() => {
        if (state.isLoadComplete) {
            window.dispatchEvent(new Event('resize'));
        }
    }, [state.objSchoolYearPeriod]);


    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    SchoolNews_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.SchoolNews_ModuleProcessor.Initialize(objContext, objContext.SchoolNews_ModuleProcessor);

    /**
     * @summary returns the attachment elements of message.
     * @param {any} props
     * @param {any} arrNewsAttachment
     * @returns {Element}
     */
    const GetAttachMent = (props, arrNewsAttachment) => {
        var arrAttachmentDiv = [];
        arrNewsAttachment.map(objAttachment => {
            arrAttachmentDiv.push(
                <label className="attached-file">
                    <a href={props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objAttachment.vFileId + "&Type=News&DisplayFileName=" + objAttachment.vAttachmentFileName} >
                        <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/attachment.png"} alt="" />
                        <span className="attached-file-name">{objAttachment.vAttachmentFileName}</span>
                    </a>
                </label>
            );
        })
        return arrAttachmentDiv;
    }

    /**
     * @name GetMessage
     * @summary returns the array of message.
     * @param {any} arrNews
     * @returns {Array}
     */
    const GetMessage = (arrNews) => {
        var arrMessageDiv = [];
        arrNews.map(objNews => {
            arrMessageDiv.push(
                <div className="chat-baloon sent">
                    <span className="time">{ConvertDate(objNews.dtCreatedOn)}</span>
                    <div className="baloon-flex">
                        <div className="icons">
                            <img onClick={(event) => { objContext.SchoolNews_ModuleProcessor.OpenDeleteConfirmationPopup(objContext, objNews) }} id={objNews.uNewsId} src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_small.png"} alt="" />
                        </div>
                        <div className="baloon">
                            <p>
                                {objNews.vText}
                            </p>
                            {GetAttachMent(props, objNews.t_LearnCoacher_News_Attachment)}
                        </div>
                    </div>
                </div>
            );
        })
        return arrMessageDiv;
    }

    /**
     * @name GetNewsOrEmptyMessage
     * @summary returns the messages or no messages text.
     * @param {any} arrNews
     * @param {any} objTextResource
     */
    let GetNewsOrEmptyMessage = (arrNews, objTextResource) => {
        if (arrNews && arrNews.length > 0) {
            let arrMessages = GetMessage(arrNews, objTextResource);
            if (arrMessages.length > 0)
                return arrMessages;
            else
                return <span>{Localization.TextFormatter(objTextResource, 'NoMessagesText')}</span>
        } else {
            return <span>{Localization.TextFormatter(objTextResource, 'NoMessagesText')}</span>
        }
    }

    /**
     * @summary right section of module.
     * @param {any} arrNews
     * @param {any} objTextResource
     */
    const GetNewsRight = (arrNews, objTextResource, objSchoolYearPeriodData) => {
        setTimeout(function () {
            if (state.Reload) {
                dispatch({ type: "SET_STATE", payload: { Reload: false } });
            }
        }, 500);
        return (
            <div className="news-right">
                <div className="chat-head-padd padding-top-20" id="chatBoxHeader">
                    <div className="chat-recipient">
                        <img
                            src={state.strTeacherOrPupil === "teacher" ? imgAlleLehrperson : imgLernende}
                            alt=""
                        />
                        <span>{state.strTeacherOrPupil === "teacher" ? Localization.TextFormatter(objTextResource, 'all_teacher') : Localization.TextFormatter(objTextResource, 'all_student')}</span>
                    </div>
                </div>

                <div className="chat-box">
                    <div className="chat-padding">
                        <WrapperComponent
                            ComponentName={"FillHeight"}
                            Id="FillHeightSchoolGetNewsRight" Meta={objContext.SchoolNews_ModuleProcessor.GetMetaDataSchoolGetNewsRight()} ParentProps={{ ...props }}>
                            <div className="chat-log">
                                {GetNewsOrEmptyMessage(arrNews, objTextResource)}
                            </div>
                        </WrapperComponent>
                        <div className="chat-controls" id="chatBoxFooter">

                            {state.objSchoolYearPeriod.uSchoolYearPeriodId == "" || objSchoolYearPeriodData["iDisplayOrder"] == 1 ?
                                <div className="chat-controls-bg">
                                    <textarea id="TextAreaMessageInput" ref={textMessageRef} className="send-message" placeholder={Localization.TextFormatter(objTextResource, 'write_a_message')} value={state.strMessagetext} onChange={() => { objContext.SchoolNews_ModuleProcessor.MessageTextChangeHandler(objContext, event.target.value) }} />
                                    <PerformanceProfiler ComponentName={'NewsUploadComponent'} JConfiguration={props.JConfiguration} >
                                        <div ref={domFileUploadRef} className="control-flex">
                                            <PerformanceProfiler ComponentName={"FileUpload_SchoolNews"} JConfiguration={props.JConfiguration} >
                                                <FileUpload
                                                    Id="FileUpload_SchoolNews"
                                                    ref={domFileUploadRef}
                                                    Resource={objContext.SchoolNews_ModuleProcessor.GetResourceData(objTextResource)}
                                                    Meta={objContext.SchoolNews_ModuleProcessor.GetMetaData()}
                                                    CallBacks={{ OnUploadComplete: (eventFile, arrFilteredFiles) => { window.dispatchEvent(new Event('resize')); dispatch({ type: 'SET_STATE', payload: { blnShowEmptyTextValidationMessage: false } }) } }}
                                                    ParentProps={{ ...props }}
                                                    Data={{
                                                        Reload: state.Reload,
                                                        FileUpload: []
                                                    }}
                                                />
                                            </PerformanceProfiler>
                                        </div>
                                        <div ref={domFileUploadRef} className="control-flex send-button-flex">
                                            {state.blnShowEmptyTextValidationMessage && <span>{Localization.TextFormatter(objTextResource, 'ValidationMessage')}</span>}
                                            <button className="send button brown-button" onClick={() => {
                                                let strFile = domFileUploadRef.current.GetUploadedFileDetails ? domFileUploadRef.current.GetUploadedFileDetails() : '[]';
                                                let arrFile = JSON.parse(strFile);
                                                if (state.strMessagetext !== "" || (arrFile && arrFile.length > 0)) {
                                                    window.dispatchEvent(new Event('resize'));
                                                    objContext.SchoolNews_ModuleProcessor.SendMessage(objContext, strFile)
                                                }
                                                else {
                                                    //document.getElementById("TextAreaMessageInput").focus();
                                                    textMessageRef.current.focus();
                                                    dispatch({ type: "SET_STATE", payload: { blnShowEmptyTextValidationMessage: true } });
                                                }
                                            }}
                                            >
                                                {Localization.TextFormatter(objTextResource, 'send')}
                                            </button>
                                        </div>
                                    </PerformanceProfiler>
                                </div>
                                : <React.Fragment />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * @name ConvertDate
     * @summary converts the date to language cultutre.
     * @param {any} strDate
     */
    const ConvertDate = (strDate) => {
        return new Date(strDate).toLocaleDateString(props.JConfiguration.LanguageCultureInfo, { year: "numeric", month: "2-digit", day: "2-digit" })
    }

    /**
     * @name GetContent
     * @summary returns the required jsx for component
     * @param {any} props
     * @returns {Element}
     */
    const GetContent = (props) => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolNews", props);
        let objData = objContext.SchoolNews_ModuleProcessor.GetNewsByType(objContext);
        let arrNews = objData.arrNews;
        let objTeacherLastMsg = objData.objTeacherLastMsg;
        let objPupilLastMsg = objData.objPupilLastMsg;

        let arrSchoolYearPeriodData = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        let strSchoolYearPeriodId = "00000000-0000-0000-000000000000";
        if (arrSchoolYearPeriodData === undefined)
            arrSchoolYearPeriodData = [];
        else
            strSchoolYearPeriodId = arrSchoolYearPeriodData[0]["uSchoolYearPeriodId"];

        let objSchoolYearPeriodDropdownData = {
            DropdownData: arrSchoolYearPeriodData,
            SelectedValue: strSchoolYearPeriodId
        };
        let objSchoolYearPeriodData = state.objSchoolYearPeriod ? state.objSchoolYearPeriod : arrSchoolYearPeriodData.find(x => x["iDisplayOrder"] == 1);
        if (arrNews !== undefined) {
            return (
                <div className="light-brown-bg">
                    <div className="news-flex">
                        <div className="news-left">
                            <div className="news-header-padd padding-top-20" id="newsHeader">
                                <div className="news-header">
                                    <span>{Localization.TextFormatter(objTextResource, 'SchoolYear')}</span>
                                    <div className="content-dropdown">
                                        <PerformanceProfiler ComponentName={'NewsSchoolYearPeriodDropdown'} JConfiguration={props.JConfiguration} >
                                            <WrapperComponent
                                                ComponentName={"Dropdown"}
                                                Id="SchoolDocumentDropdown"
                                                Meta={objContext.SchoolNews_ModuleProcessor.GetMetaDataSchoolYearPeriodDropdown()}
                                                Data={objSchoolYearPeriodDropdownData}
                                                Resource={objContext.SchoolNews_ModuleProcessor.GetResourceDataSchoolYearPeriodDropdown()}
                                                Events={objContext.SchoolNews_ModuleProcessor.GetEventsDataSchoolYearPeriodDropdown(objContext)}
                                                ParentProps={{ ...props }}
                                            />
                                        </PerformanceProfiler>
                                    </div>
                                </div>
                            </div>

                            <div className="chat-list padding-bottom-20" id="chatListParent">
                                <WrapperComponent
                                    ComponentName={"FillHeight"}
                                    Id="FillHeightSchoolNews"
                                    Meta={objContext.SchoolNews_ModuleProcessor.GetMetaDataSchoolNews()}
                                    ParentProps={{ ...props }}
                                >
                                    <ul>
                                        <li id="teacher" className={state.strTeacherOrPupil === "teacher" ? "selected" : ""} onClick={(event) => { objContext.SchoolNews_ModuleProcessor.SelectTeacherOrPupil(objContext, 'teacher'); }}>
                                            <div className="left-div">
                                                <img
                                                    src={imgAlleLehrperson}
                                                    alt=""
                                                    className="thumbnail"
                                                />
                                                <div className="text">
                                                    <span>
                                                        {Localization.TextFormatter(objTextResource, 'all_teacher')}
                                                    </span>
                                                    <p>{objTeacherLastMsg ? objTeacherLastMsg.vText : ""}</p>
                                                </div>
                                            </div>
                                            <div className="right-div">
                                                <span className="last-seen">{objTeacherLastMsg && objTeacherLastMsg.dtCreatedOn ? ConvertDate(objTeacherLastMsg.dtCreatedOn) : ""}</span>
                                            </div>
                                        </li>
                                        <li id="pupil" className={state.strTeacherOrPupil === "pupil" ? "selected" : ""} onClick={(event) => { objContext.SchoolNews_ModuleProcessor.SelectTeacherOrPupil(objContext, 'pupil'); }}>
                                            <div className="left-div">
                                                <img
                                                    src={imgLernende}
                                                    alt=""
                                                    className="thumbnail"
                                                />
                                                <div className="text">
                                                    <span>
                                                        {Localization.TextFormatter(objTextResource, 'all_student')}
                                                    </span>
                                                    <p>{objPupilLastMsg ? objPupilLastMsg.vText : ""}</p>
                                                </div>
                                            </div>
                                            <div className="right-div">
                                                <span className="last-seen">{objPupilLastMsg && objPupilLastMsg.dtCreatedOn ? ConvertDate(objPupilLastMsg.dtCreatedOn) : ""}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </WrapperComponent>
                            </div>
                        </div>
                        {GetNewsRight(arrNews, objTextResource, objSchoolYearPeriodData)}
                    </div>
                    <div className="wrap padding-bottom-20" id="bottomSpacing" />
                </div>
            );
        }
        else
            return <React.Fragment />;

    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <React.Fragment />;
};

/**
 * @name Connector
 * @summary connects component to store.
 * */
export default connect(ExtranetBase_Hook.MapStoreToProps(SchoolNews_ModuleProcessor.StoreMapList()))(SchoolNews);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SchoolNews_ModuleProcessor; 