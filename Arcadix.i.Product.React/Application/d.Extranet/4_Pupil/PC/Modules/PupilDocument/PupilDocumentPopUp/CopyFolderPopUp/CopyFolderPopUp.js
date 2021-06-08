import { withRouter } from "react-router-dom";
import React, {
    useState

} from "react";
import Tree from "@root/Framework/Controls/Tree/Tree";

const CopyFolderPopUp = props => {
    let [objSelFol, SetSelFolder] = useState(undefined);
    let objTreeData = {
        NodeData: props.Data.arrFolderData
    };

    let objEvents = {
        OnSelectNode: (objSelectedFolder) => { SetSelFolder(objSelectedFolder); },
        OnDragAndDrop: () => { },
        OnExpandOrCollapse: () => { }
    }

    let objTextResource = props.Resource.Text;

    return (
        <div className="copying-folder-wrapper-class">
            <span className="copying-header">
                {Localization.TextFormatter(objTextResource, 'MoveFolderPopUpHeadeer')}
            </span>

            <div className="copying-folder-list">
                <Tree
                    Id="PupilDocumentTree_Popup"
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

            <div className="footer-block">
                <button className="button orange-button" onClick={e => Popup.ClosePopup(props.Id)}>
                    {Localization.TextFormatter(objTextResource, 'Close')}
                </button>
                <button className="button orange-button" onClick={() => { OnClickSave() }}>
                    {Localization.TextFormatter(objTextResource, 'Save')}
                </button>
            </div>
        </div>
    );

    function OnClickSave() {
        props.Events.OnClickSave(objSelFol);
        Popup.ClosePopup(props.Id);
    }
};

CopyFolderPopUp.DynamicStyles = () => {
    var arrStyles = [
        JConfiguration.ExtranetSkinPath +
        "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocumentPopUp/CopyingFolderPopUp.css"
    ];
    return arrStyles;
};

export default CopyFolderPopUp;
