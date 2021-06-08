import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            documentfolder: DataRef(state.Entity, "documentfolder", true),
            document: DataRef(state.Entity, "document", true),
            textresource: DataRef(state.Entity, "textresource", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp,
            schoolyearperiod: DataRef(state.Entity, "schoolyearperiod", true)
        };
    }
    else {
        return {};
    }
}

export function InitialDataParams(JConfiguration, props) {
    var objGetFoldersParams = {
        "ForeignKeyFilter": {
            "uClassId": "00000000-0000-0000-0000-000000000000"
        },
        "SearchQuery": {
            "must": [
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

    var objGetDocumentsParams = {
        "ForeignKeyFilter": {
            "uClassId": "00000000-0000-0000-0000-000000000000"
        },
        "SearchQuery": {
            "must": [
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
        ],
        "OutputColumns": []
    };

    var objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/SchoolDocument"
                    }
                }
            ]
        }
    };

    var objGetSchoolYearPeriodParams = {
        "ForeignKeyFilter": {},

        "SortKeys": [],

        "OutputColumns": []
    };

    var arrDataRequest = [
        {
            "URL": "API/Object/School/DocumentFolder",
            "Params": objGetFoldersParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/School/Document",
            "Params": objGetDocumentsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get",
            "ReturnDataOnServerRender": true
        },
        {
            "URL": "API/Object/Extranet/Teacher/SchoolYearPeriod",
            "Params": objGetSchoolYearPeriodParams,
            "MethodType": "Get"
        }
    ];
    var arrResourceRequest = [
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrDataRequest, "ResourceCalls": arrResourceRequest };
}

export function OnExpandOrCollapse(objContext, arrFoldersData) {
    UpdateFolderState(objContext, arrFoldersData)
}

function UpdateFolderState(objContext, arrFoldersData) {
    objContext.dispatch({ type: 'Update_Folder_State', payload: arrFoldersData })
}

export function OnClickOutSideTree(objContext) {
    objContext.dispatch({ type: 'Update_SelFol_Undefined', payload: undefined })

}

export function OnSelectFolder(objContext, objFolder, arrAllDocumentData) {
    let objValidatedIcons = ValidateIcons(objContext, objFolder)
    let arrDocumentsByFolder = arrAllDocumentData.filter(d => d["uDocumentFolderId"] == objFolder["uDocumentFolderId"] && d["cIsDeleted"] == "N")
    objContext.dispatch({
        type: 'Update_SelFol_Documents_ValidateIcons', payload: {
            objSelectedFolder: objFolder,
            objValidatedIcons: objValidatedIcons,
            arrDocumentsByFolder: arrDocumentsByFolder
        }
    });
}

/**
 *  update the state by selected schoolyearperiod
 * @param {any} objContext
 * @param {any} objItem
 */
export function OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSchoolYearDropdown: objItem } })    
}

function ValidateIcons(objContext, objFolder) {
    let objValidated = {
        blnDefaultFolder: false
    };

    if (objFolder["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000001" || objFolder["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000002") {
        objValidated.blnDefaultFolder = true;
    }
   
    return objValidated;
}

export function OnClickSaveFolder(objContext, folderName, blsEditMode) {
    let objFolder = {
        uClassId: "00000000-0000-0000-0000-000000000000",
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
            "uClassId": "00000000-0000-0000-0000-000000000000"
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
        "uUserId": objContext.props.ClientUserDetails.UserId
    };
    if (blsEditMode) {
        objFolder.uDocumentFolderId = objContext.state.objSelectedFolder["uDocumentFolderId"];
        objFolder.uParentDocumentFolderId = objContext.state.objSelectedFolder["uParentDocumentFolderId"];
        objFolderParams.vEditData = objFolder;
        objFolderParams.cIsAssignUsers = "N";
        EditFolder(objFolderParams, objContext);
    }

    else {
        objFolderParams.vAddData = objFolder;
        AddFolder(objFolderParams, objContext);
    }
}

function AddFolder(objFolderParams, objContext) {
    let arrDataRequest = [
        {
            "URL": "API/Object/School/DocumentFolder",
            "Params": objFolderParams,
            "MethodType": "Post"
        }
    ];
    DataCall(arrDataRequest, objContext, true);
}

function EditFolder(objFolderParams, objContext) {
    let arrDataRequest = [
        {
            "URL": "API/Object/School/DocumentFolder",
            "Params": objFolderParams,
            "MethodType": "Put"
        }
    ];

    DataCall(arrDataRequest, objContext, true);
}

function MoveFolder(objContext, objToFolder) {    
    let objFromFolder = {
        ...objContext.state.objSelectedFolder,
        uParentDocumentFolderId: objToFolder["uDocumentFolderId"]
    };

    let objFolderParams = {
        "ForeignKeyFilter": {
            "uClassId": "00000000-0000-0000-0000-000000000000"
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
    EditFolder(objFolderParams, objContext);
}

export function useDocumentLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.state.objSelectedFolder) {
            let arrAllDocumentData = DataRef(objContext.props.document, "document;uClassId;00000000-0000-0000-0000-000000000000;uUserId;" + objContext.props.ClientUserDetails.UserId)["Data"];
            let arrDocumentsByFolder = arrAllDocumentData.filter(d => d["uDocumentFolderId"] == objContext.state.objSelectedFolder["uDocumentFolderId"] && d["cIsDeleted"] == "N")
            objContext.dispatch({ type: 'Update_Document_State', payload: arrDocumentsByFolder });

            ApplicationState.SetProperty("blnShowAnimation", false)
        }
    }, [objContext.props.document]);
}

export function AddDocuments(objContext, arrUploadedFiles) {
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
            uClassId: "00000000-0000-0000-0000-000000000000",
        };
    });

    let objDocumentParams = {
        "ForeignKeyFilter": {
            "uClassId": "00000000-0000-0000-0000-000000000000",
        },
        "SearchQuery": {
            "must": [
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
        "vAddData": arrAddDocs
    };

    let arrDataRequest = [
        {
            "URL": "API/Object/School/Document",
            "Params": objDocumentParams,
            "MethodType": "Post"
        }
    ];

    DataCall(arrDataRequest);
}

export function DeleteData(objContext,strType,objDocument) {
    if (strType == "Folder") {
        DeleteFolder(objContext);
    }
    else {
        DeleteDocument(objContext, objDocument);
    }
}

 function DeleteFolder(objContext) {
    if (objContext.state.objSelectedFolder != undefined) {
        let objDelFol = {
            "uDocumentFolderId": objContext.state.objSelectedFolder["uDocumentFolderId"]
        }
        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": "00000000-0000-0000-0000-000000000000"
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
            "vDeleteData": objDelFol

        };

        let arrDataRequest = [
            {
                "URL": "API/Object/School/DocumentFolder",
                "Params": objFolderParams,
                "MethodType": "Delete"
            }
        ];
        objContext.dispatch({ type: 'Update_SelFol_Undefined', payload: undefined });
        DataCall(arrDataRequest);
    }
}

export function DeleteDocument(objContext, objDocument) {
    let arrDocuments = [
        {
            "uDocumentId": objDocument["uDocumentId"]
        }
    ];

    let jDocumentParams = {
        "ForeignKeyFilter": {
            "uClassId": "00000000-0000-0000-0000-000000000000",
        },
        "SearchQuery": {
            "must": [
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

    let arrDataRequest = [
        {
            "URL": "API/Object/School/Document",
            "Params": jDocumentParams,
            "MethodType": "Delete"
        }
    ];
    DataCall(arrDataRequest);
}

/**
 * common method send request for crud operations
 * @param {any} objParams
 */
export function SendRequest(objParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    return new Promise(function (resolve, reject) {
        objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
            //  schoolDocumentState.blnFolderDataLoaded = false;
            resolve({ Data: objReturn, success: true });
        });
    });
}


export function CopyOrMove(objContext, objToFolder, blnMove) {
    if (blnMove)
        MoveFolder(objContext, objToFolder);
    else
        CopyFolder(objContext, objToFolder);
}

function CopyFolder(objContext, objToFolder) {
    let strClassId = "00000000-0000-0000-0000-000000000000";
    let objFolderDetails = {
        uParentDocumentFolderId: objToFolder["uDocumentFolderId"],
        uSourceFolderId: objContext.state.objSelectedFolder["uDocumentFolderId"],
        uTargetFolderId: objToFolder["uDocumentFolderId"],
        vResourceText: 'Copy',
        uClassId: strClassId,
        uUserId: objContext.props.ClientUserDetails.UserId,
        cIsTeacher: 'N',
        cIsPupil: 'N',
        cIsSchool: 'Y',
        cIsSchoolForPupil: objToFolder["cIsSchoolForPupil"],
        cIsSchoolForTeacher: objToFolder["cIsSchoolForTeacher"]
    };

    let objFolderParams = {
        "ForeignKeyFilter": {
            "uClassId": "00000000-0000-0000-0000-000000000000",
        },
        "SearchQuery": {
        },
        "vAddData": { ...objFolderDetails }

    };

    let arrRequest = [
        {
            "URL": "API/Object/School/DocumentFolder/CopyPasteFolders",
            "Params": objFolderParams
        }
    ];

    ArcadixFetchData.Execute(arrRequest, (res) => {
        console.log("request executed", res);
        let strFolderEnityKey = "documentfolder;uclassid;00000000-0000-0000-0000-000000000000;uuserid;" + objContext.props.ClientUserDetails.UserId.toLowerCase() + ";cisschool;y;cisdeleted;n";
        let strDocumentEnityKey = "document;uclassid;00000000-0000-0000-0000-000000000000;uuserid;" + objContext.props.ClientUserDetails.UserId.toLowerCase();
        let objFolderData = {
            Filter: strFolderEnityKey,
            Value: {
                Data: res["DocumentFolder"]["Data"]["DocumentFolder"],
                TimeStamp: "",
                PrimaryKeyName: "uDocumentFolderId",
                Count: res["DocumentFolder"]["Data"]["DocumentFolder"].length
            }
        };

        let objDocumentData = {
            Filter: strDocumentEnityKey,
            Value: {
                Data: res["DocumentFolder"]["Data"]["Document"],
                TimeStamp: "",
                PrimaryKeyName: "uDocumentId",
                Count: res["DocumentFolder"]["Data"]["Document"].length
            }
        };
        ArcadixCacheData.AddData("documentfolder", objFolderData, () => {
            console.log("manually added folders to store");
        });
        ArcadixCacheData.AddData("document", objDocumentData, () => {
            console.log("manually added documents to store");
        });
    });
}

export function DataCall(objParams, objContext = undefined, blnUpdateSelFolder = false) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
        console.log("selected folder", objReturn);
        if (blnUpdateSelFolder && objContext) {
            let objResultFolder = DataRef(objReturn, "documentfolder;uClassId;00000000-0000-0000-0000-000000000000;uUserId;" + objContext.props.ClientUserDetails.UserId + ";cisschool;y;cisdeleted;n")[0]
            objContext.dispatch({ type: 'Update_SelFolder', payload: objResultFolder })
        }
    });
}

export function useDataLoader(objContext) {
    const [isLoading, setIsLoading] = useState(true);
    const getRequiredData = () => {
        console.log("getting required data");
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    };
    useLayoutEffect(getRequiredData, []);
}

export function useDataLoaded(objContext) {
    useEffect(() => {
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.documentfolder, "documentfolder;uClassId;00000000-0000-0000-0000-000000000000;uUserId;" + objContext.props.ClientUserDetails.UserId + ";cisschool;y;cisdeleted;n") &&
            DataRef(objContext.props.document, "document;uClassId;00000000-0000-0000-0000-000000000000;uUserId;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.schoolyearperiod) &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/schooldocument")
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
        }
        else {
            console.log("data is loading");
        }
    },
        [
            objContext.props.documentfolder,
            objContext.props.document,
            objContext.props.textresource,
            objContext.props.schoolyearperiod
        ]);
}

export function GetDefaultFolders() {
    let objTeacherFolder = {
        uDocumentFolderId: "00000000-0000-0000-0000-000000000001",
        iMainClientId: 0,
        uClassId: "00000000-0000-0000-0000-000000000000",
        uUserId: "00000000-0000-0000-0000-000000000000",
        cIsTeacher: "N",
        cIsPupil: "N",
        cIsDeleted: "N",
        uParentDocumentFolderId: "00000000-0000-0000-0000-000000000000",
        vFolderName: "School Teacher",
        cIsSchool: "Y",
        cIsSchoolFolderForPupil: "N",
        cIsSchoolFolderForTeacher: "Y",
        dtCreatedOn: "",
        dtModifiedOn: "",
        icon: "folder_brown.png",
        t_LearnCoacher_Document_Folder_User: []
    };

    let objPupilFolder = {
        uDocumentFolderId: "00000000-0000-0000-0000-000000000002",
        iMainClientId: 0,
        uClassId: "00000000-0000-0000-0000-000000000000",
        uUserId: "00000000-0000-0000-0000-000000000000",
        cIsTeacher: "N",
        cIsPupil: "N",
        cIsDeleted: "N",
        uParentDocumentFolderId: "00000000-0000-0000-0000-000000000000",
        vFolderName: "School Pupil",
        cIsSchool: "Y",
        cIsSchoolFolderForPupil: "Y",
        cIsSchoolFolderForTeacher: "N",
        dtCreatedOn: "",
        dtModifiedOn: "",
        icon: "folder_brown.png",
        t_LearnCoacher_Document_Folder_User: []
    };

    let objRootFolder = {
        uDocumentFolderId: "00000000-0000-0000-0000-000000000000",
        iMainClientId: 0,
        uClassId: "00000000-0000-0000-0000-000000000000",
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
        icon: "folder_brown.png",
        t_LearnCoacher_Document_Folder_User: []
    };

    return { objPupilFolder, objTeacherFolder, objRootFolder };
}

export function ManipulateFolderData(arrFolderData) {
    if (arrFolderData) {
        let arrFoldersWithIconName = arrFolderData.map(f => {
            return { ...f, icon: "folder_brown.png" }
        });
        let arrAllFolderData = [GetDefaultFolders().objTeacherFolder, GetDefaultFolders().objPupilFolder, ...arrFoldersWithIconName.filter(f => f["cIsDeleted"] == "N")];
        return arrAllFolderData;
    }
}

export let schoolDocumentState = {
    isLoadComplete: false,
    arrDocumentData: undefined,
    arrDocumentAllData: undefined,
    objSelectedFolder: undefined,
    blnDefaultFolder: false,
    objSchoolYearDropdown:undefined
}

export function Reducer(state, action) {
    switch (action.type) {
        case 'Update_Folder_State': {
            return {
                ...state,
                arrFolderData: action.payload
            };
        }
        case 'Update_SelFol_Documents_ValidateIcons': {
            return {
                ...state,
                arrDocumentData: action.payload.arrDocumentsByFolder,
                objSelectedFolder: action.payload.objSelectedFolder,
                blnDefaultFolder: action.payload.objValidatedIcons.blnDefaultFolder
            };
        }
        case 'Update_Document_State': {
            return {
                ...state,
                arrDocumentData: action.payload
            };
        }
        case 'DATA_LOAD_COMPLETE': {
            return { ...state, ["isLoadComplete"]: action.payload };
        }
        case "changeStatus": {
            return {
                ...state,
                blnFolderDataLoaded: false
            };
        }
        case "Update_SelFol_Undefined": {
            return {
                ...state,
                objSelectedFolder: action.payload
            };
        }
        case "Update_SelFolder": {
            return {
                ...state,
                objSelectedFolder: action.payload
            };
        }
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            }
    }
}


