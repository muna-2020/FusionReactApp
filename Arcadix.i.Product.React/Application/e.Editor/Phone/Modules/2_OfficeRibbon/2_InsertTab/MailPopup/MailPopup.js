//React ralated imports.
import React, { useRef, useEffect, useState } from 'react';

//Module related imports.
import MailPopup_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/2_InsertTab/MailPopup/MailPopup_ModuleProcessor";

//Base classes.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

/**
 * @name InsertTab
 * @summary Mail Popup.
 * @returns {JSX} MailPopup Component.
 */
const MailPopup = (props) => {

    /**
     * @name refEmail
     * @summary ref to get the email input value.
     * */
    const refEmail = useRef(null);

    const [state, setState] = useState({ isValidEmail: false,inputStarted : false });

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    const objContext = { props, state, setState, refEmail, ["MailPopup_ModuleProcessor"]: new MailPopup_ModuleProcessor() };

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
     */
    EditorBase_Hook.InitializeCss(props, objContext.MailPopup_ModuleProcessor);

    /**
     * @name useEffect
     * @summary add mail to input.
     * */
    useEffect(() => {
        if (props.Data && props.Data.objTargetMail && props.Data.objTargetMail != null) {
            let strMailId = props.Data.objTargetMail.getAttribute('mailid');
            refEmail.current.value = strMailId;
        }
    }, []);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        return (
            <div className="mailtop-popup">
                <div className="mt-header">
                    <h3>E-mail</h3>
                    <h4>E-Mail eingeben</h4>
                </div>
                <div className="mt-content">
                    <div className="mt-flex">
                        <span>E-mail</span>
                        <input type="text" ref={refEmail} onChange={objEvent => objContext.MailPopup_ModuleProcessor.ValidateEmail(objContext, objEvent.currentTarget.value)} />
                    </div>
                    {
                        !objContext.state.isValidEmail && objContext.state.inputStarted && <div style={{
                            marginBottom: "17px",
                            color: "red"
                        }}>
                            <span>This is an invalid email address.</span>
                        </div>
                    }
                    <hr />
                    <div className="mt-footer">
                        <button onClick={objEvent => objContext.MailPopup_ModuleProcessor.OnOkClick(objContext)} className="btn">OK</button>
                        <button onClick={objEvent => editorPopup.ClosePopup(props.Id)} className="btn">Abbrechen </button>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
}

export default MailPopup;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = MailPopup_ModuleProcessor; 
