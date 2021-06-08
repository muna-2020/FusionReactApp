
/**
* @name SignalRDemo_ModuleProcessor
* @summary Class for SignalRDemo module display.
*/
class SignalRDemo_ModuleProcessor {
    /**
      * @name onChangeHandler
      * @param {object} objEvent objEvent
      * @summary stores the data of input field. 
      */
    onChangeHandler(objContext, objEvent){
        objContext.dispatch({ type: 'SET_STATE', payload: { DataToSave: objEvent.target.value } })
    };

    /**
      * @name onClickHandler
      * @param {objData} objData objData
      * @summary Up on clicking of save the data send to server.
      */
    onClickHandler(objContext, objData){

        let objDataParams = {
            ["Event"]: objContext.state.Event,
            ["Data"]: { ["Params"]: objData }
        };
        if (objData !== "") {
            fetch(objContext.props.JConfiguration.BaseUrl + "API/Demo/SignalR/SignalRDemo", {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(objDataParams),
                mode: 'cors'
            }).then((objResponse) => {
                console.log("Responce==>", objResponse);
            });
        }
    }
}

export default SignalRDemo_ModuleProcessor