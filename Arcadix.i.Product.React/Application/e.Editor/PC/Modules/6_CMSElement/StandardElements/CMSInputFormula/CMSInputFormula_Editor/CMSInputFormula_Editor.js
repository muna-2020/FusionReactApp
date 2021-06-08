// React related imports.
import React, { useRef, useReducer, useImperativeHandle } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

// module related imports.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSInputFormula/CMSInputFormula_Common/CMSInputFormula_Common';
import * as CMSInputFormula_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInputFormula/CMSInputFormula_Editor/CMSInputFormula_Editor_Hooks';
import CMSInputFormula_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInputFormula/CMSInputFormula_Editor/CMSInputFormula_Editor_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Formula Cursor imports.
import * as Cursor from '@root/Application/e.Editor/PC/Modules/9_Formula/Cursor/Cursor';

/**
 * @name CMSFormula_Editor
 * @param {object} props props from parent.
 * @summary CMSInputFormula_Editor's editor version.
 */
const CMSInputFormula_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSInputFormula_Editor_Hooks.GetInitialState(props));

    //dom formula ref.
    let objInputFormulaRef = useRef(null);

    /**
     * @name objContext.
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state, props, dispatch,
        "ModuleName": "CMSInputFormula_Editor_" + props.ElementJson.iElementId,
        objInputFormulaRef, ['CMSInputFormula_Editor_ModuleProcessor']: new CMSInputFormula_Editor_ModuleProcessor()
    };


    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSInputFormula_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSInputFormula_Editor_ModuleProcessor);

    /**
     * @name CMSTextArea_Editor_Hook.Initialize
     * @summary Initialize method call in CMSTextArea_Editor_Hook, that contains all the custom hooks.
     */
    CMSInputFormula_Editor_Hooks.Initialize(objContext);

    /**
     * @name AddSubFormula
     * @param {string} strType type of formula.
     * @summary this method add sub-formula to existing formula.
     */
    const AddSubFormula = (strType) => {
        objContext.CMSInputFormula_Editor_ModuleProcessor.AddSubFormula(strType, objContext);
    };

    /**
     * @name RemoveMathMl
     * @summary remove selected mathMl from the formula.
     * */
    const RemoveMathMl = () => {
        objContext.state.FormulaRef.current.RemoveMathMl();
    };

    /**
     * @name MoveCursorLeft
     * @summary move cursor to the left.
     * */
    const MoveCursorLeft = () => {
        objContext.state.FormulaRef.current.MoveCursorLeft();
    };

    /**
     * @name MoveCursorRight
     * @summary move cursor to the right.
     * */
    const MoveCursorRight = () => {
        objContext.state.FormulaRef.current.MoveCursorRight();
    };

    /**
     * @name ResetFormula
     * @summary clear the formula and replaces it with a placeholder.
     * */
    const ResetFormula = () => {
        objContext.state.FormulaRef.current.ResetFormula();
    };

    /**
     * @name 
     * @param {string} strNewMathMl mathMl string. 
     * @summary this method update the formula mathMl from Formula Component.
     */
    const UpdateNewMathMl = (strNewMathMl) => {
        console.log("updated mathMl", strNewMathMl);
        objContext.CMSInputFormula_Editor_ModuleProcessor.UpdateNewMathMl(objContext, strNewMathMl);
    }

    /**
     * @name useImperativeHandle
     * @summary Gets the Element Json.
     */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async () => {
            let objElementjson = { ...objContext.state.ElementJson };
            const { vNewFormula, ...objvElementJson } = objElementjson.vElementJson; // removing the vNewFormula property.
            let PlaceholderDom = objInputFormulaRef.current.querySelector("[type='JFormulaEditorPlaceholder']");
            let strHtml = PlaceholderDom.children[0] ? PlaceholderDom.children[0].outerHTML : ""; // formula html
            let strIdMathMl = PlaceholderDom.children[1] ? PlaceholderDom.children[1].MathJax.elementJax.originalText : ""; // formula mathml
            let strHolderMathMl = Cursor.ReplaceIdWithHolder(strIdMathMl);
            return BaseCMSElement.RemoveRefKeyFromJson({
                ...objElementjson,
                "vElementJson": { ...objvElementJson, "html": strHtml, Values: [{ ...objElementjson["vElementJson"]["Values"][0], "mathMl": strHolderMathMl }] }
            });
        },
        "GetElementJsonForCopy": async () => {
            let objElementjson = { ...objContext.state.ElementJson };
            const { vNewFormula, ...objvElementJson } = objElementjson.vElementJson; // removing the vNewFormula property.
            let PlaceholderDom = objInputFormulaRef.current.querySelector("[type='JFormulaEditorPlaceholder']");
            let strHtml = PlaceholderDom.children[0] ? PlaceholderDom.children[0].outerHTML : ""; // formula html
            let strIdMathMl = PlaceholderDom.children[1] ? PlaceholderDom.children[1].MathJax.elementJax.originalText : ""; // formula mathml
            let strHolderMathMl = Cursor.ReplaceIdWithHolder(strIdMathMl);
            return BaseCMSElement.RemoveRefKeyFromJson({
                ...objElementjson, "iElementId": UniqueId.GetUniqueId(),
                "vElementJson": { ...objvElementJson, "html": strHtml, Values: [{ ...objElementjson["vElementJson"]["Values"][0], "mathMl": strHolderMathMl }] }
            });
        },
        "GetLatestContext": () => {
            return objContext;
        },
    }), [objContext.state, objContext.props]);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        console.log("CMSInputFormula_Editor objContext", objContext)
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event, objParams) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSInputFormula_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objParams);
                },
                AddSubFormula,
                RemoveMathMl,
                MoveCursorLeft,
                MoveCursorRight,
                ResetFormula,
            },
            "Callbacks": {
                UpdateNewMathMl
            },
            "AppType": "Editor"
        };
        return (<Common {...objCommonProps} />);
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
}

export default CMSInputFormula_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSInputFormula_Editor_ModuleProcessor; 