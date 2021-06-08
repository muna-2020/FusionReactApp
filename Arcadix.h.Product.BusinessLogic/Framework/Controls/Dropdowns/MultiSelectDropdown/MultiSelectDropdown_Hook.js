// React related impoprts.
import { useEffect } from 'react';

//Base classes.
import { GetUniqueId } from "@root/Framework/Services/UniqueId/UniqueId";

/**
* @name GetInitialState
* @param {*} props props
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        arrSelectedItem: props.Data.SelectedItems && props.Data.SelectedItems.length > 0 ? props.Data.SelectedItems : [],
        strClassActive: "multi-dropdown-trigger",//css classes for button
        strClassTrigger: "multi-dropdown-list",
        blnShowOption: false,
        strMultiDropDownUID: GetUniqueId()
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoaded(objContext);
}

/**
* @name useDataLoaded
* @param {object} objContext Context object
* @summary use effect to set the Initial data
*/
export function useDataLoaded(objContext) {
    useEffect(() => {
        objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedItem": objContext.props.Data.SelectedItems && objContext.props.Data.SelectedItems.length > 0 ? objContext.props.Data.SelectedItems : [] } });
    }, [objContext.props.Data.SelectedItems]);
}