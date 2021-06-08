// React related import
import React, { useReducer, useEffect, useImperativeHandle, useRef, memo } from 'react';

//Application State classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import * as CMSColorFill_Editor_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFill/CMSColorFill_Editor/CMSColorFill_Editor_Hook';
import CMSColorFill_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFill/CMSColorFill_Editor/CMSColorFill_Editor_ModuleProcessor";

// Throttle related import
import { throttle } from 'lodash';

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name CMSColorFill_Editor
 * @param {object} props props from parent
 * @param {ref} ref ref to component
 * @summary CMSColorFill's editor version.
 * @returns {component} component
 */
const CMSColorFill_Editor = (props) => {

    /**
    * @summary Define state and dispatch for the reducer to set state and also, holds ref's.
    */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSColorFill_Editor_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSColorFill_Editor_" + props.ElementJson.iElementId,
        ["CMSColorFill_Editor_ModuleProcessor"]: new CMSColorFill_Editor_ModuleProcessor()
    };

    /**
     * @name CMSColorFill_Editor_Hook.Initialize
     * @summary Initialize method call in CMSColorFill_Editor_Hook, that contains all the custom hooks.
     */

    CMSColorFill_Editor_Hook.Initialize(objContext);


    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objTextElementProps = {};
        if (objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = objContext.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = objContext.CMSColorFill_Editor_ModuleProcessor.GetTextElementProps(objContext, objElementHeader["iElementTextId"]);
        }
        return (
            <div>
                {
                    !objContext.state.blnEditMode && objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? <CMSText_Editor {...objTextElementProps} /> : ""
                }
                <div onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); objContext.CMSColorFill_Editor_ModuleProcessor.OpenContextMenu(objContext); }}>
                    <object id={`alphasvg_${objContext.state.ElementJson.iElementId}`} data={`${objContext.props.JConfiguration.WebDataPath}Repo/ColorFill/${objContext.props.JConfiguration.MainClientId}/${objContext.state.ElementJson.vColorFillElementJson.iElementId}_ColorFill_${objContext.state.ElementJson.vColorFillElementJson.vElementJson.iColorFillFileVersion}.${objContext.state.ElementJson.vColorFillElementJson.vElementJson.vColorFillType}`} type="image/svg+xml" ></object>
                </div>
            </div>
        );
    };

    /**
    * @summary Calls the GetContent method.
    * */
    return GetContent();
};

export default CMSColorFill_Editor;
