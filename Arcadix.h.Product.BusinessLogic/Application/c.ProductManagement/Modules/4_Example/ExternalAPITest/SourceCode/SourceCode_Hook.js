//React related imports 
import { useEffect } from 'react';

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