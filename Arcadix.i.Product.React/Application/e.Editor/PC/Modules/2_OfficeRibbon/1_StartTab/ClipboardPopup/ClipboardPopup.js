// React related imports.
import React, { useReducer } from 'react';

//Reduct related imports.
import { connect } from 'react-redux';

//Module related imports.
import * as ClipboardPopup_Hooks from '@shared/Application/e.Editor/Modules/2_OfficeRibbon/1_StartTab/ClipboardPopup/ClipboardPopup_Hooks';
import ClipboardPopup_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/1_StartTab/ClipboardPopup/ClipboardPopup_ModuleProcessor";

//Base classes/methods.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Text Action realted imports.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

/**
 * @name ClipboardPopup
 * @param {object} props props from parent.
 * @summary Clipboard Popup dispalay the content from the clipboard.
 */
const ClipboardPopup = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, ClipboardPopup_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, ["ClipboardPopup_ModuleProcessor"]: new ClipboardPopup_ModuleProcessor() };

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
     */
    EditorBase_Hook.InitializeCss(props, objContext.ClipboardPopup_ModuleProcessor);

    /**
     * @name onContentChange
     * @param {HTML Event} objEvt 
     * @summary update the state when the content of  texarea changes.
     */
    const OnContentChange = (objEvt) => {
        objContext.dispatch({ type: "SET_STATE", payload: { ClipboardData: objEvt.currentTarget.value } });
    };

    /**
     * @name onSubmit
     * @summary send the clipboard popup data to texeditor for copy or paste and closes the clipboard popup.
     */
    const OnSubmit = () => {
        TextActions.Clipboard.Paste(state.ClipboardData, () => {
            editorPopup.ClosePopup(props.Id);
        });
    };

    /**
     * @name GetContent
     * @summary returns the common jsx of the table properties sidebar.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        return (
            <div className="clipboard-insert-popup">
                <div className="clipboard-insert-popup-header">
                    <h3>Text</h3>
                    <h4>Text einfügen</h4>
                </div>                
                <div className="textarea-padd">
                    <textarea 
                        style={{outline : "none"}}
                        onChange={objEvt => OnContentChange(objEvt)}
                        name="" id="" cols="30" rows="10" className="textarea-block"
                        value={state.ClipboardData}></textarea>
                </div>
                <div className="clipboard-insert-popup-footer">
                    <button
                        onClick={objEvt => OnSubmit()}
                        className="btn">OK
                    </button>
                    <button onClick={objEvt => editorPopup.ClosePopup(props.Id)} className="btn">Abort
                </button>
                </div>
            </div>
        );
    };

    /**
     * @summary calls GetContent method to get the JSX.
     * */
    return GetContent();
}

export default connect(Base_Hook.MapStoreToProps(ClipboardPopup_ModuleProcessor.StoreMapList()))(ClipboardPopup);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ClipboardPopup_ModuleProcessor; 