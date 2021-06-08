// React related imports.
import React, { useRef, useReducer, useImperativeHandle } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

// module related imports.
import * as CMSFormula_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSFormula/CMSFormula_Editor/CMSFormula_Editor_Hooks';
import CMSFormula_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSFormula/CMSFormula_Editor/CMSFormula_Editor_ModuleProcessor';

//Modules used.
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

//Component used.
import Formula from '@root/Application/e.Editor/PC/Modules/9_Formula/Formula';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

//Formula Cursor imports.
import * as Cursor from '@root/Application/e.Editor/PC/Modules/9_Formula/Cursor/Cursor';

//UniqueId import
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//string formatter.
import * as StringFormatter from '@shared/Framework/Services/DataFormatter/StringFormatter/StringFormatter';

/**
 * @name CMSFormula_Editor
 * @param {object} props props from parent.
 * @param {ref} ref forwarded ref from parent.
 * @summary CMSFormula's editor version.
 * @returns {Component} CMSFormula_Editor
 */
const CMSFormula_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSFormula_Editor_Hooks.GetInitialState(props));

    /**
     * */
    let objFormulaRef = useRef(null);

    /**
     * @name objContext.
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        props,
        dispatch,
        "ModuleName": "CMSFormula_Editor_" + props.ElementJson.iElementId,
        ['CMSFormula_Editor_ModuleProcessor']: new CMSFormula_Editor_ModuleProcessor(),
        objFormulaRef
    };

    /**
     * @name CMSTextArea_Editor_Hook.Initialize
     * @summary Initialize method call in CMSTextArea_Editor_Hook, that contains all the custom hooks.
     */
    CMSFormula_Editor_Hooks.Initialize(objContext);

    /**
     * @name UpdateNewMathMl
     * @param {string} strNewMathMl mathMl string. 
     * @summary this method update the formula mathMl from Formula Component.
     */
    const UpdateNewMathMl = (strNewMathMl) => {
        objContext.CMSFormula_Editor_ModuleProcessor.UpdateNewMathMl(objContext, strNewMathMl);
    };

    /**
     * @name useImperativeHandle
     * @summary Gets the Element Json.
     */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async (blnRemoveRef, strSaveActionType, TextEditorRef) => {
            let objElementjson = { ...objContext.state.ElementJson }, intHeight = objFormulaRef.clientHeight, intWidth = objFormulaRef.clientWidth;
            const { vNewFormula, ...objvElementJson } = objElementjson.vElementJson;
            let FormulaDom = await TextEditorRef.current.querySelector('[ielementid="' + state.ElementJson.iElementId + '"][ielementtypeid="' + state.ElementJson.iElementTypeId + '"]');
            let PlaceholderDom = FormulaDom.querySelector("[type='JFormulaEditorPlaceholder']");
            let strHtml = PlaceholderDom.children[0] ? PlaceholderDom.children[0].outerHTML : "";
            let strIdMathMl = PlaceholderDom.children[1] ? PlaceholderDom.children[1].MathJax.elementJax.originalText : "";
            let strHolderMathMl = Cursor.ReplaceIdWithHolder(strIdMathMl);
            return BaseCMSElement.RemoveRefKeyFromJson({
                ...objElementjson, vElementJson: {
                    ...objvElementJson,
                    "html": strHtml,
                    "Values": [{
                        ...objElementjson["vElementJson"]["Values"][0],
                        "mathMl": strHolderMathMl,
                        "iHeight" : intHeight,
                        "iWidht" : intWidth
                    }]
                }
            });
        },
        "GetElementJsonForCopy": async (TextEditorRef) => {
            let objElementjson = { ...objContext.state.ElementJson };
            const { vNewFormula, ...objvElementJson } = objElementjson.vElementJson;
            let FormulaDom = TextEditorRef.current.querySelector('[ielementid="' + state.ElementJson.iElementId + '"][ielementtypeid="' + state.ElementJson.iElementTypeId + '"]');
            let PlaceholderDom = FormulaDom.querySelector("[type='JFormulaEditorPlaceholder']");
            let strHtml = PlaceholderDom.children[0] ? PlaceholderDom.children[0].outerHTML : "";
            let strIdMathMl = PlaceholderDom.children[1] ? PlaceholderDom.children[1].MathJax.elementJax.originalText : "";
            let strHolderMathMl = Cursor.ReplaceIdWithHolder(strIdMathMl);
            return BaseCMSElement.RemoveRefKeyFromJson({
                ...objElementjson, "iElementId": UniqueId.GetUniqueId(), vElementJson: { ...objvElementJson, "html": strHtml, Values: [{ ...objElementjson["vElementJson"]["Values"][0], "mathMl": strHolderMathMl }] }
            });
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSFormula_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);

    /** 
     * @name GetContent 
     * @summary return the root JSX of the Component. 
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        return (<span ielementid={state.ElementJson["iElementId"]}
            ielementtype={state.ElementJson["vElementTypeName"]}
            contentEditable={false}
            unselectable="on"
            ref={objFormulaRef}
            className="formula-main"
            ciscmsformularoot="Y"
            ielementtypeid={state.ElementJson["iElementTypeId"]}>
            <Formula ElementJson={state.ElementJson}
                PageId={state.PageId}
                ComponentKey={state.ComponentKey}
                JConfiguration={props.JConfiguration}
                FormulaRef={state.FormulaRef}
                ParentRef={objContext.props.ElementRef}
                UpdateNewMathMl={UpdateNewMathMl} />
        </span>);
    };

    /**
     * @name GetContent
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

export default Helper.forwardComponent(CMSFormula_Editor);
