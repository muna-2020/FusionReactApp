//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as Example_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Example_Hook';
import Example_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Example_ModuleProcessor';

//In-line Image imports...
import CopyLinkImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/CopyLink.svg?inline';

/**
* @name Example
* @param {object} props props
* @summary This component displays the Example data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Example details.
*/
const Example = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Example_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and Example object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Example", ["Example_ModuleProcessor"]: new Example_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @param {object} ModuleProcessor Props
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Example_ModuleProcessor.Initialize(objContext, objContext.Example_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    Example_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/4_Example/Example", objContext.props);

        return <div className="subject-container" id="Example">
            <React.Fragment>
                <button
                    className="btn"
                    onClick={() => objContext.Example_ModuleProcessor.PreviewModule()}
                >{Localization.TextFormatter(objTextResource, "Preview")}</button>

            </React.Fragment>
        </div>;
    }

    return (
        <React.Fragment>{state.isLoadComplete ?
        <React.Fragment>{GetContent()}</React.Fragment> 
        : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
};

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        CopyLinkImage: CopyLinkImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(Example_ModuleProcessor.StoreMapList()))(Example);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Example_ModuleProcessor;