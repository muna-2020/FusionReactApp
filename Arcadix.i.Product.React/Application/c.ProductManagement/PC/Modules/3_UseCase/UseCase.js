//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as UseCase_Hook from '@shared/Application/c.ProductManagement/Modules/3_UseCase/UseCase_Hook';
import UseCase_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/3_UseCase/UseCase_ModuleProcessor';
import DocumentDetails from '@root/Application/c.ProductManagement/PC/Modules/7_Shared/DocumentDetails/DocumentDetails';

//In-line Image imports...
import CopyImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Copy.svg?inline';
import OpenEditorImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/OpenEditor.svg?inline';
import DocumentImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Document.svg?inline';
import CutImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Cut.svg?inline';
import PasteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Paste.svg?inline';

/**
 * @name UseCase
 * @param {object} props props
 * @summary This component displays the UseCase data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with UseCase details.
 * 
 */
const UseCase = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, UseCase_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "UseCase", ["UseCase_ModuleProcessor"]: new UseCase_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource, ["ImageMeta"]: GetImageMeta() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.UseCase_ModuleProcessor.Initialize(objContext, objContext.UseCase_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    UseCase_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        let objSelectedRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"] && ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0] ? ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0] : {};
        if (objContext.props.IsForServerRenderHtml) {
            let arrGridData = objContext.UseCase_ModuleProcessor.GetUseCaseGridData(objContext)["RowData"];
            objSelectedRow = arrGridData && arrGridData[0] ? arrGridData[0] : {};
        }
        let strModuleId = objSelectedRow.uUseCaseId;
        let objPageJson = objContext.state.objPageJson != null ? objContext.state.objPageJson["iPageId"] == objSelectedRow["iPageId"] ? objContext.state.objPageJson : {} : {};
        //---Commented Hierarchical Gird Approach----
        //let objselectedImplementationStepRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"] && ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"].filter((objData) => objData["uUseCaseId"] == objselectedRow["uUseCaseId"])[0] ? ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"].filter((objData) => objData["uUseCaseId"] == objselectedRow["uUseCaseId"])[0] : {};
        //let objselectedTestCaseRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"] && ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"].filter((objData) => objData["uUseCaseId"] == objselectedRow["uUseCaseId"])[0] ? ApplicationState.GetProperty("SelectedRows")["TestCaseGrid"].filter((objData) => objData["uUseCaseId"] == objselectedRow["uUseCaseId"])[0] : {};
        //let objSelectedRow = objselectedImplementationStepRow.uUseCaseImplementationStepId ? objselectedImplementationStepRow : objselectedTestCaseRow.uTestCaseId ? objselectedTestCaseRow : objselectedRow; 
        //let strModuleId = objselectedImplementationStepRow.uUseCaseImplementationStepId ? objselectedImplementationStepRow.uUseCaseImplementationStepId : objselectedTestCaseRow.uTestCaseId ? objselectedTestCaseRow.uTestCaseId : objselectedRow.uUseCaseId;        
        //let ImplementationStep = objContext.props.ComponentController.GetComponent("ImplementationStep");
        //let TestCaseStep = objContext.props.ComponentController.GetComponent("TestCaseStep");
        //let GridContent;
        //switch (objContext.state.GridToDisplay){
        //    case "ImplementationGrid":
        //        GridContent = <ImplementationStep
        //            Id="ImplementationStep"
        //            Data={{
        //                "uUseCaseId": objSelectedRow["uUseCaseId"] ? objSelectedRow["uUseCaseId"] : objContext.state.objSelectedRow.uUseCaseId//objSelectedRow["uUseCaseId"]
        //            }}
        //            ParentProps={{ ...objContext.props }}
        //            JConfiguration={{ ...objContext.props.JConfiguration }}
        //        />;
        //        break;
        //    case "TestCaseStepGrid":
        //        objSelectedRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["TestCaseStepGrid"] && ApplicationState.GetProperty("SelectedRows")["TestCaseStepGrid"][0] ? ApplicationState.GetProperty("SelectedRows")["TestCaseStepGrid"][0] : {};
        //        objSelectedRow = { ...objSelectedRow, "Name": objSelectedRow.vTestCaseStepName, "Description": objSelectedRow.vTestCaseStepDescription };
        //        strModuleId = state.objSelectedTestCase.uTestCaseId;
        //        GridContent = <TestCaseStep
        //            Id="TestCaseStep"
        //            Data={{
        //                "uTestCaseId": state.objSelectedTestCase.uTestCaseId
        //            }}
        //            ParentProps={{ ...objContext.props }}
        //            JConfiguration={{ ...objContext.props.JConfiguration }}
        //        />;
        //        break;
        //    case "UseCaseGrid":
        //        GridContent = <Grid
        //            Id="UseCaseGrid"
        //            Meta={objContext.UseCase_ModuleProcessor.GetUseCaseMetaData(objContext)}
        //            Data={objContext.UseCase_ModuleProcessor.GetUseCaseGridData(objContext)}
        //            Resource={objContext.UseCase_ModuleProcessor.GetResourceData(objContext)}
        //            Events={objContext.UseCase_ModuleProcessor.GetUseCaseGridEvents(objContext)}
        //            CallBacks={objContext.UseCase_ModuleProcessor.GetUseCaseGridCallBacks(objContext)}
        //            ParentProps={{ ...props }}
        //        />;
        //        break;
        //}
        //------------
        return <div className="file-explorer-container" id="UseCase">
            <div className="file-explorer-flex">
                <SplitPane
                    Meta={{ SplitDirection: "vertical", MinSize: 500, MaxSize: 1000, DefaultSize: "50%" }}
                > 
                    <div className="usecase-grid-holder">                       
                        <Grid
                            Id="UseCaseGrid"
                            Meta={objContext.UseCase_ModuleProcessor.GetUseCaseMetaData(objContext)}
                            Data={objContext.UseCase_ModuleProcessor.GetUseCaseGridData(objContext)}
                            Resource={objContext.UseCase_ModuleProcessor.GetResourceData(objContext)}
                            Events={objContext.UseCase_ModuleProcessor.GetUseCaseGridEvents(objContext)}
                            CallBacks={objContext.UseCase_ModuleProcessor.GetUseCaseGridCallBacks(objContext)}
                            ParentProps={{ ...props }}
                        />
                    </div>
                    <div className="file-explorer-detail">
                        {
                            strModuleId 
                                ?
                                <DocumentDetails
                                    Data={{
                                        ModuleId: strModuleId,
                                        DisplayData: objSelectedRow,
                                        objPageJson: objPageJson
                                    }}
                                    {...props}
                                />
                                :
                                <div>Please select UseCase</div>
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
        OpenEditorImage: OpenEditorImage,
        DocumentImage: DocumentImage,
        CutImage: CutImage,
        PasteImage: PasteImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(UseCase_ModuleProcessor.StoreMapList()))(UseCase);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = UseCase_ModuleProcessor;