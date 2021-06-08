// React related import
import React, { useReducer, useEffect, createRef } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

import * as CMSLink_TestApplication_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLink/CMSLink_TestApplication/CMSLink_TestApplication_Hook';
import CMSLink_TestApplication_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLink/CMSLink_TestApplication/CMSLink_TestApplication_ModuleProcessor';

/**
 * @name CMSLinks_TestApplication
 * @param {object} props props from parent
 * @param {ref} ref ref to component
 * @summary CMSLink's TestApplication version.
 * @returns {component} component
 */
const CMSLinks_TestApplication = (props) => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, CMSLink_TestApplication_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSLink_TestApplication_" + props.ElementJson.iElementId,
        "CMSLink_TestApplication_ModuleProcessor": new CMSLink_TestApplication_ModuleProcessor(),
        "Ref": createRef()
    };

    /**
     * @name CMSLink_TestApplication_Hook.Initialize
     * @summary Initialize method call in CMSLink_TestApplication_Hook, that contains all the custom hooks.
     */
    CMSLink_TestApplication_Hook.Initialize(objContext);

    /**
    * @summary Calls the GetContent method.
    * */
    return (
        <React.Fragment>
            <a style={{ "textDecoration": "underline" }} ielementid={objContext.state.ElementJson.iElementId} ielementtypeid={objContext.state.ElementJson.iElementTypeId} ref={objContext.Ref} >
                {props.ElementJson.vElementJson.vLinkText}
            </a>
        </React.Fragment>
    );
};

export default CMSLinks_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSLink_TestApplication_ModuleProcessor; 