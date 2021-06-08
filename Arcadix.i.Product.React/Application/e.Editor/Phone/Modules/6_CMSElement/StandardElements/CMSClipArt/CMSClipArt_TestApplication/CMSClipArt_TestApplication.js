// React related imports.
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';
import * as CMSClipArt_TestApplication from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSClipArt/CMSClipArt_TestApplication/CMSClipArt_TestApplication_Hooks';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSClipArt/CMSClipArt_Common/CMSClipArt_Common';

/**
 * @name CMSClipArt_Editor
 * @param {object} props props from parent
 * @param {Ref} ElementRef ref to component
 * @summary CMSClipArt's editor version.
 * @returns {Component} CMSClipArt Editor
 */
const CMSClipArt_Editor = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSClipArt_TestApplication.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch };

    /**
     * @name GetContent
     * @summary Calls the RenderBody method to get the JSX.
     * @returns {any} JSX of the Component
     * */
    const GetContent = () => {
        let objProps = {
            "Context": objContext,
            "Events": {}
        };
        return <Common {...objProps} />;
    };

    /**
     * @summary Returs the JSX of the Component
     */
    return GetContent();
};

export default CMSClipArt_Editor;
