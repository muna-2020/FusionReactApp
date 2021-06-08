// React related impoprts.
import { useEffect, useLayoutEffect, useImperativeHandle } from 'react';

//Application state.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Common helper class method.
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name GetInitialState
 * @param {object} props Initial state
 * @summary Initializes the state
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    let vLinkURL = "http://";
    let cIsExternalLink = "N";
    if (props.Data && props.Data.vLinkURL) {
        vLinkURL = props.Data.vLinkURL;
        cIsExternalLink = "Y";
    }
    return {
        "strSelectedNodeType": null,
        "objSelectedNodeData": null,
        "blnImageSelected": false,
        "arrNodeData": [],
        "intSelectedNode": null,
        "isLoadComplete": false,
        "vLinkURL": vLinkURL,
        "cIsExternalLink": cIsExternalLink,
        "blnShowContainerForExternalLink": typeof props.Data.ShowContainerForExternalLink !== "undefined" ? props.Data.ShowContainerForExternalLink : false,
    };
}

/**
 * @name Initialize
 * @param {object} objContext Context Object
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {

    /**
     * @name useLayoutEffect
     * @summary Calls the DataCall method and the InitialDataParams.
     */
    useLayoutEffect(() => {
        if (!objContext.props[`Editor_TaskContent_CMS${objContext.props.Data.MediaType}AddEdit_Module`]) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            objContext.MultiMediaManagement_ModuleProcessor.LoadInitialData(objContext);
        }
        // ApplicationState.SetProperty("blnShowAnimation", true);
        // objContext.MultiMediaManagement_ModuleProcessor.GetTreeData(objContext);
    }, []);

    /**
     * @name useEffect
     * @summary Checks if the data is loaded to props and then set the component state accordingly.
     */
    useEffect(() => {
        if (DataRef(objContext.props[`Editor_TaskContent_CMS${objContext.props.Data.MediaType}AddEdit_Module`])["Data"]) {
            let arrNodeData = DataRef(objContext.props[`Editor_TaskContent_CMS${objContext.props.Data.MediaType}AddEdit_Module`])["Data"];
            if (objContext.props.blnDisplayOnlyFolders) {
                arrNodeData = arrNodeData.filter(ele => ele["Type"].indexOf('_Folder') !== -1);
            }
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "isLoadComplete": true,
                    "arrNodeData": arrNodeData
                }
            });
            if (ApplicationState.GetProperty("blnShowAnimation")) {
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
        }
        else {
            if (objContext.props.Data.MediaType.toLowerCase() === "usecase") {
                var objManagementFolder = DataRef(objContext.props["Object_DevServer_ProductManagement_Folder"])
                if (objManagementFolder) {
                    if (objManagementFolder["Object_DevServer_ProductManagement_Folder"] &&
                        DataRef(objContext.props["Object_DevServer_ProductManagement_Module"])["Data"] &&
                        DataRef(objContext.props["Object_DevServer_ProductManagement_ProductDocument"])["Data"]) {
                        let arrFolderData = objManagementFolder["Object_DevServer_ProductManagement_Folder"]["Data"];
                        let arrProductDocument = DataRef(objContext.props["Object_DevServer_ProductManagement_ProductDocument"])["Data"];
                        let arrModule = DataRef(objContext.props["Object_DevServer_ProductManagement_Module"])["Data"];
                        let arrProductDocFolder = []; let arrModuleFolder = [];
                        arrFolderData.forEach((objFolder) => {
                            if (objFolder["uApplicationTypeId"].toString() === "863C24EE-707F-4B98-9475-41E1E63DF5F8") {
                                arrProductDocFolder = [...arrProductDocFolder, {
                                    ["Name"]: objFolder["vFolderName"],
                                    ["PId"]: objFolder["uParentFolderId"] === "00000000-0000-0000-0000-000000000000" ? "863C24EE-707F-4B98-9475-41E1E63DF5F8" : objFolder["uParentFolderId"],
                                    ["Id"]: objFolder["uFolderId"],
                                    ["IsCFF"]: "Y",
                                    ["Type"]: "UseCase_Folder",
                                    ["IsPFF"]: "Y",
                                    ["NT"]: "",
                                    ["ImageType"]: "FOLDER",
                                    ["CNCount"]: 1,
                                    ["NP"]: {
                                        ["DataNodeType"]: "UseCase_Folder"
                                    },
                                    ["ElementJson"]: {
                                        ...objFolder,
                                        ["vElementFolderDescription"]: objFolder["vDescription"],
                                        ["vElementFolderName"]: objFolder["vFolderName"]
                                    }
                                }];
                            }
                            else {
                                arrModuleFolder = [...arrModuleFolder, {
                                    ["Name"]: objFolder["vFolderName"],
                                    ["PId"]: objFolder["uParentFolderId"] === "00000000-0000-0000-0000-000000000000" ? "71902243-108E-4E3B-A27C-0C1DA0E11FB9" : objFolder["uParentFolderId"],
                                    ["Id"]: objFolder["uFolderId"],
                                    ["IsCFF"]: "Y",
                                    ["Type"]: "UseCase_Folder",
                                    ["IsPFF"]: "Y",
                                    ["NT"]: "",
                                    ["ImageType"]: "FOLDER",
                                    ["CNCount"]: 1,
                                    ["NP"]: {
                                        ["DataNodeType"]: "UseCase_Folder"
                                    },
                                    ["ElementJson"]: {
                                        ...objFolder,
                                        ["vElementFolderDescription"]: objFolder["vDescription"],
                                        ["vElementFolderName"]: objFolder["vFolderName"]
                                    }
                                }];
                            }
                        });
                        arrProductDocument = arrProductDocument.map((objPD) => {
                            return {
                                ["Name"]: objPD["vDocumentName"],
                                ["PId"]: objPD["uDocumentFolderId"],
                                ["Id"]: objPD["uDocumentId"],
                                ["IsCFF"]: "Y",
                                ["Type"]: "UseCaseDocument",
                                ["IsPFF"]: "Y",
                                ["NT"]: "",
                                ["ImageType"]: objPD["vFileType"] ? objPD["vFileType"].toUpperCase() : "",
                                ["CNCount"]: 1,
                                ["NP"]: {
                                    ["DataNodeType"]: "UseCaseDocument"
                                },
                                ["ElementJson"]: {
                                    ...objPD, ["vElementTypeName"]: "UseCaseDocument"
                                }
                            };
                        })
                        arrModule = arrModule.map((objModule) => {
                            return {
                                ["Name"]: objModule["vModuleName"],
                                ["PId"]: objModule["uFolderId"],
                                ["Id"]: objModule["uModuleId"],
                                ["IsCFF"]: "Y",
                                ["Type"]: "UseCaseExample",
                                ["IsPFF"]: "Y",
                                ["NT"]: "",
                                ["ImageType"]: "MODULE",
                                ["CNCount"]: 1,
                                ["NP"]: {
                                    ["DataNodeType"]: "UseCaseExample"
                                },
                                ["ElementJson"]: {
                                    ...objModule, ["vElementTypeName"]: "UseCaseExample"
                                }
                            };
                        });
                        var arrTreeData = [...arrModuleFolder, ...arrProductDocFolder, ...arrProductDocument, ...arrModule,
                        {
                            ["Name"]: "Examples",
                            ["PId"]: "0",
                            ["Id"]: "71902243-108E-4E3B-A27C-0C1DA0E11FB9",
                            ["IsCFF"]: "Y",
                            ["Type"]: "UseCaseExample_Folder",
                            ["IsPFF"]: "Y",
                            ["NT"]: "",
                            ["ImageType"]: "FOLDER",
                            ["CNCount"]: 1,
                            ["NP"]: {
                                ["DataNodeType"]: "UseCaseExample_Folder"
                            },
                            ["ElementJson"]: {
                                ["vElementFolderDescription"]: "",
                                ["vElementFolderName"]: "Examples"
                            }
                        },
                        {
                            ["Name"]: "Documents",
                            ["PId"]: "0",
                            ["Id"]: "863C24EE-707F-4B98-9475-41E1E63DF5F8",
                            ["IsCFF"]: "Y",
                            ["Type"]: "UseCaseDocument_Folder",
                            ["IsPFF"]: "Y",
                            ["NT"]: "",
                            ["ImageType"]: "FOLDER",
                            ["CNCount"]: 1,
                            ["NP"]: {
                                ["DataNodeType"]: "UseCaseDocument_Folder"
                            },
                            ["ElementJson"]: {
                                ["vElementFolderDescription"]: "",
                                ["vElementFolderName"]: "Documents"
                            }
                        },
                        ];
                        objContext.dispatch({
                            "type": "SET_STATE",
                            "payload": {
                                "isLoadComplete": true,
                                "arrNodeData": arrTreeData
                            }
                        });
                        if (ApplicationState.GetProperty("blnShowAnimation")) {
                            ApplicationState.SetProperty("blnShowAnimation", false);
                        }
                    }
                }
            }
        }
    }, [
        objContext.props[`Editor_TaskContent_CMS${objContext.props.Data.MediaType}AddEdit_Module`],
        objContext.props["Object_DevServer_ProductManagement_Folder"],
        objContext.props["Object_DevServer_ProductManagement_Module"],
        objContext.props["Object_DevServer_ProductManagement_ProductDocument"],
    ]);

    /**
     * @name useImperativeHandle
     * @summary Contains imperative methods.
     */
    useImperativeHandle(objContext.props.myRef, () => ({
        "isLoadComplete": () => {
            return objContext.state.isLoadComplete;
        },
        "GetSelectedNodeJson": () => {
            console.log(objContext.state.objSelectedNodeData);
            return objContext.state.objSelectedNodeData;
        },
        "GetSelectedFolderDetails": () => {
            return objContext.state.objSelectedFolder;
        },
        "GetLinkProperties": () => {
            return {
                "cIsExternalLink": objContext.state.cIsExternalLink,
                "vLinkURL": objContext.state.vLinkURL
            }
        }
    }), [objContext.state, objContext.props]);
}
