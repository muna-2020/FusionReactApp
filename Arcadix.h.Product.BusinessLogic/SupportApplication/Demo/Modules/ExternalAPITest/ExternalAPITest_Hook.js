//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//React related imports 
import { useEffect } from 'react';

/**
  * @name GetInitialState
  * @summary to Get Initial State
  * @returns {object} initial state object
  */
export function GetInitialState() {
    return {
        blnIsPostData: false,
        RequestUrl: "",
        RequestBody: null,
        ResponseJson: null
    };
}

/**
  * @name Initialize
  * @param {object} objContext passes Context Object
  * @summary Initialize the custom hooks
  */
export function Initialize(objContext) {
    useInitialLoad(objContext)
}

/**
  * @name useDataLoaded
  * @param {object} objContext passes Context Object
  * @summary This to establish conncetion with SignalR Hub when first component loads.
  */
export function useInitialLoad(objContext) {
    useEffect(() => {

        ApplicationState.SetProperty("blnShowAnimation", false);
    }, [])
}