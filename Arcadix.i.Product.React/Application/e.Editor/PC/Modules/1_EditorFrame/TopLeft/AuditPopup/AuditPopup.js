// React related imports.
import React, { useReducer, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes.
//import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import * as AuditPopup_Hook from '@shared/Application/e.Editor/Modules/1_EditorFrame/TopLeft/AuditPopup/AuditPopup_Hook';
import AuditPopup_ModuleProcessor from "@shared/Application/e.Editor/Modules/1_EditorFrame/TopLeft/AuditPopup/AuditPopup_ModuleProcessor";

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

// Editor state class methods
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

import Audit from "@root/Framework/Blocks/Audit/Audit";

/**
 * @name AuditPopup
 * @summary This component is responsible for loading Image/Video/Audio/Document Popup's.
 * @param {any} props Component Props.
 * @returns {any} returns JSX
 */
const AuditPopup = (props) => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, AuditPopup_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = {
        state,
        props,
        dispatch,
        ["AuditPopup_ModuleProcessor"]: new AuditPopup_ModuleProcessor(),
        ["PageContentRef"]: useRef(null)
    };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AuditPopup_Hook, that contains all the custom hooks.
    * @returns null
    */
    AuditPopup_Hook.Initialize(objContext);

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
    */
    EditorBase_Hook.InitializeCss(props, objContext.AuditPopup_ModuleProcessor);

    useEffect(() => {
        if (objContext.state.blnAuditHighlight) {
            objContext.AuditPopup_ModuleProcessor.HandleAuditHighlight(objContext);
        }
    }, [objContext.state.objPageJson])

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        let CMSPageContent = props.ComponentController.GetComponent("CMSPageContent_Editor");
        return (
            <React.Fragment>
                <div className="audit-popup-container">
                    <div className="audit-popup-header">
                        <h3>Audit</h3>
                        <h4>Audit</h4>                       
                    </div>
                    <div className="audit-popup-content-padd">
                        <div className="audit-popup-content-flex">
                            <div className="left-block">
                                <h4> Lerntipp</h4>
                                <Audit
                                    Data={{
                                        PrimaryKeyValue: props.Data.PageId,
                                        AuditType: "Editor",
                                        ObjectKey: "Object_Editor_TaskContent_CMSPageContent",
                                        DisplayColumns: ["User", "dtCreatedOn"]
                                    }}
                                    Resource={{
                                        Text: {
                                            "ModifiedOn": "Modified On",
                                            "User": "User",
                                            "FooterText:1": "1 Angaben",
                                            "FooterText:n": "{n} Angaben",
                                            "modifiedOn": "Geändert am",
                                            "user":"Benutzer"
                                        },
                                        JConfiguration: props.JConfiguration,
                                        SkinPath: props.Resource.SkinPath
                                    }}
                                    Events={{
                                        OnClickRow: (objRowData) => { objContext.AuditPopup_ModuleProcessor.GetSelectedRowData(objContext, objRowData) }
                                    }}
                                    CallBacks={{
                                        GetAuditUserName: (struUserId) => objContext.AuditPopup_ModuleProcessor.GetAdministratorName(struUserId, objContext),
                                        GetInitialRowData: (objIntialRowData) => { objContext.AuditPopup_ModuleProcessor.GetInitialRowData(objContext, objIntialRowData) },
                                    }}
                                    ParentProps={{ ...props }}
                                />


                            </div>
                            <div id="Audit-Page-Content-Wrapper" className="right-block">
                                {objContext.state.objPageJson && <CMSPageContent {...props.Data} PageJson={objContext.state.objPageJson}/>}
                            </div>
                        </div>
                    </div>
                    <div className="audit-popup-footer">
                        <button className="btn" onClick={() => { objContext.AuditPopup_ModuleProcessor.handleOkClick(objContext) }}>Zurücksetzen</button>
                        <button className="btn" onClick={() => { objContext.AuditPopup_ModuleProcessor.handleCancelClick(objContext) }} >Schliessen</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
 * @name InitialDataParams
 * @param {object} props props
 * @summary required for SSR
 * @returns {object} InitialDataParams 
 */
AuditPopup.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new AuditPopup_ModuleProcessor()).InitialDataParams(props));
};

export default connect(EditorBase_Hook.MapStoreToProps(AuditPopup_ModuleProcessor.StoreMapList()))(AuditPopup);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = AuditPopup_ModuleProcessor; 
