// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

import * as CMSFormula_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSFormula/CMSFormula_TestApplication/CMSFormula_TestApplication_Hooks';
import CMSFormula_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSFormula/CMSFormula_TestApplication/CMSFormula_TestApplication_ModuleProcessor";

/**
 * @name CMSFormula_TestApplication
 * @param {object} props component props
 * @param {reference} ref componet ref
 * @summary formula's test application version.
 * @returns {component} CMSFormula_TestApplication
 */
const CMSFormula_TestApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSFormula_TestApplication_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        dispatch,
        props,
        "ModuleName": "CMSFormula_TestApplication_" + props.ElementJson.iElementId,
        ["CMSFormula_TestApplication_ModuleProcessor"]: new CMSFormula_TestApplication_ModuleProcessor()
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        return (
            <span ielementid={state.ElementJson["iElementId"]}
                ielementtype={state.ElementJson["vElementTypeName"]}
                contentEditable={false}
                className="formula-main"
                ielementtypeid={state.ElementJson["iElementTypeId"]}>
                <span formulaspan="Y" style={{ position: "relative" }} dangerouslySetInnerHTML={{ __html: state.ElementJson.vElementJson.html }}>
                </span>
            </span>
        )
    };

    /**
     * @summary Checks if the state is fully loaded and then call the GetContent().
     */
    return GetContent();
};

export default CMSFormula_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSFormula_TestApplication_ModuleProcessor; 