//Module realted fies.
import MultiMediaManagement_ContextMenu from "@shared/Application/e.Editor/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_ContextMenu";

//Module related files
import MultiMediaManagement_Module from "@shared/Application/e.Editor/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_Module";
import Object_Editor_TaskContent_CMSElement from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSElement";

import Object_DevServer_ProductManagement_Folder from "@shared/Object/c.ProductManagement/Folder/Folder";
import Object_DevServer_ProductManagement_Module from "@shared/Object/c.ProductManagement/Module/Module";
import Object_DevServer_ProductManagement_ProductDocument from "@shared/Object/c.ProductManagement/Document/Document";

import ArcadixCacheData from "@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData";

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

//Application state.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name MultiMediaManagement_ModuleProcessor
 * @summary Contains ImageManagement popup component specific methods.
 */
class MultiMediaManagement_ModuleProcessor extends MultiMediaManagement_ContextMenu {

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];
        let objIntialParams = props.blnShowOnlyFolders ? { "blnShowOnlyFolders": true } : {};
        if (props.Data.MediaType.toLowerCase() !== "usecase") {
            MultiMediaManagement_Module.Initialize({ ...objIntialParams, "iMainClientId": props.JConfiguration.MainClientId }, props.Data.MediaType);
            arrDataRequest = [...arrDataRequest, MultiMediaManagement_Module];
        }
        else {
            var objParams = {
                "SearchQuery": {
                    "should": [
                        {
                            "match": {
                                "uApplicationTypeId": "71902243-108E-4E3B-A27C-0C1DA0E11FB9"
                            }
                        },
                        {
                            "match": {
                                "uApplicationTypeId": "863C24EE-707F-4B98-9475-41E1E63DF5F8"
                            }
                        }
                    ]
                },
            };

            // getting folders details of example
            Object_DevServer_ProductManagement_Folder.Initialize(objParams);
            arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_Folder];

            Object_DevServer_ProductManagement_Module.Initialize({});
            arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_Module];

            Object_DevServer_ProductManagement_ProductDocument.Initialize({});
            arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_ProductDocument];
        }

        return arrDataRequest;
    }

    /**
     * @name AddEditFolder
     * @param {any} objParams { objNode, objContext, strActionType }
     * @summary Opens the AddEditPopup
     */
    AddEditFolder(objParams) {
        let { objNode, objContext, strActionType } = objParams;
        editorPopup.ShowPopup({
            "Data": {
                "TextResource": objContext.props.TextResource,
                "ActionType": strActionType.toLowerCase() === "edit" ? strActionType : undefined,
                "NodeData": strActionType.toLowerCase() === "edit" ? objNode["ElementJson"] : undefined
            },
            "Meta": {
                "PopupName": "MultiMediaManagement_FolderAddEdit",
                "Height": '396px',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                "SaveFolderDetails": async (objElementJson) => {
                    ApplicationState.SetProperty("blnShowAnimation", true);
                    let vAddData = {
                        "vElementFolderName": objElementJson["vElementFolderName"],
                        "vElementFolderDescription": objElementJson["vElementFolderDescription"],
                        "cIsDeleted": "N"
                    };
                    let objvAddData;
                    if (strActionType.toLowerCase() === "edit") {
                        objvAddData = {
                            "iElementParentFolderId": objNode["PId"],
                            "vAddData": {
                                ...vAddData,
                                "iFolderId": objNode["Id"],
                                "ActionType": "Edit"
                            }
                        };
                    }
                    else {
                        objvAddData = {
                            "iElementParentFolderId": objNode["Id"],
                            "vAddData": {
                                ...vAddData,
                                "ActionType": "Add"
                            }
                        };
                    }
                    let strMediaType = objContext.props.Data.MediaType;
                    if (strMediaType.toLowerCase().indexOf("link") !== -1) {
                        strMediaType = objNode["Type"].split("_")[0];
                    }
                    objvAddData = {
                        "iElementTypeId": objContext.MultiMediaManagement_ModuleProcessor.GetElementTypeId(strMediaType),
                        "vElementTypeName": strMediaType,
                        "uUserId": ApplicationState.GetProperty("ClientUserDetails")["UserId"],
                        ...objvAddData
                    };
                    let objResponse = await Object_Editor_TaskContent_CMSElement.SaveElementFolderDetails({ ...objvAddData, ["iMainClientId"]: objContext.props.JConfiguration.MainClientId });
                    if (objResponse !== null) {
                        let objNewFolderTreeJson = objContext.MultiMediaManagement_ModuleProcessor.GetFolderTreeJson(objContext, objResponse);
                        objNewFolderTreeJson["PId"] = objvAddData["iElementParentFolderId"];
                        let arrNodeData = objContext.MultiMediaManagement_ModuleProcessor.AddNodeToTree(objContext, objNewFolderTreeJson);
                        ArcadixCacheData.ReplaceData(`Editor_TaskContent_CMS${objContext.props.Data.MediaType}AddEdit_Module`, {
                            ["Value"]: {
                                ["Data"]: arrNodeData,
                                ["TimeStamp"]: "0"
                            }
                        }, () => {
                            console.log("Added to store");
                        });
                        objContext.dispatch({ "type": "SET_STATE", "payload": { "objSelectedNodeData": objNewFolderTreeJson["ElementJson"] } });
                    }
                    return true;
                }
            }
        });
    }

    /**
     * @name AddEditElement
     * @param {any} objParams { objNode, objContext, strActionType }
     * @summary 
     */
    async AddEditElement(objParams) {
        let { objNode, objContext, strActionType } = objParams;
        if (strActionType.toLowerCase() === "edit") {
            try {
                let objElementJson = objContext.MultiMediaManagement_ModuleProcessor.Nodeclick(objContext, objNode);
                if (objElementJson) {
                    // to be removed later once alias is created in the backend
                    if (objElementJson["iFolderId"]) {
                        objElementJson["iFolderID"] = objElementJson["iFolderId"];
                        delete objElementJson["iFolderId"];
                    }
                    objContext.MultiMediaManagement_ModuleProcessor.OpenAddPopup(objParams, objElementJson);
                }
            }
            catch (e) {
                console.log("MULTIMEDIA_ADD_EDIT_ERROR", e);
            }
        }
        else {
            console.log(objNode);
            objContext.MultiMediaManagement_ModuleProcessor.OpenAddPopup(objParams, null);
        }
    }

    /**
     * @name OpenAddPopup
     * @param {object} objParams {props, state, dispatch}
     * @param {object} objElementJson selected image
     * @summary opens image add edit popup
     */
    OpenAddPopup(objParams, objElementJson) {
        let { objNode, objContext, strActionType, strMediaType } = objParams;
        editorPopup.ShowPopup({
            "Data": {
                ...objContext.props,
                "ElementJson": objElementJson,
                "ActionType": strActionType,
                "NodeData": objNode,
                "TextResource": objContext.props.TextResource,
                "MediaType": strMediaType
            },
            "Meta": {
                "PopupName": "MultiMediaManagement_ElementAddEdit",
                "Height": '571px',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                "SaveElementDetails": (objElementJson) => {
                    ApplicationState.SetProperty("blnShowAnimation", true);
                    let objNewElementJson = objContext.MultiMediaManagement_ModuleProcessor.GetTreeJson(objContext, objElementJson);
                    if (strActionType.toLowerCase() === "edit") {
                        objNewElementJson["PId"] = objNode["PId"];
                    }
                    else {
                        objNewElementJson["PId"] = objNode["Id"];
                    }
                    let arrNodeData = objContext.MultiMediaManagement_ModuleProcessor.AddNodeToTree(objContext, objNewElementJson);
                    ArcadixCacheData.ReplaceData(`Editor_TaskContent_CMS${objContext.props.Data.MediaType}AddEdit_Module`, {
                        ["Value"]: {
                            ["Data"]: arrNodeData,
                            ["TimeStamp"]: "0"
                        }
                    }, () => {
                        console.log("Added to store");
                    });
                    objContext.dispatch({ "type": "SET_STATE", "payload": { "objSelectedNodeData": objNewElementJson["ElementJson"] } });
                }
            }
        });
    }

    /**
     * @name Nodeclick
     * @param {object} objContext {state, props, dispacth}
     * @param {object} objNode Contains selected image details
     * @param {string} strActionType action type
     * @summary Makes an API call to get details of the selected image
     * @returns {any} returns promise
     */
    Nodeclick(objContext, objNode) {
        let objData;
        if (objNode["Type"].toLowerCase().includes("folder")) {
            objData = {
                "strSelectedNodeType": objNode["Type"].toLowerCase(),
                "objSelectedNodeData": objNode["ElementJson"]
            };
        }
        else {
            objData = {
                "strSelectedNodeType": "multimedia",
                "objSelectedNodeData": objNode["ElementJson"],
                "cIsExternalLink": "N"
            };
        }
        if (objNode["NP"] && objNode["NP"]["cIsRootNode"] !== "Y") {
            objContext.dispatch({ type: "SET_STATE", payload: objData });
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "strSelectedNodeType": null } });
        }
        return objNode["ElementJson"];
    }

    /**
     * @name OkClick
     * @param {object} objContext { state, props, dispatch }
     * @summary sends selected image element json to the parent
     */
    OkClick(objContext) {
        if (objContext.state.strSelectedTab === "Global") {
            if (objContext.props.PassedEvents.GetElementJson) {
                objContext.props.PassedEvents.GetElementJson(objContext.ImageManagementRef.current.GetSelectedNodeJson());
                objContext.props.ClosePopup(objContext.props.ObjModal);
            }
        }
        else {
            objContext.props.ClosePopup(objContext.props.ObjModal);
        }
    }

    /**
     * @name AddNodeToTree
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objElementJson elemnt json
     * @return {array} returns node array
     */
    AddNodeToTree(objContext, objElementJson) {
        let intNodeIndex = -1; let nodeIndex = -1;
        let arrNodeData = [...objContext.state.arrNodeData];
        nodeIndex = objContext.state.arrNodeData.findIndex(objNode => objNode["Id"] === objElementJson["Id"]);
        if (nodeIndex > -1) {
            arrNodeData[nodeIndex] = objElementJson;
        }
        else {
            let arr = [...objContext.state.arrNodeData, objElementJson].filter(objNode => objNode["PId"].toString() === objElementJson["PId"].toString() && (objElementJson["Type"].indexOf("Folder") !== -1 ? objNode["Type"].indexOf("Folder") !== -1 : objNode["Type"].indexOf("Folder") === -1));
            let index = arr.sort((a, b) => {
                if (a.Name && b.Name) {
                    if (a.Name.toLowerCase() < b.Name.toLowerCase())
                        return -1;
                    if (a.Name.toLowerCase() > b.Name.toLowerCase())
                        return 1;
                }
                return 0;
            }).findIndex(objNode => objNode["Id"].toString() === objElementJson["Id"].toString());
            if (arr.length > 1) {
                let updatedIndex = arr[index + 1] ? index + 1 : index - 1;
                intNodeIndex = objContext.state.arrNodeData.findIndex(objNode => objNode["Id"].toString() === arr[updatedIndex]["Id"].toString());
                intNodeIndex = updatedIndex > index ? intNodeIndex : intNodeIndex + 1;
                arrNodeData.splice(intNodeIndex, 0, objElementJson);
            }
            else {
                arrNodeData = [objElementJson, ...arrNodeData];
            }
        }
        return arrNodeData;
    }

    /**
     * @name UpdateElementJson
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objUpdatedNodeJson Updated node json.
     * @summary updates the Node json with the passed updated json.
     */
    UpdateElementJson(objContext, objUpdatedNodeJson) {
        let arrNodeData = objContext.state.arrNodeData.map(objTempData => {
            if (objTempData["Id"].toString() === objUpdatedNodeJson["iElementId"].toString()) {
                return {
                    ...objTempData,
                    ["ElementJson"]: {
                        ...objUpdatedNodeJson
                    }
                };
            }
            else {
                return {
                    ...objTempData
                };
            }
        });
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "arrNodeData": arrNodeData,
                "objSelectedNodeData": {
                    ...objUpdatedNodeJson
                }
            }
        });

    }

    /**
     * @name GetFolderTreeJson
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objFolderData folder details
     * @returns {object} return's folder details object
     * */
    GetFolderTreeJson(objContext, objFolderData) {
        return {
            ["Name"]: objFolderData["vElementFolderName"],
            ["PId"]: objFolderData["iElementParentFolderId"],
            ["Id"]: objFolderData["iFolderId"],
            ["IsCFF"]: "Y",
            ["Type"]: objContext.MultiMediaManagement_ModuleProcessor.GetElementType(objFolderData["iElementTypeId"]) + "_Folder",
            ["IsPFF"]: "Y",
            ["NT"]: "",
            ["ImageType"]: "FOLDER",
            ["CNCount"]: 0,
            ["NP"]: {
                ["DataNodeType"]: objContext.MultiMediaManagement_ModuleProcessor.GetElementType(objFolderData["iElementTypeId"]) + "_Folder"
            },
            ["ElementJson"]: objFolderData
        };
    }

    /**
     * @name GetTreeJson
     * @param {object} objContext {props, state, dispatch}
     * @param {object} objElementJson element json
     * @returns {object} return's folder details object
     * */
    GetTreeJson(objContext, objElementJson) {
        return {
            ["Name"]: objElementJson["vElementJson"][`v${objElementJson["vElementTypeName"]}Name`],
            ["PId"]: objElementJson["iFolderID"],
            ["Id"]: objElementJson["iElementId"],
            ["IsCFF"]: "Y",
            ["Type"]: objElementJson["vElementTypeName"],
            ["IsPFF"]: "Y",
            ["NT"]: "",
            ["ImageType"]: objContext.MultiMediaManagement_ModuleProcessor.GetElementIconImageType(objElementJson),
            ["CNCount"]: 0,
            ["NP"]: {
                ["DataNodeType"]: objElementJson["vElementTypeName"]
            },
            ["ElementJson"]: objElementJson
        };
    }

    /**
     * @name GetElementIconImageType
     * @param {object} objElementJson Element Json
     * @summary Extracts the image type for icon.
     * @returns {string} icon
     */
    GetElementIconImageType(objElementJson) {
        let strIconImage;
        switch (objElementJson["vElementTypeName"].toLowerCase()) {
            case "image":
                strIconImage = objElementJson["vElementJson"]["vImageType"].toUpperCase();
                // switch (objElementJson["vElementJson"]["vImageType"].toUpperCase()) {
                //     case "JPG":
                //         strIconImage = "Jpg.svg";
                //         break;
                //     case "JPEG":
                //         strIconImage = "Jpg.svg";
                //         break;
                //     case "GIF":
                //         strIconImage = "gif.svg";
                //         break;
                //     case "PNG":
                //         strIconImage = "png.svg";
                //         break;
                // }
                break;
            case "document":
                let strDocumentType = objElementJson["vElementJson"]["vDocumentType"].toUpperCase();
                if (strDocumentType) {
                    if (strDocumentType == "XLS" || strDocumentType == "XLSX") {
                        strIconImage = "EXCEL";
                    }
                    else {
                        strIconImage = strDocumentType;
                    }
                }
                else {
                    strIconImage = "";
                }
                break;
            // case "animation":
            //     strIconImage = objElementJson["vElementTypeName"] + ".svg";
            //     break;
            // case "construct":
            //     strIconImage = objElementJson["vElementTypeName"] + ".svg";
            //     break;
            default:
                strIconImage = objElementJson["vElementTypeName"].toUpperCase();
                // strIconImage = objElementJson["vElementTypeName"] + ".svg";
                break;
        }
        return strIconImage;
    }

    /**
     * @name GetElementTypeId
     * @param {string} strMediaType media type such as image/audio/video/animation.
     * @summary gets the element type id of the media type.
     * @returns {number} iElementTypeId.
     */
    GetElementTypeId(strMediaType) {
        let intElementTypeId;
        switch (strMediaType.toLowerCase()) {
            case "image":
                intElementTypeId = 2;
                break;
            case "video":
                intElementTypeId = 12;
                break;
            case "audio":
                intElementTypeId = 10;
                break;
            case "document":
                intElementTypeId = 4;
                break;
            case "animation":
                intElementTypeId = 29;
                break;
            default:
                break;
        }
        return intElementTypeId;
    }

    /**
     * @name GetElementType
     * @param {int} iElementTypeId media type id such as image/audio/video/animation.
     * @summary gets the element type of the media type.
     * @returns {string} iElementType.
     */
    GetElementType(iElementTypeId) {
        let strElementType;
        switch (iElementTypeId) {
            case 2:
                strElementType = "Image";
                break;
            case 12:
                strElementType = "Video";
                break;
            case 10:
                strElementType = "Audio";
                break;
            case 29:
                strElementType = "Animation";
                break;
            case 4:
                strElementType = "Document";
                break;
            default:
                break;
        }
        return strElementType;
    }

    /**
    * @name HandleExternalInputChange
    * @param {object} objContext {state, props, dispatch}
    * @param {string} extrenal link textbox value
    * */
    HandleExternalInputChange(objContext, strValue) {
        objContext.dispatch({ "type": "SET_STATE", "payload": { "vLinkURL": strValue, "cIsExternalLink": "Y" } });
    }
}

export default MultiMediaManagement_ModuleProcessor;
