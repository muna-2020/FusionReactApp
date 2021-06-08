import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            pupildocumentfolder: DataRef(state.Entity, "pupildocumentfolder", true),
            pupildocument: DataRef(state.Entity, "pupildocument", true),
            textresource: DataRef(state.Entity, "textresource", true),
            pupil: DataRef(state.Entity, "pupil", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp,
            userpreferenceprofileimage: DataRef(state.Entity, "userpreferenceprofileimage", true),
            schoolyearperiod: DataRef(state.Entity, "schoolyearperiod", true)
        };
    }
    else {
        return {};
    }
}

export function InitialDataParams(JConfiguration, props) {
    let strClassId = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
    let strSchoolId = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
    let objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilDocument"
                    }
                }
            ]
        }
    };
    let objGetFoldersParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId
        },
        "SearchQuery": {
            "should": [
                {
                    "match": {
                        "uUserId": props.ClientUserDetails.UserId
                    }
                },
                {
                    "match": {
                        "uSchoolId": strSchoolId
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

    let objGetDocumentsParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId
        },
        "SearchQuery": {
            "should": [
                {
                    "match": {
                        ["uSchoolId"]: strSchoolId
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

    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        },
        "SearchQuery": {},
        "SortKeys": [],
        "OutputColumns": []
    };

    var objGetSchoolYearPeriodParams = {
        "ForeignKeyFilter": {},
        "SortKeys": [],
        "OutputColumns": []
    };

    let arrDataRequest = [
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get",
            "ReturnDataOnServerRender": true
        },
        {
            "URL": "API/Extranet/Pupil/PupilDocumentFolder",
            "Params": objGetFoldersParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Extranet/Pupil/PupilDocument",
            "Params": objGetDocumentsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/SchoolYearPeriod",
            "Params": objGetSchoolYearPeriodParams,
            "MethodType": "Get"
        }
    ];
    return { "DataCalls": arrDataRequest };
}

export function OnClickOutSideTree(objContext) {
    objContext.dispatch({ type: 'Update_SelFol_Undefined', payload: undefined });    
}

export function OnSelectFolder(objContext, objFolder, arrAllDocumentData) {
    let objValidatedIcons = ValidateIcons(objContext, objFolder);
    let arrDocumentsByFolder = arrAllDocumentData.filter(d => d["uDocumentFolderId"] == objFolder["uDocumentFolderId"]);
    objContext.dispatch({
        type: 'Update_SelFol_Documents_ValidateIcons', payload: {
            objSelectedFolder: objFolder,
            objValidatedIcons: objValidatedIcons,
            arrDocumentsByFolder: arrDocumentsByFolder
        }
    });
}

function ValidateIcons(objContext, objFolder) {
    let objValidated = {
        blnDefaultFolder: false,
        blnSharedFolder: false,
        blnParentFolder: false,
        blnOwnerOfFolder: false
    };

    if (objFolder["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000002" || objFolder["cIsSchoolFolderForPupil"] == "Y") {
        objValidated.blnDefaultFolder = true;
    }
    if (objFolder["t_LearnCoacher_Document_Folder_User"] && objFolder["t_LearnCoacher_Document_Folder_User"].length > 0) {
        objValidated.blnSharedFolder = true;
    }
    if (objFolder["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000000") {
        objValidated.blnParentFolder = true;
    }
    if (objFolder["uUserId"] == objContext.props.ClientUserDetails.UserId) {
        objValidated.blnOwnerOfFolder = true;
    }
    return objValidated;
}

export function OnClickSaveFolder(objContext, folderName, blsEditMode) {
    let objFolder = {
        uClassId: objContext.state.strClassId,
        uUserId: objContext.props.ClientUserDetails.UserId,
        cIsTeacher: 'N',
        cIsPupil: "Y",
        cIsDeleted: "N",
        uParentDocumentFolderId: objContext.state.objSelectedFolder ? objContext.state.objSelectedFolder["uDocumentFolderId"] : "00000000-0000-0000-0000-000000000000",
        vFolderName: folderName,
        cIsSchool: "N",
        cIsSchoolFolderForPupil: "N",
        cIsSchoolFolderForTeacher: "N"
    };

    let objFolderParams = {
        "ForeignKeyFilter": {
            "uClassId": objContext.state.strClassId
        },
        "SearchQuery": {
            "should": [
                {
                    "match": {
                        "uUserId": objContext.props.ClientUserDetails.UserId
                    }
                },
                {
                    "match": {
                        ["uSchoolId"]: objContext.state.strSchoolId
                    }
                }
            ]
        }
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
            "URL": "API/Extranet/Pupil/PupilDocumentFolder",
            "Params": objFolderParams,
            "MethodType": "Post"
        }
    ];
    DataCall(arrDataRequest, objContext, true);
}

/**
 *  update the state by selected schoolyearperiod
 * @param {any} objContext
 * @param {any} objItem
 */
export function OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSchoolYearDropdown: objItem } })
}

function EditFolder(objFolderParams, objContext) {
    let arrDataRequest = [
        {
            "URL": "API/Extranet/Pupil/PupilDocumentFolder",
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
            "uClassId": objContext.state.strClassId,
        },
        "SearchQuery": {
            "should": [
                {
                    "match": {
                        ["uSchoolId"]: objContext.state.strSchoolId
                    }
                }
            ]
        },
        "uUserId": objContext.props.ClientUserDetails.UserId,
        "vEditData": { ...objFromFolder },
        "cIsAssignUsers": "N"
    };    
    EditFolder(objFolderParams);
}

function CopyFolder(objContext, objToFolder) {
    let strClassId = objContext.state.strClassId;
    let objFolderDetails = {
        uParentDocumentFolderId: objToFolder["uDocumentFolderId"],
        uSourceFolderId: objContext.state.objSelectedFolder["uDocumentFolderId"],
        uTargetFolderId: objToFolder["uDocumentFolderId"],
        vResourceText: 'Copy',
        uClassId: strClassId,
        uUserId: objContext.props.ClientUserDetails.UserId,
        cIsTeacher: 'N',
        cIsPupil: 'Y',
        cIsSchool: 'N',
        cIsSchoolForPupil: 'N',
        cIsSchoolForTeacher: 'N'
    };

    let objFolderParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId,
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
        let strFolderEnityKey = "pupildocumentfolder;uclassid;" + strClassId.toLowerCase();
        let strDocumentEnityKey = "pupildocument;uclassid;" + strClassId.toLowerCase();
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

        ArcadixCacheData.AddData("pupildocumentfolder", objFolderData, () => {
            console.log("manually added folders to store");
        });
        ArcadixCacheData.AddData("pupildocument", objDocumentData, () => {
            console.log("manually added documents to store");
        });
    });
}

function DeleteFolder(objContext) {
    if (objContext.state.objSelectedFolder != undefined) {
        let objDelFol = {
            "uDocumentFolderId": objContext.state.objSelectedFolder["uDocumentFolderId"]
        };
        let jFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.strClassId
            },
            "SearchQuery": {
                "should": [
                    {
                        "match": {
                            "uUserId": objContext.props.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            ["uSchoolId"]: objContext.props.strSchoolId
                        }
                    }
                ]
            },
            "vDeleteData": objDelFol
        };

        let arrDataRequest = [
            {
                "URL": "API/Extranet/Pupil/PupilDocumentFolder",
                "Params": jFolderParams,
                "MethodType": "Delete"
            }
        ];
        objContext.dispatch({ type: 'Update_SelFol_Undefined', payload: undefined });
        DataCall(arrDataRequest);
    }
}

export function DeleteData(objContext, strType, objDocument) {
    if (strType == "Folder") {
        DeleteFolder(objContext);
    } else {
        DeleteDocument(objContext, objDocument);
    }
}

export function AssignUsers(objContext, usersData) {
    let arrAssignedUsers = usersData.map(u => {
        return {
            uUserId: u["uPupilId"],
            cIsPupil: "Y",
            cIsTeacher: "N",
            cIsSchool: "N"
        };
    });
    let folderObject = {
        "uDocumentFolderId": objContext.state.objSelectedFolder["uDocumentFolderId"],
        "t_LearnCoacher_Document_Folder_User": arrAssignedUsers
    };
       
    let jFolderParams = {
        "ForeignKeyFilter": {
            "uClassId": objContext.state.strClassId,
        },
        "SearchQuery": {
            "should": [
                {
                    "match": {
                        "uUserId": objContext.props.ClientUserDetails.UserId
                    }
                },
                {
                    "match": {
                        ["uSchoolId"]: objContext.state.strSchoolId
                    }
                }
            ]
        },
        "vEditData": folderObject,
        "cIsAssignUsers": "Y"
    };

    let arrDataRequest = [
        {
            "URL": "API/Extranet/Pupil/PupilDocumentFolder",
            "Params": jFolderParams,
            "MethodType": "Put"
        }
    ];
    DataCall(arrDataRequest, objContext, true);
}

export function AddDocuments(objContext, arrUploadedFiles) {
    let arrAddDocs = arrUploadedFiles.map(d => {
        return {
            uDocumentFolderId: objContext.state.objSelectedFolder["uDocumentFolderId"],
            uUserId: objContext.props.ClientUserDetails.UserId,
            cIsPupil: 'Y',
            cIsTeacher: 'N',
            vFileName: d.OriginalFileName,
            vFileType: d.ContentType,
            vFileId: d.FileName,
            iFileSizeInBytes: d.ContentLength,
            cIsSchool: 'N',
            uClassId: objContext.state.strClassId,
        };
    });
    let jDocumentParams = {
        "ForeignKeyFilter": {
            "uClassId": objContext.state.strClassId,
        },
        "SearchQuery": {
            "should": [
                {
                    "match": {
                        ["uSchoolId"]: objContext.state.strSchoolId
                    }
                }
            ]
        },
        "vAddData": arrAddDocs
    };

    let arrDataRequest = [
        {
            "URL": "API/Extranet/Pupil/PupilDocument",
            "Params": jDocumentParams,
            "MethodType": "Post"
        }
    ];

    DataCall(arrDataRequest);
}

export function EditDocument(objContext, objDocument) {
    let uUserId = objContext.props.ClientUserDetails.UserId;
    let objViewed = objDocument.t_Learncoacher_Document_User.find(du => du.uUserId == uUserId);
    if (uUserId != objDocument && (objViewed == undefined)) {
        let objEditData = {
            t_Learncoacher_Document_User: [{
                uDocumentId: objDocument["uDocumentId"],
                uUserId: uUserId,
                cIsPupil: 'Y',
                cIsTeacher: 'N',
                cIsSchool: 'N',
                uClassId: objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId

            }]
        };

        let jDocumentParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.strClassId,
            },
            "SearchQuery": {
                "should": [
                    {
                        "match": {
                            ["uSchoolId"]: objContext.state.strSchoolId
                        }
                    }
                ]
            },
            "vEditData": objEditData
        };

        let arrDataRequest = [
            {
                "URL": "API/Extranet/Pupil/PupilDocument",
                "Params": jDocumentParams,
                "MethodType": "Put"
            }
        ];
        DataCall(arrDataRequest);
    }
}

export function UpdateDocuments(objContext, arrDocumentAllData) {
    let arrDocumentsByFolder = [];
    let arrModifiedDocumentsByFolder = [];
    if (objContext.state.objSelectedFolder && arrDocumentAllData.length > 0) {
        arrDocumentsByFolder = arrDocumentAllData.filter(d => d["uDocumentFolderId"] == objContext.state.objSelectedFolder["uDocumentFolderId"] && d["cIsDeleted"] == "N")
        arrModifiedDocumentsByFolder = arrDocumentsByFolder.map(d => {
            let objViewedPresent = d.t_Learncoacher_Document_User.find(du => du.uUserId == objContext.props.ClientUserDetails.UserId);
            return {
                ...d,
                blnViewed: (objViewedPresent || d.uUserId == objContext.props.ClientUserDetails.UserId) ? true : false
            };
        });
    }
    return arrModifiedDocumentsByFolder;
}


export function DeleteDocument(objContext, objDocument) {
    let arrDocuments = [
        {
            "uDocumentId": objDocument["uDocumentId"]

        }
    ];

    let jDocumentParams = {
        "ForeignKeyFilter": {
            "uClassId": objContext.state.strClassId,
        },
        "SearchQuery": {
            "should": [
                {
                    "match": {
                        "uSchoolId": objContext.state.strSchoolId
                    }
                }
            ]
        },
        "vDeleteData": arrDocuments
    };

    let arrDataRequest = [
        {
            "URL": "API/Extranet/Pupil/PupilDocument",
            "Params": jDocumentParams,
            "MethodType": "Delete"
        }
    ];

    DataCall(arrDataRequest);
}

export function CopyOrMove(objContext, objToFolder, strType) {
    if (strType == "Move")
        MoveFolder(objContext, objToFolder);
    else
        CopyFolder(objContext, objToFolder);

}

export function DataCall(objParams, objContext = undefined, blnUpdateSelFolder = false) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
        console.log("selected folder", objReturn);
        if (blnUpdateSelFolder && objContext) {
            let objResultFolder = DataRef(objReturn, "pupildocumentfolder;uclassid;" + objContext.state.strClassId)[0];
            objContext.dispatch({ type: 'Update_SelFolder', payload: objResultFolder });
        }
    });
}

export function useDataLoader(objContext) {
    const [isLoading, setIsLoading] = useState(true);
    const GetRequiredData = () => {
        console.log("getting required data");
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
        let strClassId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let objPupilProfileImages = {
            "ForeignKeyFilter": {
                "uClassId": strClassId,
            },
            "SearchQuery": {
            }
        };

        let arrRequest = [
            {
                "URL": "API/Object/Framework/UserPreference/UserPreferenceProfileImage/GetDataByClassId",
                "Params": objPupilProfileImages
            }
        ];

        ArcadixFetchData.Execute(arrRequest, (res) => {
            let strFilter = "userpreferenceprofileimage;" + strClassId.toLowerCase();
            let objProfileData = {
                Filter: strFilter,
                Value: {
                    Data: res["userpreferenceprofileimage"][strFilter]["Data"],
                    TimeStamp: "",
                    PrimaryKeyName: "uProfileImageId",
                    Count: res["userpreferenceprofileimage"][strFilter]["Data"].length
                }
            };
            ArcadixCacheData.AddData("userpreferenceprofileimage", objProfileData, () => {
            });
        });
    };
    useLayoutEffect(GetRequiredData, []);
}

export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let strSchoolId = objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.pupildocumentfolder, "pupildocumentfolder;uClassId;" + strClassId) &&
            DataRef(objContext.props.pupildocument, "pupildocument;uClassId;" + strClassId) &&
            DataRef(objContext.props.pupil, "pupil;t_testdrive_member_class_pupil.uclassid;" + strClassId) &&
            DataRef(objContext.props.schoolyearperiod) &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/4_pupil/modules/pupildocument")
        ) {
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: { isLoadComplete: true, strClassId: strClassId, strSchoolId: strSchoolId } });
            ApplicationState.SetProperty("blnShowAnimation", false);
        }
        else {
            console.log("data is loading");
        }

    },
        [
            objContext.props.pupildocumentfolder,
            objContext.props.pupildocument,
            objContext.props.pupil,
            objContext.props.textresource,
            objContext.props.schoolyearperiod
        ]);
}

export function GetDefaultFolders() {
    let objTeacherFolder = {
        uDocumentFolderId: "00000000-0000-0000-0000-000000000002",
        iMainClientId: 0,
        uClassId: "00000000-0000-0000-0000-000000000000",
        uUserId: "00000000-0000-0000-0000-000000000000",
        cIsTeacher: "N",
        cIsPupil: "Y",
        cIsDeleted: "N",
        uParentDocumentFolderId: "00000000-0000-0000-0000-000000000000",
        vFolderName: "School Pupil",
        cIsSchool: "N",
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
        cIsTeacher: "Y",
        cIsPupil: "N",
        cIsDeleted: "N",
        uParentDocumentFolderId: "00000000-0000-0000-0000-000000000000",
        vFolderName: "Root",
        cIsSchool: "N",
        cIsSchoolFolderForPupil: "N",
        cIsSchoolFolderForTeacher: "N",
        dtCreatedOn: "",
        dtModifiedOn: "",
        icon: "folder_brown.png",
        t_LearnCoacher_Document_Folder_User: []
    };
    return { objTeacherFolder, objRootFolder };
}

export function ManipulateFolderData(arrFolderData) {
    if (arrFolderData) {
        let arrFoldersWithIconName = arrFolderData.map(f => {
            return { ...f, icon: "folder_brown.png" }
        });
        let arrAllFolderData = [GetDefaultFolders().objTeacherFolder, ...arrFoldersWithIconName.filter(f => f["cIsDeleted"] == "N")];
        return arrAllFolderData;
    } else {
        return [GetDefaultFolders().objTeacherFolder];
    }
}

export function GetInitialState() {
    return {
        isLoadComplete: false,
        arrDocumentData: undefined,
        objSelectedFolder: undefined,
        objSelectedClass: undefined,
        blnDocumentStateUpdated: false,
        blnDefaultFolder: false,
        blnSharedFolder: false,
        blnParentFolder: false,
        blnOwnerOfFolder: false,
        strClassId: undefined,
        strSchoolId: undefined,
        blnClassCall: false,
        objSchoolYearDropdown:undefined

    };
}

export function Reducer(state, action) {
    switch (action.type) {
        case 'Update_SelFol_Documents_ValidateIcons': {
            return {
                ...state,
                objSelectedFolder: action.payload.objSelectedFolder,
                blnDefaultFolder: action.payload.objValidatedIcons.blnDefaultFolder,
                blnSharedFolder: action.payload.objValidatedIcons.blnSharedFolder,
                blnParentFolder: action.payload.objValidatedIcons.blnParentFolder,
                blnOwnerOfFolder: action.payload.objValidatedIcons.blnOwnerOfFolder,
                arrDocumentData: action.payload.arrDocumentsByFolder,
                blnClassCall: false
            }
        }

        case 'DATA_LOAD_COMPLETE': {
            return {
                ...state,
                ["isLoadComplete"]: action.payload.isLoadComplete,
                ["strClassId"]: action.payload.strClassId,
                ["strSchoolId"]: action.payload.strSchoolId

            };
        }

        case 'Update_SelFol_Undefined': {
            return {
                ...state,
                objSelectedFolder: action.payload
            };

        }

        case 'Update_SelFolder': {
            return {
                ...state,
                objSelectedFolder: action.payload
            };

        }

        case 'Update_Document_State': {
            return {
                ...state,
                arrDocumentData: action.payload,
                blnDocumentStateUpdated: true
            };

        }

        case "Update_SelClass": {
            return {
                ...state,
                objSelectedClass: action.payload,
                blnClassCall: true
            };

        }

        case 'SET_STATE_VALUES': {
            return {
                ...state,
                ...action.payload
            }
        }

    }
}


