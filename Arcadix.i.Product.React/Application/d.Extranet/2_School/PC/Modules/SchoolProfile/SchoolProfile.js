//React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as SchoolProfile_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolProfile/SchoolProfile_Hook';
import SchoolProfile_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolProfile/SchoolProfile_ModuleProcessor';

//Components used in module.
import Form from '@root/Framework/Blocks/Form/Form';


//Inline Images import
import ExclamationMarkImage from '@inlineimage/Framework/ReactJs/PC/Controls/OnlineHelp/exclamation_mark.svg?inline';


/**
* @name SchoolProfile
* @param {object} props props
* @summary This component displays the SchoolProfile data in form and let us manipulate those data.
* @returns {object} div that encapsulated the form with SchoolProfile details.
*/
const SchoolProfile = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, SchoolProfile_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "SchoolProfile", ["SchoolProfile_ModuleProcessor"]: new SchoolProfile_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.SchoolProfile_ModuleProcessor.Initialize(objContext, objContext.SchoolProfile_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in SchoolProfile_Hook, that contains all the custom hooks.
    * @returns null
    */
    SchoolProfile_Hook.Initialize(objContext);

    /**
    * @name FormRef
    * @summary Creates a Reference constant with value null.
    * @returns {object} Reference
    */
    const FormRef = useRef(null);

    /**
    * @name GetForm
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetForm = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolProfile", props);

        return (
            <React.Fragment>
                <PerformanceProfiler ComponentName={'SchoolProfileFormComponent'} JConfiguration={props.JConfiguration} >
                    <Form
                        Id="SchoolProfileFormComponent"
                        ref={FormRef}
                        Meta={objContext.SchoolProfile_ModuleProcessor.GetFormMetaData(objContext)}
                        Data={objContext.SchoolProfile_ModuleProcessor.GetFormData(objContext)}
                        Resource={objContext.SchoolProfile_ModuleProcessor.GetFormResourceData(objTextResource)}
                        ParentProps={{ ...props }}
                    />
                </PerformanceProfiler>
                <div className="validation-message">
                    <div id="divSchoolProfileErrorMessage" class="error-message-text" />
                    <div id="divSchoolProfileErrorMessage_Password" class="password-text">
                        {
                            state.strPasswordMessage.length > 0 ?
                                <React.Fragment>
                                    <img src={ExclamationMarkImage} />
                                    <span>{state.strPasswordMessage}</span>
                                </React.Fragment>
                                :
                                <React.Fragment />
                        }
                    </div>
                </div>
                <button className="button yellow-button" onClick={() => objContext.SchoolProfile_ModuleProcessor.SaveData(objContext, FormRef.current)}>
                    {Localization.TextFormatter(objTextResource, 'SaveText')}
                </button>
            </React.Fragment>
        );
    };
    return (
        <div>
            {/*<Animation JConfiguration={props.JConfiguration} Resource={{ "ImagePath": props.JConfiguration.ExtranetSkinPath + '/Images/Common/Icons/clock.gif' }}/>*/}
            <WrapperComponent
                ComponentName={"FillHeight"}
                Id="FillHeightSchoolProfile" Meta={objContext.SchoolProfile_ModuleProcessor.GetMetaDataFillheightSchoolProfile()} ParentProps={{ ...props }}>
                <div className="light-brown-bg school-profile">
                    {props.isLoadComplete || state.isLoadComplete ? GetForm() : <React.Fragment />}
                </div>
            </WrapperComponent>
        </div>
    );
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(SchoolProfile_ModuleProcessor.StoreMapList()))(SchoolProfile);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SchoolProfile_ModuleProcessor; 