//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name Form_ComponentProcessor.
* @summary Class for Row.
*/
class Tree_CompontProcessor extends Base_ModuleProcessor {

    /**
    * @name OnSelectNode
    * @param {*} objSelectedNode
    * @summary To assingn the CSS for selection, set the selected node in "ApplicationState", call the callback from the Module
    */
    OnSelectNode(objSelectedNode, objContext) {
        let refTree = objContext.refTree;
        if (refTree.current.SelectedNode && refTree.current[refTree.current.SelectedNode]) {
            refTree.current[refTree.current.SelectedNode].current.className = "folder-flex";
        }
        refTree.current[objSelectedNode[objContext.props.Meta.NodeFields.Id]].current.className = "folder-flex selected";
        refTree.current.SelectedNode = objSelectedNode[objContext.props.Meta.NodeFields.Id];
        // let objSelectedNode = ApplicationState.GetProperty("SelectedNode");
        // ApplicationState.SetProperty("SelectedNode", { ...objSelectedNode, [objContext.props.Meta.Id]: objSelectedNode });
        ApplicationState.SetProperty("SelectedNode", objSelectedNode);
        objContext.props.Events.OnSelectNode(objSelectedNode, objContext.state.NodeData);
        objContext.UpdateRef(refTree);
    }

    /**
    * @name OnExpandOrCollapse
    * @param {*} objNodeToExpandOrCollapse
    * @summary To set the ExpandedNodes in "ApplicationState".
    */
    OnExpandOrCollapse(objNodeToExpandOrCollapse, objContext) {
        let arrNewNodes = objContext.props.ExpandedNodes.filter(objExpandedNode => objExpandedNode[objContext.props.Meta.NodeFields.Id] != objNodeToExpandOrCollapse[objContext.props.Meta.NodeFields.Id]);
        if (arrNewNodes.length == objContext.props.ExpandedNodes.length) {//Node is not present already.
            arrNewNodes = [...objContext.props.ExpandedNodes, objNodeToExpandOrCollapse];
        }
        ApplicationState.SetProperty("ExpandedNodes", arrNewNodes);
        objContext.props.Events.OnExpandOrCollapse(arrNewNodes);
    }

    /**
    * @name IsExpanded
    * @param {*} objNode
    * @summary Check if the node is present in the objContext.props.ExpandedNodes (from ApplicationState).
    * @returns {bool}
    */
    IsExpanded(objNode, objContext) {
        let blnIsNodeExpanded = false;
        var arrExpandedNodes = objContext.props.ExpandedNodes ? objContext.props.ExpandedNodes : [];
        arrExpandedNodes.map(item => {
            if (item[objContext.props.Meta.NodeFields.Id] == objNode[objContext.props.Meta.NodeFields.Id]) {
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
            var arrDraggedNodes = objContext.state.NodeData.map((node) => {
                if (node[objContext.props.Meta.NodeFields.Id].toString() === strDragNodeId) {
                    node[objContext.props.Meta.NodeFields.ParentId] = strDropNodeId;
                }
                return node;
            })
            objContext.props.Events.OnDragAndDrop(arrDraggedNodes);
        }
        else {
            console.log('cant drop a node to itself')
        }
    }


}

export default Tree_CompontProcessor;