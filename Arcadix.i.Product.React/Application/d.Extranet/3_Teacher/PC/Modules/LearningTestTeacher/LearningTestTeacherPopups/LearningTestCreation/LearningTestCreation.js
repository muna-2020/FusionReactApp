//React imports
import React, { useReducer, useEffect, useRef } from "react";
import { connect } from "react-redux";

//Module specific imports
import LearningTestCreation_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestCreation/LearningTestCreation_ModuleProcessor";
import * as LearningTestCreation_Hook from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestCreation/LearningTestCreation_Hook";
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

//controls
import CompileTasks from "@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/CompileTasks/CompileTasks";
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import ExclamationMarkImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/exclamation_mark.svg?inline';
import AngleDownImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_down.svg?inline';
import DocumentExerciseImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestCreation/document_exercise_2.svg?inline';

/**
 * @name LearningTestCreation
 * @summary learning test creation popup.
 * @param {any} props
 */
const LearningTestCreation = props => {

    const editSelectedTasksRef = useRef(null)

    /**
    * @name Reduce Initializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, LearningTestCreation_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["LearningTestCreation_ModuleProcessor"]: new LearningTestCreation_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    LearningTestCreation_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.LearningTestCreation_ModuleProcessor.Initialize(objContext, objContext.LearningTestCreation_ModuleProcessor);

    useEffect(() => {
        if (state && state.arrSelectedTasks.length > 0) {
            document.getElementById("edit-selected-tasks").setAttribute("style", "display:block");
            editSelectedTasksRef.current.setAttribute("style", "display:block");
            window.dispatchEvent(new Event('resize'));
        }
        else {
            //if (document.getElementById("edit-selected-tasks")) {
            //    document.getElementById("edit-selected-tasks").setAttribute("style", "display:none");
            //}

            if (editSelectedTasksRef.current) {
                editSelectedTasksRef.current.setAttribute("style", "display:none");
            }
        }
    }, [state.arrSelectedTasks]);

    function ToggleDataDisplayOnDownArrowClick(strFieldId) {
        let strCurrentStyle = document.getElementById(strFieldId).getAttribute("style");
        strCurrentStyle = strCurrentStyle;
        let strNextStyle = "";
        if (strCurrentStyle === "display: none;") {
            strNextStyle = "display: block;";
        }
        else {
            strNextStyle = "display: none;";
        }
        document.getElementById(strFieldId).setAttribute("style", strNextStyle);
    }

    function GetNTCheckBox(objTextResource) {
        let blnShowAsSelected = false;
        if (state.blnIsNTCheckBoxSelected) {
            blnShowAsSelected = true;
        }
        let blnShowNTCheckBox = state.intSelectedParentSubjectId == 7021;
        return (blnShowNTCheckBox ?
            <div id="div_NTCheckBox" className={blnShowNTCheckBox ? "nt-block ShowNTCheckBox" : "nt-block HideNTCheckBox"}>
                {blnShowAsSelected ?
                    <label className="nt-checkbox">
                        <input
                            type="checkbox"
                            onClick={() => {
                                objContext.LearningTestCreation_ModuleProcessor.OnChangeNTSpecialCheckBox(objContext, false);
                            }}
                            checked
                        />
                        <span className="checkmark" />
                    </label>
                    : <label className="nt-checkbox">
                        <input
                            type="checkbox"
                            onClick={() => {
                                objContext.LearningTestCreation_ModuleProcessor.OnChangeNTSpecialCheckBox(objContext, true);
                            }}
                        />
                        <span className="checkmark" />
                    </label>
                }
                <span>
                    {Localization.TextFormatter(objTextResource, 'NTThemeSelection')}
                </span>

                <div className="hover-title">
                    <img src={ExclamationMarkImage} />
                    <span>
                        {Localization.TextFormatter(objTextResource, 'NTHelpText')}
                    </span>
                </div>
            </div> : <div></div>)

    }

    function GetCategoryCompetencyJsxData(objTextResource, objCategoryCompetencyDetails, objCategoryDetails) {
        let blnShowAsSelected = false;
        if (state.arrSelectedCategoryCompetencyId.filter(intTempCategoryCompetencyId => intTempCategoryCompetencyId === objCategoryCompetencyDetails["iCategoryCompetencyId"]).length > 0) {
            blnShowAsSelected = true;
        }
        return (
            <div className="task-item-flex">
                <div className="task-item-left">
                    <label className="check-container">
                        {
                            blnShowAsSelected ?
                                <input type="checkbox" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.OnChangeCheckBoxForCompetencyCategory(objContext, null, objCategoryDetails["iCategoryId"], false, objCategoryCompetencyDetails["iCategoryCompetencyId"]) }} checked /> :
                                <input type="checkbox" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.OnChangeCheckBoxForCompetencyCategory(objContext, null, objCategoryDetails["iCategoryId"], true, objCategoryCompetencyDetails["iCategoryCompetencyId"]) }} />
                        }
                        <span className="checkmark" />
                    </label>
                    <span>
                        {objCategoryCompetencyDetails["t_TestDrive_Category_Competency_Data"][0]["tCompetencyText"]}
                    </span>
                </div>
            </div>
        );
    }
    function GetCategoryJsx(arrCategoryData, objTextResource) {
        {
            arrCategoryData && arrCategoryData.length > 0 ?
                arrCategoryData.map(objTempData => {
                    return GetCategoryJsxData(objTextResource, objTempData);
                }) :
                <p>
                    {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupSubejctAndCompetencyLevelDescription')}
                </p>
        }
    }

    function GetCategoryJsxData(objTextResource, objCategoryDetails) {
        let objCategoryDataDetails = objCategoryDetails["t_TestDrive_Category_Data"].filter(objTempCategortData => objTempCategortData["iLanguageId"] === parseInt(props.JConfiguration.InterfaceLanguageId))[0];
        let blnIsSelectAll = false;
        if (state.arrSelectedCategoryId.filter(intTempCategoryId => intTempCategoryId === objCategoryDetails["iCategoryId"]).length > 0) {
            blnIsSelectAll = true;
        }
        let arrCategoryCompetencyData = objContext.LearningTestCreation_ModuleProcessor.GetCategoryCompetencyData(objContext, objCategoryDetails["iCategoryId"]);
        let strCompetencyDivId = "div_CategoryCompetency_" + objCategoryDetails["iCategoryId"];
        return (
            <div className="task-item">
                <div className="task-item-flex">
                    <div className="task-item-left">
                        <label className="check-container">
                            {
                                blnIsSelectAll ?
                                    <input type="checkbox" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.OnChangeCheckBoxForCompetencyCategory(objContext, false, objCategoryDetails["iCategoryId"], null, null); }} checked /> :
                                    <input type="checkbox" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.OnChangeCheckBoxForCompetencyCategory(objContext, true, objCategoryDetails["iCategoryId"], null, null); }} />
                            }
                            <span className="checkmark" />
                        </label>
                        <span>
                            {objCategoryDataDetails["vCategoryName"]}
                        </span>
                    </div>
                    {
                        objContext.state.blnIsNTCheckBoxSelected
                            ? <span></span>
                            : <img src={AngleDownImage} onClick={() => { ToggleDataDisplayOnDownArrowClick(strCompetencyDivId); }} />
                    }
                </div>
                {
                    objContext.state.blnIsNTCheckBoxSelected
                        ? <div></div> :
                        <div id={strCompetencyDivId} className="task-sub-item" style={blnIsSelectAll ? { "display": "block" } : { "display": "none" }}>
                            <p>
                                {objTextResource["LearningTestCreationPopupCompetencyCategoryTitle"]}
                            </p>
                            {
                                arrCategoryCompetencyData.map(objTempData => {
                                    return GetCategoryCompetencyJsxData(objTextResource, objTempData, objCategoryDetails)
                                })
                            }
                        </div>
                }
            </div>
        );
    }

    function GetPupilJsxData(objTextResource, objPupilDetails) {
        let blnShowAsSelected = false;
        if (state.arrSelectedPupilId.length > 0 && state.arrSelectedPupilId.filter(strTempPupilId => strTempPupilId === objPupilDetails["uPupilId"]).length > 0) {
            blnShowAsSelected = true;
        }
        // let strDivId = "div_PupilName";
        return (
            <div className="task-sub-item">
                <div className="task-item-flex">
                    <div className="task-item-left">
                        <label className="check-container">
                            {
                                blnShowAsSelected ?
                                    <input type="checkbox" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.OnChangeCheckBoxForPupil(objContext, false, objPupilDetails["uPupilId"]) }} checked /> :
                                    <input type="checkbox" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.OnChangeCheckBoxForPupil(objContext, true, objPupilDetails["uPupilId"]) }} />
                            }
                            <span className="checkmark" />
                        </label>
                        <span>
                            {objPupilDetails["vName"]} {objPupilDetails["vFirstName"]}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    function GetPupilGroupJsxData(objLearningTestPupilGroupDetails) {
        let objData = objLearningTestPupilGroupDetails["t_TestDrive_LearningTest_PupilGroup_Data"].filter(objTempData => objTempData["iLanguageId"] === parseInt(props.JConfiguration.InterfaceLanguageId))[0];
        let blnShowAsSelected = false;
        if (state.arrSelectedPupilGroupId.filter(strTempId => strTempId === objLearningTestPupilGroupDetails["uPupilGroupId"]).length > 0) {
            blnShowAsSelected = true;
        }
        return (
            <div className="task-item">
                <div className="task-item-flex">
                    <div className="task-item-left">
                        <label className="check-container">
                            {
                                blnShowAsSelected ?
                                    <input type="checkbox" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.OnChangeCheckBoxForGroup(objContext, false, objLearningTestPupilGroupDetails["uPupilGroupId"]) }} checked /> :
                                    <input type="checkbox" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.OnChangeCheckBoxForGroup(objContext, true, objLearningTestPupilGroupDetails["uPupilGroupId"]) }} />
                            }
                            <span className="checkmark" />
                        </label>
                        <span>
                            {objData["vPupilGroupName"]} ({objLearningTestPupilGroupDetails["t_TestDrive_LearningTest_PupilGroup_Pupils"].length})
            </span>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @summary returns the required jsx for component
     */
    function GetContent() {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestTeacher", props)
        let iStateId = GetStateIdBasedOnSchool(ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrClassData = objContext.LearningTestCreation_ModuleProcessor.GetClassDropDownData(objContext, objTextResource);
        let strClassName = JSON.stringify(state.objSelectedClassData) !== "{}" ? state.objSelectedClassData.vClassName : arrClassData[0].Data[0].vClassName;
        let arrLearningTestPupilGroupData = objContext.LearningTestCreation_ModuleProcessor.GetLearningTestPupilGroupData(objContext);
        let strTestName = objContext.LearningTestCreation_ModuleProcessor.GetTestName(objContext);

        let intAvailableTaskCount = state.arrTasks.length;
        let intSelectedTasksCount = 0;
        if (state.arrSelectedTasks.length > 0) {
            state.arrSelectedTasks.forEach(objTempData => {
                intSelectedTasksCount += objTempData["NoOfTasks"];
            });
        }
        let intSelectedSubSubjectId = state.intSelectedSubSubjectId ? state.intSelectedSubSubjectId : props.Data.intSelectedSubSubjectId;
        let arrPupilData = [];
        //let strClassId = JSON.stringify(state.objSelectedClassData) === "{}" ? ApplicationState.GetProperty("SelectedClassId") : state.objSelectedClassData["uClassId"];
        let strClassId = "";
        if (state.objSelectedClassData["uClassId"] != undefined) {
            strClassId = state.objSelectedClassData["uClassId"];
            arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId).Data
        }
        let arrCategoryData = [];
        if (state.blnIsNTCheckBoxSelected && intSelectedSubSubjectId != -1) {
            arrCategoryData = objContext.LearningTestCreation_ModuleProcessor.GetCategoryDataForNTSubject(objContext);
        } else {
            arrCategoryData = DataRef(props.Object_Intranet_Taxonomy_Category, "Object_Intranet_Taxonomy_Category;iSubjectId;" + intSelectedSubSubjectId + ";cIsDeleted;N").Data
        }
        return (
            <div className="learning-test-creation-popup">
                <div className="learning-test-creation-header" id="LearningTestCreationHeader">
                    <div className="learning-test-creation-header-left">
                        <span>
                            {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupHeading')}
                        </span>
                    </div>
                    <span className="close" onClick={(e) => { Popup.ClosePopup(props.Id); ApplicationState.SetProperty("blnShowAnimation", false) }}>
                        {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupCloseButtonText')}
                        <img src={CloseImage} alt="" />
                    </span>
                </div>
                <div className="bread-crumb" id="BreadCrumb">
                    <span className={state.Tab == 2 || state.Tab == 1 ? "button1 active" : "button1"} onClick={() => { objContext.LearningTestCreation_ModuleProcessor.HandleTaskDetails(objContext) }}>
                        <b>
                            {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupNavigationFirstTabCountText')}
                        </b>
                        {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupNavigationFirstTabText')}
                    </span>
                    <span className={state.Tab == 3 ? "button2 active" : "button2"} onClick={() => { objContext.LearningTestCreation_ModuleProcessor.HandleDetermineBlock(objContext) }}>
                        <b>
                            {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupNavigationSecondTabCountText')}
                        </b>
                        {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupNavigationSecondTabText')}
                    </span>
                </div>
                <WrapperComponent
                    ComponentName={"FillHeight"}
                    id="LearningTestCreationFillHeight" Meta={objContext.LearningTestCreation_ModuleProcessor.GetFillHeightMetaData(objContext)} ParentReference={`EditorPopupParent${props.modalUId}`} className="bgStyle" scrollStyle={{ overflow: "auto" }} ParentProps={{ ...props }}>
                    {
                        state.Tab === 1 ?
                            <CompileTasks
                                ClientUserDetails={props.Data.ClientUserDetails}
                                JConfiguration={props.JConfiguration}
                                TextResource={objTextResource}
                                HandleClosePopup={() => { objContext.LearningTestCreation_ModuleProcessor.HandleClosePopup(objContext); }}
                                ShowLearningTestSystemComponent={() => { Popup.ClosePopup(props.Id); props.Events.ChangeRouteToLearningTestSystem(); }}
                                ChangeTab={() => { objContext.LearningTestCreation_ModuleProcessor.HandleClosePopup(objContext); }}
                                ShowLearningTestManualComponent={() => { Popup.ClosePopup(props.Id);; }} />
                            :
                            state.Tab === 2 ?
                                <div className="task-details-block">
                                    <div className="task-details-block-wrap">
                                        <h3>
                                            {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupDropDownsContainerHeading')}
                                        </h3>
                                        <div className="dropdown-flex">
                                            <span>
                                                {Localization.TextFormatter(objTextResource, 'ClassDropdownLabel')}
                                            </span>
                                            <div id="div_ClassDropdown" className="content-dropdown">
                                                <ClassDropDown
                                                    id="ClassDropDown"
                                                    Data={arrClassData}
                                                    DisplayColumn="vClassName"
                                                    ValueColumn="uClassId"
                                                    IsSaveToUserPreference="N"
                                                    SelectedValue={state.objSelectedClassData && state.objSelectedClassData["uClassId"] ? state.objSelectedClassData["uClassId"] : ApplicationState.GetProperty("SelectedClassId")}
                                                    JConfiguration={props.JConfiguration}
                                                    ClientUserDetails={props.Data.ClientUserDetails}
                                                    OnChangeEventHandler={(objItem, objDropdownProps) => { objContext.LearningTestCreation_ModuleProcessor.OnChangeClassDropDown(objContext, objItem) }}
                                                    DefaultOptionValue={state.objSelectedClassData && state.objSelectedClassData["uClassId"] ? "" : Localization.TextFormatter(objTextResource, 'Choose')}
                                                />
                                            </div>
                                        </div>
                                        <div className="dropdown-flex">
                                            <span>
                                                {Localization.TextFormatter(objTextResource, 'SubjectDropdownLabel')}
                                            </span>
                                            <div id="div_SubjectDropDown" className={state.objValidation["strValidatedField"] !== "div_SubjectDropDown" ? "content-dropdown" : "content-dropdown validation-border"}>
                                                <WrapperComponent
                                                    ComponentName={"Dropdown"}
                                                    Id={"Subject"}
                                                    Meta={objContext.LearningTestCreation_ModuleProcessor.GetSubjectDropdownMetaData(objContext)}
                                                    Data={objContext.LearningTestCreation_ModuleProcessor.GetSubjectDropdownData(objContext)}
                                                    Resource={objContext.LearningTestCreation_ModuleProcessor.GetResourceData(objTextResource)}
                                                    Events={objContext.LearningTestCreation_ModuleProcessor.GetSubjectDropdownEvents(objContext)}
                                                    ParentProps={{ ...props }}
                                                />
                                            </div>
                                            {
                                                GetNTCheckBox(objTextResource)
                                            }
                                        </div>
                                        <div className="dropdown-flex">
                                            <span>
                                                <span className={objContext.state.blnIsNTCheckBoxSelected ? "spnSubSubjectDropdownLabel" : "spnSubSubjectDropdownLabel NTSpecial"}>{Localization.TextFormatter(objTextResource, 'SubSubjectDropdownLabel')}</span>
                                                {
                                                    objContext.state.blnIsNTCheckBoxSelected ?
                                                        <span style={{ fontSize: 14 }} className="spnSubSubjectDropdownLabel2">{Localization.TextFormatter(objTextResource, 'SubSubjectDropdownLabelNTSpecial')}</span>
                                                        : <span>:</span>
                                                }

                                            </span>
                                            <div id="div_SubSubjectDropDown" className={state.objValidation["strValidatedField"] !== "div_SubSubjectDropDown" ? "content-dropdown" : "content-dropdown validation-border"}>
                                                <WrapperComponent
                                                    ComponentName={"Dropdown"}
                                                    Id={"SubSubject"}
                                                    Meta={objContext.LearningTestCreation_ModuleProcessor.GetSubSubjectDropdownMetaData(objContext)}
                                                    Data={objContext.LearningTestCreation_ModuleProcessor.GetSubSubjectDropdownData(objContext)}
                                                    Resource={objContext.LearningTestCreation_ModuleProcessor.GetResourceData(objTextResource)}
                                                    Events={objContext.LearningTestCreation_ModuleProcessor.GetSubSubjectDropdownEvents(objContext)}
                                                    ParentProps={{ ...props }}
                                                />
                                            </div>
                                        </div>

                                        <div className="dropdown-flex">
                                            <span>
                                                {Localization.TextFormatter(objTextResource, 'ModusDropdownLabel')}
                                            </span>
                                            <div id="div_ModusDropDown" className="content-dropdown">
                                                <WrapperComponent
                                                    ComponentName={"Dropdown"}
                                                    Id={"Modus"}
                                                    Meta={objContext.LearningTestCreation_ModuleProcessor.GetModusDropdownMetaData()}
                                                    Data={objContext.LearningTestCreation_ModuleProcessor.GetModusDropdownData(objContext, objTextResource)}
                                                    Resource={objContext.LearningTestCreation_ModuleProcessor.GetResourceData(objTextResource)}
                                                    Events={objContext.LearningTestCreation_ModuleProcessor.GetModusDropdownEvents(objContext)}
                                                    ParentProps={{ ...props }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="task-details-block-wrap">
                                        <h3>
                                            {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupSubejctAndCompetencyLevel')}
                                        </h3>
                                        {
                                            GetCategoryJsx(arrCategoryData, objTextResource)
                                        }
                                        {
                                            arrCategoryData && arrCategoryData.length > 0 ?
                                                arrCategoryData.map(objTempData => {
                                                    return GetCategoryJsxData(objTextResource, objTempData);
                                                }) :
                                                <p>
                                                    {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupSubejctAndCompetencyLevelDescription')}
                                                </p>
                                        }
                                    </div>
                                    <div className="task-details-block-wrap">
                                        <h3>
                                            {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupPupilSelection')}
                                        </h3>
                                        {
                                            state.SelectedClassId != undefined && state.SelectedClassId != "" ?
                                                <div>
                                                    <div className="task-item">
                                                        <div className="task-item-flex">
                                                            <div className="task-item-left">
                                                                <label className="check-container">
                                                                    <input type="checkbox" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.OnChangeCheckBoxForClass(objContext, true) }} />
                                                                    <span className="checkmark" />
                                                                </label>
                                                                <span>
                                                                    {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupPupilSelectionSelectWholeClassText')} ({arrPupilData ? arrPupilData.length : 0})
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        arrLearningTestPupilGroupData && arrLearningTestPupilGroupData.map(objTempData => {
                                                            return GetPupilGroupJsxData(objTempData);
                                                        })
                                                    }
                                                    <div className="task-item">
                                                        <div className="task-item-flex">
                                                            {arrPupilData && arrPupilData.length > 0 ?
                                                                <React.Fragment>
                                                                    <div className="task-item-left">
                                                                        <span>{Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupPupilSelectionSelectChooseIndividualPupilText')}</span>
                                                                    </div>
                                                                    <img src={AngleDownImage} onClick={() => { ToggleDataDisplayOnDownArrowClick("div_PupilName"); }} />
                                                                </React.Fragment>
                                                                : null}
                                                        </div>
                                                    </div>
                                                    <div id="div_PupilName" className="task-item" style={{ "display": "block" }}>
                                                        {
                                                            arrPupilData && arrPupilData.map(objTempData => {
                                                                return GetPupilJsxData(objTextResource, objTempData);
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                : <div> {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupPupilSelcetClassText')}</div>
                                        }
                                        <div className="task-item-flex" style={{ border: 0 }}>
                                            <div className="task-item-left" />
                                            <div className="task-item-right">
                                                <button className="button green-button" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.ShowCreateGroupPopUp(objContext) }}>
                                                    {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupGroupButtonText')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="task-details-block-wrap">
                                        <h3>
                                            {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupTestName')}
                                        </h3>
                                        <p>
                                            {
                                                strTestName === "" ? Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupTestNameDescription') : strTestName
                                            }
                                        </p>
                                    </div>
                                </div>
                                :
                                state.Tab === 3 ?
                                    <div className="determine-block">
                                        <div className="determin-flex">
                                            <div className="determine-block-left">
                                                <h2>
                                                    {Localization.TextFormatter(objTextResource, 'LearningTestCreationTaskSelectionTabLeftBlockHeading')}
                                                </h2>
                                                <p>
                                                    <b>
                                                        {Localization.TextFormatter(objTextResource, 'ClassLabel')}:
                                                    </b>
                                                    <span> {strClassName}</span>
                                                </p>
                                                <p>
                                                    <b>
                                                        {Localization.TextFormatter(objTextResource, 'LearningTestCreationTaskSelectionTabLeftBlockThemeLabel')}
                                                    </b>
                                                    <span> {strTestName}</span>
                                                </p>
                                                <p>
                                                    {intAvailableTaskCount}{Localization.TextFormatter(objTextResource, 'LearningTestCreationTaskSelectionTabLeftBlockTaskAvailableText')}
                                                </p>
                                                <div className="button-block">
                                                    <div className="button-center">
                                                        <button className="button yellow-button" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.ShowLearningTestTeacherSettingsPopup(objContext) }}>
                                                            {Localization.TextFormatter(objTextResource, 'LearningTestCreationTaskSelectionTabLeftBlockQuickSelectionButton')}
                                                        </button>
                                                        <button className="button yellow-button" onClick={() => { objContext.LearningTestCreation_ModuleProcessor.ShowEditTasksPopup(objContext) }}>
                                                            {Localization.TextFormatter(objTextResource, 'LearningTestCreationTaskSelectionTabLeftBlockManualTaskSelectionButton')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="determine-block-center">
                                                <div className="right-arrow" />
                                            </div>
                                            <div className="determine-block-right">
                                                <h2>
                                                    {Localization.TextFormatter(objTextResource, 'LearningTestCreationTaskSelectionTabRightBlockHeading')} ({intSelectedTasksCount})
                                                </h2>
                                                {
                                                    state.arrSelectedTasks.map(objTempData => {
                                                        return (
                                                            <React.Fragment>
                                                                <h3>
                                                                    {objTempData["t_TestDrive_Task_TaskDifficultyLevel_Data"][0]["vTaskDifficultyLevelName"]}
                                                                </h3>
                                                                <ul>
                                                                    {
                                                                        objTempData["arrTaskDataPerDifficultyLevel"].map(objTempTaskData => {
                                                                            return (
                                                                                <li onClick={() => { objContext.LearningTestCreation_ModuleProcessor.ShowTaskImagePopup(objContext, objTempTaskData) }}>
                                                                                    <img src={DocumentExerciseImage} />
                                                                                    {objTempTaskData["vPageName"]}
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </React.Fragment>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                        {
                                            state.OpenAddLearningTestPopup &&
                                            <div className="test-confirmation-popup">
                                                <div className="test-confirmation-header">
                                                    <div className="close">
                                                        <span onClick={(e) => { Popup.ClosePopup(props.Id); ApplicationState.SetProperty("blnShowAnimation", false) }}>Schliessen</span>
                                                        <img src={CloseImage} alt="" onClick={(e) => { Popup.ClosePopup(props.Id); ApplicationState.SetProperty("blnShowAnimation", false) }} />
                                                    </div>
                                                </div>
                                                <div popup-body="" className="test-confirmation-body">
                                                    <div id="divTestName">{strTestName}</div>
                                                    <div id="divClassName">{strClassName}</div>
                                                    <div id="divTaskCount">Aufgaben: {intSelectedTasksCount}</div>
                                                </div>
                                                <div popup-footer="" className="test-confirmation-footer" id="divTestConfirmationFooter">
                                                    <div
                                                        className="greenButton"
                                                        onClick={() => { objContext.LearningTestCreation_ModuleProcessor.AddLearningTestPopup(objContext, "Cancel") }}
                                                    >Abbrechen </div>
                                                    <div
                                                        className="greenButton"
                                                        onClick={() => { objContext.LearningTestCreation_ModuleProcessor.AddLearningTestPopup(objContext, "Archieve") }}
                                                    >Archivieren</div>
                                                    <div
                                                        className="greenButton"
                                                        onClick={() => { objContext.LearningTestCreation_ModuleProcessor.AddLearningTestPopup(objContext, "Active") }}
                                                    >Aktivieren</div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    :
                                    <React.Fragment></React.Fragment>
                    }
                </WrapperComponent>
                <div id="edit-selected-tasks" className="edit-selected-tasks" ref={editSelectedTasksRef} style={{ "display": "none" }}>
                    <button onClick={() => { objContext.LearningTestCreation_ModuleProcessor.ShowEditTasksPopup(objContext) }} className="button green-button">
                        {Localization.TextFormatter(objTextResource, 'LearningTestCreationTaskSelectionTabRightEditSelectedTasksButtonText')}
                    </button>
                </div>
                <div className="wrap learning-test-creation-footer" id="learning-test-creation-footer">
                    {
                        state.Tab === 2 || state.Tab === 3 ?
                            <div className="footer-block">
                                <button onClick={() => { Popup.ClosePopup(props.Id); }} className="button green-button">
                                    {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupAbortButtonText')}
                                </button>
                                <div class="error-block">
                                    {state.objValidation["strValidationMessage"] && state.objValidation["strValidationMessage"] != "" ?
                                        <img src={ExclamationMarkImage} />
                                        : <React.Fragment />
                                    }
                                    <b>
                                        {state.objValidation["strValidationMessage"]}
                                    </b>
                                </div>
                                <div className="button yellow-button" onClick={() => {
                                    objContext.LearningTestCreation_ModuleProcessor.HandleDetermineBlock(objContext)

                                }}>
                                    {Localization.TextFormatter(objTextResource, 'LearningTestCreationPopupProceedButtonText')}
                                </div>
                            </div>
                            :
                            <React.Fragment></React.Fragment>
                    }
                </div>
            </div>
        );
    }

    return state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(LearningTestCreation_ModuleProcessor.StoreMapList()))(LearningTestCreation);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LearningTestCreation_ModuleProcessor; 