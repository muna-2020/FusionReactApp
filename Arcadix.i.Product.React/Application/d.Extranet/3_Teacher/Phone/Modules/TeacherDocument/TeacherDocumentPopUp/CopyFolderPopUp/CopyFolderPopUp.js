//React import s
import React, { useState } from "react";

//controls
import Tree from "@root/Framework/Controls/Tree/Tree";

/**
 * @name TeacherCopyFolderPopUp
 * @summary shows the folder tree to select target folder for copy or move.
 * @param {any} props
 * @returns {Element}
 */
const TeacherCopyFolderPopUp = props => {

    const [objSelFol, SetSelFolder] = useState(undefined)

    const objNodeFields = { Id: 'uDocumentFolderId', ParentId: 'uParentDocumentFolderId', Text: 'vFolderName', Root: '00000000-0000-0000-0000-000000000000', IconPath: props.Resource.SkinPath + '/Images/Common/Icons/', Icon: 'Icon' };

    let objTextResource = props.Resource.Text;

    let objMeta = {
        NodeFields: objNodeFields, //Object that holds basic details of the Node,
        SkinPath: JConfiguration.IntranetSkinPath
    };
    let objTreeData = {
        NodeData: props.Data.arrFolderData
    };

    let objEvents = {
        OnSelectNode: (objSelectedFolder) => { SetSelFolder(objSelectedFolder); },
        OnDragAndDrop: () => { },
        OnExpandOrCollapse: () => { }
    };

    return (
        <div className="copy-folder-overlay-main">
            <div className="copy-folder-popup-main">
                <div className="copy-folder-popup-content">
                    <h3>{Localization.TextFormatter(objTextResource, 'MoveFolderPopUpHeadeer')}</h3>

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
                            Resource={props.Events.GetTreeResourceData} ParentProps={{ ...props }}
                        />
                    </div>
                </div>

                <div className="popup-buttons">
                    <button className="green-button" onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'Close')} </button>
                    <button className="yellow-button" onClick={() => { OnClickSave() }}>{Localization.TextFormatter(objTextResource, 'Save')}</button>
                </div>
            </div>

        </div>
        
    );

    /**
     * @name OnClickSave
     * @summary calls the parent folder save method and closes the popup
     * */
    function OnClickSave() {
        props.Data.OnClickSave(objSelFol);
        Popup.ClosePopup(props.Id);
    }
};

/**
 * @name DynamicStyles
 * @summary styles required for the popup.
 * @returns {Array}
 */
TeacherCopyFolderPopUp.DynamicStyles = () => {
    return [
        JConfiguration.ExtranetSkinPath +
        "/Css/Application/2_School/ReactJs/Phone/Modules/TeacherDocument/TeacherDocumentPopup/CopyingFolderPopUp.css"
    ];
};

export default TeacherCopyFolderPopUp;
