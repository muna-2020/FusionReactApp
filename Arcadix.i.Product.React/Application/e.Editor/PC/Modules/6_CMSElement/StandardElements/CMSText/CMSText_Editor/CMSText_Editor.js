// React related imports.
import React, { useReducer, useEffect, forwardRef, useRef } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Common/CMSText_Common';
import * as CMSText_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_Hooks'
import CMSText_Editor_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_ModuleProcessor';

//Application State classes
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//Components used.
import Text_Editor from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Text_Editor";

/**
 * @name CMSText_Editor
 * @param {object} props props from parent.
 * @param {ref} ref reference to component.
 * @summary CMSText's editor version.
 * @returns {any} CMSText_Editor
 */
const CMSText_Editor = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSText_Editor_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        props,
        state,
        dispatch,
        "ModuleName": "CMSText_Editor_" + props.ElementJson.iElementId,
        ["Element_UndoRedoDataRef"]: useRef((props.PreservedState && props.PreservedState.Text_EditorState) ? { [props.ElementJson.iElementId]: props.PreservedState.Text_EditorState } : {}),
        ["CMSText_Editor_ModuleProcessor"]: new CMSText_Editor_ModuleProcessor()
    };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CMSText_Editor_ModuleProcessor.Initialize(objContext, objContext.CMSText_Editor_ModuleProcessor);

    /**
     * @name CMSText_Editor_Hooks.Initialize
     * @summary Initialize method call in CMSText_Editor_Hooks, that contains all the custom hooks.
     */
    CMSText_Editor_Hooks.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Get the common JSX
     * @returns {any} Jsx of the component
     * */
    const GetContent = () => {
        let objCommonProps = {
            "Context": objContext,
            "Events": {
            },
            "Callbacks": {
            },
            "TextElement": Text_Editor,
            "AppType": "Editor"
        };
        return <Common {...objCommonProps} />;
    };

    /**
     * @summary Calls the GetContent().
     */
    return GetContent();
};

/**
 * @name UndoRedo
 * @param {any} Component Component
 * @summar this handle the UndoRedo operation for CMSText.
 * @returns {any} Undo-redo wrapped CMSText.
 */
const UndoRedoCMSText = (Component) => {
    let WrappedComp = forwardRef((props, ref) => {
        return <Component {...props} UndoRedoRef={ref} />;
    });
    return forwardRef((sprops, ref) => {
        const Comp = props => {
            let ComponentKey = "element_" + (props.ElementJson && props.ElementJson.iElementId ? props.ElementJson.iElementId : "");
            let ComponentRef = useRef(null);
            useEffect(() => {
                EditorState.SetReference(ComponentKey, ComponentRef);
            }, [props]);
            return <WrappedComp {...props} ComponentKey={ComponentKey} ref={ComponentRef} />;
        };
        return <Comp ElementRef={ref} {...sprops} />;
    });
};

/**
 * @name WrapperComponent
 * */
const WrapperComponent = UndoRedoCMSText(CMSText_Editor);

/**
 * @name CMSText_Wrapper
 * @param {object} props props from parent.
 * @param {any} ref ref to component.
 * @summary Wrapper Component for CMSText.
 */
const CMSText_Wrapper = React.memo((props, ref) => {
    return (
        <WrapperComponent {...props} />
    );
}, (prevProps, nextProps) => {
    return prevProps.ElementJson["iElementId"] === nextProps.ElementJson["iElementId"] && nextProps.ParentRef.current !== null;
});

export default CMSText_Wrapper;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSText_Editor_ModuleProcessor; 