// React related import
import React, { useReducer, forwardRef, useRef } from 'react';
import { connect } from "react-redux";

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related files.
import MultiMediaManagement_ModuleProcessor from "@shared/Application/e.Editor/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_ModuleProcessor";
import * as MultiMediaManagement_MetaData from "@shared/Application/e.Editor/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_MetaData";
import * as MultiMediaManagement_Hook from "@shared/Application/e.Editor/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_Hook";
import MultiMediaManagement_FolderDetails from "@root/Application/e.Editor/PC/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_Folder/MultiMediaManagement_FolderDetails/MultiMediaManagement_FolderDetails";
import MultiMediaManagement_ElementDetails from "@root/Application/e.Editor/PC/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_Element/MultiMediaMangement_ElementDetails/MultiMediaManagement_ElementDetails";

//Tree import
import Tree from "@root/Framework/Controls/Tree/Tree";

const MultiMedia_Management = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, MultiMediaManagement_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = {
        state,
        props,
        dispatch,
        "PreselectNode_Ref": useRef(null),
        ["MultiMediaManagement_ModuleProcessor"]: new MultiMediaManagement_ModuleProcessor()
    };

    /**
     * @name Initialize
     * @summary Initialize method call in MultiMediaManagement_Hook, that contains all the custom hooks.
     */
    MultiMediaManagement_Hook.Initialize(objContext);

    /**
     * @name GetPopupDescriptionContent
     * @param {object} objTextResource text resource data
     * @returns {any} returns popup description content JSX
     */
    const GetPopupDescriptionContent = () => {
        const PopupDescription = props.ComponentController.GetComponent(`${objContext.props.Data.MediaType}PopupDescription`);
        return (
            <PopupDescription {...props} />
        );
    };

    /**
     * @name GetSelectedDetails
     * @param {object} objTextResource text resource data
     * @returns {any} returns selected content JSX
     */
    const GetSelectedDetails = () => {
        if (objContext.state.strSelectedNodeType) {
            console.log(objContext.state.strSelectedNodeType)
            if (objContext.state.strSelectedNodeType.toLowerCase() === "multimedia") {
                return (
                    <MultiMediaManagement_ElementDetails
                        {...props}
                        MediaType={objContext.state.objSelectedNodeData["vElementTypeName"]}
                        UpdateElementJson={(objUpdatedNodeJson) => { objContext.MultiMediaManagement_ModuleProcessor.UpdateElementJson(objContext, objUpdatedNodeJson); }}
                        ElementDetails={objContext.state.objSelectedNodeData} />
                );
            }
            else {
                return (
                    <MultiMediaManagement_FolderDetails {...props} FolderDetails={objContext.state.objSelectedNodeData} />
                );
            }
        }
    };

    /**
     * @name GetContent
     * @summary Contains JSX
     * @returns {JSX} JSX
     */
    const GetContent = () => {
        let objMeta = MultiMediaManagement_MetaData.GetTreeMetaData();
        return (<>
            <div className="image-upload-grid">
                <div
                    className="folder-tree"
                    onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        objContext.MultiMediaManagement_ModuleProcessor.OpenContextMenu(objContext, e.clientX, e.clientY, "Folder");
                    }}
                >
                    <Tree
                        Id={"MultiMediaManagement_Tree"}
                        Meta={objMeta}
                        Data={{
                            "NodeData": objContext.state.arrNodeData,
                            "SelectedNodeId": objContext.props.Data.PreSelectNode ? objContext.props.Data.PreSelectNode["iElementId"] : objContext.state.intSelectedNode ? objContext.state.intSelectedNode : undefined
                        }}
                        Events={{
                            "OnSelectNode": (objNode) => { objContext.MultiMediaManagement_ModuleProcessor.Nodeclick(objContext, objNode); },
                            "OnContextMenuClick": (event, objNode) => {
                                objContext.MultiMediaManagement_ModuleProcessor.OpenContextMenu(objContext, event.clientX, event.clientY, "Tree", objNode);
                            }
                        }}
                        CallBacks={{}}
                        Resource={{
                            "SkinPath": props.JConfiguration.IntranetSkinPath,
                            "ImagePathDetails": {
                                "FOLDER": "/Images/editor/Folder.gif",
                                "ANIMATION": "/Images/editor/Animation.svg",
                                "CONSTRUCT": "/Images/editor/Construct.svg",
                                "JPG": "/Images/editor/Jpg.svg",
                                "JPEG": "/Images/editor/Jpg.svg",
                                "GIF": "/Images/editor/gif.svg",
                                "PNG": "/Images/editor/png.svg",
                                "VIDEO": "/Images/editor/Video.gif",
                                "AUDIO": "/Images/editor/Audio.gif",
                                "DOC": "/Images/editor/DOC.gif",
                                "DOCX": "/Images/editor/DOC.gif",
                                "EXCEL": "/Images/editor/EXCEL.gif",
                                "EXPAND": "/Images/editor/EXPAND.svg",
                                "HTM": "/Images/editor/HTM.gif",
                                "ICON_EDIT": "/Images/editor/ICON_EDIT.gif",
                                "PDF": "/Images/editor/PDF.gif",
                                "TXT": "/Images/editor/TXT.gif",
                                "MODULE": "/Images/editor/Module.svg",
                                "COLORFILL": "/Images/editor/ColorFill.png",
                                "Default": "/Images/editor/DefaultFile.png"
                            }
                        }}
                    />
                </div>
                {
                    objContext.state.strSelectedNodeType === null && objContext.props.Data.MediaType.toLowerCase() !== "usecase" ? GetPopupDescriptionContent() : GetSelectedDetails()
                }

            </div>
            <div>
                {
                    objContext.state.blnShowContainerForExternalLink ?
                        <div className="external-link">
                            <h3> External link </h3>
                            <div className="external-link-flex">
                                <span>URL</span>
                                <input type="text" value={objContext.state.vLinkURL} onChange={(e) => { objContext.MultiMediaManagement_ModuleProcessor.HandleExternalInputChange(objContext, e.target.value) }} />
                            </div>
                        </div> : <React.Fragment />
                }
            </div>
        </>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : ""
};

function mapStateToProps(state, ownProps) {
    return {
        [`Editor_TaskContent_CMS${ownProps.Data.MediaType}AddEdit_Module`]: state.Entity[`Editor_TaskContent_CMS${ownProps.Data.MediaType}AddEdit_Module`],
        ["Object_DevServer_ProductManagement_Folder"]: state.Entity["Object_DevServer_ProductManagement_Folder"],
        ["Object_DevServer_ProductManagement_ProductDocument"]: state.Entity["Object_DevServer_ProductManagement_ProductDocument"],
        ["Object_DevServer_ProductManagement_Module"]: state.Entity["Object_DevServer_ProductManagement_Module"]
    };
}

const ConnectedComponent = connect(mapStateToProps)(MultiMedia_Management);

export default forwardRef((props, ref) => {
    return (
        <ConnectedComponent myRef={ref} {...props} />
    );
});
