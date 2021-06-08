//React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as SubjectExpert_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/SubjectExpert/SubjectExpert_Hook';
import SubjectExpert_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/SubjectExpert/SubjectExpert_ModuleProcessor';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';
import PlusWhiteImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/pluswhite.svg?inline';


/**
* @name SubjectExpert
* @param {object} props props
* @summary This component displays the SubjectExpert data.
* @returns {object} div that encapsulated the SubjectExpert div with its details.
*/
const SubjectExpert = (props) => {

    const multiselectForTeacherRefs = useRef([]);

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, SubjectExpert_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "SubjectExpert", ["SubjectExpert_ModuleProcessor"]: new SubjectExpert_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.SubjectExpert_ModuleProcessor.Initialize(objContext, objContext.SubjectExpert_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in CoTeacherAndSubjectExpert_Hook, that contains all the custom hooks.
    * @returns null
    */
    SubjectExpert_Hook.Initialize(objContext);

    /**
    * @name DoValidationProcess
    * @param {String} strToggleOpertion Passes ToggleOpertion
    * @summary Calls the 'ValidateSubjectExperts' in the business logic and set border to the multiselect and a message box at the top.
    */
    function DoValidationProcess(strToggleOpertion = "ADD") {
        if (document) {
            let objValidationResult = objContext.SubjectExpert_ModuleProcessor.ValidateSubjectExperts(objContext);
            if (objValidationResult["IsValid"]) {
                //document.getElementById("ErrorMsg").setAttribute("style", "display:none");
                props.ErrorMsgRef.current.setAttribute("style", "display:none");
                switch (strToggleOpertion.toUpperCase()) {
                    case "ADD":
                        objContext.SubjectExpert_ModuleProcessor.HandleOnClickAddButton(objContext);
                        break;
                    case "SAVE":
                        objContext.SubjectExpert_ModuleProcessor.SaveSubjectExperts(objContext);
                        break;
                }
            }
            else {
                let strDivId = "div_MultiSelect_ForTeacher_" + objValidationResult["TeacherId"];
                //document.getElementById("ErrorMsg").setAttribute("style", "display:inline");
                props.ErrorMsgRef.current.setAttribute("style", "display:inline");
                //document.getElementById(strDivId).setAttribute("style", "border: 3px solid black");
                multiselectForTeacherRefs.current[objValidationResult.indexInvalid].current.setAttribute("style", "border: 3px solid black");
            }
        }
    }


    /**
    * @name GetTableData
    * @param {String} strTeacherId Passes TeacherId
    * @param {Array} arrSubjectsData Passes SubjectsData
    * @param {Integer} intCount Passes Count
    * @param {Array} arrAvailbaleTeachers Passes AvailbaleTeachers
    * @summary Returns the table jsx with dropdowns.
    * @returns {object} jsx, React.Fragment
    */
    function GetTableData(strTeacherId, arrSubjectsData, intCount, arrAvailbaleTeachers, intIndex) {
        let objTextResource = props.objTextResource;
        let arrActiveTeachers = objContext.SubjectExpert_ModuleProcessor.GetActiveTeachers(objContext);
        let arrSubjects = objContext.SubjectExpert_ModuleProcessor.GetSubjectsForDropDown(objContext);
        let arrPreselectSubjects = objContext.SubjectExpert_ModuleProcessor.GetSubjectsForPreSelectInDropDown(objContext, arrSubjectsData);
        let objTeacherData = arrActiveTeachers.filter(objTempActiveTeacherDetails => objTempActiveTeacherDetails["uTeacherId"] === strTeacherId)[0];
        arrAvailbaleTeachers = [objTeacherData, ...arrAvailbaleTeachers];
        let strDivId = "div_MultiSelect_ForTeacher_" + strTeacherId;
        let multiselectForTeacherRef = multiselectForTeacherRefs.current[intIndex];
        return (
            objTeacherData != undefined ?
            <tr>
                <td>
                    <div className="menu-flex">
                        <span>{intCount}.</span>
                        <div className="content-dropdown">
                            <div className="dropdown-wrapper">
                                <button className="dropdown-trigger">
                                    <PerformanceProfiler ComponentName={"SubjectExpert_Teacher"} JConfiguration={props.JConfiguration} >
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            Id={"SubjectExpert_Teacher"}
                                            Meta={objContext.SubjectExpert_ModuleProcessor.GetTeacherDropdownMetaData()}
                                            Data={objContext.SubjectExpert_ModuleProcessor.GetTeacherDropdownData(arrAvailbaleTeachers, strTeacherId)}
                                            Resource={objContext.SubjectExpert_ModuleProcessor.GetResourceData()}
                                            Events={objContext.SubjectExpert_ModuleProcessor.GetTeacherDropdownEvents(objContext, objTeacherData["uTeacherId"])}
                                            ParentProps={{ ...props }}
                                        />
                                    </PerformanceProfiler>
                                </button>

                            </div>
                        </div>
                    </div>
                </td>

                <td>
                    <div className="time-range-flex">
                        <span>{objTeacherData ? objTeacherData["vShortCut"] : ''}</span>
                    </div>
                </td>
                
                <td>
                    <div className="table-dropdown">
                        <div className="dropdown-wrapper" id={strDivId} ref={multiselectForTeacherRef} >
                            <PerformanceProfiler ComponentName={"SubjectExpert_Subject"} JConfiguration={props.JConfiguration} >
                                <WrapperComponent
                                    Id="SubjectExpert_Subject"
                                    ComponentName={"MultiSelectDropdown"}
                                    Meta={objContext.SubjectExpert_ModuleProcessor.GetSubjectMultiSelectDropdownMetaData()}
                                    Data={objContext.SubjectExpert_ModuleProcessor.GetSubjectMultiSelectDropdownData(arrSubjects, arrPreselectSubjects)}
                                    Resource={objContext.SubjectExpert_ModuleProcessor.GetMultiSelectDropdownResourceData(Localization.TextFormatter(objTextResource, 'MultiSelectDropdownDefaultValue'))}
                                    Events={{
                                        OnChangeEventHandler: (arrItems) => {
                                            //document ? document.getElementById(strDivId).setAttribute("style", "border: none") : "";
                                            multiselectForTeacherRef ? multiselectForTeacherRef.current.setAttribute("style", "border: none") : "";
                                            objContext.SubjectExpert_ModuleProcessor.HandleOnChangeSubjectDropDown(objContext, arrItems, objTeacherData["uTeacherId"]);
                                        }
                                    }}
                                    CallBacks={() => { }}
                                    ParentProps={{ ...props }}
                                />
                            </PerformanceProfiler>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="span-close">
                        <img src={CloseImage}  alt="" onClick={() => {
                            objContext.SubjectExpert_ModuleProcessor.HandleOnClickRemoveButton(objContext, objTeacherData["uTeacherId"]);
                            if (objContext.SubjectExpert_ModuleProcessor.ValidateSubjectExperts(objContext) && document) {
                                props.ErrorMsgRef.current.setAttribute("style", "display:none");
                            }
                        }}
                        />
                    </div>
                </td>
            </tr>
            : <React.Fragment />
        );
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTextResource = props.objTextResource;//props.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/CoTeacherAndSubjectExpert", props)
        let arrAvailableTeachers = objContext.SubjectExpert_ModuleProcessor.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "AvailableTeachers");
        let intCount = 0;
        //if (state.isLoadComplete && document && document.getElementById("ErrorMsg")) {
        //    document.getElementById("ErrorMsg").setAttribute("style", "display:none");
        //}
        if (state.isLoadComplete && document && props.ErrorMsgRef.current) {
            props.ErrorMsgRef.current.setAttribute("style", "display:none");
        }

        if (state.arrSubjectExperts) {
            multiselectForTeacherRefs.current = state.arrSubjectExperts.map(
                (ref, index) => multiselectForTeacherRefs.current[index] = React.createRef()
            )
        }
        return (
            <div className={props.blnRemoveHeight ? "subject-time-table-setting removeHeight addHeight" : "subject-time-table-setting"}>
                <div className="subject-table-title">
                    <span>{Localization.TextFormatter(objTextResource, 'SubjectExpertText')}</span>
                    <button onClick={() => 
                        props.UpdateCoTeacherAndSubjectExpertDisplay(!props.blnClassTimeVisible, !props.blnSubjectTimeVisible, !props.blnRemoveHeight)
                        }>
                        {
                            props.blnSubjectTimeVisible ?
                                <img
                                    src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/minus.png")}
                                    className="accordian-icon"

                                />
                                :
                                <img
                                    src={require("../../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/plus-circle.png")}
                                    className="accordian-icon"

                                />
                        }
                    </button>
                </div>
                {
                    props.blnSubjectTimeVisible ?
                        <div className={'subject-table-section'}>
                            <div className="subject-table-heading">
                                <div className="subject-table-heading-left">
                                    <span>{Localization.TextFormatter(objTextResource, 'TeacherText')}</span>
                                </div>
                                <div className="subject-table-heading-right">
                                    <span>{Localization.TextFormatter(objTextResource, 'TeacherShortNameText')}</span>
                                    {/* <span>Facher</span> */}
                                </div>
                            </div>

                            <div className="control-buttons">
                                <div className="control-buttons-left">
                                    <button>
                                        <img src={PlusWhiteImage} alt="" />
                                        <span>{Localization.TextFormatter(objTextResource, 'AddButtonText')}</span>
                                    </button>
                                </div>
                                
                            </div>

                            <table className="subject-table-main">
                                {
                                    state.arrSubjectExperts && state.arrSubjectExperts.map((objTempSubjectExpert, intIndex) => {
                                        if (objTempSubjectExpert["cIsDeleted"] === "N") {
                                            intCount++;
                                            return GetTableData(objTempSubjectExpert["uTeacherId"], objTempSubjectExpert["t_TestDrive_Member_Class_Teacher_Subject"], intCount, arrAvailableTeachers, intIndex);
                                        }
                                    })
                                }
                            
                            </table>

                            {
                            state.arrSubjectExperts && state.arrSubjectExperts.length > 0 ?
                                <div className="table-footer-button">
                                    <button> {Localization.TextFormatter(objTextResource, 'SaveButtonText')}</button>
                                </div> :
                                <div className="table-footer-button">
                                    {Localization.TextFormatter(objTextResource, 'NoDataFoundText')}
                                </div>
                            }
                        </div>

                        : <React.Fragment />
                }
            </div>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(SubjectExpert_ModuleProcessor.StoreMapList()))(SubjectExpert);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SubjectExpert_ModuleProcessor; 