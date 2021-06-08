//Base class imports
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';

//Module object imports.
import Object_Extranet_School_DocumentFolder from '@shared/Object/d.Extranet/2_School/Document/DocumentFolder/DocumentFolder';
import Object_Extranet_School_Document from '@shared/Object/d.Extranet/2_School/Document/Document/Document';
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';

//common functionality imports.
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

/**
 * @name SchoolDocument_ModuleProcessor
 * @summary module processor for School Document.
 * */
class SchoolDocument_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @summary hardcoded default class id for school.
     * */
    constructor() {
        super();
        this.strClassId = '00000000-0000-0000-0000-000000000000';
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/SchoolDocument", "Object_Extranet_School_DocumentFolder", "Object_Extranet_School_Document", "Object_Extranet_Teacher_SchoolYearPeriod"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        //Text Resource
        let arrResourcePath = ["/d.Extranet/2_School/Modules/SchoolDocument"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Document Folder
        let objGetFoldersParams = {
            "ForeignKeyFilter": {
                "uClassId": this.strClassId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    },
                    {
                        "match": {
                            "uUserId": props.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            "cIsSchool": "Y"
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": []
        };
        Object_Extranet_School_DocumentFolder.Initialize(objGetFoldersParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_DocumentFolder];

        //Document
        let objGetDocumentsParams = {
            "ForeignKeyFilter": {
                "uClassId": this.strClassId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    },
                    {
                        "match": {
                            "uUserId": props.ClientUserDetails.UserId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_School_Document.Initialize(objGetDocumentsParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_Document];

        //School Year Period.
        let objSchoolYearPeriodParams = {
            "SearchQuery": {
                "must":
                    [
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams, 'Y'); 
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolDocument/SchoolDocument.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolDocument/SchoolDocumentPopUp/UploadFilePopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CreateFolderPopUp.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CopyingFolderPopUp.css"
        ];
    }


    /**
* @name GetPrefetchFiles
* @param {object} props props
* @returns {object} PrefetchFiles
*/
    GetPrefetchFiles(props) {
        return {
            "Components": ["Tree", "Dropdown"],
            "Files": [
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/folder_brown_teacher.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_teacher.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_teacher_expanded.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/folder_brown_pupil.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_pupil.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_pupil_expanded.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_pupil_expanded.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_expanded.png",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_plus.png",
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/download_brown.png",
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/doc_eye.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_brown.png"
            ]
        }
    }

    /**
     * @name OnClickOutSideTree
     * @summary on click of outside the tree need to 
     * @param {any} objContext
     */
    OnClickOutSideTree(objContext, domTreeRef) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedFolder: undefined } })
        ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["SchoolDocumentTree"]: {} });
        domTreeRef.current? domTreeRef.current.UpdateState() : null;
    }

    /**
     * @name OnSelectFolder
     * @summary sets the selected folder and filtered  documents by folder to state.
     * @param {any} objContext
     * @param {any} objFolder
     */
    OnSelectFolder(objContext, objFolder) {
        let objUpdateFolder = objFolder
        //if (objContext.state.objSelectedFolder && objFolder["uDocumentFolderId"] == objContext.state.objSelectedFolder["uDocumentFolderId"])
        //    objUpdateFolder = undefined
        objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedFolder: objUpdateFolder } });
    }

    /**
     * @name OnChangeSchoolYearPeriodDropdown
     * @summary Sets selected school year period to state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
        let blnCurrentSchoolYearPeriod = false;
        if (new Date() > new Date(objItem["dtFromDate"]) && new Date() < new Date(objItem["dtToDate"])) {
            blnCurrentSchoolYearPeriod = true;
        }
        objContext.dispatch({ type: 'SET_STATE', payload: { objSchoolYearPeriod: objItem, blnCurrentSchoolYearPeriod: blnCurrentSchoolYearPeriod } })
    }

    /**
     * @name IsDefaultFolder
     * @summary checks and returns  folder is default or not.
     * @param {any} objContext
     * @param {any} objFolder
     * @returns {boolean}
     */
    IsDefaultFolder(objContext) {

        let blnDefaultFolder = false;
        if (objContext.state.objSelectedFolder && (objContext.state.objSelectedFolder["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000001" || objContext.state.objSelectedFolder["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000016")) {
            blnDefaultFolder = true;
        }

        return blnDefaultFolder;
    }

    /**
     * @name OnClickSaveFolder
     * @summary it adds the folder or renames the folder name based on blnEditMode.
     * @param {any} objContext
     * @param {any} folderName
     * @param {any} blnEditMode
     */
    OnClickSaveFolder(objContext, folderName, blnEditMode) {
        let objFolder = {
            uClassId: this.strClassId,
            uUserId: objContext.props.ClientUserDetails.UserId,
            cIsTeacher: 'N',
            cIsPupil: "N",
            cIsDeleted: "N",
            uParentDocumentFolderId: objContext.state.objSelectedFolder ? objContext.state.objSelectedFolder["uDocumentFolderId"] : "00000000-0000-0000-0000-000000000000",
            vFolderName: folderName,
            cIsSchool: "Y",
            cIsSchoolFolderForPupil: objContext.state.objSelectedFolder ? objContext.state.objSelectedFolder["cIsSchoolFolderForPupil"] : "N",
            cIsSchoolFolderForTeacher: objContext.state.objSelectedFolder ? objContext.state.objSelectedFolder["cIsSchoolFolderForTeacher"] : "N"
        };

        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": this.strClassId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uUserId": objContext.props.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            "cIsSchool": "Y"
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "uSchoolId": ClientUserDetails.SchoolDetails.uSchoolId,
            "uUserId": objContext.props.ClientUserDetails.UserId
        };
        if (blnEditMode) {
            objFolder.uDocumentFolderId = objContext.state.objSelectedFolder["uDocumentFolderId"];
            objFolder.uParentDocumentFolderId = objContext.state.objSelectedFolder["uParentDocumentFolderId"];
            objFolderParams.vEditData = objFolder;
            objFolderParams.cIsAssignUsers = "N";
            this.EditFolder(objFolderParams, objContext);
        }

        else {
            objFolderParams.vAddData = objFolder;
            this.AddFolder(objContext, objFolderParams);
        }
    }

    /**
     * @name AddFolder
     * @summary calls the add folder api
     * @param {any} objFolderParams
     * @param {any} objContext
     */
    AddFolder(objContext, objFolderParams) {
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Extranet_School_DocumentFolder.AddData(objFolderParams, (objResponse) => {
            ApplicationState.SetProperty("blnShowAnimation", false)
            let arrFolderData = DataRef(objContext.props.Object_Extranet_School_DocumentFolder, "Object_Extranet_School_DocumentFolder;uClassId;00000000-0000-0000-0000-000000000000;uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.UserId + ";cIsSchool;Y;cIsDeleted;N")["Data"];
            let objLatestFolder = objResponse[0];
            let objParentFolder = arrFolderData.find(objFol => objFol["uDocumentId"] == objLatestFolder["uParentDocumentFolderId"])
            let arrExistsExpandedFolders = ApplicationState.GetProperty("ExpandedNodes") ? ApplicationState.GetProperty("ExpandedNodes")["SchoolDocumentTree"] : [];
            if (objParentFolder) {
                //ApplicationState.SetProperty("ExpandedNodes", { ["SchoolDocumentTree"]: [...arrExistsExpandedFolders, objParentFolder] });
                let fnExpandTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["SchoolDocumentTree"] ? ApplicationState.GetProperty("ExpandTreeNodes")["SchoolDocumentTree"] : null;
                if (fnExpandTreeNodes) {
                    fnExpandTreeNodes([...arrExistsExpandedFolders, objParentFolder]);
                }
            }

            //ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["SchoolDocumentTree"]: objLatestFolder });
            let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["SchoolDocumentTree"] ? ApplicationState.GetProperty("SelectTreeNode")["SchoolDocumentTree"] : null;
            if (fnSelectTreeNode) {
                fnSelectTreeNode(objLatestFolder);
            }
        });
    }

    /**
     * @name GetFoldersToExpand
     * @param {any} objFolder
     * @param {any} arrAllFolderData
     */
    GetFoldersToExpand(objFolder, arrAllFolderData) {
        if (objFolder["uParentDocumentFolderId"] == "00000000-0000-0000-0000-000000000000") {
            this.arrExpandFolder.push(objFolder);
        } else {
            this.arrExpandFolder.push(objFolder);
            let objNextFolder = arrAllFolderData.find(fol => fol["uDocumentFolderId"] == objFolder["uParentDocumentFolderId"]);
            this.GetFoldersToExpand(objNextFolder, arrAllFolderData);
        }
    }

    /**
     * @name EditFolder
     * @summary calls the edit folder api.
     * @param {any} objFolderParams
     * @param {any} objContext
     */
    EditFolder(objFolderParams, objContext, blnMove = false) {
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Extranet_School_DocumentFolder.EditData(objFolderParams, () => {
            if (blnMove) {
                ApplicationState.SetProperty("blnShowAnimation", false)
                var arrFolderData = DataRef(objContext.props.Object_Extranet_School_DocumentFolder, "Object_Extranet_School_DocumentFolder;uClassId;" + this.strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.UserId + ";cIsSchool;Y;cIsDeleted;N")["Data"];
                let arrModifiedData = this.ManipulateFolderData(objContext, arrFolderData);
                this.arrExpandFolder = [];
                let strTargetFolderId = objFolderParams["vEditData"]["uParentDocumentFolderId"];
                let strMovedFolderId = objFolderParams["vEditData"]["uDocumentFolderId"];
                let objFolder = arrModifiedData.find(x => x["uDocumentFolderId"] == strTargetFolderId);
                let objMovedFolder = arrModifiedData.find(x => x["uDocumentFolderId"] == strMovedFolderId);
                this.GetFoldersToExpand(objFolder, arrModifiedData);
                let arrExistsExpandedFolders = ApplicationState.GetProperty("ExpandedNodes") ? ApplicationState.GetProperty("ExpandedNodes")["SchoolDocumentTree"] : [];
                //ApplicationState.SetProperty("ExpandedNodes", { ["SchoolDocumentTree"]: [...arrExistsExpandedFolders, ...this.arrExpandFolder] });
                let fnExpandTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["SchoolDocumentTree"] ? ApplicationState.GetProperty("ExpandTreeNodes")["SchoolDocumentTree"] : null;
                if (fnExpandTreeNodes) {
                    fnExpandTreeNodes([...arrExistsExpandedFolders, ...this.arrExpandFolder]);
                }
                //ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["SchoolDocumentTree"]: objMovedFolder });
                let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["SchoolDocumentTree"] ? ApplicationState.GetProperty("SelectTreeNode")["SchoolDocumentTree"] : null;
                if (fnSelectTreeNode) {
                    fnSelectTreeNode(objMovedFolder);
                }
                console.log("moved folders path ==>", this.arrExpandFolder)
            }
        })
    }

    /**
     * @name MoveFolder
     * @summary sets the selected folder's uParentDocumentFolderId to objToFolder's uDocumentFolderId and calls edit folder api.
     * @param {any} objContext
     * @param {any} objToFolder
     */
    MoveFolder(objContext, objToFolder) {
        let objFromFolder = {
            ...objContext.state.objSelectedFolder,
            uParentDocumentFolderId: objToFolder["uDocumentFolderId"]
        };

        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": this.strClassId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uUserId": objContext.props.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            "cIsSchool": "Y"
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "uUserId": objContext.props.ClientUserDetails.UserId,
            "vEditData": { ...objFromFolder },
            "cIsAssignUsers": "N"
        };
        this.EditFolder(objFolderParams, objContext, true);
    }

    /**
     * @name AddDocuments
     * @summary calls the add documnets api.
     * @param {any} objContext
     * @param {any} arrUploadedFiles
     */
    AddDocuments(objContext, arrUploadedFiles) {
        let arrAddDocs = arrUploadedFiles.map(d => {
            return {
                uDocumentFolderId: objContext.state.objSelectedFolder["uDocumentFolderId"],
                uUserId: objContext.props.ClientUserDetails.UserId,
                cIsPupil: 'N',
                cIsTeacher: 'N',
                vFileName: d.OriginalFileName,
                vFileId: d.FileName,
                vFileType: d.ContentType,
                iFileSizeInBytes: d.ContentLength,
                cIsSchool: 'Y',
                uClassId: this.strClassId,
            };
        });

        let objDocumentParams = {
            "ForeignKeyFilter": {
                "uClassId": this.strClassId,
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uUserId": objContext.props.ClientUserDetails.UserId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "vAddData": arrAddDocs,
            "uSchoolId": ClientUserDetails.SchoolDetails.uSchoolId
        };

        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Extranet_School_Document.AddData(objDocumentParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
     * @name DeleteData
     * @summary calls the delete folder api or delete document api baesd on strType.
     * @param {any} objContext
     * @param {any} strType
     * @param {any} objDocument
     */
    DeleteData(objContext, strType, objDocument) {
        if (strType == "Folder") {
            this.DeleteFolder(objContext);
        }
        else {
            this.DeleteDocument(objContext, objDocument);
        }
    }

    /**
     * @name DeleteFolder
     * @summary calls the delete folder api.
     * @param {any} objContext
     */
    DeleteFolder(objContext) {
        if (objContext.state.objSelectedFolder != undefined) {
            let objDelFol = {
                "uDocumentFolderId": objContext.state.objSelectedFolder["uDocumentFolderId"]
            }
            let objFolderParams = {
                "ForeignKeyFilter": {
                    "uClassId": this.strClassId
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                            }
                        },
                        {
                            "match": {
                                "uUserId": objContext.props.ClientUserDetails.UserId
                            }
                        },
                        {
                            "match": {
                                "cIsSchool": "Y"
                            }
                        },
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        }
                    ]
                },
                "vDeleteData": objDelFol

            };

            objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedFolder: undefined } });
            ApplicationState.SetProperty("blnShowAnimation", true)
            Object_Extranet_School_DocumentFolder.DeleteData(objFolderParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false)
            });
        }
    }

    /**
     * @name DeleteDocument
     * @summary calls the delete document api.
     * @param {any} objContext
     * @param {any} objDocument
     */
    DeleteDocument(objContext, objDocument) {
        let arrDocuments = [
            {
                "uDocumentId": objDocument["uDocumentId"]
            }
        ];

        let objDocumentParams = {
            "ForeignKeyFilter": {
                "uClassId": this.strClassId,
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uUserId": objContext.props.ClientUserDetails.UserId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "vDeleteData": arrDocuments
        };
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Extranet_School_Document.DeleteData(objDocumentParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
     * @name CopyOrMove
     * @summary it calls the Copy or Move folder based on blnMove.
     * @param {any} objContext
     * @param {any} objToFolder
     * @param {any} blnMove
     */
    CopyOrMove(objContext, objToFolder, blnMove, objTextResource) {
        if (blnMove)
            this.MoveFolder(objContext, objToFolder);
        else
            this.CopyFolder(objContext, objToFolder, objTextResource);
    }

    /**
     * @name CopyFolder
     * @summary it calls the copy paste folder by and recieves copied folders and documents  then puts into store manually.
     * @param {any} objContext
     * @param {any} objToFolder
     */
    CopyFolder(objContext, objToFolder, objTextResource) {
        let objFolderDetails = {
            uParentDocumentFolderId: objToFolder["uDocumentFolderId"],
            uSourceFolderId: objContext.state.objSelectedFolder["uDocumentFolderId"],
            uTargetFolderId: objToFolder["uDocumentFolderId"],
            vResourceText: Localization.TextFormatter(objTextResource, 'CopiedFolderText'),
            uClassId: this.strClassId,
            uUserId: objContext.props.ClientUserDetails.UserId,
            cIsTeacher: 'N',
            cIsPupil: 'N',
            cIsSchool: 'Y',
            cIsSchoolForPupil: objToFolder["cIsSchoolForPupil"],
            cIsSchoolForTeacher: objToFolder["cIsSchoolForTeacher"]
        };

        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": this.strClassId,
            },
            "SearchQuery": {
            },
            "vAddData": { ...objFolderDetails }

        };
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Extranet_School_DocumentFolder.CopyPasteFolders(objFolderParams, (response) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            let strFolderEnityKey = "Object_Extranet_School_DocumentFolder;uClassId;" + this.strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.UserId + ";cIsSchool;Y;cIsDeleted;N";
            let strDocumentEnityKey = "Object_Extranet_School_Document;uClassId;" + this.strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.UserId;
            let objData = response["Object_Extranet_School_DocumentFolder"]["Data"][0];

            let objFolderData = {
                Filter: strFolderEnityKey,
                Value: {
                    Data: objData["DocumentFolder"],
                    TimeStamp: "",
                    PrimaryKeyName: "uDocumentFolderId",
                    Count: objData["DocumentFolder"].length
                }
            };

            let objDocumentData = {
                Filter: strDocumentEnityKey,
                Value: {
                    Data: objData["Document"],
                    TimeStamp: "",
                    PrimaryKeyName: "uDocumentId",
                    Count: objData["Document"].length
                }
            };
            ArcadixCacheData.AddData("Object_Extranet_School_DocumentFolder", objFolderData, () => {
            });
            ArcadixCacheData.AddData("Object_Extranet_School_Document", objDocumentData, () => {
            });

            var arrFolderData = DataRef(objContext.props.Object_Extranet_School_DocumentFolder, "Object_Extranet_School_DocumentFolder;uClassId;" + this.strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.UserId + ";cIsSchool;Y;cIsDeleted;N")["Data"];
            let arrModifiedData = this.ManipulateFolderData(objContext, arrFolderData);
            this.arrExpandFolder = [];
            this.GetFoldersToExpand(objToFolder, arrModifiedData);
            let arrExistsExpandedFolders = ApplicationState.GetProperty("ExpandedNodes") ? ApplicationState.GetProperty("ExpandedNodes")["SchoolDocumentTree"] : [];
            //ApplicationState.SetProperty("ExpandedNodes", { ["SchoolDocumentTree"]: [...arrExistsExpandedFolders, ...this.arrExpandFolder] });
            let fnExpandTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["SchoolDocumentTree"] ? ApplicationState.GetProperty("ExpandTreeNodes")["SchoolDocumentTree"] : null;
            if (fnExpandTreeNodes) {
                fnExpandTreeNodes([...arrExistsExpandedFolders, ...this.arrExpandFolder]);
            }
            //ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["SchoolDocumentTree"]: { ...objContext.state.objSelectedFolder } });
            let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["SchoolDocumentTree"] ? ApplicationState.GetProperty("SelectTreeNode")["SchoolDocumentTree"] : null;
            if (fnSelectTreeNode) {
                fnSelectTreeNode(objContext.state.objSelectedFolder);
            }
            console.log("copied folders path ==>", this.arrExpandFolder)

        })
    }

    /**
     * @name GetDefaultFolders
     * @summary 
     * @returns {Object}
     * */
    GetDefaultFolders(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolDocument", objContext.props);
        let objTeacherFolder = {
            uDocumentFolderId: "00000000-0000-0000-0000-000000000001",
            iMainClientId: 0,
            uClassId: this.strClassId,
            uUserId: "00000000-0000-0000-0000-000000000000",
            cIsTeacher: "N",
            cIsPupil: "N",
            cIsDeleted: "N",
            uParentDocumentFolderId: "00000000-0000-0000-0000-000000000000",
            vFolderName: Localization.TextFormatter(objTextResource, 'TeacherDefaultFolderName'),
            cIsSchool: "Y",
            cIsSchoolFolderForPupil: "N",
            cIsSchoolFolderForTeacher: "Y",
            dtCreatedOn: "",
            dtModifiedOn: "",
            Icon: "folder_brown.png",
            t_LearnCoacher_Document_Folder_User: []
        };

        let objPupilFolder = {
            uDocumentFolderId: "00000000-0000-0000-0000-000000000016",
            iMainClientId: 0,
            uClassId: this.strClassId,
            uUserId: "00000000-0000-0000-0000-000000000000",
            cIsTeacher: "N",
            cIsPupil: "N",
            cIsDeleted: "N",
            uParentDocumentFolderId: "00000000-0000-0000-0000-000000000000",
            vFolderName: Localization.TextFormatter(objTextResource, 'PupilDefaultFolderName'),
            cIsSchool: "Y",
            cIsSchoolFolderForPupil: "Y",
            cIsSchoolFolderForTeacher: "N",
            dtCreatedOn: "",
            dtModifiedOn: "",
            Icon: "folder_brown.png",
            t_LearnCoacher_Document_Folder_User: []
        };

        let objRootFolder = {
            uDocumentFolderId: "00000000-0000-0000-0000-000000000000",
            iMainClientId: 0,
            uClassId: this.strClassId,
            uUserId: "00000000-0000-0000-0000-000000000000",
            cIsTeacher: "N",
            cIsPupil: "N",
            cIsDeleted: "N",
            uParentDocumentFolderId: "00000000-0000-0000-0000-000000000000",
            vFolderName: "Root",
            cIsSchool: "Y",
            cIsSchoolFolderForPupil: "N",
            cIsSchoolFolderForTeacher: "N",
            dtCreatedOn: "",
            dtModifiedOn: "",
            Icon: "folder_brown.png",
            t_LearnCoacher_Document_Folder_User: []
        };

        return { objPupilFolder, objTeacherFolder, objRootFolder };
    }

    /**
     * @name ManipulateFolderData
     * @summary before sending to tree need to append  icon property with "folder_brown" value.
     * @param {any} arrFolderData
     * @returns {Array}
     */
    ManipulateFolderData(objContext, arrFolderData) {
        if (arrFolderData) {

            let arrAllFolderData = [this.GetDefaultFolders(objContext).objTeacherFolder, this.GetDefaultFolders(objContext).objPupilFolder, ...arrFolderData.filter(f => f["cIsDeleted"] == "N")];
            return arrAllFolderData;
        }
    }

    /**
     * @name OpenFolderPopup
     * @summary opens the popup for edit folder name.
     * @param {any} objContext objContext
     * @param {any} blsEditMode blsEditMode
     * @param {any} objTextResource objTextResource
     */
    OpenFolderPopup(objContext, blsEditMode, objTextResource) {
        Popup.ShowPopup({
            Data: {
                strFolderName: blsEditMode ? objContext.state.objSelectedFolder["vFolderName"] : ''
            },
            Meta: {
                PopupName: 'CreateFolderPopUp',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: "auto",
                Width: 380
            },
            Resource: {
                Text: objTextResource
            },
            Events: {
                ClickSave: (folderName) => { objContext.SchoolDocument_ModuleProcessor.OnClickSaveFolder(objContext, folderName, blsEditMode) }
            },
            CallBacks: {}
        });
    }

    /**
     * @name OpenFileUploadPopup
     * @summary Opens the file upload popup.
     * @param {any} objContext objContext
     * @param {any} objTextResource objTextResource
     */
    OpenFileUploadPopup(objContext, objTextResource) {
        Popup.ShowPopup({
            Data: {},
            Meta: {
                PopupName: 'UploadFilePopup',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: 210,
                Width: 390,
                objContext: objContext
            },
            Resource: {
                Text: objTextResource
            },
            Events: {
                OnClickSave: (arrUploadedFiles) => {
                    // ApplicationState.SetProperty("blnShowAnimation", true);
                    objContext.SchoolDocument_ModuleProcessor.AddDocuments(objContext, arrUploadedFiles);
                }
            },
            CallBacks: {}
        });
    }

    /**
     * @name OpenDeletePopUp
     * @summary OpenDeletePopUp
     * @param {any} objContext objContext
     * @param {any} objTextResource objTextResource
     * @param {any} strType strType
     * @param {any} objDocument objDocument
     */
    OpenDeletePopUp(objContext, objTextResource, strType, objDocument = undefined) {
        let strConfirmText = '';
        let strHeaderText = '';

        if (strType == "Folder") {
            strConfirmText = Localization.TextFormatter(objTextResource, 'DeleteFolderPopUpMessage').replace("{}", "<b>" + objContext.state.objSelectedFolder["vFolderName"] + "</b>");
            strHeaderText = Localization.TextFormatter(objTextResource, 'DeleteFolderPopUpHeader');
        } else {
            strConfirmText = Localization.TextFormatter(objTextResource, 'DeleteDocumentPopUpMessage').replace("{}", "<b>" + objDocument["vFileName"] + "</b>");
            strHeaderText = Localization.TextFormatter(objTextResource, 'DeleteDocumentPopUpHeader');
        }
        let objPopupTextResource = {
            DeleteConfirmationPopup_ConfirmText: strConfirmText,
            DeleteConfirmationPopup_ConfirmButtonText: Localization.TextFormatter(objTextResource, 'Delete'),
            DeleteConfirmationPopup_CloseButtonText: Localization.TextFormatter(objTextResource, 'Close'),
            DeleteConfirmationPopup_Title: strHeaderText
        };

        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                Height: "auto"
            },
            Resource: {
                Text: objPopupTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "DeleteConfirmationPopup"
            },
            Events: {
                ConfirmEvent: (strPopupUniqueId) => {
                    Popup.ClosePopup(strPopupUniqueId);
                    objContext.SchoolDocument_ModuleProcessor.DeleteData(objContext, strType, objDocument);
                }
            },
            CallBacks: {}
        });
    }

    /**
     * @name OpenCopyFolderPopup
     * @summary opens the copy folder popup.
     * @param {any} objContext objContext
     * @param {any} objTextResource objTextResource
     * @param {any} blnMove blnMove
     */
    OpenCopyFolderPopup(objContext, objTextResource, blnMove) {
        //let objRootFolder = this.GetDefaultFolders().objRootFolder;
        var arrFolderData = DataRef(objContext.props.Object_Extranet_School_DocumentFolder, "Object_Extranet_School_DocumentFolder;uClassId;" + this.strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.UserId + ";cIsSchool;Y;cIsDeleted;N")["Data"];
        let arrModifiedData = this.ManipulateFolderData(objContext, arrFolderData);
        let arrFilteredData = arrModifiedData.filter(f => !(f["uDocumentFolderId"] == objContext.state.objSelectedFolder["uDocumentFolderId"]))//&& !(f["uDocumentFolderId"] == state.objSelectedFolder["uParentDocumentFolderId"])

        Popup.ShowPopup({
            Data: {
                arrFolderData: arrFilteredData,
                objContext: objContext
            },
            Meta: {
                PopupName: 'CopyFolderPopUp',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: 'auto',
                Width: 380
            },
            Resource: {
                Text: objTextResource
            },
            Events: {
                GetTreeMetaData: objContext.SchoolDocument_ModuleProcessor.GetTreeMetaData(),
                GetTreeResourceData: objContext.SchoolDocument_ModuleProcessor.GetTreeResourceData(),
                OnClickSave: (objSelectedFolder) => { this.CopyOrMove(objContext, objSelectedFolder, blnMove, objTextResource) }
            },
            CallBacks: {}
        });
    }

    /**
     * @name GetFolderDocuments
     * @summary returns the documents by selected folder.
     * @param {any} objContext
     * @returns {Array}
     */
    GetFolderDocuments(objContext) {
        let arrDocumentData = [];
        let arrDocumentAllData = DataRef(objContext.props.Object_Extranet_School_Document, "Object_Extranet_School_Document;uClassId;" + this.strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
        if (!arrDocumentAllData)
            arrDocumentAllData = DataRef(objContext.props.Object_Extranet_School_Document, "Object_Extranet_School_Document;uClassId;" + this.strClassId + ";uSchoolYearPeriodId;;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];

        arrDocumentData = arrDocumentAllData.filter(doc => doc["uDocumentFolderId"] == objContext.state.objSelectedFolder["uDocumentFolderId"] && doc.cIsDeleted == 'N');
        return arrDocumentData;
    }

    /**
     * @name GetDataAfterSchoolYearChange
     * @summary loads the folder and document data after school year period change.
     * @param {any} objContext
     */
    GetDataAfterSchoolYearChange(objContext) {

        let arrDataRequest = [];

        //document folder 
        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": this.strClassId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uUserId": objContext.props.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            "cIsSchool": "Y"
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod["uSchoolYearPeriodId"]
        };

        Object_Extranet_School_DocumentFolder.Initialize(objFolderParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_DocumentFolder];

        //document
        let objGetDocumentsParams = {
            "ForeignKeyFilter": {
                "uClassId": this.strClassId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uUserId": objContext.props.ClientUserDetails.UserId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod["uSchoolYearPeriodId"]
        };
        Object_Extranet_School_Document.Initialize(objGetDocumentsParams)
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_Document];
        (new ObjectQueue()).QueueAndExecute(arrDataRequest);
        objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedFolder: undefined } })
    }

    /**
     * @name GetMetaDataLeftFillheightSchoolDocument
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
     */
    GetMetaDataLeftFillheightSchoolDocument() {
        return {
            HeaderIds: ["Header", "outletBand", "document-mainheader", "document-subheader"],
            FooterIds: ["bottomSpacing"]
        };
    }

    /**
     * @name GetMetaDataRightFillheightSchoolDocument
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
     */
    GetMetaDataRightFillheightSchoolDocument() {
        return {
            HeaderIds: ["Header", "outletBand", "document-mainheader", "documentRightHeader"],
            FooterIds: ["bottomSpacing", "FileUploadButton"]
        };
    }

    /**
   * @name GetMetaDataSchoolYearPeriodDropdown
   * @summary It returns the object metadata
   * @returns {object} MetaData
   */
    GetMetaDataSchoolYearPeriodDropdown() {
        return {
            DisplayColumn: "vSchoolYearName",
            ValueColumn: "uSchoolYearPeriodId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Member_Class_SchoolYearPeriod_Data"
        };
    }

    /**
     * @name GetResourceDataSchoolYearPeriodDropdown
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceDataSchoolYearPeriodDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath
        };
    }

    /**
     * @name GetEventsDataSchoolYearPeriodDropdown
     * @param {object} objContext Context object
     * @summary Returns object that contains all the Event methods.
     * @return {object} objEventBasics
    */
    GetEventsDataSchoolYearPeriodDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.SchoolDocument_ModuleProcessor.OnChangeSchoolYearPeriodDropdown(objContext, objItem)
        };
    }

    /**
     * @name GetTreeMetaData
     * @summary it returns the array of metadatas
     * @returns {object} MetaData
     */
    GetTreeMetaData() {

        let objMeta = {
            IdField: 'uDocumentFolderId',
            ParentIdField: 'uParentDocumentFolderId',
            TextField: 'vFolderName',
            RootNodeId: '00000000-0000-0000-0000-000000000000',
            SkinPath: JConfiguration.ExtranetSkinPath,
            LeftPaddingValue: 0
        };
        return objMeta;
    }

    /**
     * @name GetTreeResourceData
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetTreeResourceData() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath,
            ImagePathDetails: { Folder: "Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png" }
        };
    }

    /**
    * @name GetTreeEvents
    * @param {object} objContext objContext
    * @summary Returns object that contains all the Event methods.
    * @return {object} object
    */
    GetTreeEvents(objContext) {
        return {
            OnSelectNode: (objFolder) => { objContext.SchoolDocument_ModuleProcessor.OnSelectFolder(objContext, objFolder) },
            OnDragAndDrop: () => { },
            OnExpandOrCollapse: () => { },

        };
    }


    /**
     * @name OnBeforeShowNode
     * @summary sets the folder icon
     * @param {any} objNode
     */
    OnBeforeShowNode(objNode) {
        if (objNode["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000001") {
            return {
                ...objNode,
                ImageType: "Folder",
                CustomIcon: 'teacher',
                FileExtension: ".svg"
            }
        } if (objNode["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000016") {
            return {
                ...objNode,
                ImageType: "Folder",
                CustomIcon: 'pupil',
                FileExtension: ".svg"
            }
        }
        return {
            ...objNode,
            ImageType: "Folder"
        }
    };
}

export default SchoolDocument_ModuleProcessor;



