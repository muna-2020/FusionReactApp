// React related imports.
import React, { useRef, useReducer, useEffect, useImperativeHandle, useLayoutEffect } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

// module related imports.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSInputFormula/CMSInputFormula_Common/CMSInputFormula_Common';
import * as CMSInputFormula_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInputFormula/CMSInputFormula_TestApplication/CMSInputFormula_TestApplication_Hooks';
import CMSInputFormula_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInputFormula/CMSInputFormula_TestApplication/CMSInputFormula_TestApplication_ModuleProcessor";

//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

//Formula Cursor imports.
import * as Cursor from '@root/Application/e.Editor/PC/Modules/9_Formula/Cursor/Cursor';

/**
 * @name CMSInputFormula_TestApplication
 * @param {object} props component props
 * @param {any} ref componet ref
 * @summary CMSInputFormula's test application version.
 * @returns {any} CMSInputFormula_TestApplication
 */
const CMSInputFormula_TestApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSInputFormula_TestApplication_Hooks.GetInitialState(props));

    /**
     * @summary dom formula ref.
     * */
    let objInputFormulaRef = useRef(null);

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state, dispatch, props,
        "ModuleName": "CMSInputFormula_TestApplication_" + props.ElementJson.iElementId,
        ["CMSInputFormula_TestApplication_ModuleProcessor"]: new CMSInputFormula_TestApplication_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSInputFormula_TestApplication_ModuleProcessor.Initialize(objContext, objContext.CMSInputFormula_TestApplication_ModuleProcessor);

    /**
     * @name CMSInputFormula_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSInputFormula_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSInputFormula_TestApplication_Hooks.Initialize(objContext);

    /**
     * @param {any} strType
     * @summary 
     */
    const AddSubFormula = (strType) => {
        objContext.CMSInputFormula_TestApplication_ModuleProcessor.AddSubFormula(strType, objContext);
    };

    /**
     * @name RemoveMathMl
     * */
    const RemoveMathMl = () => {
        state.FormulaRef.current.RemoveMathMl();
    };

    /**
     * @name MoveCursorLeft
     * */
    const MoveCursorLeft = () => {
        state.FormulaRef.current.MoveCursorLeft();
    };

    /**
     * @name MoveCursorRight
     * */
    const MoveCursorRight = () => {
        state.FormulaRef.current.MoveCursorRight();
    };

    /**
     * @name ResetFormula
     * */
    const ResetFormula = () => {
        state.FormulaRef.current.ResetFormula();
    };

    /**
     * @name useImperativeHandle
     * @summary Gets the Element Json.
     */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        GetUserResponse: () => {
            let PlaceholderDom = objInputFormulaRef.current.querySelector("[type='JFormulaEditorPlaceholder']");
            let strIdMathMl = PlaceholderDom.children[1] ? PlaceholderDom.children[1].MathJax.elementJax.originalText : "";
            let strHolderMathMl = Cursor.ReplaceIdWithHolder(strIdMathMl);
            return [
                {
                    ["iElementId"]: objContext.state.ElementJson["iElementId"],
                    ["vElementTypeName"]: objContext.state.ElementJson["vElementTypeName"],
                    ["Answers"]: [{ "vMathMl": strHolderMathMl }],
                }
            ];

        }
    }), [objContext.state, objContext.props]);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                AddSubFormula,
                RemoveMathMl,
                MoveCursorLeft,
                MoveCursorRight,
                ResetFormula
            },
            "Callbacks": {
            },
            "AppType": "TestApplication"
        };
        return <Common {...objCommonProps} />;
    };

    /** 
     * @summary Checks if the state is fully loaded and then call the GetContent(). 
     * */
    return state.isLoadComplete ? GetContent() : "";
};

export default Helper.forwardComponent(CMSInputFormula_TestApplication);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSInputFormula_TestApplication_ModuleProcessor; 