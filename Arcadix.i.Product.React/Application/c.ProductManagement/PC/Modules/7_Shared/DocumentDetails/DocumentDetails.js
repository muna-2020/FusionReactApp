//React related imports...
import React, {useReducer} from "react";
import { connect } from 'react-redux';

//Module related fies...
import * as DocumentDetails_Hook from '@shared/Application/c.ProductManagement/Modules/7_Shared/DocumentDetails/DocumentDetails_Hook';
import DocumentDetails_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/7_Shared/DocumentDetails/DocumentDetails_ModuleProcessor';
import TaskContentPreview from '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview';


/**
* @name DocumentDetails
* @param {object} props props
* @summary This component displays the Task details.
* @returns {object} jsx.
*/
const DocumentDetails = props => {

      /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, DocumentDetails_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "DocumentDetails", ["DocumentDetails_ModuleProcessor"]: new DocumentDetails_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    DocumentDetails_Hook.Initialize(objContext);

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @param {object} objModuleProcessor ModuleProcessor object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.DocumentDetails_ModuleProcessor.Initialize(objContext, objContext.DocumentDetails_ModuleProcessor);

    /**
    * @name GetEditorContent
    * @summary Forms the Editor jsx required for the module.
    * @returns {object} jsx
    */
    const GetDocumenetContent = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/DocumentDetails", objContext.props);
        let arrDocuments = DataRef(objContext.props.Object_DevServer_ProductManagement_ProductDocument, "Object_DevServer_ProductManagement_ProductDocument;cIsDeleted;N;uDocumentFolderId;" + objContext.props.Data.ModuleId)["Data"];
        return <React.Fragment>
            <h3>{objTextResource.Documents}</h3>
            <table>
                {arrDocuments.map(objDocument => {
                        return <tr>
                            <td>{objDocument.vDocumentName}</td>
                            <td>
                                <span><a href={objContext.props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile" + window.location.search + "&FileName=" + objDocument.uDocumentId + "." + objDocument.vFileType + "&Type=ProductManagement&DisplayFileName=" + objDocument.vFileName + "." + objDocument.vFileType}>{objDocument.vFileName + "." + objDocument.vFileType}</a></span>
                            </td>
                            <td>
                                <a href={objContext.props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile" + window.location.search + "&FileName=" + objDocument.uDocumentId + "." + objDocument.vFileType + "&Type=ProductManagement&DisplayFileName=" + objDocument.vFileName + "." + objDocument.vFileType}>
                                    <img src={objContext.props.JConfiguration.ProductManagementSkinPath + "/Images/Application/Modules/Document/download_brown.png"} /></a>
                            </td>
                        </tr>
                })}
            </table>
        </React.Fragment>
    }

    /**
    * @name GetEditorContent
    * @summary Forms the Editor jsx required for the module.
    * @returns {object} jsx
    */
    const GetEditorContent = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/DocumentDetails", objContext.props);
        return <React.Fragment>
            <h3>{objTextResource.Content}</h3>      
            {props.Data.DisplayData.iPageId ? <TaskContentPreview  {...props} PageJson={objContext.props.Data.objPageJson ? objContext.props.Data.objPageJson["iPageId"] != null ? objContext.props.Data.objPageJson : objContext.state.objPageJson : objContext.state.objPageJson} /> : <React.Fragment />}
        </React.Fragment>;
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/DocumentDetails", objContext.props);
        objTextResource = objTextResource ? objTextResource : {}
        return <WrapperComponent
            ComponentName={"FillHeight"}
            id={"FillHeight_" + props.Id}
            Meta={{
                HeaderIds: ["Header", "TaskTitle", "filterHeader"],
                FooterIds: [""]
            }}
            className="bgStyle"
            scrollStyle={{ overflow: "auto" }}
            ParentProps={{ ...props }}
        >
            <h3>{objTextResource.General}</h3>
            <table>
                <tr><td>{objTextResource.Name}</td><td>{props.Data.DisplayData.Name || props.Data.DisplayData.vModuleName || props.Data.DisplayData.vUseCaseName || props.Data.DisplayData.vTestCaseName || props.Data.DisplayData.vImplementationStepName}</td></tr>
                <tr><td>{objTextResource.Description}</td><td>{props.Data.DisplayData.Description || props.Data.DisplayData.vDescription || props.Data.DisplayData.vTestCaseDescription || props.Data.DisplayData.vImplementationStepDescription}</td></tr>
            </table>
            {
                ApplicationState.GetProperty("ActiveMainNavigationId") != "71902243-108E-4E3B-A27C-0C1DA0E11FB9"
                    ?
                    <React.Fragment>
                        {DataRef(objContext.props.Object_DevServer_ProductManagement_ProductDocument, "Object_DevServer_ProductManagement_ProductDocument;cIsDeleted;N;uDocumentFolderId;" + objContext.props.Data.ModuleId)["Data"] ? GetDocumenetContent() : <React.Fragment />}
                        {objContext.state.objPageJson ? GetEditorContent() : <React.Fragment />}
                    </React.Fragment>
                    :
                    <React.Fragment />
            }
        </WrapperComponent>
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;

};

export default connect(IntranetBase_Hook.MapStoreToProps(DocumentDetails_ModuleProcessor.StoreMapList()))(DocumentDetails);
