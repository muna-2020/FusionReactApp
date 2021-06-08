//React related imports
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//Module related fies.
import * as Contact_Hook from '@shared/Application/d.Extranet/5_Shared/PC/Modules/Contact/Contact_Hook';
import Contact_ModuleProcessor from "@shared/Application/d.Extranet/5_Shared/PC/Modules/Contact/Contact_ModuleProcessor";

//Components used in module.
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';

/**
 * @name Contact
 * @param {object} props props
 * @summary This component consists of three editable notes.
 * @returns {object} React.Fragement that encapsulated the contact form and address.
 */
const Contact = (props) => {

    /**
     * @name Initializing Reducer
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Contact_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Contact", ["Contact_ModuleProcessor"]: new Contact_ModuleProcessor() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.Contact_ModuleProcessor.Initialize(objContext, objContext.Contact_ModuleProcessor);

    /**
     * @name Initialize
     * @summary Initialize Custom hooks
     */
    Contact_Hook.Initialize(objContext);

    /**
     * @name useRef
     * @summary Initialize domFileUploadRef ref's
     */
    const domFileUploadRef = useRef(null);

    const EmailSubjectRef = useRef(null);
    const EmailtextRef = useRef(null);

    /**
     * @name GetContent
     * @summary Returns the required jsx for component
     * @return {*} jsx
     */
    const GetContact = () => {
        let objResourceData = Object_Framework_Services_TextResource.GetData("/d.Extranet/5_SharedModule/Contact", props);
        var clientdiv = { __html: Localization.TextFormatter(objResourceData, 'ClientText') };
        var ClientContactDetailsdiv = { __html: Localization.TextFormatter(objResourceData, 'ClientContactDetailsText') };
        let strEmailSentTitle = Localization.TextFormatter(objResourceData, 'EmailSentTitle');

        if (objContext.props.ClientUserDetails.TeacherDetails && objContext.props.ClientUserDetails.TeacherDetails.cIsExternalMember == 'Y') {
            clientdiv = { __html: Localization.TextFormatter(objResourceData, 'ClientTextForKeyCloak') };
            ClientContactDetailsdiv = { __html: Localization.TextFormatter(objResourceData, 'ClientContactDetailsTextForKeyCloak') };
            strEmailSentTitle = Localization.TextFormatter(objResourceData, 'EmailSentTitleForKeyCloak');
        }

        return (
            <div id="ContactComponent">
                <WrapperComponent
                    ComponentName={"FillHeight"}
                    Id="FillHeightContact" Meta={objContext.Contact_ModuleProcessor.GetMetaDataFillheightContact()} ParentProps={{ ...props }}>
                    <div className="light-brown-bg contact-wrapper">
                        <div className="contact-flex">
                            <div className="contact-block" dangerouslySetInnerHTML={clientdiv} />
                            <div className="contact-block" dangerouslySetInnerHTML={ClientContactDetailsdiv}></div>
                            {!state.blnShowMailSentDiv ?
                                <div className="contact-block">
                                    <p>{strEmailSentTitle}</p>
                                    <div ref={domFileUploadRef} className="active contact-form">
                                        <PerformanceProfiler ComponentName={"FileUploadContact"} JConfiguration={props.JConfiguration} >
                                            <FileUpload
                                                Id="FileUploadContact"
                                                ref={domFileUploadRef}
                                                Resource={objContext.Contact_ModuleProcessor.GetResourceData(objResourceData)}
                                                Meta={objContext.Contact_ModuleProcessor.GetMetaData()}
                                                ParentProps={{ ...props }}
                                                Data={{
                                                    FileData: []
                                                }}
                                            />
                                        </PerformanceProfiler>
                                    </div>

                                    <div className="form-text padding-top-20">
                                        <input id="EmailSubject" ref={EmailSubjectRef} className={state.blnShowValidation && state.isClickedEmailButton && objContext.Contact_ModuleProcessor.Validate(objContext) == "EmailSubject" ? "emptyInput" : ""}
                                            placeholder={Localization.TextFormatter(objResourceData, 'ToText')}
                                            onFocus={(event) => { objContext.Contact_ModuleProcessor.ShowValidationMessageOnFocus(objContext, objResourceData, event.target.id, event.target.value) }}
                                            value={state.strEmailSubject}
                                            onChange={(event) => { objContext.Contact_ModuleProcessor.HandleChange(objContext, objResourceData, event.target.id, event.target.value) }} />
                                        <br />

                                        <textarea id="Emailtext" ref={EmailtextRef} placeholder={Localization.TextFormatter(objResourceData, 'MessageText')}
                                            onFocus={(event) => { objContext.Contact_ModuleProcessor.ShowValidationMessageOnFocus(objContext, objResourceData, event.target.id, event.target.value) }}
                                            value={state.strEmailtext}
                                            onChange={(event) => { objContext.Contact_ModuleProcessor.HandleChange(objContext, objResourceData, event.target.id, event.target.value) }}></textarea>
                                        <br />

                                        {state.blnShowValidation && state.isClickedEmailButton ? <span className="emptyValidation">{state.strValidationMessage}</span> : <React.Fragment />}
                                        <button className="button brown-button" onClick={() => EmailSend(objContext, objResourceData)}>{Localization.TextFormatter(objResourceData, 'SendButton')}</button>
                                    </div>

                                </div>
                                :
                                <div className="contact-block">
                                    <div>{Localization.TextFormatter(objResourceData, 'EmailSentTitle')}</div>
                                    <div>{Localization.TextFormatter(objResourceData, 'EmailSentText')}</div>
                                </div>}
                        </div>
                    </div>
                </WrapperComponent>
            </div>
        )
    }

    /**
     * @name EmailSend
     * @summary If strEmptyElement is empty then OnClickEmailSend function is instantiated and called.
     */
    const EmailSend = (objContext, objResourceData) => {
        //var strEmptyElement = objContext.Contact_ModuleProcessor.Validate(objContext);
        var objEmptyElement = objContext.Contact_ModuleProcessor.Validate(objContext, EmailSubjectRef, EmailtextRef);
        //if (strEmptyElement == "")
        if (objEmptyElement == null)
            objContext.Contact_ModuleProcessor.OnClickEmailSend(objContext, domFileUploadRef.current.GetUploadedFileDetails ? domFileUploadRef.current.GetUploadedFileDetails() : []);
        else {
            //document.getElementById(strEmptyElement).focus();
            objEmptyElement.current.focus()
            dispatch({
                type: "SET_STATE", payload: { "blnShowValidation": true, "strValidationMessage": Localization.TextFormatter(objResourceData, 'ValidationMessage'), isClickedEmailButton: true }
            });
        }
    };

    return props.isLoadComplete || state.isLoadComplete ? GetContact() : <React.Fragment />;
};

export default connect(ExtranetBase_Hook.MapStoreToProps(Contact_ModuleProcessor.StoreMapList()))(Contact);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Contact_ModuleProcessor; 