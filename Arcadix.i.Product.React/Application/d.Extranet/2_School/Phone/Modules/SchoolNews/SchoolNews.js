//React related imports.
import React, { useRef, useReducer } from 'react';
import { connect } from "react-redux";

//module specific imports
import * as SchoolNews_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/SchoolNews/SchoolNews_Hook';
import SchoolNews_ModuleProcessor from "@shared/Application/d.Extranet/2_School/Phone/Modules/SchoolNews/SchoolNews_ModuleProcessor";
import DisplayChat from '@root/Application/d.Extranet/2_School/Phone/Modules/SchoolNews/DisplayChat/DisplayChat';

//Common functionalities.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Components used in module.
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

/**
* @name SchoolNews
* @param {object} props props
* @summary This component displays the SchoolNews data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the grid with SchoolNews details.
*/
const SchoolNews = (props) => {

    /**
    * @summary reference of file uploader to read selected files.
    */
    const domFileUploadRef = useRef(null);

    /**
    * @name ReduceInitializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, SchoolNews_Hook.GetInitialState(props));

    /**
   * @name objContext
   * @summary Groups state, dispatch and module processor, TextResource object in objContext.
   * @returns {object} objContext
   */
    let objContext = { state, dispatch, props, ["ModuleName"]: "SchoolNews", ["SchoolNews_ModuleProcessor"]: new SchoolNews_ModuleProcessor() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.SchoolNews_ModuleProcessor.Initialize(objContext, objContext.SchoolNews_ModuleProcessor);

    /**
    * @name HookInitializer.
    * @summary Initializes the all hooks.
    */
    SchoolNews_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
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
        let objSchoolYearPeriodData = state.objSchoolYearPeriod["uSchoolYearPeriodId"] != "" ? state.objSchoolYearPeriod : arrSchoolYearPeriodData.find(x => x["iDisplayOrder"] == 1);
        setTimeout(function () {
            if (state.Reload) {
                dispatch({ type: "SET_STATE", payload: { Reload: false } });
            }
        }, 500);
        var jsxReturn =
            (
                <div className="school-news">
                    <div className="news-title">
                        <span>Mitteilungen</span>

                        {state.blnShowChat === true ? (
                            <span className="back-button" onClick={() => dispatch({ type: 'SET_STATE', payload: { blnShowChat: false } })}>
                                back
                            </span>
                        ) : (
                                <React.Fragment />
                            )}
                    </div>
                    <div className="news-chatlist">
                        <div className="news-header-padd padding-top-20" id="newsHeader">
                            <div className="news-header">
                                <PerformanceProfiler ComponentName={'NewsSchoolYearPeriodDropdown'} JConfiguration={props.JConfiguration} >
                                    <DropDown
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


                        <div className="chat-list padding-bottom-20" id="chatListParent">
                            <ul>
                                <li id="teacher" className={state.strTeacherOrPupil === "teacher" ? "selected" : ""} onClick={(event) => { objContext.SchoolNews_ModuleProcessor.SelectTeacherOrPupil(objContext, 'teacher'); }}>
                                    <div className="left-div">
                                        <img
                                            src={JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/AlleLehrpersonen_new.svg"}
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
                                        <span className="last-seen">{objTeacherLastMsg ? Localization.GetFormattedDate(objTeacherLastMsg.dtCreatedOn) : ""}</span>
                                    </div>
                                </li>
                                <li id="pupil" className={state.strTeacherOrPupil === "pupil" ? "selected" : ""} onClick={(event) => { objContext.SchoolNews_ModuleProcessor.SelectTeacherOrPupil(objContext, 'pupil'); }}>
                                    <div className="left-div">
                                        <img
                                            src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/AlleLernenden.svg"}
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
                                        <span className="last-seen">{objPupilLastMsg ? Localization.GetFormattedDate(objPupilLastMsg.dtCreatedOn) : ""}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {state.blnShowChat &&
                        <DisplayChat
                            objContext={objContext}
                            TeacherOrPupil={state.strTeacherOrPupil}
                            TextResource={objTextResource}
                            NewsData={arrNews}
                            SchoolYearPeriod={objSchoolYearPeriodData}
                            Messagetext={state.strMessagetext}
                            Ref={domFileUploadRef}
                            Reload={state.Reload}
                            props={props}
                        />
                    }
                </div>
            );

        return jsxReturn;
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(SchoolNews_ModuleProcessor.StoreMapList()))(SchoolNews);