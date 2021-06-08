// React related imports.
import React, { forwardRef } from 'react';

//Component related files.
import Node_ComponentProcessor from '@shared/Framework/Controls/Tree/Node/Node_ComponentProcessor';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Inline Images import
import TreeArrowOpenImage from '@inlineimage/Framework/ReactJs/PC/Controls/Tree/TreeArrowOpen.png?inline';
import TreeArrowClosedImage from '@inlineimage/Framework/ReactJs/PC/Controls/Tree/TreeArrowClosed.png?inline';

/**
* @name Node
* @param {object} props props
* @summary This component displays the Node data.
* @returns {object} React.Fragement that encapsulated the Node.
*/
const Node = forwardRef((props, ref) => {

    let GetIconPath = () => {
        var strIcon = props.Resource.SkinPath + "/" + (
            props.Data.NodeData["ImagePath"]
                ? props.Data.NodeData["ImagePath"]
                : (
                    (props.Data.NodeData["ImageType"] && props.Resource.ImagePathDetails)
                        ? (
                            props.Resource.ImagePathDetails[props.Data.NodeData["ImageType"]]
                                ? props.Resource.ImagePathDetails[props.Data.NodeData["ImageType"]]
                                : props.Resource.ImagePathDetails["Default"]
                        ) : "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png")
        );
        var strExtension = strIcon.substring(strIcon.lastIndexOf('.'));
        var strExpandImage = strIcon.substring(0, strIcon.lastIndexOf('.')) + "_expanded" + strExtension;
        var strParentFolderImage = strIcon.substring(0, strIcon.lastIndexOf('.')) + "_plus" + strExtension;
        if (props.Data.NodeData.CustomIcon) {
            strExtension = props.Data.NodeData.FileExtension;
            return props.Meta.IsNodeExpanded
                ? strIcon.substring(0, strIcon.lastIndexOf('.')) + "_" + props.Data.NodeData.CustomIcon + "_expanded" + strExtension
                : strIcon.substring(0, strIcon.lastIndexOf('.')) + "_" + props.Data.NodeData.CustomIcon + strExtension;;
        } else {
            if (props.Meta.ShowExpandCollapseIcon) {
                return strIcon
            } else {
                if (props.Meta.HasChildren) {
                    return props.Meta.IsNodeExpanded ? strExpandImage : strParentFolderImage
                } else {
                    return props.Meta.IsNodeExpanded ? strExpandImage : strIcon
                }
            }
        }
    }


    let objSelectNode = ApplicationState.GetProperty("SelectedNode");
    let intSeletedNodeId = (ApplicationState.GetProperty("SelectedNode") && ApplicationState.GetProperty("SelectedNode")[props.Meta.TreeId]) ? ApplicationState.GetProperty("SelectedNode")[props.Meta.TreeId][props.Meta.IdField] : null;
    intSeletedNodeId = props.Data.SelectedNode[props.Meta.IdField];
    console.log("props.Meta.ShowExpandCollapseIcon", props.Meta.ShowExpandCollapseIcon)
    return <div id={props.Id} dragdrop_dragelementtype="DraggableElement" ref={ref} className={"folder-flex" + " " + (intSeletedNodeId == props.Data.NodeData[props.Meta.IdField] ? "selected" : "")}
        style={{ paddingLeft: props.Meta.PaddingLength + "px" }}
        onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (!props.Meta.ShowExpandCollapseIcon)
                props.Events.OnExpandOrCollapse();
            props.Events.OnNodeClick();
        }}
        onDoubleClick={() => props.Events.OnDoubleClick()}
    >
        {props.Meta.ShowExpandCollapseIcon ? props.Meta.HasChildren || props.Data.NodeData.ShowExpandCollapseIcon ?
            <img className="folder-thumbnail collapse-img" onClick={e => {
                e.stopPropagation();
                props.Events.OnExpandOrCollapse(e)
            }}
                src={props.Meta.IsNodeExpanded ? TreeArrowOpenImage : TreeArrowClosedImage} />
            :
            <img className="folder-thumbnail collapse-img spacer" src="" /> : <React.Fragment />
        }
        <img className="folder-thumbnail" //onClick={props.Events.OnExpandOrCollapse} 
            src={GetIconPath()}
        />
        <span //onClick={props.Events.OnNodeClick} 
            className="w-100 folder-name">{props.Meta.IsLanguageDependent == "Y" ? (new Node_ComponentProcessor()).GetMultiLanguagetext(props.Data.NodeData, props.Meta) : props.Data.NodeData[props.Meta.TextField]} </span>
    </div>
});

export default Node;