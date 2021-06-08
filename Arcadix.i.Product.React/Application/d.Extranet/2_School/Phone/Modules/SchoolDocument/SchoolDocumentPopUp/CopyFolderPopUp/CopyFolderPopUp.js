//React imports.
import React, { useState } from "react";

//Controls
import Tree from "@root/Framework/Controls/Tree/Tree";
//Module specific imports
import * as CopyFolderPopUp_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/SchoolDocument/SchoolDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp_Hook';
import CopyFolderPopUp_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/Modules/SchoolDocument/SchoolDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp_ModuleProcessor';

/**
 * @name SchoolCopyFolderPopUp
 * @summary loads the tree to select destination folder.
 * @param {any} props
 * @returns {Element}
 */
const SchoolCopyFolderPopUp = props => {

    /**
     * @name SelectedFolderState
     * @summary holds target selected folder.
     * */
    const [objSelFol, SetSelFolder] = useState(undefined);
    
    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = {  props, ["CopyFolderPopUp_ModuleProcessor"]: new CopyFolderPopUp_ModuleProcessor() };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    CopyFolderPopUp_Hook.Initialize(objContext);
    /**
     * @name objNodeFields
     * @summary configuration object of tree.
     * */

    let objTreeData = {
        NodeData: props.Data.arrFolderData
    };

    let objEvents = {
        OnSelectNode: (objSelectedFolder) => { SetSelFolder(objSelectedFolder); },
        OnDragAndDrop: () => { },
        OnExpandOrCollapse: () => { }
    }

    return (
        <div className="copy-folder-overlay-main">
            <div className="copy-folder-popup-main">
                <div className="copy-folder-popup-content">
                    <h3>Bitte zu verschiebenden Ordner wählen.</h3>

                    <div className="copying-folder-list">
                        <Tree
                            Id="SchoolDocumentTree_Popup"
                            Meta={props.Events.GetTreeMetaData}
                            Data={objTreeData}
                            Events={objEvents}
                            CallBacks={{
                                OnBeforeShowNode: (objNode) => {
                                    return {
                                        ...objNode,
                                        ImageType: "Folder"
                                    }
                                }
                            }}
                            Resource={props.Events.GetTreeResourceData}
                            ParentProps={{ ...props }}
                        />
                    </div>
                </div>

                <div className="popup-buttons">
                    <button className="green-button" onClick={e => Popup.ClosePopup(props.Id)}>{props.Resource.Text.Close}</button>
                    <button className="yellow-button" onClick={() => { OnClickSave() }}>{props.Resource.Text.Save}</button>
                </div>
            </div>

        </div>
    );

    /**
     * @name OnClickSave
     * @summary calls the save method of parent component. and closes the popup
     * */
    function OnClickSave() {
        props.Events.OnClickSave(objSelFol);
        Popup.ClosePopup(props.Id);
    }
};


export default SchoolCopyFolderPopUp;