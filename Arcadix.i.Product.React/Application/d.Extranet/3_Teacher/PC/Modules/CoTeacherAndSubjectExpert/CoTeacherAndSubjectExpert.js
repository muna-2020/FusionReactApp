//React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as CoTeacherAndSubjectExpert_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert_Hook';
import CoTeacherAndSubjectExpert_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert_ModuleProcessor';

//Components used in module.
import CoTeacher from "@root/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/CoTeacher/CoTeacher";
import SubjectExpert from "@root/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/SubjectExpert/SubjectExpert";

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
            <div className="light-brown-bg co-teacher-and-subject-expert">

                <div className="padding-20" id="ErrorMsg" ref={errorMsgRef} style={{ "display": "none" }}>
                    <div className="error-message-red">
                        <img src={ExclamationImage} />
                        <span>{Localization.TextFormatter(objTextResource, 'ErrorMessage')}</span>
                    </div>
                </div>

                <div className="padding-20" id="TopHeadCoTeacherAndSubjectExpert">
                    <div className="top-head">
                        <div className="top-left">
                            <span>{Localization.TextFormatter(objTextResource, 'ClassText')}</span>
                            <div className="content-dropdown">
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
                    </div>
                </div>

                <WrapperComponent
                    ComponentName={"FillHeight"}
                    Id="CoTeacherAndSubjectExpert" Meta={objContext.CoTeacherAndSubjectExpert_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }}>
                    <div className="co-teacher-and-subject-expert-flex padding-20">
                        <PerformanceProfiler ComponentName={"CoTeacher"} JConfiguration={props.JConfiguration} >
                            <CoTeacher Id={"CoTeacher"} ClientUserDetails={props.ClientUserDetails} ErrorMsgRef={errorMsgRef}
                                isLoadComplete={true} {...props} objTextResource={objTextResource} />
                        </PerformanceProfiler>
                        <PerformanceProfiler ComponentName={"SubjectExpert"} JConfiguration={props.JConfiguration} >
                            <SubjectExpert Id={"SubjectExpert"} ErrorMsgRef={errorMsgRef}
                                ClientUserDetails={props.ClientUserDetails} isLoadComplete={true} {...props} objTextResource={objTextResource} />
                        </PerformanceProfiler>
                    </div>
                </WrapperComponent>

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