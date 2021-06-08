//signalr import 
import * as SignalR from '@aspnet/signalr';

//React related imports 
import { useEffect } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
  * @name GetInitialState
  * @summary to Get Initial State
  * @returns {object} initial state object
  */
export function GetInitialState()
{
    return {
        Data: {},
        DataToSave: "",
        Event: "SignalR"
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
export function useInitialLoad(objContext)
{
    useEffect(() => {
        if (window.objConnection == null) {
            //through SignalRHubBuilder we will create the 
            window.objConnection = new SignalR.HubConnectionBuilder()
                .withUrl(objContext.props.JConfiguration.SignalRHubUrl)
                .configureLogging(SignalR.LogLevel.Information)
                .build();

            window.objConnection.on(objContext.state.Event, (objData) => {
                objContext.dispatch({ type: 'SET_STATE', payload: { DataToSave: "" } })
                objContext.dispatch({ type: 'SET_STATE', payload: { "Data": { ...objContext.state.Data, "Params": JSON.parse(objData).Params } } })
            });
        }
        if (window.objConnection.connectionState == 0)
            window.objConnection.start();


        ApplicationState.SetProperty("blnShowAnimation", false);
    }, [])
}