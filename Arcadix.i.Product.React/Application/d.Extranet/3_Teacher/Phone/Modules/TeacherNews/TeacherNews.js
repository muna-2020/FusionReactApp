//React related imports.
import React, { useRef, useReducer } from 'react';
import { connect } from "react-redux";

//module specific imports
import * as TeacherNews_Hook from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherNews/TeacherNews_Hook';
import TeacherNews_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherNews/TeacherNews_ModuleProcessor";
import DisplayChat from '@root/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherNews/DisplayChat/DisplayChat';

//Common functionalities.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Components used in module.
import Dropdown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";
import * as Localization from '@root/Framework/Blocks/Localization/Localization';
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';

/**
* @name TeacherNews
* @param {object} props props
* @summary This component displays the TeacherNews data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the grid with TeacherNews details.
*/
const TeacherNews = (props) => {

    /**
    * @summary reference of file uploader to read selected files.
    */
    const domFileUploadRef = useRef(null);

    /**
    * @name ReduceInitializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TeacherNews_Hook.GetInitialState(props));

    /**
   * @name objContext
   * @summary Groups state, dispatch and module processor, TextResource object in objContext.
   * @returns {object} objContext
   */
    let objContext = { state, dispatch, props, ["ModuleName"]: "TeacherNews", ["TeacherNews_ModuleProcessor"]: new TeacherNews_ModuleProcessor() };

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
    * @name GetSchoolList
    * @summary returns the school header
    * @param {Array} arrNews News Data
    * @returns {object} jsx, React.Fragment
    */
    const GetSchoolList = (arrNews) => {
        var objlastSchoolmessage = arrNews ? arrNews[arrNews.length - 1] : {};
        let objSchool = DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + props.ClientUserDetails.TeacherDetails.uSchoolId)["Data"][0];

        return <li type="school" className={state.strType === "school" ? "selected" : ""} onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "school", "") }}>
            <div className="left-div">
                <img
                    src={ props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/School.svg" }
                    alt=""
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
    };

    /**
    * @name GetMainTeacherList
    * @summary returns the main teacher chat name.
    * @returns {object} jsx, React.Fragment
    */
    const GetMainTeacherList = () => {
        var objMainTeacher = objContext.TeacherNews_ModuleProcessor.GetMainTeacher(objContext);
        var ReturnList = [];
        if (objMainTeacher && objMainTeacher.uTeacherId) {
            let strTeacherName = objContext.TeacherNews_ModuleProcessor.GetTeacherName(objContext, objMainTeacher.uTeacherId);
            let add = false;
            if (state.searchFilter !== '') {
                if (strTeacherName.includes(state.searchFilter))
                    add = true;
            }
            else
                add = true;
            if (add) {
                var objMainTeacherLastMessage = objContext.TeacherNews_ModuleProcessor.GetTeachersLastMessage(objContext, objMainTeacher.uTeacherId);
                ReturnList = <li id={objMainTeacher.uTeacherId} type="mainteacher" className={state.strSelectedId === objMainTeacher.uTeacherId ? "selected" : ""} onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "mainteacher", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img
                            src={
                                props.JConfiguration.ExtranetSkinPath +
                                (objMainTeacher.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/MainTeacher.svg")
                            }
                            alt=""
                            className="thumbnail"
                            draggable="false"
                        />
                        <div className="text">
                            <span>
                                {objContext.TeacherNews_ModuleProcessor.GetTeacherName(objContext, objMainTeacher.uTeacherId)}
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
        return ReturnList;
    };

    /**
    * @name GetCoTeachersList
    * @summary returns the main co-teachers chat names.
    * @returns {object} jsx, React.Fragment
    */
    const GetCoTeachersList = () => {
        var arrCoTeachers = objContext.TeacherNews_ModuleProcessor.GetCoTeachers(objContext);
        var CoTeachersList = [];
        arrCoTeachers.map(objCoTeacher => {
            let add = false;
            let strTeacherName = objContext.TeacherNews_ModuleProcessor.GetTeacherName(objContext, objCoTeacher.uTeacherId);
            if (state.searchFilter !== '') {
                if (strTeacherName.includes(state.searchFilter))
                    add = true;
            }
            else
                add = true;
            if (add) {
                var objCoTeacherLastMessage = objContext.TeacherNews_ModuleProcessor.GetTeachersLastMessage(objContext, objCoTeacher.uTeacherId);
                var SingleList = <li id={objCoTeacher.uTeacherId} type="coteacher" className={state.strSelectedId === objCoTeacher.uTeacherId ? "selected" : ""} onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "coteacher", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img
                            src={
                                props.JConfiguration.ExtranetSkinPath +
                                (objCoTeacher.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/ClassTeacher.svg")
                            }
                            alt=""
                            className="thumbnail"
                            draggable="false"
                        />
                        <div className="text">
                            <span>
                                {objContext.TeacherNews_ModuleProcessor.GetTeacherName(objContext, objCoTeacher.uTeacherId)}
                            </span>
                            <p>{objCoTeacherLastMessage ? objCoTeacherLastMessage.vText : ""}</p>
                        </div>
                    </div>
                    <div className="right-div">
                        <span className="last-seen">{objCoTeacherLastMessage ? objContext.TeacherNews_ModuleProcessor.GetFormatDate(objContext, objCoTeacherLastMessage.dtCreatedOn) : ""}</span>
                    </div>
                </li>
                CoTeachersList = [...CoTeachersList, SingleList];
            }
        });
        return CoTeachersList;
    };

    /**
    * @name GetSubjectExpertsList
    * @summary returns the subject experts teachers chat names.
    * @returns {object} jsx, React.Fragment
    */
    const GetSubjectExpertsList = () => {
        var arrSubjectExperts = objContext.TeacherNews_ModuleProcessor.GetSubjectExperts(objContext);
        var SubjectExpertsLisy = [];
        arrSubjectExperts.map(objSubjectExpert => {
            let add = false;
            let strTeacherName = objContext.TeacherNews_ModuleProcessor.GetTeacherName(objContext, objSubjectExpert.uTeacherId);
            if (state.searchFilter !== '') {
                if (strTeacherName.includes(state.searchFilter))
                    add = true;
            }
            else
                add = true;
            if (add) {
                var objSubjectExpertLastMessage = objContext.TeacherNews_ModuleProcessor.GetTeachersLastMessage(objContext, objSubjectExpert.uTeacherId);
                var SingleList = <li id={objSubjectExpert.uTeacherId} type="subjectexpert" className={state.strSelectedId === objSubjectExpert.uTeacherId ? "selected" : ""} onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "subjectexpert", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img
                            src={
                                props.JConfiguration.ExtranetSkinPath +
                                (objSubjectExpert.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/SubjectExpert.svg")
                            }
                            alt=""
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
                SubjectExpertsLisy = [...SubjectExpertsLisy, SingleList];
            }
        });
        return SubjectExpertsLisy;
    };

    /**
    * @name GetGroupList
    * @param {Array} arrGroupData Group Data
    * @param {Array} arrNewsData News Data
    * @summary returns the group chat names.
    * @returns {object} jsx, React.Fragment
    */
    const GetGroupList = (arrGroupData, arrNewsData) => {
        var GroupList = [];
        if (arrGroupData) {
            arrGroupData.map(objGroupData => {
                let add = false;
                if (state.searchFilter !== '') {
                    if (objGroupData.vGroupName.includes(state.searchFilter))
                        add = true;
                }
                else
                    add = true;
                if (add) {
                    var objGroupLastMessage = objContext.TeacherNews_ModuleProcessor.GetGroupLastMessage(objGroupData.uNewsGroupId, arrNewsData);
                    var SingleList = <li id={objGroupData.uNewsGroupId} type="group" className={state.strSelectedId === objGroupData.uNewsGroupId ? "selected" : ""} onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "group", event.currentTarget.id) }}>
                        <div className="left-div">
                            <img
                                src={props.JConfiguration.ExtranetSkinPath + "/Images/Background/icon_shared_group_brown.png"}
                                alt=""
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
                    GroupList = [...GroupList, SingleList];
                }
            });
        }
        return GroupList;
    };

    /**
    * @name GetPupilList
    * @param {Array} arrPupil Pupil Data
    * @param {Array} arrNewsData News Data
    * @summary returns the pupil chat names.
    * @returns {object} jsx, React.Fragment
    */
    const GetPupilList = (arrPupil, arrNewsData) => {
        var PupilList = [];
        if (arrPupil) {
            arrPupil.map(objPupilData => {
                let add = false;
                if (state.searchFilter !== '') {
                    if ((objPupilData.vFirstName + " " + objPupilData.vName).includes(state.searchFilter))
                        add = true;
                }
                else
                    add = true;
                if (add) {
                    var objPupilLastMessage = objContext.TeacherNews_ModuleProcessor.GetPupilLastMessage(objPupilData.uPupilId, arrNewsData);
                    var SingleList = <li id={objPupilData.uPupilId} className={state.strSelectedId === objPupilData.uPupilId ? "seleceted" : ""} type="pupil" onClick={(event) => { objContext.TeacherNews_ModuleProcessor.GetSelectedMessages(objContext, "pupil", event.currentTarget.id) }}>
                        <div className="left-div">
                            <img
                                src={
                                    props.JConfiguration.ExtranetSkinPath +
                                    (objPupilData.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/profile10.png")
                                }
                                alt=""
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
                    PupilList = [...PupilList, SingleList];
                }
            });
        }
        return PupilList;
    };

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
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

        var jsxReturn =
            (
                <div className="school-news">
                    <div className="news-title">
                        <span>Mitteilungen</span>

                        {state.blnShowChat === true ? 
                            <span className="back-button" onClick={() => dispatch({ type: 'SET_STATE', payload: { blnShowChat: false } })}>
                                back
                            </span>
                            : <React.Fragment />
                        }
                    </div>
                    <div className="news-chatlist">
                        <div className="top-head">
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
                                    <PerformanceProfiler ComponentName={'NewsSchoolYearPeriodDropdown'} JConfiguration={props.JConfiguration} >
                                        <Dropdown
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
                                        onChange={(event) => { objContext.TeacherNews_ModuleProcessor.HandleActiveInactiveChange(objContext, event); }}
                                    />
                                    <span className="radio-checkmark" />
                                </label>
                                <span>{Localization.TextFormatter(objTextResource, 'Enabled')}</span>
                                <label className="label-container">
                                    <input type="radio" value="N"
                                        checked={state.strClassNewsStatus === 'N'}
                                        onChange={(event) => { objContext.TeacherNews_ModuleProcessor.HandleActiveInactiveChange(objContext, event); }}
                                    />
                                    <span className="radio-checkmark" />
                                </label>
                                <span>{Localization.TextFormatter(objTextResource, 'Disabled')}</span>
                            </div>
                        </div>

                        <div className="news-header-padd padding-top-20" id="newsHeader">
                            <div className="news-header">
                                <div className="search-box">
                                    <input type="text" name="" id="" placeholder={Localization.TextFormatter(objTextResource, 'search_placeholder')} onChange={(e) => { objContext.TeacherNews_ModuleProcessor.UpdateSearchText(objContext, e.target.value) }} />
                                    <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/search_small.png"} alt="" draggable="false" />
                                </div>
                                <button className="button brown-button new-group-button"
                                    onClick={() => { objContext.TeacherNews_ModuleProcessor.OpenAddGroupPopup(objContext, "Add"); }}
                                >
                                    <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/pluswhite.svg"} alt="" />
                                    <span>{Localization.TextFormatter(objTextResource, 'new_group')}</span>
                                </button>
                            </div>
                        </div>

                        <div className="chat-list padding-bottom-20" id="chatListParent">
                            <ul>
                                {GetSchoolList(arrNewsData)}
                                {GetMainTeacherList()}
                                {GetCoTeachersList()}
                                {GetSubjectExpertsList()}
                                {GetGroupList(arrNewsGroupData, arrNewsData)}
                                {GetPupilList(arrPupilData, arrNewsData)}
                            </ul>
                        </div>
                    </div>
                    {state.blnShowChat &&
                        <DisplayChat
                            props={props}
                            objContext={objContext}
                            TextResource={objTextResource}
                            arrNewsData={arrNewsData}
                            strType={state.strType}
                            strSelectedId={state.strSelectedId}
                            arrForwardMessagesId={state.arrForwardMessagesId}
                            objSelectedClass={state.objSelectedClass}
                            Messagetext={state.strMessagetext}
                            Ref={domFileUploadRef}
                            FileReload={state.blnFileReload}
                            Reload={state.strReloadToggle}
                            blnShowEmptyTextValidationMessage={state.blnShowEmptyTextValidationMessage}
                            ShowEmptyTextValidationMessage={() => dispatch({ type: "SET_STATE", payload: { blnShowEmptyTextValidationMessage: true } })}
                            UpdateFileReload={() => dispatch({ type: "SET_STATE", payload: { blnFileReload: false } })}
                        />
                    }
                </div>
            );

        return jsxReturn;
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment/>;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(TeacherNews_ModuleProcessor.StoreMapList()))(TeacherNews);