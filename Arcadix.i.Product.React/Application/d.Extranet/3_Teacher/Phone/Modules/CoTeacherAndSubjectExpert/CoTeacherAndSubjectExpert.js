//React related imports.
import React, { useReducer, useRef, useState } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as CoTeacherAndSubjectExpert_Hook from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert_Hook';
import CoTeacherAndSubjectExpert_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert_ModuleProcessor';

//Components used in module.
import CoTeacher from "@root/Application/d.Extranet/3_Teacher/Phone/Modules/CoTeacherAndSubjectExpert/CoTeacher/CoTeacher";
import SubjectExpert from "@root/Application/d.Extranet/3_Teacher/Phone/Modules/CoTeacherAndSubjectExpert/SubjectExpert/SubjectExpert";

//Inline Images import
import ExclamationImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/exclamation.png?inline';

/**
* @name CoTeacherAndSubjectExpert
* @param {object} props props
* @summary This component displays the CoTeacherAndSubjectExpert data.
* @returns {object} div that encapsulated the CoTeacherAndSubjectExpert div with its details.
*/
const CoTeacherAndSubjectExpert = (props) => {

    const errorMsgRef = useRef(null);

    const [classTimeVisible, setClassTimeVisible] = useState(true);
    const [subjectTimeVisible, setsubjectTimeVisible] = useState(false);
    const [removeHeight, setremoveHeight] = useState(false);

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, CoTeacherAndSubjectExpert_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "CoTeacherAndSubjectExpert", ["CoTeacherAndSubjectExpert_ModuleProcessor"]: new CoTeacherAndSubjectExpert_ModuleProcessor(), Object_Framework_Services_TextResource };


    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CoTeacherAndSubjectExpert_ModuleProcessor.Initialize(objContext, objContext.CoTeacherAndSubjectExpert_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in CoTeacherAndSubjectExpert_Hook, that contains all the custom hooks.
    * @returns null
    */
    CoTeacherAndSubjectExpert_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/CoTeacherAndSubjectExpert", props);
        let arrClassData = DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId)["Data"];
        let objSelectedClassData = objContext.CoTeacherAndSubjectExpert_ModuleProcessor.GetApplicationStateDataForCoTeacherAndSubjectExpert(objContext, "SelectedClassData");
        let strPreSelectClassId = objSelectedClassData["uClassId"];

        return (
            <div className="subject-expert">

                {/*Title head section*/}
                <div className="subject-expert-title">
                    <div className="subject-expert-title-left">
                        <span className="heading-left">Verwalten</span>
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/arrow-angle-pointing-verwalten-leherperson.svg")}
                        />
                        <span className="menu-title">Lehrpersonen</span>
                    </div>
                    <div className="subject-expert-title-right">
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/exclamation_mark.svg")}
                        />
                    </div>
                </div>

                <div ref={errorMsgRef} style={{ "display": "none" }}>
                    <div>
                        <img src={ExclamationImage} />
                        <span>{Localization.TextFormatter(objTextResource, 'ErrorMessage')}</span>
                    </div>
                </div>

                {/*top dropdown*/}
                <div className="top-dropdown-wrapper">
                    <span class="dropdown-label">{Localization.TextFormatter(objTextResource, 'ClassText')}</span>
                    <div className="dropdown">
                        <PerformanceProfiler ComponentName={"CoTeacherAndSubjectExpert_ClassDropdown"} JConfiguration={props.JConfiguration} >
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id={"CoTeacherAndSubjectExpert_ClassDropdown"}
                                Meta={objContext.CoTeacherAndSubjectExpert_ModuleProcessor.GetClassDropdownMetaData()}
                                Data={objContext.CoTeacherAndSubjectExpert_ModuleProcessor.GetClassDropdownData(arrClassData, strPreSelectClassId)}
                                Resource={objContext.CoTeacherAndSubjectExpert_ModuleProcessor.GetResourceData()}
                                Events={objContext.CoTeacherAndSubjectExpert_ModuleProcessor.GetClassDropdownEvents(objContext)}
                                ParentProps={{ ...props }}
                            />
                        </PerformanceProfiler>
                    </div>
                </div>

                <PerformanceProfiler ComponentName={"CoTeacher"} JConfiguration={props.JConfiguration} >
                    <CoTeacher Id={"CoTeacher"} ClientUserDetails={props.ClientUserDetails} ErrorMsgRef={errorMsgRef}
                        isLoadComplete={true} {...props} objTextResource={objTextResource} 
                        blnClassTimeVisible = {state.blnClassTimeVisible}
                        blnSubjectTimeVisible = {state.blnSubjectTimeVisible}
                        blnRemoveHeight = {state.blnRemoveHeight}
                        UpdateCoTeacherAndSubjectExpertDisplay= {
                            (blnClassTimeVisible, blnSubjectTimeVisible, blnRemoveHeight) => objContext.CoTeacherAndSubjectExpert_ModuleProcessor.UpdateCoTeacherAndSubjectExpertDisplay(objContext, blnClassTimeVisible, blnSubjectTimeVisible, blnRemoveHeight)
                        }
                    />
                </PerformanceProfiler>

                <PerformanceProfiler ComponentName={"SubjectExpert"} JConfiguration={props.JConfiguration} >
                    <SubjectExpert Id={"SubjectExpert"} ErrorMsgRef={errorMsgRef}
                        ClientUserDetails={props.ClientUserDetails} isLoadComplete={true} {...props} objTextResource={objTextResource}
                        blnClassTimeVisible = {state.blnClassTimeVisible}
                        blnSubjectTimeVisible = {state.blnSubjectTimeVisible}
                        blnRemoveHeight = {state.blnRemoveHeight}
                        UpdateCoTeacherAndSubjectExpertDisplay= {
                            (blnClassTimeVisible, blnSubjectTimeVisible, blnRemoveHeight) => objContext.CoTeacherAndSubjectExpert_ModuleProcessor.UpdateCoTeacherAndSubjectExpertDisplay(objContext, blnClassTimeVisible, blnSubjectTimeVisible, blnRemoveHeight)
                        }
                    />
                </PerformanceProfiler>

            </div>
    
        );
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(CoTeacherAndSubjectExpert_ModuleProcessor.StoreMapList()))(CoTeacherAndSubjectExpert);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CoTeacherAndSubjectExpert_ModuleProcessor; 