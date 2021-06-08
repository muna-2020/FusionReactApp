// React related imports.
import React, { useReducer, useEffect } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSSample/CMSSample_Common/CMSSample_Common';
import * as CMSSample_TestApplication_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSSample/CMSSample_TestApplication/CMSSample_TestApplication_Hooks';
import CMSSample_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSSample/CMSSample_TestApplication/CMSSample_TestApplication_ModuleProcessor";

//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

//Application State classes
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

/**
 * @name CMSSample_TestApplication
 * @param {object} props component props
 * @param {any} ref componet ref
 * @summary CMSSample's test application version.
 * @returns {any} CMSSample_TestApplication
 */
const CMSSample_TestApplication = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSSample_TestApplication_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state, dispatch, props,
        "ModuleName": "CMSSample_TestApplication_" + props.ElementJson.iElementId,
        ["CMSSample_TestApplication_ModuleProcessor"]: new CMSSample_TestApplication_ModuleProcessor()
    };

    /**
     * @name CMSSample_TestApplication_Hooks.Initialize
     * @summary Initialize method call in CMSSample_TestApplication_Hooks, that contains all the custom hooks.
     */
    CMSSample_TestApplication_Hooks.Initialize(objContext);

    /**
     * @name useEffect
     * @summary To load styles.
     */
    useEffect(() => {
        let AddStyles = EditorState.GetReference("AddStyles");
        AddStyles(CMSSample_TestApplication.DynamicStyles(props));
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
                "OnClick": (objValue) => {
                    objContext.CMSSample_TestApplication_ModuleProcessor.OnClick(objContext, objValue);
                }
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

/**
 * @name CMSSample_TestApplication.DynamicStyles
 * @param {object} props props
 * @summary required for loading css
 * @returns {any} Styles array
 */
CMSSample_TestApplication.DynamicStyles = (props) => {
    return [
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSSample/CMSSampleStyles.css"
    ];
};

export default Helper.forwardComponent(CMSSample_TestApplication);
