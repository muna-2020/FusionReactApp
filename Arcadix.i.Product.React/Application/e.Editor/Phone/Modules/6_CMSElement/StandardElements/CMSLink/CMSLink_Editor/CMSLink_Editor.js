// React related import
import React, { useReducer, useImperativeHandle, useEffect } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

import * as CMSLink_Editor_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLink/CMSLink_Editor/CMSLink_Editor_Hook';
import CMSLink_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLink/CMSLink_Editor/CMSLink_Editor_ModuleProcessor';


/**
 * @name CMSLink_Editor
 * @param {object} props props from parent
 * @param {ref} ref ref to component
 * @summary CMSLink's editor version.
 * @returns {component} component
 */
const CMSLink_Editor = (props) => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSLink_Editor_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSLink_Editor_" + props.ElementJson.iElementId,
        "CMSLink_Editor_ModuleProcessor": new CMSLink_Editor_ModuleProcessor(), "Ref": React.createRef()
    };

    /**
     * @name CMSLink_Editor_Hook.Initialize
     * @summary Initialize method call in CMSLink_Editor_Hook, that contains all the custom hooks.
     */
    CMSLink_Editor_Hook.Initialize(objContext);

    /**
     * @summary Gets the Element Json.
     */
    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": async () => {
            var strUpdatedLinkText = objContext.Ref.current.innerHTML;
            var objElementJson = { ...objContext.state.ElementJson };
            objElementJson = { ...objElementJson, ["vElementJson"]: { ...objElementJson["vElementJson"], ["vLinkText"]: strUpdatedLinkText } };
            return objElementJson;
        },
        "GetLatestContext": () => {
            return objContext;
        },
        "UpdateTaskEditStatus": () => {
            objContext.CMSLink_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
        }
    }), [objContext.state, objContext.props]);

    /**
    * @returns returns link JSX
    * */
    return (
        <a style={{ "textDecoration": "underline" }}
            className="PageOutputContentAnchor"
            ielementid={objContext.state.ElementJson["iElementId"]}
            ielementtypeid={objContext.state.ElementJson["iElementTypeId"]}
            id={objContext.state.ElementJson["iElementId"]}
            ref={objContext.Ref}
            contentEditable={false}
            ilinkedelementid={objContext.state.ElementJson.vElementJson.cIsExternalLink === 'Y' ? null : objContext.state.ElementJson.vElementJson.Values[0].iElementId}
            velementtype={objContext.state.ElementJson.vElementJson.cIsExternalLink === 'Y' ? 'external' : objContext.state.ElementJson.vElementJson.Values[0].vElementTypeName}
            actualtype={objContext.state.ElementJson.vElementJson.cIsExternalLink === 'Y' ? 'external' : objContext.state.ElementJson.vElementJson.Values[0].vElementTypeName}
            elementtarget={"_"}
            type={"Link"}
            // href={
            //     objContext.state.ElementJson.vElementJson.cIsExternalLink === 'Y' ?
            //     `javascript:openlink(E,${objContext.state.ElementJson.vElementJson.vLinkURL},_)` :
            //     `(${objContext.state.ElementJson.vElementJson.Values[0].vElementTypeName.charAt(0).toUpperCase()},${objContext.state.ElementJson.vElementJson.Values[0].iElementId},_NEW);`
            // }
            vexternalurl={objContext.state.ElementJson.vElementJson.vLinkURL}
            processedhref={objContext.state.ElementJson.vElementJson.cIsExternalLink === 'Y' ?
                `(E, ${objContext.state.ElementJson.vElementJson.vLinkURL}, _NEW)` :
                `(${objContext.state.ElementJson.vElementJson.Values[0].vElementTypeName.charAt(0).toUpperCase()},Framework/Blocks/PopUps/MediaDisplay/MediaDisplay.aspx?strElementId=${objContext.state.ElementJson.vElementJson.Values[0].iElementId}&strElementType=${objContext.state.ElementJson.vElementJson.Values[0].vElementTypeName},_NEW);`
            }
            onClick={(e) => { objContext.CMSLink_Editor_ModuleProcessor.HandleOnClick(objContext, e.detail === 2 ? true : false) }}>
            {objContext.state.ElementJson.vElementJson.vLinkText}
        </a>
    );
};

export default CMSLink_Editor;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSLink_Editor_ModuleProcessor; 