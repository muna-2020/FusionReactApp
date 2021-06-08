// React related impoprts.
import { useEffect } from 'react';
//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name GetInitialState
* @summary Initializes the objContext.state.
* @returns {object} initial objContext.state. object
*/
export function GetInitialState(props) {
    return {
        NodeData: [{ [props.Meta.NodeFields.Id]: props.Meta.NodeFields.Root }, ...props.Data.NodeData]
    }
}

/**
* @name useSetInitialExpandedNodes
* @summary Initializes the objContext.state.
*/
export function useSetInitialExpandedNodes(){
    useEffect(() => {
        if(!ApplicationState.GetProperty("ExpandedNodes")){
            ApplicationState.SetProperty("ExpandedNodes", []);
        }        
        ApplicationState.SetProperty("SelectedNode", []);
    }, []);
}

/**
* @name useUpdateOnDataChange
* @summary Initializes the objContext.state.
*/
export function useUpdateOnDataChange(objContext){
    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE", payload: { "NodeData": objContext.props.Data.NodeData } });
        let refTree = objContext.refTree;
        refTree.current = {};
        objContext.UpdateRef(refTree);
    }, [objContext.props.Data.NodeData]);
}