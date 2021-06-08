// React related imports.
import React, { useReducer, useEffect, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related fies.
import CMSSample_Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSSample/CMSSample_Common/CMSSample_Common';
import * as CMSSample_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSSample/CMSSample_Editor/CMSSample_Editor_Hooks';
import CMSSample_Editor_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSSample/CMSSample_Editor/CMSSample_Editor_ModuleProcessor";

//Application State classes
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//CMSText Editor version
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';
/**
 * @name CMSSample_Editor
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary CMSSample's editor version.
 * @returns {any} CMSSample_Editor
 */
const CMSSample_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSSample_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props, state, dispatch,
        "ModuleName": "CMSSample_Editor_" + props.ElementJson.iElementId,
        ["CMSSample_Editor_ModuleProcessor"]: new CMSSample_Editor_ModuleProcessor()
    };

    /**
     * @name CMSSample_Editor_Hook.Initialize
     * @summary Initialize method call in CMSSample_Editor_Hook, that contains all the custom hooks.
     */
    CMSSample_Editor_Hooks.Initialize(objContext);

    /**
     * @name useEffect
     * @summary To load styles.
     */
    useEffect(() => {
        let AddStyles = EditorState.GetReference("AddStyles");
        AddStyles(CMSSample_Editor.DynamicStyles(props));
    }, []);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
                "OpenContextMenu": (event, objParams) => {
                    event.preventDefault();
                    event.stopPropagation();
                    objContext.CMSSample_Editor_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, objParams);
                },
                "OnClick": (objValue) => {
                    objContext.CMSSample_Editor_ModuleProcessor.OnClick(objContext, objValue);
                }
            },
            "AppType": "Editor"
        };
        return <CMSSample_Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

/**
 * @name CMSSample_Editor.DynamicStyles
 * @param {object} props props
 * @summary required for loading css
 * @returns {any} Styles array
 */
CMSSample_Editor.DynamicStyles = (props) => {
    return [
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSSample/CMSSampleStyles.css"
    ];
};

export default CMSSample_Editor;