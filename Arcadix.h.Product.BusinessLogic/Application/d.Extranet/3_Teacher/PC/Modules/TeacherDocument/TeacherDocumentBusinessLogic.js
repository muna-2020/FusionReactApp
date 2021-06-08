import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ArcadixCacheData from '@shared/Framework/DataService/ArcadixCacheData/ArcadixCacheData';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            teacherdocumentfolder: DataRef(state.Entity, "teacherdocumentfolder", true),
            teacherdocument: DataRef(state.Entity, "teacherdocument", true),
            class: DataRef(state.Entity, "class", true),
            pupil: DataRef(state.Entity, "pupil", true),
            textresource: DataRef(state.Entity, "textresource", true),
            userpreferenceprofileimage: DataRef(state.Entity, "userpreferenceprofileimage", true),
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
    let objGetClassesParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
            "Type": "nested"
        },
        "SearchQuery": {
            "must": [
                {
                    "nested": {
                        "path": "t_TestDrive_Member_Class_Teacher",
                        "query": {
                            "bool": {
                                "must": [
                                    {
                                        "match": {
                                            "t_TestDrive_Member_Class_Teacher.cIsDeleted": "N"
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        },
        "SortKeys": [],
        "OutputColumns": []
    };

    let objResourceParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherDocument"
                    }
                }
            ]
        }
    };

    let strClassId = ApplicationState.GetProperty("SelectedClassId");

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
                        "uSchoolId": props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
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
    let objGetDocumentsParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId
        },
        "SearchQuery": {
            "should": [
                {
                    "match": {
                        ["uSchoolId"]: props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
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


    var objGetSchoolYearPeriodParams = {
        "ForeignKeyFilter": {},

        "SortKeys": [],

        "OutputColumns": []
    };

    let arrDataRequest = [
        {
            "URL": "API/Object/Teacher/Class",
            "Params": objGetClassesParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get",
            "ReturnDataOnServerRender": true
        },
        {
            "URL": "API/Extranet/Teacher/TeacherDocumentFolder",
            "Params": objGetFoldersParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Extranet/Teacher/TeacherDocument",
            "Params": objGetDocumentsParams,
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

export function useDataLoadForClassChange(objContext) {
    let GetDataAfterClassChange = () => {
        if (objContext.state.isLoadComplete == true) {
            let strClassId = objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher[0].uClassId;
            let objGetFoldersParams = {
                "ForeignKeyFilter": {
                    "uClassId": strClassId
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
                                "uSchoolId": objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
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

            let objGetDocumentsParams = {
                "ForeignKeyFilter": {
                    "uClassId": strClassId
                },
                "SearchQuery": {
                    "should": [
                        {
                            "match": {
                                ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
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

            let arrDataRequest = [
                {
                    "URL": "API/Extranet/Teacher/TeacherDocumentFolder",
                    "Params": objGetFoldersParams,
                    "MethodType": "Get"
                },
                {
                    "URL": "API/Extranet/Teacher/TeacherDocument",
                    "Params": objGetDocumentsParams,
                    "MethodType": "Get"
                },
                {
                    "URL": "API/Object/Extranet/Pupil/Pupil",
                    "Params": objPupilParams,
                    "MethodType": "Get"
                }
            ];

            DataCall(arrDataRequest);

            let strFilter = "userpreferenceprofileimage;" + strClassId.toLowerCase();
            if (DataRef(objContext.props.userpreferenceprofileimage, strFilter)["Data"] == undefined) {
                let objPupilProfileImages = {
                    "ForeignKeyFilter": {
                        "uClassId": strClassId,
                    },
                    "SearchQuery": {
                    },
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
                    }
                    ArcadixCacheData.AddData("userpreferenceprofileimage", objProfileData, () => {
                    })

                    console.log("pupil profile images", res);
                })

            }
        }
    }
    useEffect(GetDataAfterClassChange, [objContext.state.objSelectedClass]);
}

export function OnChangeClass(objContext, objItem) {
    objContext.dispatch({ type: "Update_SelClass", payload: objItem });
}

/**
 *  update the state by selected schoolyearperiod
 * @param {any} objContext
 * @param {any} objItem
 */
export function OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSchoolYearDropdown: objItem } })
}

export function useDocumentLoaded(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && !objContext.state.blnClassCall && objContext.state.objSelectedFolder) {
            let arrAllDocumentData = DataRef(objContext.props.teacherdocument, "teacherdocument;uClassId;" + (objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId))["Data"];
            let arrDocumentsByFolder = arrAllDocumentData.filter(d => d["uDocumentFolderId"] == objContext.state.objSelectedFolder["uDocumentFolderId"] && d["cIsDeleted"] == "N")
            objContext.dispatch({ type: 'Update_Document_State', payload: arrDocumentsByFolder })
        }
    }, [objContext.props.teacherdocument])
}

export function OnClickOutSideTree(objContext) {
    objContext.dispatch({ type: 'Update_SelFol_Undefined', payload: undefined })
}

export function OnSelectFolder(objContext, objFolder, arrAllDocumentData) {
    let objValidatedIcons = ValidateIcons(objContext, objFolder)
    let arrDocumentsByFolder = arrAllDocumentData.filter(d => d["uDocumentFolderId"] == objFolder["uDocumentFolderId"])
    objContext.dispatch({
        type: 'Update_SelFol_Documents_ValidateIcons', payload: {
            objSelectedFolder: objFolder,
            objValidatedIcons: objValidatedIcons,
            arrDocumentsByFolder: arrDocumentsByFolder
        }
    })
}

function ValidateIcons(objContext, objFolder) {
    let objValidated = {
        blnDefaultFolder: false,
        blnSharedFolder: false,
        blnParentFolder: false,
        blnOwnerOfFolder: false
    }

    if (objFolder["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000001" || objFolder["cIsSchoolFolderForTeacher"] == "Y") {
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
        uClassId: objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
        uUserId: objContext.props.ClientUserDetails.UserId,
        cIsTeacher: 'Y',
        cIsPupil: "N",
        cIsDeleted: "N",
        uParentDocumentFolderId: objContext.state.objSelectedFolder ? objContext.state.objSelectedFolder["uDocumentFolderId"] : "00000000-0000-0000-0000-000000000000",
        vFolderName: folderName,
        cIsSchool: "N",
        cIsSchoolFolderForPupil: "N",
        cIsSchoolFolderForTeacher: "N"
    }

    let objFolderParams = {
        "ForeignKeyFilter": {
            "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
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
                        ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
                    }
                }
            ]
        },
    };
    
    if (blsEditMode) {
        objFolder.uDocumentFolderId = objContext.state.objSelectedFolder["uDocumentFolderId"];
        objFolder.uParentDocumentFolderId = objContext.state.objSelectedFolder["uParentDocumentFolderId"];
        objFolderParams.vEditData = objFolder;
        objFolderParams.cIsAssignUsers = "N";
        EditFolder(objFolderParams);
    }
    else {
        objFolderParams.vAddData = objFolder;
        AddFolder(objFolderParams);
    }
}

function AddFolder(objFolderParams) {
    let arrDataRequest = [
        {
            "URL": "API/Extranet/Teacher/TeacherDocumentFolder",
            "Params": objFolderParams,
            "MethodType": "Post"
        }
    ];
    DataCall(arrDataRequest);
}

function EditFolder(objFolderParams) {
    let arrDataRequest = [
        {
            "URL": "API/Extranet/Teacher/TeacherDocumentFolder",
            "Params": objFolderParams,
            "MethodType": "Put"
        }
    ];
    DataCall(arrDataRequest);
}

function MoveFolder(objContext, objToFolder) {
    let objFromFolder = {
        ...objContext.state.objSelectedFolder,
        uParentDocumentFolderId: objToFolder["uDocumentFolderId"]
    };

    let objFolderParams = {
        "ForeignKeyFilter": {
            "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
        },
        "SearchQuery": {
            "should": [
                {
                    "match": {
                        ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
                    }
                }
            ]
        },
        "uUserId": objContext.props.ClientUserDetails.UserId,
        "vEditData": { ...objFromFolder },
        "cIsAssignUsers": "N"
    };
    EditFolder(objFolderParams)
}

function CopyFolder(objContext, objToFolder) {
    let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
    let objFolderDetails = {
        uParentDocumentFolderId: objToFolder["uDocumentFolderId"],
        uSourceFolderId: objContext.state.objSelectedFolder["uDocumentFolderId"],
        uTargetFolderId: objToFolder["uDocumentFolderId"],
        vResourceText: 'Copy',
        uClassId: strClassId,
        uUserId: objContext.props.ClientUserDetails.UserId,
        cIsTeacher: 'Y',
        cIsPupil: 'N',
        cIsSchool: 'N',
        cIsSchoolForPupil: 'N',
        cIsSchoolForTeacher: 'N'
    };

    let objFolderParams = {
        "ForeignKeyFilter": {
            "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
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
        let strFolderEnityKey = "teacherdocumentfolder;uclassid;" + strClassId.toLowerCase();
        let strDocumentEnityKey = "teacherdocument;uclassid;" + strClassId.toLowerCase();
        let objFolderData = {
            Filter: strFolderEnityKey,
            Value: {
                Data: res["DocumentFolder"]["Data"]["DocumentFolder"],
                TimeStamp: "",
                PrimaryKeyName: "uDocumentFolderId",
                Count: 1
            }
        }

        let objDocumentData = {
            Filter: strDocumentEnityKey,
            Value: {
                Data: res["DocumentFolder"]["Data"]["Document"],
                TimeStamp: "",
                PrimaryKeyName: "uDocumentId",
                Count: 1
            }

        }

        ArcadixCacheData.AddData("teacherdocumentfolder", objFolderData, () => {
            console.log("manually added folders to store");
        })
        ArcadixCacheData.AddData("teacherdocument", objDocumentData, () => {
            console.log("manually added documents to store");
        })
    })
}

function DeleteFolder(objContext) {
    if (objContext.state.objSelectedFolder != undefined) {
        let objDelFol = {
            "uDocumentFolderId": objContext.state.objSelectedFolder["uDocumentFolderId"]
        }
        let jFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
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
                            ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
                        }
                    }
                ]
            },
            "vDeleteData": objDelFol
        };

        let arrDataRequest = [
            {
                "URL": "API/Extranet/Teacher/TeacherDocumentFolder",
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
        DeleteFolder(objContext)
    } else {
        DeleteDocument(objContext, objDocument)
    }
}

export function AssignUsers(objContext, usersData) {
    let arrAssignedUsers = usersData.map(u => {
        return {
            uUserId: u["uPupilId"],
            cIsPupil: "N",
            cIsTeacher: "Y",
            cIsSchool: "N"
        }
    })
    let folderObject = {
        "uDocumentFolderId": objContext.state.objSelectedFolder["uDocumentFolderId"],
        "t_LearnCoacher_Document_Folder_User": arrAssignedUsers
    };
    
    let jFolderParams = {
        "ForeignKeyFilter": {
            "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
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
                        ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
                    }
                }
            ]
        },
        "vEditData": folderObject,
        "cIsAssignUsers": "Y"
    };

    let arrDataRequest = [
        {
            "URL": "API/Extranet/Teacher/TeacherDocumentFolder",
            "Params": jFolderParams,
            "MethodType": "Put"
        }
    ];
    DataCall(arrDataRequest);
}

export function AddDocuments(objContext, arrUploadedFiles) {
    let arrAddDocs = arrUploadedFiles.map(d => {
        return {
            uDocumentFolderId: objContext.state.objSelectedFolder["uDocumentFolderId"],
            uUserId: objContext.props.ClientUserDetails.UserId,
            cIsPupil: 'N',
            cIsTeacher: 'Y',
            vFileName: d.OriginalFileName,
            vFileType: d.ContentType,
            vFileId: d.FileName,
            iFileSizeInBytes: d.ContentLength,
            cIsSchool: 'N',
            uClassId: objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
        }
    })

    let jDocumentParams = {
        "ForeignKeyFilter": {
            "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
        },
        "SearchQuery": {
            "should": [
                {
                    "match": {
                        ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
                    }
                }
            ]
        },
        "vAddData": arrAddDocs
    };

    let arrDataRequest = [
        {
            "URL": "API/Extranet/Teacher/TeacherDocument",
            "Params": jDocumentParams,
            "MethodType": "Post"
        }
    ];
    DataCall(arrDataRequest);
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
            }
        })
    }
    return arrModifiedDocumentsByFolder
}

export function EditDocument(objContext, objDocument) {
    let uUserId = objContext.props.ClientUserDetails.UserId;
    let objViewed = objDocument.t_Learncoacher_Document_User.find(du => du.uUserId == uUserId)
    if (uUserId != objDocument && (objViewed == undefined)) {
        let objEditData = {
            t_Learncoacher_Document_User: [{
                uDocumentId: objDocument["uDocumentId"],
                uUserId: uUserId,
                cIsPupil: 'N',
                cIsTeacher: 'Y',
                cIsSchool: 'N',
                uClassId: objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,

            }]
        }

        let jDocumentParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
            },
            "SearchQuery": {
                "should": [
                    {
                        "match": {
                            ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
                        }
                    }
                ]
            },
            "vEditData": objEditData

        };

        let arrDataRequest = [
            {
                "URL": "API/Extranet/Teacher/TeacherDocument",
                "Params": jDocumentParams,
                "MethodType": "Put"
            }
        ];

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
            "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
        },
        "SearchQuery": {
            "should": [
                {
                    "match": {
                        "uSchoolId": objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
                    }
                }
            ]
        },
        "vDeleteData": arrDocuments
    };

    let arrDataRequest = [
        {
            "URL": "API/Extranet/Teacher/TeacherDocument",
            "Params": jDocumentParams,
            "MethodType": "Delete"
        }
    ];

    DataCall(arrDataRequest);
}

export function CopyOrMove(objContext, objToFolder, strType) {
    if (strType == "Move")
        MoveFolder(objContext, objToFolder)
    else
        CopyFolder(objContext, objToFolder);
}

export function DataCall(objParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(objParams, function (objReturn) {
    });
}

export function useDataLoader(objContext) {
    const GetRequiredData = () => {
        console.log("getting required data");
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objPupilProfileImages = {
            "ForeignKeyFilter": {
                "uClassId": strClassId,
            },
            "SearchQuery": {
            },
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
            }
            ArcadixCacheData.AddData("userpreferenceprofileimage", objProfileData, () => {
            })

            console.log("pupil profile images", res);
        })
    }
    useLayoutEffect(GetRequiredData, []);

}

export function useDataLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.teacherdocumentfolder, "teacherdocumentfolder;uClassId;" + strClassId) &&
            DataRef(objContext.props.teacherdocument, "teacherdocument;uClassId;" + strClassId) &&
            DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId + ";t_testdrive_member_class_teacher.cisdeleted;n") &&
            DataRef(objContext.props.pupil, "pupil;t_testdrive_member_class_pupil.uclassid;" + strClassId) &&
            DataRef(objContext.props.userpreferenceprofileimage, "userpreferenceprofileimage;" + strClassId) &&
            DataRef(objContext.props.schoolyearperiod) &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/teacherdocument")
        ) {
            ApplicationState.SetProperty("blnShowAnimation", false)
            objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: { isLoadComplete: true, strUserPreferenceClassId: strClassId, objUserPreference: objUserPreference } });
        }
        else {
            console.log("data is loading");
        }
    },
        [
            objContext.props.teacherdocumentfolder,
            objContext.props.teacherdocument,
            objContext.props.class,
            objContext.props.pupil,
            objContext.props.textresource,
            objContext.props.userpreferenceprofileimage,
            objContext.props.schoolyearperiod,

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
    }

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
    }
    return { objTeacherFolder, objRootFolder };
}

export function GetClassDropDownData(arrClassData, objTextResource)
{    
    let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
    arrClassData.forEach((objClass) => {
        let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N" }) };
        if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
            arrMainClassData = [...arrMainClassData, objTempClassData];
        }
        objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsCoTeacher === "Y") };
        if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
            arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
        }
        objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsSubjectExpert === "Y") };
        if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
            arrSubjectExpertClassData = [...arrSubjectExpertClassData, objTempClassData];
        }
    }
    );
    let arrFinalClassData = [
        {
            "Title": objTextResource.ClassTeacherTextForDropDown,
            "Data": arrMainClassData
        },
        {
            "Title": objTextResource.CoTeacherTextForDropDown,
            "Data": arrCoTeacherClassData
        },
        {
            "Title": objTextResource.SubjectExpertTeacherTextForDropDown,
            "Data": arrSubjectExpertClassData
        },
    ];
    return arrFinalClassData;
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
        strUserPreferenceClassId: undefined,
        blnClassCall: false,
        objUserPreference: undefined,
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
                ["strUserPreferenceClassId"]: action.payload.strUserPreferenceClassId,
                ["objUserPreference"]: action.payload.objUserPreference
            };
        }

        case 'Update_SelFol_Undefined': {
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

        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            }
    }
}


