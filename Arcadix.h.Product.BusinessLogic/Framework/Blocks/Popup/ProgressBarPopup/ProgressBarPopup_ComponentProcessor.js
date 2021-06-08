//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Objects required for Component.
import ProgressBarPopup_Component from '@shared/Object/a.Framework/Blocks/Popup/ProgressBarPopup/ProgressBarPopup';
import SignalRClass from '@shared/Framework/Services/SignalRClass/SignalRClass';

/**
* @name ProgressBarPopup_ComponentProcessor
* @summary Class for ProgressBarPopup module display.
*/
class ProgressBarPopup_ComponentProcessor extends Base_ModuleProcessor {

    //Just Sets the ProgressBar Id 
    StartProgress(objContext) {
        var objdate = new Date();
        var strSignalREventName = "progressbarid" + objdate.getDate().toString() + objdate.getMonth().toString() + objdate.getFullYear().toString() + objdate.getHours().toString()
            + objdate.getMinutes().toString() + objdate.getSeconds().toString();
        let objSignalR = new SignalRClass();
        objSignalR.ConnectToHub(objContext);
        objSignalR.EventListener(strSignalREventName, (strProgressDetails) => {
            //let objData = JSON.parse(objResponse).Data;
            if (strProgressDetails) {
                objContext.dispatch({ type: "SET_STATE", payload: { ProgressDetails: JSON.parse(strProgressDetails) } })
            }
        });
        objContext.dispatch({ type: "SET_STATE", payload: { strProgressBarId: strSignalREventName } });
        objContext.props.Events.StartProgress(strSignalREventName);
    }

    //Calls the API for the Cancelling the Progress bar and updates the local state...
    //ProgressDetails.IsRunning will be "N"...
    CancelProgress(objContext) {
        var strProgressBarId = objContext.state.strProgressBarId;
        var objDataParamsCancelProgress =
        {
            "URL": "API/Framework/Services/ProgressBarPopup_Component/CancelProgressBar",
            "Params": {
                ["ProgressId"]: strProgressBarId,
            }
        };
        ProgressBarPopup_Component.CancelProgressBar(objDataParamsCancelProgress, (objResponse) => {
            var objProgressDetails = objResponse["progressbarpopupkey_" + strProgressBarId]["Data"];
            if (objProgressDetails) {
                objContext.dispatch({ type: "SET_STATE", payload: { ProgressDetails: objProgressDetails } });
            }
        })

       
    }

    //Gets the Progress Bar details and sets the local state...
    GetProgressBarStatus(objContext) {
        let strProgressBarId = objContext.state.strProgressBarId;
        var objDataParamsGetProgressBarStatus =
        {
            "URL": "API/Framework/Services/ProgressBarPopup_Component/GetProgressBarStatus",
            "Params": {
                ["ProgressId"]: strProgressBarId,
            }
        };
        ProgressBarPopup_Component.GetProgressBarStatus(objDataParamsGetProgressBarStatus, (objResponse) => {
            var objProgressDetails = objResponse["progressbarpopupkey_" + strProgressBarId]["Data"];
            if (objProgressDetails) {
                objContext.dispatch({ type: "SET_STATE", payload: { ProgressDetails: objProgressDetails } })
            }            
        })
    }   

}

export default ProgressBarPopup_ComponentProcessor;