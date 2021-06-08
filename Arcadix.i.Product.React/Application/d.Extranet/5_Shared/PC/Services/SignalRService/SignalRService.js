//SignalRClass import
import SignalRClass from '@shared/Framework/Services/SignalRClass/SignalRClass';
//common imports.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name SignalRService
* @summary Class for SignalR module display.
*/
class SignalRService {

    constructor() {
        let objSignalR = new SignalRClass();
        let props = { JConfiguration };
        let objContext = { props };
        objSignalR.ConnectToHub(objContext);
        if (!window.SignalRConnectionIdList)
            window.SignalRConnectionIdList = [];
    }

    /**
    * @name EventListener
    * @param {Array} arrClass Class Data
    * @param {String} strSchoolId School Id
    * @param {any} fnCallBack Callback function
    * @summary loops through the array of classes and define the event listeners with the Event names. 
    * Also, define the event listeners for school with the passed school id.
    */
    EventListener(arrClass, strSchoolId, strPupilId = "") {
        let objSignalR = new SignalRClass();
        arrClass.map(objClass => {
            if (!SignalRConnectionIdList.find(strId => strId == objClass["uClassId"])) {
                SignalRConnectionIdList = [...SignalRConnectionIdList, objClass["uClassId"]];
                objSignalR.EventListener("newschanged_" + objClass["uClassId"], (strReturnData) => {
                    let objReturnData = JSON.parse(strReturnData);
                    if (objReturnData.ClassId !== "00000000-0000-0000-0000-000000000000" && objReturnData.ClassId !== "") {
                        if (ClientUserDetails.ApplicationTypeId == "16" || objReturnData.ClassId == ApplicationState.GetProperty("SelectedClassId")) {
                            if (ClientUserDetails.UserId != objReturnData["UserId"]) {
                                ApplicationState.SetProperty("RefreshNewsData", objReturnData); //we want to re-render only those user modules which is having the same ClassId
                            } else {
                                ApplicationState.SetProperty("LoadDiskSpaceManagement", objReturnData); //we want to re-render only disk space management when UserId matches
                            }
                        }
                    } else {
                        ApplicationState.SetProperty("RefreshNewsData", objReturnData);
                    }
                });
                objSignalR.EventListener("documentchanged_" + objClass["uClassId"], (strReturnData) => {
                    let objReturnData = JSON.parse(strReturnData);
                    if (objReturnData.ClassId !== "00000000-0000-0000-0000-000000000000" && objReturnData.ClassId !== "") {
                        if (ClientUserDetails.ApplicationTypeId == "16" || objReturnData.ClassId == ApplicationState.GetProperty("SelectedClassId")) {
                            if (ClientUserDetails.UserId != objReturnData["UserId"]) {
                                ApplicationState.SetProperty("RefreshDocumentData", objReturnData); //we want to re-render only those user modules which is having the same ClassId
                            } else {
                                ApplicationState.SetProperty("LoadDiskSpaceManagement", objReturnData); //we want to re-render only disk space management when UserId matches
                            }
                        }
                    } else {
                        ApplicationState.SetProperty("RefreshDocumentData", objReturnData);
                    }
                });
            }
        });

        if (!SignalRConnectionIdList.find(strId => strId == strSchoolId)) {
            SignalRConnectionIdList = [...SignalRConnectionIdList, strSchoolId];
            objSignalR.EventListener("newschanged_" + strSchoolId.toLowerCase(), (strReturnData) => {
                let objReturnData = JSON.parse(strReturnData);
                if (objReturnData.ClassId != "00000000-0000-0000-0000-000000000000" && objReturnData.ClassId != "") {
                    if (objReturnData.ClassId == ApplicationState.GetProperty("SelectedClassId")) {
                        ApplicationState.SetProperty("RefreshNewsData", objReturnData);
                    }
                } else {
                    ApplicationState.SetProperty("RefreshNewsData", objReturnData);
                }
            });

            objSignalR.EventListener("documentchanged_" + strSchoolId, (strReturnData) => {
                let objReturnData = JSON.parse(strReturnData);
                if (objReturnData.ClassId !== "00000000-0000-0000-0000-000000000000" && objReturnData.ClassId !== "") {
                    if (objReturnData.ClassId == ApplicationState.GetProperty("SelectedClassId"))
                        ApplicationState.SetProperty("RefreshDocumentData", objReturnData);
                } else {
                    ApplicationState.SetProperty("RefreshDocumentData", objReturnData);
                }
            });

        }

        //Navigations Refresh in case of External User
        if (strPupilId.length > 0) {
            if (!SignalRConnectionIdList.find(strId => strId == strPupilId)) {
                SignalRConnectionIdList = [...SignalRConnectionIdList, strPupilId];
                objSignalR.EventListener("refreshnavigation_" + strPupilId.toLowerCase(), (strReturnData) => {
                    ApplicationState.SetProperty("RefreshNavigations", strReturnData);
                });
            }
        }
    }

    /**
     * @name EventListenerForTestLogins
     * @summary loops through the array of classes and define the event listeners with the Event names.
     * @param {any} arrClass
     */
    EventListenerForTestTokens(arrClass) {
        let objSignalR = new SignalRClass();
        arrClass.map(objClass => {
            if (!SignalRConnectionIdList.find(strId => strId == "testtoken_statuschanged_" + objClass["uClassId"])) {
                SignalRConnectionIdList = [...SignalRConnectionIdList, "testtoken_statuschanged_" + objClass["uClassId"]];
                objSignalR.EventListener("testtoken_statuschanged_" + objClass["uClassId"], (strReturnData) => {
                    let objReturnData = JSON.parse(strReturnData);
                    if (objReturnData.ClassId !== "00000000-0000-0000-0000-000000000000" && objReturnData.ClassId !== "") {
                        if (ClientUserDetails.ApplicationTypeId == "1" && objReturnData.ClassId == ApplicationState.GetProperty("SelectedClassId")) {
                            ApplicationState.SetProperty("RefreshTestTokenData", objReturnData);
                        }
                    }
                });
            }
        });
    }
}

export default SignalRService;