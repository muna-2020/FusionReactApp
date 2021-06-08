//React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as TeacherProfile_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherProfile/TeacherProfile_Hook';
import TeacherProfile_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherProfile/TeacherProfile_ModuleProcessor';

//Components used in module.
//import Form from '@root/Framework/Blocks/FormGenerator/Form';
import Form from '@root/Framework/Blocks/Form/Form';

//Inline Images import
import ExclamationMarkImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/exclamation_mark.svg?inline';

/**
* @name TeacherProfile
* @param {object} props props
* @summary This component displays the TeacherProfile data in form and let us manipulate those data.
* @returns {object} div that encapsulated the form with TeacherProfile details.
*/
const TeacherProfile = props => {

    const errMessagePassRef = useRef(null)

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TeacherProfile_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TeacherProfile", ["TeacherProfile_ModuleProcessor"]: new TeacherProfile_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TeacherProfile_ModuleProcessor.Initialize(objContext, objContext.TeacherProfile_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TeacherProfile_Hook, that contains all the custom hooks.
    * @returns null
    */
    TeacherProfile_Hook.Initialize(objContext);

    /**
    * @name FormRef
    * @summary Creates a Reference constant with value null.
    * @returns {object} Reference
    */
    const FormRef = useRef(null);

    let AddValidationHtml = () => {
        return (
            <React.Fragment>
                <img src={ExclamationMarkImage} />
                <span className='validationmessage'>{state.strPasswordMessage}</span>
            </React.Fragment>
        )
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTextResourceData = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherProfile", props);
        let arrMetaData = objContext.TeacherProfile_ModuleProcessor.GetMetaData(objContext);

        let objFormMeta = {
            HeaderData: arrMetaData,
            ValidationDivName: "divTeacherProfileErrorMessage",
            AddForm: false
        };
        let objTeacherData = {};
        if (DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            objTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"][0];
        }
        let objFormData = {
            FormData: objTeacherData,
            LabelData: objContext.TeacherProfile_ModuleProcessor.GetLabelData(objContext),
            DropDownData: objContext.TeacherProfile_ModuleProcessor.GetDropDownData(objContext)
        };
        var objFormResource = {
            Text: objTextResourceData,
            SkinPath: JConfiguration.ExtranetSkinPath
        };

        return (
            <div id="ProfileComponent">
                <WrapperComponent
                    ComponentName={"FillHeight"}
                    Id="Interpretation" Meta={objContext.TeacherProfile_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }}>
                    <div className="light-brown-bg teacher-profile">
                        <PerformanceProfiler ComponentName={"TeacherProfileForm"} JConfiguration={props.JConfiguration} >
                            <Form
                                Id="TeacherProfileForm"
                                ref={FormRef}
                                Meta={objFormMeta}
                                Data={objFormData}
                                Resource={objFormResource}
                                ParentProps={{ ...props }}
                            />
                        </PerformanceProfiler>
                        <div className="error-message-flex">
                            <span className="validation-message">
                                <div className="error-message" id="divTeacherProfileErrorMessage" />
                                <div className="error-message" id="divTeacherProfileErrorMessage_Password" ref={errMessagePassRef}>
                                    {
                                        state.strPasswordMessage ?
                                            <React.Fragment>
                                                {AddValidationHtml()}
                                            </React.Fragment>
                                            :
                                            <React.Fragment />
                                    }
                                </div>
                            </span>

                            {objContext.TeacherProfile_ModuleProcessor.IsExternalUser(objContext) == "N" ?
                                <button className="button yellow-button" onClick={() => objContext.TeacherProfile_ModuleProcessor.EditData(objContext, FormRef.current, objTextResourceData)}>
                                    {Localization.TextFormatter(objTextResourceData, 'SaveButtonText')}
                                </button> : ''}
                        </div>
                    </div>
                </WrapperComponent>
            </div >
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(TeacherProfile_ModuleProcessor.StoreMapList()))(TeacherProfile);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TeacherProfile_ModuleProcessor; 