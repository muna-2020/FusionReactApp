// React related impoprts.
import { useEffect, useImperativeHandle } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name GetInitialState
* @summary Initializes the objContext.state.
* @returns {object} initial objContext.state. object
*/
export function GetInitialState(props) {
    let objSelectedNode = props.Data.SelectedNodeId ? props.Data.NodeData.find(obj => obj[props.Meta.IdField] == props.Data.SelectedNodeId) : {};
    return {
        NodeData: [{ [props.Meta.IdField]: props.Meta.RootNodeId }, ...props.Data.NodeData],
        arrExpandedNodes: [],
        objSelectedNode: objSelectedNode ? objSelectedNode : {}
    }
}

/**
 * @name Initialize
 * @summary Initializing the hooks.
 * @param {any} objContext
 */
export function Initialize(objContext, ref) {
    useSetInitialExpandedNodes(objContext);
    //useUpdateOnDataChange(objContext);
    //useSelectNodeOutSideTheTree(objContext);
    useSetSelectFunctionToStore(objContext);
    useSetExpandFunctionToStore(objContext);
    useSetSelectAdjacentNodeFunctionToStore(objContext);
    useUpdateState(objContext, ref);
}

/**
* @name useSetInitialExpandedNodes
* @param {any} objContext
* @summary Initializes the objContext.state.
*/
export function useSetInitialExpandedNodes(objContext) {
    useEffect(() => {
        if (ApplicationState.GetProperty("ExpandedNodes") && !ApplicationState.GetProperty("ExpandedNodes")[objContext.props.Id]) {
            let objEmptyExpandedNodes = { ...ApplicationState.GetProperty("ExpandedNodes"), [objContext.props.Id]: [] };
            ApplicationState.SetProperty("ExpandedNodes", objEmptyExpandedNodes);
        }
        if (objContext.props.Data.SelectedNodeId) {
            let objSelectedNode = objContext.props.Data.NodeData.find(obj => obj[objContext.props.Meta.IdField] == objContext.props.Data.SelectedNodeId);
            //if (objSelectedNode && objContext.refTree.current[objSelectedNode[objContext.props.Meta.IdField]] && objContext.refTree.current[objSelectedNode[objContext.props.Meta.IdField]].current)
            //    objContext.refTree.current[objSelectedNode[objContext.props.Meta.IdField]].current.className = "folder-flex selected";
            ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), [objContext.props.Id]: objSelectedNode });
            objContext.Tree_CompontProcessor.ExpandParentNodes(objContext, objContext.props.Data.SelectedNodeId);
            if (objContext.props.Events && objContext.props.Events.OnSelectNode && objSelectedNode) {
                objContext.props.Events.OnSelectNode(objSelectedNode, objContext.props.Data.NodeData)
            }
        }
    }, []);
}

/**
* @name useUpdateOnDataChange
* @param {any} objContext
* @summary Initializes the objContext.state.
*/
export function useUpdateOnDataChange(objContext) {
    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE", payload: { "NodeData": objContext.props.Data.NodeData } });
        let refTree = objContext.refTree;
        refTree.current = {};
        refTree.current.SelectedNode = objContext.props.Meta.RootNodeId
        objContext.UpdateRef(refTree);
    }, [objContext.props.Data.NodeData]);
}

/**
* @name useSelectNodeOutSideTheTree
* @param {any} objContext
* @summary Initializes the objContext.state.
*/
export function useSelectNodeOutSideTheTree(objContext) {
    useEffect(() => {
        if (objContext.props.SelectedNode && objContext.props.SelectedNode[objContext.props.Id] && objContext.props.SelectedNode[objContext.props.Id][objContext.props.Meta.IdField]) {
            objContext.Tree_CompontProcessor.ExpandParentNodes(objContext, objContext.props.SelectedNode[objContext.props.Id][objContext.props.Meta.IdField]);
            if (objContext.refTree.current[objContext.props.SelectedNode[objContext.props.Id][objContext.props.Meta.IdField]] && objContext.refTree.current[objContext.props.SelectedNode[objContext.props.Id][objContext.props.Meta.IdField]].current)
                objContext.refTree.current[objContext.props.SelectedNode[objContext.props.Id][objContext.props.Meta.IdField]].current.className = "folder-flex selected";
        }

    }, [objContext.props.SelectedNode, objContext.refTree]);
}

/**
* @name useSelectNodeOutSideTheTree
* @param {any} objContext
* @summary Initializes the objContext.state.
*/
export function useSetSelectFunctionToStore(objContext) {
    useEffect(() => {
        let objSelectTreeNodes = ApplicationState.GetProperty("SelectTreeNode") ? ApplicationState.GetProperty("SelectTreeNode") : {};
        ApplicationState.SetProperty("SelectTreeNode", { ...objSelectTreeNodes, [objContext.props.Id]: (objNodeToSelect) => { objContext.Tree_CompontProcessor.SelectNodeOutSideTheTree(objContext, objNodeToSelect) } });
    }, [objContext.state]);
}


/**
* @name useSelectNodeOutSideTheTree
* @param {any} objContext
* @summary Initializes the objContext.state.
*/
export function useSetExpandFunctionToStore(objContext) {
    useEffect(() => {
        let objExpandTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") ? ApplicationState.GetProperty("ExpandTreeNodes") : {};
        ApplicationState.SetProperty("ExpandTreeNodes", { ...objExpandTreeNodes, [objContext.props.Id]: (arrNodesToExpand) => { objContext.Tree_CompontProcessor.ExpandTreeNodesOutSideTheTree(objContext, arrNodesToExpand) } });
    }, [objContext.state]);
}


/**
* @name useSetSelectAdjacentNodeFunctionToStore
* @param {any} objContext
* @summary Initializes the objContext.state.
*/
export function useSetSelectAdjacentNodeFunctionToStore(objContext) {
    useEffect(() => {
        let objSelectAdjacentTreeNode = ApplicationState.GetProperty("SelectAdjacentTreeNode") ? ApplicationState.GetProperty("SelectAdjacentTreeNode") : {};
        ApplicationState.SetProperty("SelectAdjacentTreeNode", { ...objSelectAdjacentTreeNode, [objContext.props.Id]: (objNode) => { objContext.Tree_CompontProcessor.SelectAdjacentTreeNode(objContext, objNode) } });
    }, [objContext.state]);
}

/**
 * @name useUpdateState
 * @summary updating objSelectedNode to undefined to de-select 
 * @param {any} objContext
 */
export function useUpdateState(objContext, ref) {
    useImperativeHandle(ref, () => ({
        UpdateState: () => {
           objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedNode: {} } })
            console.log("tree update state is calling");
        }
    }), []);
}