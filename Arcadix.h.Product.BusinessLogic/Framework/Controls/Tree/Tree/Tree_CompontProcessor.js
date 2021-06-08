//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
* @name Form_ComponentProcessor.
* @summary Class for Row.
*/
class Tree_CompontProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            //{ "StoreKey": "ApplicationState", "DataKey": "ExpandedNodes" },
            //{ "StoreKey": "ApplicationState", "DataKey": "SelectedNode" }
        ];
    };

    /**
    * @name OnSelectNode
    * @param {*} objSelectedNode
    * @summary To assingn the CSS for selection, set the selected node in "ApplicationState", call the callback from the Module
    */
    OnSelectNode(objSelectedNode, objContext, refTree) {
        let intSeletedNodeId = (ApplicationState.GetProperty("SelectedNode") && ApplicationState.GetProperty("SelectedNode")[objContext.props.Id]) ? ApplicationState.GetProperty("SelectedNode")[objContext.props.Id][objContext.props.Meta.IdField] : null;
        intSeletedNodeId = objSelectedNode[objContext.props.Meta.IdField];
        //if (intSeletedNodeId != undefined && refTree.current[intSeletedNodeId] != undefined && refTree.current[intSeletedNodeId].current) {
        //    refTree.current[intSeletedNodeId].current.className = "folder-flex";
        //}
        //refTree.current[objSelectedNode[objContext.props.Meta.IdField]].current.className = "folder-flex selected";
        ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), [objContext.props.Id]: objSelectedNode });
        objContext.props.Events.OnSelectNode(objSelectedNode, objContext.props.Data.NodeData);
        Performance.StartNewBatch(true);
        objContext.dispatch({ type: "SET_STATE", payload: { objSelectedNode} });
    }

    /**
    * @name OnExpandOrCollapse
    * @param {*} objNodeToExpandOrCollapse
    * @summary To set the ExpandedNodes in "ApplicationState".
    */
    OnExpandOrCollapse(objNodeToExpandOrCollapse, objContext, blnIsNodeExpanded) {
        let arrExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") && ApplicationState.GetProperty("ExpandedNodes")[objContext.props.Id] ? ApplicationState.GetProperty("ExpandedNodes")[objContext.props.Id] : [];
        arrExpandedNodes = objContext.state.arrExpandedNodes;
        let arrNewNodes = arrExpandedNodes.filter(objExpandedNode => objExpandedNode[objContext.props.Meta.IdField] != objNodeToExpandOrCollapse[objContext.props.Meta.IdField]);
        if (arrNewNodes.length == arrExpandedNodes.length) {//Node is not present already.
            arrNewNodes = [...arrExpandedNodes, objNodeToExpandOrCollapse];
        }
        ApplicationState.SetProperty("ExpandedNodes", { ...ApplicationState.GetProperty("ExpandedNodes"), [objContext.props.Id]: arrNewNodes });
        objContext.dispatch({ type: "SET_STATE", payload: { arrExpandedNodes: arrNewNodes } });
        objContext.props.Events.OnExpandOrCollapse ? objContext.props.Events.OnExpandOrCollapse(arrNewNodes, objNodeToExpandOrCollapse, blnIsNodeExpanded) : null;
    }

    /**
    * @name IsExpanded
    * @param {*} objNode
    * @summary Check if the node is present in the objContext.props.ExpandedNodes (from ApplicationState).
    * @returns {bool}
    */
    IsExpanded(objNode, objContext) {
        let blnIsNodeExpanded = false;
        let arrExpandedNodes = [];
        arrExpandedNodes = objContext.state.arrExpandedNodes;
        if (objContext.props.ParentProps && objContext.props.ParentProps.IsForServerRenderHtml && objContext.props.Data.SelectedNodeId) {
            arrExpandedNodes = this.GetParentNodes(objContext, objContext.props.Data.SelectedNodeId);
        }
        arrExpandedNodes.map(item => {
            if (item[objContext.props.Meta.IdField] == objNode[objContext.props.Meta.IdField]) {
                blnIsNodeExpanded = true;
            }
        })
        return blnIsNodeExpanded;
    }

    /**
    * @name OnDrop
    * @param {*} event
    * @param {*} strDropNodeId
    * @summary To take the Node Id from the DataTransfer and form the Node Data accordingly.
    */
    HandleDrop(strDragNodeId, strDropNodeId, objContext) {
        if (strDropNodeId !== strDragNodeId) {
            var arrDraggedNodes = objContext.props.Data.NodeData.map((node) => {
                if (node[objContext.props.Meta.IdField].toString() === strDragNodeId) {
                    node[objContext.props.Meta.ParentIdField] = strDropNodeId;
                }
                return node;
            })
            objContext.props.Events.OnDragAndDrop(arrDraggedNodes);
        }
        else {
            console.log('cant drop a node to itself')
        }
    }

    /**
    * @name GetParentNodes
    * @param {*} objNode
    * @param {*} strNodeId
    * @summary To fill the ApplicationState with all the parent nodes.
    * @returns {bool}
    */
    GetParentNodes(objContext, strNodeId) {
        var arrExpandedNodes = [];
        let objNode = objContext.props.Data.NodeData.find(obj => obj[objContext.props.Meta.IdField] == strNodeId);
        if (objNode.ParentNavigationId == "1") {
            arrExpandedNodes = [objNode];
        }
        while (objNode) {
            objNode = objContext.props.Data.NodeData.find(obj => obj[objContext.props.Meta.IdField] == objNode[objContext.props.Meta.ParentIdField]);
            if (objNode)
                if (arrExpandedNodes.filter(objExpandedNodes => objExpandedNodes[objContext.props.Meta.IdField] == objNode[objContext.props.Meta.IdField]).length == 0)
                    arrExpandedNodes = [...arrExpandedNodes, objNode];
        }
        return arrExpandedNodes;
    }

    /**
   * @name ExpandParentNodes
   * @param {*} objNode
   * @param {*} strNodeId
   * @summary To fill the ApplicationState with all the parent nodes.
   * @returns {bool}
   */
    ExpandParentNodes(objContext, strNodeId) {
        var arrExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") && ApplicationState.GetProperty("ExpandedNodes")[objContext.props.Id] ? ApplicationState.GetProperty("ExpandedNodes")[objContext.props.Id] : [];
        let objNode = objContext.props.Data.NodeData.find(obj => obj[objContext.props.Meta.IdField] == strNodeId);
        while (objNode) {
            objNode = objContext.props.Data.NodeData.find(obj => obj[objContext.props.Meta.IdField] == objNode[objContext.props.Meta.ParentIdField]);
            if (objNode)
                if (arrExpandedNodes.filter(objExpandedNodes => objExpandedNodes[objContext.props.Meta.IdField] == objNode[objContext.props.Meta.IdField]).length == 0)
                    arrExpandedNodes = [...arrExpandedNodes, objNode];
        }
        let arrNewNodes = ApplicationState.GetProperty("ExpandedNodes") ? { ...ApplicationState.GetProperty("ExpandedNodes"), [objContext.props.Id]: arrExpandedNodes } : { [objContext.props.Id]: arrExpandedNodes };
        ApplicationState.SetProperty("ExpandedNodes", arrNewNodes);
        objContext.dispatch({ type: "SET_STATE", payload: { "arrExpandedNodes": arrExpandedNodes } });
    }

    GetDragDropProps(objContext){
        let intUniqueId = UniqueId.GetUniqueId();
        //Each drag zone expects a drag zone props.
        let objDragZoneProps = {
            "Meta": {
                "GroupId": intUniqueId,//the same id should be passed to its respeective dropzone,
                "Disable": false,//if you want to dynamically disable the drag drop feature.
                "DraggableElementType": "DraggableElement",//Element type that is draggable.
                "DragAreaType": "DragArea",//Area from where element has to be dragged.
                "DropAreaType": "DragArea"//Area where element has to be dropped.
            },
            "Events": {
                "OnDrop": (objDraggedElement, objDropArea, objSourceArea, objDragdropData) => {
                    if (objContext.props.Events && objContext.props.Events.OnDragDrop) {
                        objContext.props.Events.OnDragDrop(objDraggedElement.id, objDropArea.id);
                    }
                }
            },
            "CallBacks": {},
            "Data": {}
        };
        return objDragZoneProps;
    }

    SelectNodeOutSideTheTree(objContext, objNodeToSelect) {
        objContext.Tree_CompontProcessor.ExpandParentNodes(objContext, objNodeToSelect[objContext.props.Meta.IdField]);
        objContext.Tree_CompontProcessor.OnSelectNode(objNodeToSelect, objContext);
    }

    ExpandTreeNodesOutSideTheTree(objContext, arrNodesToExpand) {
        objContext.dispatch({ type: "SET_STATE", payload: { "arrExpandedNodes": arrNodesToExpand } });
    }

    /**
    * @name SelectAdjacentTreeNode
    * @param {*} objContext
    * @param {*} objNode
    * @summary Te select the adjacent node (used while deleting the node).
    */
    SelectAdjacentTreeNode(objContext, objNode) {
        let arrNodeData = objContext.props.Data.NodeData.filter(obj => obj[objContext.props.Meta.ParentIdField] == objNode[objContext.props.Meta.ParentIdField]);
        let objNodeToSelect;
        for (var intIndex = 0; intIndex < arrNodeData.length; intIndex++) {
            if (arrNodeData[intIndex][objContext.props.Meta.IdField] == objNode[objContext.props.Meta.IdField]) {
                break;
            }
            objNodeToSelect = arrNodeData[intIndex];            
        }
        objContext.Tree_CompontProcessor.OnSelectNode(objNodeToSelect, objContext);
    }
}

export default Tree_CompontProcessor;