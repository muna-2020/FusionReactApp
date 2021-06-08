//React imports 
import React, { useReducer } from 'react';

import { connect } from 'react-redux';

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module related imports
import * as ColorFillWrapperProperties_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Editor/ColorFillWrapperProperties/ColorFillWrapperProperties_Hooks';
import ColorFillWrapperProperties_ModuleProcessor from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Editor/ColorFillWrapperProperties/ColorFillWrapperProperties_ModuleProcessor';
import ColorFillManagement_ColorFillDetails from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSColorFill/CMSColorFill_Editor/CMSColorFillAddEdit/ColorFillManagement_ColorFillDetails/ColorFillManagement_ColorFillDetails';

/**
 * @name ColorFillWrapperProperties
 * @param {object} props props from parent
 * @param {any} ref ref to component
 * @summary ColorFillWrapperProperties.
 * @returns {any} returns JSX
 */
const ColorFillWrapperProperties = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, ColorFillWrapperProperties_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, Ref: React.createRef(), ["ColorFillWrapperProperties_ModuleProcessor"]: new ColorFillWrapperProperties_ModuleProcessor() };

    /**
     * @name ColorFillWrapperProperties_Hooks.Initialize
     * @summary Initialize method call in ColorFillWrapperProperties_Hooks, that contains all the custom hooks.
     */
    ColorFillWrapperProperties_Hooks.Initialize(objContext);

    /**
   * @name  InitializeDataForSSR
   * @param {object} objContext context object
   * @summary Initializing API and DynamicStyles
   * @returns Setting ApplicationState
   */
    objContext.ColorFillWrapperProperties_ModuleProcessor.Initialize(objContext, objContext.ColorFillWrapperProperties_ModuleProcessor);

    /**
     * @name GetContent
     * @summary Contains the jsx of the colorfill wrapper sidebar.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let objTextResource = objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMSColorFillWrapper/ColorFillWrapperProperties"]["Data"][0]["ColorFillWrapperProperties"];
        return (
            <React.Fragment>
                <ColorFillManagement_ColorFillDetails {...props} TextResource={objTextResource} ElementDetails={objContext.state.ElementJson} />
            </React.Fragment>
        );
    };

    /**
     * @sumamry Calls the GetContent().
     */
    return state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name InitialDataParams
* @param {object} props props
* @summary required for SSR
* @returns {object} InitialDataParams 
*/
ColorFillWrapperProperties.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new ColorFillWrapperProperties_ModuleProcessor()).InitialDataParams(props));
};

export default connect(EditorBase_Hook.MapStoreToProps(ColorFillWrapperProperties_ModuleProcessor.StoreMapList()))(ColorFillWrapperProperties);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ColorFillWrapperProperties_ModuleProcessor; 