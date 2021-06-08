//signalr import 
//import * as SignalR from '@aspnet/signalr';
import * as SignalR from '@microsoft/signalr';

/**
  * @name SignalRClass
  * @summary SignalR Class used to connect to SignalR Hub and listen to the event fired from server side
  */
export default class SignalRClass {

    /**
     * @name ConnectToHub
     * @param {any} objContext
     * @summary Connect to Hub based on the Hub Url
     */
    ConnectToHub(objContext) {
        //if (window.objConnection == null) {
        //    //through SignalRHubBuilder we will create the Connection.
        //    window.objConnection = new SignalR.HubConnectionBuilder()
        //        .withUrl(objContext.props.JConfiguration ? objContext.props.JConfiguration.SignalRHubUrl : JConfiguration.SignalRHubUrl)
        //        .configureLogging(SignalR.LogLevel.Information)
        //        .build();
        //}
        //if (window.objConnection.connectionState == SignalR.HubConnectionState.Disconnected) {
        //    window.objConnection.start();
        //}

        if (global.objConnection == null) {
            //through SignalRHubBuilder we will create the Connection.
            global.objConnection = new SignalR.HubConnectionBuilder()
                .withUrl(objContext.props.JConfiguration ? objContext.props.JConfiguration.SignalRHubUrl : JConfiguration.SignalRHubUrl)
                .configureLogging(SignalR.LogLevel.Information)
                .build();
        }
        if (global.objConnection.connectionState == SignalR.HubConnectionState.Disconnected) {
            global.objConnection.start();
        }

        //const connection = new signalR.HubConnectionBuilder()
        //    .withUrl("/chatHub")
        //    .configureLogging(signalR.LogLevel.Information)
        //    .build();

        //async function start() {
        //    try {
        //        await connection.start();
        //        console.log("connected");
        //    } catch (err) {
        //        console.log(err);
        //        setTimeout(() => start(), 5000);
        //    }
        //};

        //window.objConnection.onclose(async () => {
        //    if (window.objConnection.connectionState == SignalR.HubConnectionState.Disconnected) {
        //        await window.objConnection.start();
        //    }
            
        //});
        global.objConnection.onclose(async () => {
            if (global.objConnection.connectionState == SignalR.HubConnectionState.Disconnected) {
                await global.objConnection.start();
            }

        });
    }

    /**
     * @name EventListener
     * @param {any} strEventName
     * @param {any} fnCallBack
     * @summary define the event listener with the Event name.
     */
    EventListener(strEventName,fnCallBack) {
        //window.objConnection.on(strEventName, fnCallBack);
        global.objConnection.on(strEventName, fnCallBack);
    }

    /**
     * @name Invoke
     * @param {any} objParams object
     * @summary define the event fired  with the Data passed.
     */
    Invoke(objParams) {
        //window.objConnection.invoke("BroadcastData", objParams);
        global.objConnection.invoke("BroadcastData", objParams);
    }
}