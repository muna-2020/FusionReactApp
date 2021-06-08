// React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as AddEditDocument_Hook from '@shared/Application/c.ProductManagement/Modules/5_Document/AddEditDocument/AddEditDocument_Hook';
import AddEditDocument_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/5_Document/AddEditDocument/AddEditDocument_ModuleProcessor';
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';

/**
  * @name AddEditDocument
  * @param {object} props props
  * @summary This component is used to Add/Edit the Document data.
  * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
  */
const AddEditDocument = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditDocument_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditDocument_ModuleProcessor": new AddEditDocument_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    const domFileUploadRef = useRef(null);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.AddEditDocument_ModuleProcessor.Initialize(objContext, objContext.AddEditDocument_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditDocument_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditDocument_Hook.Initialize(objContext);

    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", props);

    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="Document" className="tabcontent subject-management">
                    <div className="title">
                        {Localization.TextFormatter(objTextResource, 'Document')}
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'DocumentName')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    onFocus={(e => { objContext.AddEditDocument_ModuleProcessor.ValidateFocus(objContext, 'vDocumentName'); })}
                                    id="vDocumentName"
                                    className="text-input"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditDocument_ModuleProcessor.HandleChange("vDocumentName", e.target.value, objContext);
                                    }}
                                    value={state.objData["vDocumentName"]}
                                />
                            </div>
                        </div>
                    </div>
                    {
                        !objContext.props.Data.IsEdit
                            ?
                            <div className="col col-1">
                                <div className="col-item" style={{ "align-items": "flex-start" }}>
                                    <div className="row-left" style={{ "padding-top": "6px"}}>
                                        <span>{Localization.TextFormatter(objTextResource, 'Document')}</span>
                                    </div>
                                    <div className="row-right document-upload">
                                        <FileUpload
                                            ref={domFileUploadRef}
                                            Id="Document_FileUpload"
                                            Data={props.Data}
                                            Resource={{
                                                Text: objTextResource,
                                                SkinPath: props.JConfiguration.IntranetSkinPath,
                                                ImagePath: {
                                                    DownloadIcon: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/download_brown.png", //by default down-arrow will show.
                                                    DeleteIcon: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_brown.png", //by default recycle-bin will show.
                                                    UploadIcon: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/attachment.png" //by default plus will show.
                                                }
                                            }}
                                            Meta={{
                                                ShowUploadedFiles: true, // To show details of uploaded files.
                                                UploadSingle: 'Y',
                                                //AllowDropFiles: false
                                            }}
                                            CallBacks={{
                                                OnUploadComplete: (objFileData) => objContext.AddEditDocument_ModuleProcessor.OnUploadComplete(objFileData, objContext)
                                            }}
                                            ParentProps={props}
                                        />
                                    </div>
                                </div>
                            </div>
                            :
                            <React.Fragment />
                    }


                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'Description')}</span>
                            </div>
                            <div className="row-right">
                                <textarea
                                    onFocus={(e => { objContext.AddEditDocument_ModuleProcessor.ValidateFocus(objContext, 'vDescription'); })}
                                    id="vDescription"
                                    className="textarea"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditDocument_ModuleProcessor.HandleChange("vDescription", e.target.value, objContext);
                                    }}
                                    value={state.objData["vDescription"]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="ValidationError" />
            </React.Fragment>
        );
    }

    return state.objData ? GetContent() : <React.Fragment />

};

export default connect(IntranetBase_Hook.MapStoreToProps(AddEditDocument_ModuleProcessor.StoreMapList()))(AddEditDocument);
