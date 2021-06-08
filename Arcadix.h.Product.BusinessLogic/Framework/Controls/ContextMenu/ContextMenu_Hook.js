// React related imports.
import { useEffect } from 'react';

/**
* @name GetInitialState
* @param {*} props
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        arrContextList: [],
        arrReactContList: []
    }
}

/**
* @name Initialize
* @param {*} objContext
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useUpdateContextMenu(objContext);
    useAddEventListeners(objContext);
}
 

/**
* @name useEmptyPassWordField
* @param {*} objContext
* @summary Updates the state when objContext.props.ContextMenuDetails is changed(new context menu has to be opened).
*/
export function useUpdateContextMenu(objContext) {
    useEffect(() => {
        if (objContext.props.ContextMenuDetails && objContext.props.ContextMenuDetails.Data) {
            let arrInitialReactContList = [{
                ParentId: 0,
                level: 1,
                isRoot: true,
                clientX: objContext.props.ContextMenuDetails.objEvent.clientX,
                clientY: objContext.props.ContextMenuDetails.objEvent.clientY,
                contentList: [...objContext.props.ContextMenuDetails.Data.filter(a => a.ParentId === 0)]
            }];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrReactContList": arrInitialReactContList } });
            objContext.dispatch({ type: "SET_STATE", payload: { "arrContextList": objContext.props.ContextMenuDetails.Data } });
        }
    }, [objContext.props.ContextMenuDetails]);
}

/**
* @name useEmptyPassWordField
* @param {*} objContext
* @summary Adds event Listener for click and scroll.
*/
export function useAddEventListeners(objContext) {
    useEffect(() => {
        document.addEventListener('click', () => objContext.ContextMenu_ComponentProcessor.RemoveContextMenu(objContext));
        document.addEventListener('scroll', () => objContext.ContextMenu_ComponentProcessor.RemoveContextMenu(objContext));

        return () => {
            document.removeEventListener('click', () => objContext.ContextMenu_ComponentProcessor.RemoveContextMenu(objContext));
            document.removeEventListener('scroll', () => objContext.ContextMenu_ComponentProcessor.RemoveContextMenu(objContext));
        }
    }, []);
}