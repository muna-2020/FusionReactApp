//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

//Objects required for module.
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';

//Helper Classes
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name OfflineExecutionProgress_ComponentProcessor
* @summary Class for OfflineExecutionProgress module display.
*/
class OfflineExecutionProgress_ComponentProcessor extends CockpitBase_ModuleProcessor {

    /**
     * @name OnClickView
     * @param {any} objContext
     * @param {any} uOfflineProcessExecutionId
     * @summary Handler for View of offlineExecution progress
     */
    OnClickView(objContext, uOfflineProcessExecutionId) {
        let vEditData = [];
        if (uOfflineProcessExecutionId == "00000000-0000-0000-0000-000000000000") {
            let arrOfflineData = ApplicationState.GetProperty("OfflineExecutionData") ? ApplicationState.GetProperty("OfflineExecutionData") : [];
            arrOfflineData.map(objOfflineData => {
                if (objOfflineData["iProgressValue"] == 100 && objOfflineData["cIsViewed"] == "N") {
                    vEditData = [...vEditData, { ["uOfflineProcessExecutionId"]: objOfflineData["uOfflineProcessExecutionId"], ["cIsViewed"]: "Y" }]
                }
            })
        }
        else {
            vEditData = [{
                ["uOfflineProcessExecutionId"]: uOfflineProcessExecutionId,
                ["cIsViewed"]: "Y"
            }]
        }
        let objParams =
        {
            ["SearchQuery"]: {

                ["must"]: [
                    {
                        ["match"]: {
                            ["uUserId"]: objContext.props.ParentProps.ClientUserDetails.UserId
                        }
                    }
                ]
            },
            ["vEditData"]: vEditData,
            "SortKeys": [
                {
                    "dtModifiedOn": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Cockpit_OfflineProcess_OfflineProcessExecution.EditData(objParams, (objReturn, blnEdited) => {
            let objData = objReturn[0];
            let arrOfflineData = ApplicationState.GetProperty("OfflineExecutionData") ? ApplicationState.GetProperty("OfflineExecutionData") : [];
            let arrOfflineModifiedData = [];
            if (objReturn.length > 0) {
                arrOfflineData.map(objOfflineData => {
                    if (objReturn.find(obj => obj.uOfflineProcessExecutionId == objOfflineData.uOfflineProcessExecutionId)) {
                        arrOfflineModifiedData = [...arrOfflineModifiedData, objReturn.find(obj => obj.uOfflineProcessExecutionId == objOfflineData.uOfflineProcessExecutionId)];
                    }
                    else {
                        arrOfflineModifiedData = [...arrOfflineModifiedData, objOfflineData];
                    }
                })
                ApplicationState.SetProperty("OfflineExecutionData", arrOfflineModifiedData);
            }
            if (blnEdited) {
                //Popup.ShowPopup({
                //    Data: {
                //        ModuleName: "ViewOfflineExecution",
                //        IsEdit: false,
                //        Id: "ViewOfflineExecution",
                //        objContext: objContext,
                //        OfflineExecutionData: objReturn.length > 0 ? arrOfflineModifiedData : arrOfflineData, //objContext.props.Data.OfflineExecutionData,
                //        uOfflineProcessExecutionId: uOfflineProcessExecutionId,
                //        cIsShowAll: uOfflineProcessExecutionId == "00000000-0000-0000-0000-000000000000" ? true : false
                //    },
                //    Meta: {
                //        PopupName: "ViewOfflineExecution",
                //        ShowHeader: true,
                //        ShowCloseIcon: true,
                //        ShowToggleMaximizeIcon: true,
                //        Height: "550px",
                //        Width: 843,
                //        HeaderData: []
                //    },
                //    Resource: {
                //        Text: {},
                //        ClientUserDetails: objContext.props.ClientUserDetails,
                //        SkinPath: JConfiguration.CockpitSkinPath,
                //    },
                //    Events: {},
                //    CallBacks: {}
                //});
            }
        }, true)
    }

    /**
     * @name OnClickClose
     * @param {any} objContext
     * @summary Handler for hide/show offlineExecution progress
     */
    OnClickClose(objContext) {
        let cIsOfflineClosed = ApplicationState.GetProperty("cIsOfflineClosed") ? ApplicationState.GetProperty("cIsOfflineClosed") : "N";
        ApplicationState.SetProperty("cIsOfflineClosed", cIsOfflineClosed == "Y" ? "N" : "Y");
        //window.dispatchEvent(new Event('resize'));
    }


    /**
     * @name ShowProcess
     * @param {any} objContext
     * @param {any} objExecution
     */
    ShowProcess(objContext, objExecution) {
        let blnShowProcess;
        if (objContext.props.Data.Type) {
            blnShowProcess = objExecution.cIsViewed == "N" && objContext.props.Data.Type.includes(objExecution["t_TestDrive_OfflineProcess_Definition"][0]["vOfflineProcessKeyword"])
        }
        else {
            blnShowProcess = objExecution.cIsViewed == "N"
        }
        return blnShowProcess;
    }

}

export default OfflineExecutionProgress_ComponentProcessor