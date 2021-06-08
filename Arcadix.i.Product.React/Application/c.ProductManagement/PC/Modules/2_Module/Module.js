//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as Module_Hook from '@shared/Application/c.ProductManagement/Modules/2_Module/Module_Hook';
import Module_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/2_Module/Module_ModuleProcessor';
import DocumentDetails from '@root/Application/c.ProductManagement/PC/Modules/7_Shared/DocumentDetails/DocumentDetails';
import * as Module_OfficeRibbon from '@shared/Application/c.ProductManagement/Modules/2_Module/Module_OfficeRibbon';

//In-line Image imports...
import CopyImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Copy.svg?inline';
import CopyLinkImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/CopyLink.svg?inline';
import OpenEditorImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenEditor.svg?inline';
import DocumentImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Document.svg?inline';
import CutImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Cut.svg?inline';
import PasteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Paste.svg?inline';

/**
* @name Module
* @param {object} props props
* @summary This component displays the Module data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Module details.
*/
const Module = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Module_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Module", ["Module_ModuleProcessor"]: new Module_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.Module_ModuleProcessor.Initialize(objContext, objContext.Module_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    Module_Hook.Initialize(objContext);

    /**
    * @name  SetRibbonData
    * @param {object} objContext context object
    * @summary  To set and update the Ribbon Data for SSR
    * @returns
    */
    objContext.Module_ModuleProcessor.SetRibbonDataForSSR(objContext, objContext.Module_ModuleProcessor);


    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        let objModule = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["ModuleGrid"] && ApplicationState.GetProperty("SelectedRows")["ModuleGrid"][0] ? ApplicationState.GetProperty("SelectedRows")["ModuleGrid"][0] : {};
        if (objContext.props.IsForServerRenderHtml) {
            let arrGridData = objContext.Module_ModuleProcessor.GetModuleGridData(objContext)["RowData"];
            objModule = arrGridData && arrGridData[0] ? arrGridData[0] : {};
        }
        let strModuleId = objModule.uModuleId;
        let objPageJson = objContext.state.objPageJson != null ? objContext.state.objPageJson["iPageId"] == objModule["iPageId"] ? objContext.state.objPageJson : {} : {}
        return <div className="file-explorer-container" id="Module">
            <div className="file-explorer-flex">
                <SplitPane Meta={{ SplitDirection: "vertical", MinSize: 500, MaxSize: 1000,DefaultSize: "50%" }}> 
                    <Grid
                        Id="ModuleGrid"
                        Meta={objContext.Module_ModuleProcessor.GetModuleMetaData(objContext)}
                        Data={objContext.Module_ModuleProcessor.GetModuleGridData(objContext)}
                        Resource={objContext.Module_ModuleProcessor.GetResourceData(objContext)}
                        Events={objContext.Module_ModuleProcessor.GetModuleGridEvents(objContext)}
                        CallBacks={objContext.Module_ModuleProcessor.GetModuleGridCallBacks(objContext)}
                        ParentProps={{ ...props }}
                    />
                    <div className="file-explorer-detail">
                        {
                            strModuleId ?
                                <DocumentDetails
                                    Data={{
                                        ModuleId: strModuleId,
                                        DisplayData: objModule,
                                        objPageJson: objPageJson
                                    }}
                                    {...props}
                                />
                                :
                                <div className="no-data-display"><span>Please select a Module</span></div>
                        }
                    </div>
                </SplitPane>
            </div>
        </div>;
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
};

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        CopyImage: CopyImage,
        CopyLinkImage: CopyLinkImage,
        OpenEditorImage: OpenEditorImage,
        DocumentImage: DocumentImage,
        CutImage: CutImage,
        PasteImage: PasteImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(Module_ModuleProcessor.StoreMapList()))(Module);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Module_ModuleProcessor; 