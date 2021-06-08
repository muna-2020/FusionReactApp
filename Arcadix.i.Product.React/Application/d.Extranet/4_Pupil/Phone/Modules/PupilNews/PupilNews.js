//React related imports.
import React, { useRef, useReducer, useEffect } from 'react';
import { connect } from "react-redux";

//module specific imports
import * as PupilNews_Hook from '@shared/Application/d.Extranet/4_Pupil/Phone/Modules/PupilNews/PupilNews_Hook';
import PupilNews_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/Phone/Modules/PupilNews/PupilNews_ModuleProcessor';
import DisplayChat from '@root/Application/d.Extranet/4_Pupil/Phone/Modules/PupilNews/DisplayChat/DisplayChat';

//Common functionalities.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Components used in module.
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

/**
* @name PupilNews
* @param {object} props props
* @summary This component displays the PupilNews data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the grid with PupilNews details.
*/
const PupilNews = (props) => {

    /**
    * @summary reference of file uploader to read selected files.
    */
    const domFileUploadRef = useRef(null);

    /**
    * @name ReduceInitializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilNews_Hook.GetInitialState(props));

    /**
   * @name objContext
   * @summary Groups state, dispatch and module processor, TextResource object in objContext.
   * @returns {object} objContext
   */
    let objContext = { state, dispatch, props, ["ModuleName"]: "PupilNews", ["PupilNews_ModuleProcessor"]: new PupilNews_ModuleProcessor() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.PupilNews_ModuleProcessor.Initialize(objContext, objContext.PupilNews_ModuleProcessor);

    /**
    * @name Resize
    * @summary dispatches the resize event.
    */
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, [state.strSelectedId]);

    /**
    * @name HookInitializer.
    * @summary Initializes the all hooks.
    */
    PupilNews_Hook.Initialize(objContext);

    /**
    * @name GetSchoolList
    * @summary returns the school header
    * @param {any} arrNews
    */
    const GetSchoolList = (arrNews, objClassPupil) => {
        let objSchool = DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + objClassPupil.uSchoolId)["Data"][0];
        var objlastSchoolMessage = arrNews ? arrNews.find(x => x["uUserId"] == objSchool.uSchoolId) : {};
        return <li type="school" className={state.strType === "school" ? "active" : ""} onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "school", "") }}>
            <div className="left-div">
                <img
                    src={ props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/School.svg" }
                    alt=""
                    className="thumbnail"
                />
                <div className="text">
                    <span>
                        <b>{objSchool.vFirstName + " " + objSchool.vName}</b>
                    </span>
                    <p>{objlastSchoolMessage ? objlastSchoolMessage.vText : ''}</p>
                </div>
            </div>
            <div className="right-div">
                <span className="last-seen">{objlastSchoolMessage ? objContext.PupilNews_ModuleProcessor.GetFormatDate(objContext, objlastSchoolMessage.dtCreatedOn) : ''}</span>
            </div>
        </li>
    };

    /**
    * @name GetMainTeacherList
    * @summary returns the main teacher chat name.
    * */
    const GetMainTeacherList = () => {
        var objMainTeacher = objContext.PupilNews_ModuleProcessor.GetMainTeacher(objContext);
        var ReturnLi = [];
        if (objMainTeacher && objMainTeacher.uTeacherId) {
            let strTeacherName = objContext.PupilNews_ModuleProcessor.GetTeacherName(objContext, objMainTeacher.uTeacherId);
            let add = false;
            if (state.searchFilter != '') {
                if (strTeacherName.includes(state.searchFilter))
                    add = true;
            }
            else
                add = true;
            if (add) {
                var objMainTeacherLastMessage = objContext.PupilNews_ModuleProcessor.GetTeachersLastMessage(objContext, objMainTeacher.uTeacherId);
                ReturnLi = <li id={objMainTeacher.uTeacherId} type="mainteacher" className={state.strSelectedId === objMainTeacher.uTeacherId ? "active" : ""} onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "mainteacher", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img
                            src={
                                props.JConfiguration.ExtranetSkinPath +
                                (objMainTeacher.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/MainTeacher.svg")
                            }
                            alt=""
                            className="thumbnail"
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
    * @name GetCoTeachersList
    * @summary returns the main co-teachers chat names.
    * */
    const GetCoTeachersList = () => {
        var arrCoTeachers = objContext.PupilNews_ModuleProcessor.GetCoTeachers(objContext);
        var CoTeachersLis = [];
        arrCoTeachers.map(objCoTeacher => {
            let add = false;
            let strTeacherName = objContext.PupilNews_ModuleProcessor.GetTeacherName(objContext, objCoTeacher.uTeacherId)
            if (state.searchFilter != '') {
                if (strTeacherName.includes(state.searchFilter))
                    add = true;
            }
            else
                add = true;
            if (add) {
                var objCoTeacherLastMessage = objContext.PupilNews_ModuleProcessor.GetTeachersLastMessage(objContext, objCoTeacher.uTeacherId);
                var SingleLi = <li id={objCoTeacher.uTeacherId} type="coteacher" className={state.strSelectedId === objCoTeacher.uTeacherId ? "active" : ""} onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "coteacher", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img
                            src={
                                props.JConfiguration.ExtranetSkinPath +
                                (objCoTeacher.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/ClassTeacher.svg")
                            }
                            alt=""
                            className="thumbnail"
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
     * @name GetSubjectExpertsList
     * @summary returns the subject experts teachers chat names.
     * */
    const GetSubjectExpertsList = () => {
        var arrSubjectExperts = objContext.PupilNews_ModuleProcessor.GetSubjectExperts(objContext);
        var SubjectExpertsLis = [];
        arrSubjectExperts.map(objSubjectExpert => {
            let add = false;
            let strTeacherName = objContext.PupilNews_ModuleProcessor.GetTeacherName(objContext, objSubjectExpert.uTeacherId)
            if (state.searchFilter != '') {
                if (strTeacherName.includes(state.searchFilter))
                    add = true;
            }
            else
                add = true;
            if (add) {
                var objSubjectExpertLastMessage = objContext.PupilNews_ModuleProcessor.GetTeachersLastMessage(objContext, objSubjectExpert.uTeacherId);
                var SingleLi = <li id={objSubjectExpert.uTeacherId} type="subjectexpert" className={state.strSelectedId === objSubjectExpert.uTeacherId ? "active" : ""} onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "subjectexpert", event.currentTarget.id) }}>
                    <div className="left-div">
                        <img
                            src={
                                props.JConfiguration.ExtranetSkinPath +
                                (objSubjectExpert.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/SubjectExpert.svg")
                            }
                            alt=""
                            className="thumbnail"
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
    * @name GetGroupList
    * @summary returns the group chat names.
    * */
    const GetGroupList = (objContext, arrGroupData, arrNewsData) => {
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
                    var objGroupLastMessage = objContext.PupilNews_ModuleProcessor.GetGroupLastMessage(objGroupData.uNewsGroupId, arrNewsData);
                    var SingleLi = <li id={objGroupData.uNewsGroupId} type="group" className={state.strSelectedId === objGroupData.uNewsGroupId ? "active" : ""} onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "group", event.currentTarget.id) }}>
                        <div className="left-div">
                            <img
                                src={props.JConfiguration.ExtranetSkinPath + "/Images/Background/icon_shared_group_brown.png"}
                                alt=""
                                className="thumbnail"
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
    * @name GetPupilList
    * @summary returns the pupil chat names.
    * */
    const GetPupilList = (objContext, arrPupil, arrNewsData) => {
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
                    var objPupilLastMessage = objContext.PupilNews_ModuleProcessor.GetPupilLastMessage(objPupilData.uPupilId, arrNewsData);
                    var SingleLi = <li id={objPupilData.uPupilId} className={state.strSelectedId === objPupilData.uPupilId ? "active" : ""} type="pupil" onClick={(event) => { objContext.PupilNews_ModuleProcessor.GetSelectedMessages(objContext, "pupil", event.currentTarget.id) }}>
                        <div className="left-div">
                            <img
                                src={
                                    props.JConfiguration.ExtranetSkinPath +
                                    (objPupilData.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/profile10.png")
                                }
                                alt=""
                                className="thumbnail"
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
                    PupilLis = [...PupilLis, SingleLi];
                }
            });
        }
        return PupilLis;
    };

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        let objClassPupil = objContext.PupilNews_ModuleProcessor.GetPupilClass(props);
        let strClassId = objClassPupil.uClassId;
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilNews", props);
        let arrSchoolYearPeriodData = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod)["Data"];
        let arrAllNewsData = DataRef(props.Extranet_Pupil_PupilNews_Module, "Extranet_Pupil_PupilNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N")["Data"];
        let arrNewsData = [];
        if (arrAllNewsData == undefined)
            arrNewsData = [];
        else
            arrNewsData = arrAllNewsData.filter(objNews => objNews.cIsDeleted == 'N');
        let arrAllNewsGroupData = DataRef(props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
        let arrNewsGroupData = [];
        if (arrAllNewsGroupData)
            arrNewsGroupData = arrAllNewsGroupData.filter(grp => grp.cIsDeleted == 'N');
        let arrPupilData = DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId)["Data"];

        let objSchoolYearPeriodDropdownData = {
            DropdownData: arrSchoolYearPeriodData,
            SelectedValue: arrSchoolYearPeriodData[0]["uSchoolYearPeriodId"]
        };

        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100)

        var jsxReturn =
            (
                <div className="school-news">
                    <div className="news-title">
                        <span>Mitteilungen</span>

                        {state.blnShowChat === true ? 
                            <span className="back-button" onClick={() => dispatch({ type: 'SET_STATE', payload: { blnShowChat: false } })}>
                                back
                            </span>
                         : <React.Fragment />}
                    </div>
                    <div className="news-chatlist">
                        <div className="news-header">
                            <div className="search-box">
                                <input type="text" name="" id="" placeholder="Suchen" onChange={(e) => { objContext.PupilNews_ModuleProcessor.UpdateSearchText(objContext, e.target.value) }} />
                                <img src={ props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/search_small.png" } alt="" />
                            </div>

                            <button className="button new-group-button" onClick={() => {
                                objContext.PupilNews_ModuleProcessor.OpenAddGroupPopup(objContext, "Add");
                            }}>
                                <img src={ props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/pluswhite.svg" } alt="" />
                                <span>{Localization.TextFormatter(objTextResource, 'NewContactOrGroup')}</span>
                            </button>
                        </div>
                        <div className="top-head">
                            <div className="content-dropdown">
                                <span>{Localization.TextFormatter(objTextResource, 'SchoolYear')}</span>
                                <PerformanceProfiler ComponentName={'PupilNewsSchoolYearPeriodDropdown'} JConfiguration={props.JConfiguration} >
                                    <DropDown
                                        Id="PupilNewsSchoolYearPeriodDropdown"
                                        Meta={objContext.PupilNews_ModuleProcessor.GetMetaDataSchoolYearPeriodDropdown()}
                                        Data={objSchoolYearPeriodDropdownData}
                                        Resource={objContext.PupilNews_ModuleProcessor.GetResourceDataSchoolYearPeriodDropdown()}
                                        Events={objContext.PupilNews_ModuleProcessor.GetEventsDataSchoolYearPeriodDropdown(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                        </div>


                        <div className="chat-list padding-bottom-20" id="chatListParent">
                            <ul>
                                {GetSchoolList(arrNewsData, objClassPupil)}
                                {GetMainTeacherList()}
                                {GetCoTeachersList()}
                                {GetSubjectExpertsList()}
                                {GetGroupList(objContext, arrNewsGroupData, arrNewsData)}
                                {GetPupilList(objContext, arrPupilData, arrNewsData)}
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
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilNews_ModuleProcessor.StoreMapList()))(PupilNews);