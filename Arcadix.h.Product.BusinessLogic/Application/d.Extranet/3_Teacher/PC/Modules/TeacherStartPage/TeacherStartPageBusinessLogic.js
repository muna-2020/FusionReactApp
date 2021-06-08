import { useLayoutEffect, useEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

export let blnDocumentLoaded = false;

/**
 * 
 * @param {*} state 
 * @summary   maps entity/application state to props of the component.
            ClassIdForPreSelect: state.ApplicationState.ClassIdForPreSelect,
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            class: DataRef(state.Entity, "class", true),
            textresource: DataRef(state.Entity, "textresource", true),
            pupil: DataRef(state.Entity, "pupil", true),
            testloginandresult: DataRef(state.Entity, "testloginandresult", true),
            subject: DataRef(state.Entity, "subject", true),
            clientsettings: DataRef(state.Entity, "clientsettings", true),
            intranettest: DataRef(state.Entity, "intranettest", true),
            extranettest: DataRef(state.Entity, "extranettest", true),
            documentfolder: DataRef(state.Entity, "documentfolder", true),
            document: DataRef(state.Entity, "document", true),
            object_extranet_teacher: DataRef(state.Entity, "object_extranet_teacher", true),
            school: DataRef(state.Entity, "school", true),
            newsgroup: DataRef(state.Entity, "newsgroup", true),
            news: DataRef(state.Entity, "news", true),
            userpreferenceprofileimage: DataRef(state.Entity, "userpreferenceprofileimage", true)
        };
    }
    else {
        return {};
    }
};

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params for the component.
 */
export function InitialDataParams(JConfiguration, props) {
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let objResourceParams = {
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherStartPage"
                    }
                }
            ]
        },
    };

    let objClassParams = {
        ["ForeignKeyFilter"]: {
            "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
            "Type": "nested"
        }
    };

    let objSubjectParams = {
        "ForeignKeyFilter": {},
        "SearchQuery":
        {
            "must": [
                {
                    "match": {
                        "iMainClientId": props.ClientUserDetails.MainClientId
                    }
                },
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ]
        }
    };

    let objClientSettingsParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iConfigurationFileId": 1
                    }
                },
                {
                    "match": {
                        "vParentKey": "ExtranetTeacher"
                    }
                },
                {
                    "match": {
                        "vSubParentKey": "TestLoginPaperless"
                    }
                },
                {
                    "match": {
                        "vKey": "InvalidateTokenTime"
                    }
                }
            ]
        }
    };

    let objTeacherParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Teacher_School.uSchoolId": uSchoolId,
            "Type": "nested"
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

    let objSchoolParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "uSchoolId": uSchoolId
                    }
                }
            ]
        }
    };


    let arrParams = [
        {
            "URL": "API/Object/Framework/Blocks/TextResource",
            "Params": objResourceParams,
            "ReturnDataOnServerRender": true,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher/Class",
            "Params": objClassParams,
            "MethodType": "Get",
        },
        {
            "URL": "API/Object/Blocks/SystemConfiguration/ClientSettings",
            "Params": objClientSettingsParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Taxonomy/Subject",
            "Params": objSubjectParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher",
            "Params": objTeacherParams,
            "MethodType": "Get",
            "UseFullName":true

        },
        {
            "URL": "API/Object/School/School",
            "Params": objSchoolParams,
            "MethodType": "Get"
        },
        ...GetDataRequestsByClass(props)
    ];
    return { "DataCalls": arrParams };
};

export function GetDataRequestsByClass(props, selClassId = undefined) {
    let strClassId = selClassId ? selClassId : ApplicationState.GetProperty("SelectedClassId");
    let strOrientationCycleTypeId = "1";
    let strHighStakeCycleTypeId = "6";
    let strLearningCycleTypeId = "3";
    let iStateId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let strTeacherId = props.ClientUserDetails.UserId;

    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        }
    };

    let objOrientationIntranetTestParams = {
        "cArchieve": "N",
        "iOffSet": 0,
        "iInterval": 6000,
        "cIsFilterBasedOnDate": "N",
        "SearchQuery":
        {
            "must":
                [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    },
                    {
                        "match": {
                            "iCycleTypeId": strOrientationCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uSchoolId": uSchoolId
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": props.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
        }
    };

    let objHighStakeIntranetTestParams = {
        "cArchieve": "N",
        "iOffSet": 0,
        "iInterval": 6000,
        "cIsFilterBasedOnDate": "N",
        "SearchQuery":
        {
            "must":
                [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    },
                    {
                        "match": {
                            "iCycleTypeId": strHighStakeCycleTypeId
                        }
                    },
                    {
                        "match": {
                            "uSchoolId": uSchoolId
                        }
                    },
                    {
                        "match": {
                            "uTeacherId": props.ClientUserDetails.UserId
                        }
                    },
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
        }
    };
        
    let objLearningExtranetTestParams = {
        "iOffSet": 0,
        "iInterval": 6000,
        "cIsFilterBasedOnDate": "N",
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iCycleTypeId": strLearningCycleTypeId
                    }
                },
                {
                    "match": {
                        "uClassId": strClassId
                    }
                },
                {
                    "match": {
                        "uTeacherId": strTeacherId
                    }
                },
                {
                    "range": {
                        "dtFromDate": "",
                        "dtToDate": ""
                    }
                }
            ]
        }
    };

    let objOrientationTestLoginAndResultParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iCycleTypeId": strOrientationCycleTypeId
                    }
                },
                {
                    "match": {
                        "uClassId": strClassId
                    }
                }
            ]
        }
    };

    let objHighStakeTestLoginAndResultParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "iCycleTypeId": strHighStakeCycleTypeId
                    }
                },
                {
                    "match": {
                        "uClassId": strClassId
                    }
                }
            ]
        }
    };

    let objLearningExtranetTestResultParams = {
        "SearchQuery":
        {
            "must":
                [
                    {
                        "match": {
                            "iCycleTypeId": strLearningCycleTypeId
                        }
                    },

                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    },
                ]
        }
    };

    let objFoldersParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId
        },
        "SearchQuery": {
            "must": [
                {
                    "nested": {
                        "path": "t_LearnCoacher_Document_Folder_User",
                        "query": {
                            "bool": {
                                "must": [
                                    {
                                        "match": {
                                            "t_LearnCoacher_Document_Folder_User.uUserId": strTeacherId
                                        }
                                    },
                                ]
                            }
                        }
                    }
                },
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ],
            "must_not": [
                {
                    "match": {
                        "uUserId": strTeacherId
                    }
                }
            ]
        },
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "desc"
                }
            }
        ],
        "OutputColumns": []
    };

    let objNewsGroupParams = {
        "ForeignKeyFilter": {
            "uClassId": strClassId
        },
        "SearchQuery": {
            "must": [
                {
                    "nested": {
                        "path": "t_LearnCoacher_News_Group_User",
                        "query": {
                            "bool": {
                                "must": [
                                    {
                                        "match": {
                                            "t_LearnCoacher_News_Group_User.uUserId": strTeacherId
                                        }
                                    },
                                    {
                                        "match": {
                                            "t_LearnCoacher_News_Group_User.cIsDeleted": "N"
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    "match": {
                        "cIsDeleted": "N"
                    }
                }
            ],
            "must_not": [
                {
                    "match": {
                        "uUserId": strTeacherId
                    }
                }
            ]
        },
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "desc"
                }
            }
        ],
        "OutputColumns": []
    };

    let arrDataRequestParams = [
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objOrientationIntranetTestParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/IntranetTest",
            "Params": objHighStakeIntranetTestParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objOrientationTestLoginAndResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objHighStakeTestLoginAndResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Intranet/Test/ExtranetTest",
            "Params": objLearningExtranetTestParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/TestApplication/TestLoginAndResult",
            "Params": objLearningExtranetTestResultParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/School/DocumentFolder",
            "Params": objFoldersParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/School/NewsGroup",
            "Params": objNewsGroupParams,
            "MethodType": "Get"
        }
    ]
    GetPupilProfileImages(strClassId);
    return arrDataRequestParams;
}

function GetPupilProfileImages(strClassId) {
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

/**
 * 
 * @param {*} JConfiguration 
 * @param {*} props 
 * @summary   Get initials request params of pupil for the component.
 */
export function GetPupilDataParams(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
            "Type": "nested"
        }
    };
    let objParams = [
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
    ];
    return objParams;
};

/**
 * 
 * @param {*} objParams 
 * @summary   Calls FetchAndCacheData execute method to make the api call.
 */
export function DataCall(arrParams) {
    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn) {
        //Do something
    });
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoader(objContext) {
    useLayoutEffect(() => {
        DataCall(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls);
    }, []);
};

/**
 * 
 * @param {*} objContext 
 * @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForClassChange(objContext) {
    useLayoutEffect(() => {
        if (objContext.state.isLoadComplete) {
            DataCall(GetDataRequestsByClass(objContext.props));
        }
    }, [objContext.state.blnClassChangedInDropdown]);
};

export function useDataLoadedAfterClassChange(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let strClassId = ApplicationState.GetProperty("SelectedClassId");
            let strOrientationCycleTypeId = "1"
            let strHighStakeCycleTypeId = "6";
            let strLearningCycleTypeId = "3";
            let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
            let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
            let strTeacherId = objContext.props.ClientUserDetails.UserId;    
            if (DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strOrientationCycleTypeId + ";uclassid;" + strClassId) &&
                DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strHighStakeCycleTypeId + ";uclassid;" + strClassId) &&
                DataRef(objContext.props.extranettest, "extranettest;icycletypeid;" + strLearningCycleTypeId + ";uclassid;" + strClassId + ";uteacherid;" + strTeacherId) &&
                DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strOrientationCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n") &&
                DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strHighStakeCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n") &&
                DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) &&
                DataRef(objContext.props.newsgroup, "newsgroup;uclassid;" + strClassId + ";t_learncoacher_news_group_user.uuserid;" + strTeacherId + ";t_learncoacher_news_group_user.cisdeleted;n;cisdeleted;n") &&
                DataRef(objContext.props.news, "news;uclassid;" + strClassId + ";cisdeleted;n;t_learncoacher_news_touser.uuserid;" + strTeacherId + ";t_learncoacher_news_touser.cisdeleted;n") &&
                DataRef(objContext.props.news, "news;cisdeleted;n;cisschool;y;uuserid;" + uSchoolId + ";t_learncoacher_news_touser.cisteacher;y") &&
                DataRef(objContext.props.userpreferenceprofileimage, "userpreferenceprofileimage;" + strClassId) &&
                DataRef(objContext.props.documentfolder, "documentfolder;uclassid;" + strClassId + ";t_learncoacher_document_folder_user.uuserid;" + strTeacherId + ";cisdeleted;n") &&
                DataRef(objContext.props.document, "document;cisdeleted;n")
            ) {
                let arrPupilData = GetPupilData(objContext);
                let arrOrientationTestLoginResult = DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strOrientationCycleTypeId + ";uclassid;" + strClassId)["Data"];
                let arrHighStakeTestLoginResult = DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strHighStakeCycleTypeId + ";uclassid;" + strClassId)["Data"];
                let arrSubject = DataRef(objContext.props.subject, "subject;imainclientid;" + objContext.props.ClientUserDetails.MainClientId + ";cisdeleted;n")["Data"];
                let arrOrientationTestData = DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strOrientationCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n")["Data"];
                let arrHighStakeTestData = DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strHighStakeCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n")["Data"];
                let arrOrientationTestPupil = GetTestData(objContext, arrPupilData, arrOrientationTestLoginResult, arrOrientationTestData, arrSubject);
                let arrOrientationTestResult = GetTestResult(objContext, arrPupilData, arrOrientationTestLoginResult, arrOrientationTestData, arrSubject);
                let arrHighStakeTestPupil = GetTestData(objContext, arrPupilData, arrHighStakeTestLoginResult, arrHighStakeTestData, arrSubject);
                let arrHighStakeTestResult = GetTestResult(objContext, arrPupilData, arrHighStakeTestLoginResult, arrHighStakeTestData, arrSubject);
                let arrLearningTestData = DataRef(objContext.props.extranettest, "extranettest;icycletypeid;" + strLearningCycleTypeId + ";uclassid;" + strClassId + ";uteacherid;" + strTeacherId)["Data"];
                let arrLearningTestLoginResult = DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strLearningCycleTypeId + ";uclassid;" + strClassId)["Data"];
                let arrLearningTestPupil = GetLearningTestData(objContext, arrPupilData, arrLearningTestLoginResult, arrLearningTestData, arrSubject)
                let arrDocument = DataRef(objContext.props.document, "document;cisdeleted;n")["Data"];
                let arrTeacherData = DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + uSchoolId)["Data"];
                let objSchool = DataRef(objContext.props.school, "school;uschoolid;" + uSchoolId)["Data"][0];
                let arrDocumentData = GetDocumentDisplayData(objContext, arrDocument, objSchool, arrTeacherData, arrPupilData);
                let arrNewsData = GetNewsDisplayData(objContext, arrPupilData, arrTeacherData, objSchool)
                objContext.dispatch({
                    type: "SET_STATE_VALUES", payload: {
                        "arrPupilData": arrPupilData,
                        arrOrientationTestPupil: arrOrientationTestPupil,
                        arrOrientationTestResult: arrOrientationTestResult,
                        arrHighStakeTestPupil: arrHighStakeTestPupil,
                        arrHighStakeTestResult: arrHighStakeTestResult,
                        arrLearningTestPupil: arrLearningTestPupil,
                        arrDocumentData: arrDocumentData,
                        arrNewsData: arrNewsData
                    }
                });
            }
        }
    }, [
            objContext.props.pupil, objContext.props.testloginandresult, objContext.props.intranettest,
            objContext.props.extranettest, objContext.props.documentfolder, objContext.props.document,
            objContext.props.news, objContext.props.newsgroup, objContext.props.userpreferenceprofileimage
        ])
}

export function useDocumentFolderLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let strTeacherId = objContext.props.ClientUserDetails.UserId;
        let arrFolders = DataRef(objContext.props.documentfolder, "documentfolder;uclassid;" + strClassId + ";t_learncoacher_document_folder_user.uuserid;" + strTeacherId + ";cisdeleted;n")["Data"]
        if (arrFolders) {
            let objSchoolSharedFolderId = {
                "match": {
                    "uDocumentFolderId": "00000000-0000-0000-0000-000000000001"
                }
            };
            let arrShouldFolderIds = [objSchoolSharedFolderId];
            for (let objFolder of arrFolders) {
                let objFilter = {
                    "match": {
                        "uDocumentFolderId": objFolder["uDocumentFolderId"]
                    }
                };
                arrShouldFolderIds = [...arrShouldFolderIds, objFilter];
            }
            let objDocumentParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        },
                        {
                            "bool": {
                                "should": arrShouldFolderIds
                            }
                        }
                    ]
                }
            }
            let arrRequests = [
                {
                    "URL": "API/Object/School/Document",
                    "Params": objDocumentParams,
                    "MethodType": "Get"
                }]
            DataCall(arrRequests)
        }
    }, [objContext.props.documentfolder])
}

export function useNewsGroupLoaded(objContext) {
    useEffect(() => {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let strTeacherId = objContext.props.ClientUserDetails.UserId;
        let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
        let arrNewsGroup = DataRef(objContext.props.newsgroup, "newsgroup;uclassid;" + strClassId + ";t_learncoacher_news_group_user.uuserid;" + strTeacherId + ";t_learncoacher_news_group_user.cisdeleted;n;cisdeleted;n")["Data"];
        if (arrNewsGroup) {
            let arrShouldNewsGroupIds = [];
            for (let objNews of arrNewsGroup) {
                let objFilter = {
                    "match": {
                        "t_LearnCoacher_News_ToUser.uGroupId": objNews["uNewsGroupId"]
                    }
                };
                arrShouldNewsGroupIds = [...arrShouldNewsGroupIds, objFilter];
            }
            let objTeacherNewsParams = {
                "ForeignKeyFilter": {
                    "uClassId": strClassId
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        },
                        {
                            "nested": {
                                "path": "t_LearnCoacher_News_ToUser",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_LearnCoacher_News_ToUser.uUserId": strTeacherId
                                                }
                                            },
                                            {
                                                "match": {
                                                    "t_LearnCoacher_News_ToUser.cIsDeleted": "N"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                        {
                            "bool": {
                                "should": [
                                    {
                                        "nested": {
                                            "path": "t_LearnCoacher_News_ToUser",
                                            "query": {
                                                "bool": {
                                                    "must": [
                                                        {
                                                            "match": {
                                                                "t_LearnCoacher_News_ToUser.uGroupId": "00000000-0000-0000-0000-000000000000"
                                                            }
                                                        },
                                                        ...arrShouldNewsGroupIds
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }

            let objSchoolNewsParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "cIsDeleted": "N"
                            }
                        },
                        {
                            "match": {
                                "cIsSchool": "Y"
                            }
                        },
                        {
                            "match": {
                                "uUserId": uSchoolId
                            }
                        },
                        {
                            "nested": {
                                "path": "t_LearnCoacher_News_ToUser",
                                "query": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "t_LearnCoacher_News_ToUser.cIsTeacher": "Y"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            };

            let arrRequests = [
                {
                    "URL": "API/Object/School/News",
                    "Params": objTeacherNewsParams,
                    "MethodType": "Get"
                },
                {
                    "URL": "API/Object/School/News",
                    "Params": objSchoolNewsParams,
                    "MethodType": "Get"
                }
            ]
            DataCall(arrRequests)
        }
    }, [objContext.props.newsgroup])
}

/**
 * 
 * @param {*} objContext 
 * @summary   Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strOrientationCycleTypeId = "1"
    let strHighStakeCycleTypeId = "6";
    let strLearningCycleTypeId = "3";
    let iStateId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["iStateId"];
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let strTeacherId = objContext.props.ClientUserDetails.UserId;
    let iMainClientId = objContext.props.ClientUserDetails.MainClientId;
    useEffect(() => {
        if (DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/teacherstartpage") &&
            DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strOrientationCycleTypeId + ";uclassid;" + strClassId) &&
            DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strHighStakeCycleTypeId + ";uclassid;" + strClassId) &&
            DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strLearningCycleTypeId + ";uclassid;" + strClassId) &&
            DataRef(objContext.props.subject, "subject;imainclientid;" + iMainClientId + ";cisdeleted;n") &&
            DataRef(objContext.props.clientsettings, "clientsettings;iConfigurationFileId;1;vParentKey;ExtranetTeacher;vSubParentKey;TestLoginPaperless;vKey;InvalidateTokenTime") &&
            DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strOrientationCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n") &&
            DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strHighStakeCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n") &&
            DataRef(objContext.props.extranettest, "extranettest;icycletypeid;" + strLearningCycleTypeId + ";uclassid;" + strClassId + ";uteacherid;" + strTeacherId) &&
            DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) &&
            DataRef(objContext.props.documentfolder, "documentfolder;uclassid;" + strClassId + ";t_learncoacher_document_folder_user.uuserid;" + strTeacherId + ";cisdeleted;n") &&
            DataRef(objContext.props.document, "document;cisdeleted;n") &&
            DataRef(objContext.props.newsgroup, "newsgroup;uclassid;" + strClassId + ";t_learncoacher_news_group_user.uuserid;" + strTeacherId + ";t_learncoacher_news_group_user.cisdeleted;n;cisdeleted;n") &&
            DataRef(objContext.props.news, "news;uclassid;" + strClassId + ";cisdeleted;n;t_learncoacher_news_touser.uuserid;" + strTeacherId + ";t_learncoacher_news_touser.cisdeleted;n") &&
            DataRef(objContext.props.news, "news;cisdeleted;n;cisschool;y;uuserid;" + uSchoolId + ";t_learncoacher_news_touser.cisteacher;y") &&
            DataRef(objContext.props.userpreferenceprofileimage, "userpreferenceprofileimage;" + strClassId) &&
            DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + uSchoolId) &&
            DataRef(objContext.props.school, "school;uschoolid;" + uSchoolId)
        ) {
            let arrPupilData = GetPupilData(objContext);
            let arrOrientationTestLoginResult = DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strOrientationCycleTypeId + ";uclassid;" + strClassId)["Data"];
            let arrHighStakeTestLoginResult = DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strHighStakeCycleTypeId + ";uclassid;" + strClassId)["Data"];
            let arrSubject = DataRef(objContext.props.subject, "subject;imainclientid;" + iMainClientId + ";cisdeleted;n")["Data"];
            let arrOrientationTestData = DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strOrientationCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n")["Data"];
            let arrHighStakeTestData = DataRef(objContext.props.intranettest, "intranettest;istateid;" + iStateId + ";icycletypeid;" + strHighStakeCycleTypeId + ";uschoolid;" + uSchoolId + ";uteacherid;" + objContext.props.ClientUserDetails.UserId + ";uclassid;" + strClassId + ";cisdeleted;n")["Data"];
            let arrOrientationTestPupil = GetTestData(objContext, arrPupilData, arrOrientationTestLoginResult, arrOrientationTestData, arrSubject);
            let arrOrientationTestResult = GetTestResult(objContext, arrPupilData, arrOrientationTestLoginResult, arrOrientationTestData, arrSubject);
            let arrHighStakeTestPupil = GetTestData(objContext, arrPupilData, arrHighStakeTestLoginResult, arrHighStakeTestData, arrSubject);
            let arrHighStakeTestResult = GetTestResult(objContext, arrPupilData, arrHighStakeTestLoginResult, arrHighStakeTestData, arrSubject);
            let arrLearningTestData = DataRef(objContext.props.extranettest, "extranettest;icycletypeid;" + strLearningCycleTypeId + ";uclassid;" + strClassId + ";uteacherid;" + strTeacherId)["Data"];
            let arrLearningTestLoginResult = DataRef(objContext.props.testloginandresult, "testloginandresult;icycletypeid;" + strLearningCycleTypeId + ";uclassid;" + strClassId)["Data"];
            let arrLearningTestPupil = GetLearningTestData(objContext, arrPupilData, arrLearningTestLoginResult, arrLearningTestData, arrSubject)
            let arrDocument = DataRef(objContext.props.document, "document;cisdeleted;n")["Data"];
            let arrTeacherData = DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + uSchoolId)["Data"];
            let objSchool = DataRef(objContext.props.school, "school;uschoolid;" + uSchoolId)["Data"][0];
            let arrDocumentData = GetDocumentDisplayData(objContext, arrDocument, objSchool, arrTeacherData, arrPupilData);
            let arrNewsData = GetNewsDisplayData(objContext, arrPupilData, arrTeacherData, objSchool);
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
            }
            ApplicationState.SetProperty("blnShowAnimation", false);

            console.log("arrLearningTestPupil  arLearningTestResult", arrLearningTestData, arrLearningTestLoginResult);
            objContext.dispatch({
                type: "SET_STATE_VALUES", payload: {
                    "arrPupilData": arrPupilData,
                    arrOrientationTestPupil: arrOrientationTestPupil,
                    arrOrientationTestResult: arrOrientationTestResult,
                    arrHighStakeTestPupil: arrHighStakeTestPupil,
                    arrHighStakeTestResult: arrHighStakeTestResult,
                    arrLearningTestPupil: arrLearningTestPupil,
                    arrDocumentData: arrDocumentData,
                    arrNewsData: arrNewsData
                }
            });            
        }       
    }, [
            objContext.props.class, objContext.props.textresource, objContext.props.pupil,
            objContext.props.testloginandresult, objContext.props.intranettest, objContext.props.subject,
            objContext.props.clientsettings, objContext.props.extranettest, objContext.props.documentfolder,
            objContext.props.document, objContext.props.object_extranet_teacher, objContext.props.school,
            objContext.props.newsgroup, objContext.props.news
        ]);
};

export function GetPupilData(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let arrTempPupilData = DataRef(objContext.props.pupil, "pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId).Data;
    let arrPupilData = arrTempPupilData.filter(objTempData => objTempData["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
    return arrPupilData;
};

/**
 * 
 * @param {} objContext 
 * @summary  returns an array of classes to load in the drop down
 */
export function GetClassDropDownData(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.extranet/3_teacher/modules/teacherstartpage").Data[0]["TeacherStartPage"];
    let arrTempClass = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId).Data.map((objClass) => {
        return { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.cIsDeleted === "N") }
    });
    let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
    arrTempClass.forEach((objClass) => {
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
            "Title": objTextResource["ClassDropDownMainClassTitle"],
            "Data": arrMainClassData
        },
        {
            "Title": objTextResource["ClassDropDownCoTeacherTitle"],
            "Data": arrCoTeacherClassData
        },
        {
            "Title": objTextResource["ClassDropDownSubjectExpertTitle"],
            "Data": arrSubjectExpertClassData
        },
    ];
    return arrFinalClassData;
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the class dropdown selection changes
 */
export function HandleOnChangeClassDropDown(objContext, objItem) {
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "blnClassChangedInDropdown": !objContext.state.blnClassChangedInDropdown } });
};

/**
 * 
 * @param {*} objContext 
 * @param {*} objItem 
 * @summary   Triggers when the pupil dropdown selection changes
 */
//export function HandleOnChangePupilDropDown(objContext, objItem) {
//    Logger.Log("..........dropdown item1", objItem);
//};

function GetActiveTokens(objContext, arrTestLoginResult) {
    let objClientSettings = DataRef(objContext.props.clientsettings, "clientsettings;iConfigurationFileId;1;vParentKey;ExtranetTeacher;vSubParentKey;TestLoginPaperless;vKey;InvalidateTokenTime")["Data"][0];
    let intTimeToInvalidate = parseInt(objClientSettings["vValue"]);
    //  let iValidateMins = 90;
    let dtCurrent = new Date();
    let arrActiveTokens = arrTestLoginResult.filter(tstRslt => {
        if (tstRslt["dtValidTill"] != null && tstRslt["dtValidTill"] != "") {
            let validUpto = new Date(tstRslt["dtValidTill"]);
            if (validUpto > dtCurrent) {
                let diffMins = (validUpto - dtCurrent) / (1000 * 360)
                if (diffMins < intTimeToInvalidate) {
                    return {
                        ...tstRslt
                    }
                }
            }
        }
    })
    return arrActiveTokens;
}

export function GetTestData(objContext, arrPupilData, arrTestLoginResult, arrTestData, arrSubject) {
    let arrActiveTokens = GetActiveTokens(objContext, arrTestLoginResult);
    let arrDistinctTestId = [];
    let arrDistinctParentTestId = [];
    let arrFinalResult = [];
    for (let tstRslt of arrActiveTokens) {
        if (arrDistinctTestId.indexOf(tstRslt["uTestId"]) <= -1) {
            arrDistinctTestId = [...arrDistinctTestId, tstRslt["uTestId"]];
        }
    }
    for (let tstRslt of arrActiveTokens) {
        if (tstRslt["uParentTestId"] && tstRslt["uParentTestId"] != null) {
            arrDistinctParentTestId = [...arrDistinctParentTestId, tstRslt["uTestId"]];
        }
    }
    let arrAllDistinctTestId = [...arrDistinctTestId, arrDistinctParentTestId];
    for (let objTestResult of arrAllDistinctTestId) {
        let objDisplayData = {
            vSubjectName: null,
            iSubjectId: undefined,
            arrPupil: []
        };
        let objTest = arrTestData.find(tst => tst["uTestId"] == objTestResult);
        if (objTest) {
            let objSubject = arrSubject.find(sub => sub["iSubjectId"] == objTest["iSubjectId"]);
            if (objSubject && objSubject["iParentSubjectId"] != 0 && objSubject["iParentSubjectId"] != -1) {
                let objParentSubject = arrSubject.find(sub => sub["iSubjectId"] == objSubject["iParentSubjectId"]);
                objDisplayData.vSubjectName = objParentSubject["t_TestDrive_Subject_Data"][0].vSubjectName;
                objDisplayData.vSubSubjectName = objSubject["t_TestDrive_Subject_Data"][0].vSubjectName;
                objDisplayData.iSubjectId = objParentSubject.iSubjectId;
            } else {
                objDisplayData.vSubjectName = objSubject["t_TestDrive_Subject_Data"][0].vSubjectName;
                objDisplayData.iSubjectId = objSubject.iSubjectId;
            }

            let arrActiveTokenByTest = arrActiveTokens.filter(tkn => tkn["uTestId"] == objTest["uTestId"])

            for (let objToken of arrActiveTokenByTest) {
                let objPupil = arrPupilData.find(ppl => ppl["uPupilId"] == objToken["uPupilId"])
                let objTempPupil = {
                    uPupilId: objPupil["uPupilId"],
                    vName: objPupil["vName"],
                    vFirstName: objPupil["vFirstName"]
                }
                objDisplayData.arrPupil = [...objDisplayData.arrPupil, objTempPupil];
            }
            arrFinalResult = [...arrFinalResult, objDisplayData];
        }
    }
    return arrFinalResult;
}

export function GetTestResult(objContext, arrPupilData, arrTestLoginResult, arrTestData, arrSubject) {
    let arrFiltredTestLoginsAndResults = arrTestLoginResult.filter(tstRslt => (tstRslt["TestExecution"][0] && tstRslt["TestExecution"][0].iTestStatusId == 5 &&
        arrTestData.find(tst => tst["uTestId"] == tstRslt["uTestId"]))).sort((a, b) => { return b.TestExecution[0].dtTestEnd - a.TestExecution[0].dtTestEnd });
    let arrFinalData = [];
    for (let i = 0; i < (arrFiltredTestLoginsAndResults.length > 10 ? 10 : arrFiltredTestLoginsAndResults.length); i++) {
        let tstRslt = arrFiltredTestLoginsAndResults[i];
        let objTest = arrTestData.find(tst => tst["uTestId"] == tstRslt["uTestId"]);
        let objPupil = arrPupilData.find(ppl => ppl["uPupilId"] == tstRslt["uPupilId"]);
        let objSubject = arrSubject.find(sub => sub["iSubjectId"] == objTest["iSubjectId"]);
        let objDisplayData = {
            uPupilId: objPupil["uPupilId"],
            vName: objPupil["vName"],
            vFirstName: objPupil["vFirstName"],
            iSubjectId: objSubject["iSubjectId"],
            vSubjectName: objSubject["t_TestDrive_Subject_Data"][0].vSubjectName,
            vResult: JSON.stringify(tstRslt["TestResultSummary"][0].vResultAttribute).vResult
        };
        arrFinalData = [...arrFinalData, objDisplayData];

    }
    return arrFinalData;
}

export function GetLearningTestData(objContext, arrPupilData, arrTestLoginResult, arrTestData, arrSubject) {
    let arrFilteredTestLoginResult = arrTestLoginResult.filter(tstRslt => (tstRslt["TestExecution"][0] && tstRslt["TestExecution"][0].iTestStatusId != 5)).sort((a, b) => { return new Date(b.tstRslt["TestExecution"][0].dtTestStart) - new Date(a.tstRslt["TestExecution"][0].dtTestStart) })
    let arrFinalResult = [];
    let arrDay = "mon";// objContext.props.JConfiguration.Locale.DATETIME_FORMATS.DAY;
    var dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    for (let tstRslt of arrFilteredTestLoginResult) {
        let objTest = arrTestData.find(tst => tst["uTestId"] == tstRslt["uTestId"]);
        if (objTest) {
            let dtTestStart = new Date(tstRslt["TestExecution"][0]["dtTestStart"]).toLocaleDateString('de-DE', dateOptions);
            let iDay = new Date(tstRslt["TestExecution"][0]["dtTestStart"]).getDay();
            let strTestType = objTest["iTestTypeId"] == 2 ? "Low Stake" : objTest["cIsSystemGenerated"] == "N" ? "Learning Test Teacher" : "Learning Test System";
            let objPupil = arrPupilData.find(ppl => ppl["uPupilId"] == tstRslt["uPupilId"]);
            let objDisplayData = {
                vTestname: objTest["vTestName"],
                vDay: arrDay[iDay - 1],
                dtTestStartDate: dtTestStart,
                strTestType: strTestType,
                vName: objPupil["vName"],
                vFirstName: objPupil["vFirstName"],
            }
            arrFinalResult = [...arrFinalResult, objDisplayData];
        }
    }
    return arrFinalResult;
}

export function GetDocumentDisplayData(objContext, arrDocument, objSchool, arrTeacherData, arrPupilData) {
    let arrFinalResult = [];
    let arrTeacherDocument = arrDocument.filter(doc => doc["uDocumentFolderId"] != "00000000-0000-0000-0000-000000000001");
    let arrShoolDocument = arrDocument.filter(doc => doc["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000001" && doc["uUserId"] == objSchool["uSchoolId"]);
    let arrAllDocument = [...arrTeacherDocument, ...arrShoolDocument];
    var dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    for (let i = 0; i < (arrAllDocument.length > 5 ? 5 : arrAllDocument.length); i++) {
        let objDocument = arrAllDocument[i];
        let strUserName = '';
        if (objSchool["uSchoolId"] == objDocument["uUserId"])
            strUserName = objSchool["vName"] + objSchool["vFirstName"];
        let objTeacher = arrTeacherData.find(tchr => tchr["uTeacherId"] == objDocument["uUserId"]);
        if (objTeacher)
            strUserName = objTeacher["vName"] + objTeacher["vFirstName"];
        let objPupil = arrPupilData.find(ppl => ppl["uPupilId"] == objDocument["uUserId"]);
        if (objPupil)
            strUserName = objPupil["vName"] + objPupil["vFirstName"];
        let objDisplayData = {
            vFileName: objDocument["vFileName"],
            dtTimeCreation: new Date(objDocument["dtCreatedOn"]).toLocaleDateString('de-DE', dateOptions),
            vFileUrl: objContext.props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile/GetData?FileName=" + objDocument.uDocumentId + "." + objDocument["vFileName"].split('.')[objDocument["vFileName"].split('.').length - 1] + "&Type=Downloads&DisplayFileName=" + objDocument.vFileName,
            vUserName: strUserName
        }
        arrFinalResult = [...arrFinalResult, objDisplayData];
    }
    return arrFinalResult;
}

export function GetNewsDisplayData(objContext, arrPupilData, arrTeacherData, objSchool) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
    let strTeacherId = objContext.props.ClientUserDetails.UserId;
    let arrNewsGroup = DataRef(objContext.props.newsgroup, "newsgroup;uclassid;" + strClassId + ";t_learncoacher_news_group_user.uuserid;" + strTeacherId + ";t_learncoacher_news_group_user.cisdeleted;n;cisdeleted;n")["Data"]
    let arrTeacherNews = DataRef(objContext.props.news, "news;uclassid;" + strClassId + ";cisdeleted;n;t_learncoacher_news_touser.uuserid;" + strTeacherId + ";t_learncoacher_news_touser.cisdeleted;n")["Data"];
    let arrSchoolNews = DataRef(objContext.props.news, "news;cisdeleted;n;cisschool;y;uuserid;" + uSchoolId + ";t_learncoacher_news_touser.cisteacher;y")["Data"];
    let arrPupilProfileImages = DataRef(objContext.props.userpreferenceprofileimage, "userpreferenceprofileimage;" + strClassId)["Data"];
    let arrAllNews = [...arrSchoolNews, ...arrTeacherNews];
    let arrDisplayData = [];
     var dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    for (let i = 0; i < (arrAllNews.length > 5 ? 5 : arrAllNews.length); i++) {
        let objNews = arrAllNews[i];
        let objDisplayData = {
            dtCreatedOn: new Date(objNews["dtCreatedOn"]).toLocaleDateString('de-DE', dateOptions),
            isGroup: false,
            vProfilePicPath: '',
            vNews: objNews["vText"],
            arrAttachments: objNews["t_LearnCoacher_News_Attachment"],
            vName: '',
            vFirstName: ''
        };
        if (objNews["t_LearnCoacher_News_ToUser"][0]["cIsForGroup"] == "Y") {
            objDisplayData.isGroup = true;
            let objGrp = arrNewsGroup.find(grp => grp["uNewsGroupId"] == objNews["t_LearnCoacher_News_ToUser"][0]["uGroupId"]);
            if (objGrp) {
                objDisplayData.vName = objGrp["vGroupName"];
                objDisplayData.vProfilePicPath = objContext.props.JConfiguration.WebDataPath + "/Images/Common/Icons/icon_shared_group_brown.svg";
            }
        }

        let objPupil = arrPupilData.find(ppl => ppl["uPupilId"] == objNews["uUserId"])

        if (objPupil) {
            objDisplayData.vName = objPupil["vName"];
            objDisplayData.vFirstName = objPupil["vFirstName"];
            let objPupilProfile = arrPupilProfileImages.find(proPic => proPic["uPupilId"] == objPupil["uPupilId"]);
            if (objPupilProfile)
                objDisplayData.vProfilePicPath = objContext.props.JConfiguration.WebDataPath + objPupilProfile["vImagePath"];
        }

        if (objNews["cIsTeacher"] == "Y") {
            let objTeacher = arrTeacherData.find(tchr => tchr["uTeacherId"] == objNews["uUserId"]);
            if (objTeacher) {
                objDisplayData.vName = objTeacher["vName"];
                objDisplayData.vFirstName = objTeacher["vFirstName"];
                objDisplayData.vProfilePicPath = objContext.props.JConfiguration.WebDataPath + "/Images/Common/Icons/ClassTeacher.svg";
            }

        }

        if (objNews["cIsSchool"] == "Y") {
            objDisplayData.vName = objSchool["vName"];
            objDisplayData.vFirstName = objSchool["vFirstName"];
            objDisplayData.vProfilePicPath = objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/School.svg";

        }

        arrDisplayData = [...arrDisplayData, objDisplayData];
    }
    return arrDisplayData;
}

export function Navigate(objContext, strType) {
    let strOrientationCycleId = QueryString.GetQueryStringValue("OrientationCycleId");
    let strHighStakeCycleId = QueryString.GetQueryStringValue("HighStakeCycleId");
    let strLearningCycleId = QueryString.GetQueryStringValue("LearningCycleId");
    switch (strType) {
        case 'OrientationTest': {
            RouterHelper.RouteTo("Orientierungstest/TestLogins?CycleId=" + strOrientationCycleId + "&IsOrientierungstest=Y&CycleIdToValidateTokens=f8a40091-18e0-45e4-b13f-659e5bd344db", objContext.props.history);
            break;
        }
        case 'OrientationResult': {
            RouterHelper.RouteTo("Orientierungstest/TestResults?CycleId=" + strOrientationCycleId + "&IsOrientierungstest=Y&CycleIdToValidateTokens=f8a40091-18e0-45e4-b13f-659e5bd344db", objContext.props.history);
            break;
        }
        case 'HighStakeTest': {
            RouterHelper.RouteTo("HighStakeRight/HighStakeTestLogins?CycleId=" + strHighStakeCycleId + "&IsOrientierungstest=N&CycleIdToValidateTokens=8c880d36-6e8f-4ebb-a725-3c2f0f689dbf", objContext.props.history);
            break;
        }
        case 'HighStakeResult': {
            RouterHelper.RouteTo("HighStakeRight/TestResultsHighStake?CycleId=" + strHighStakeCycleId + "&IsOrientierungstest=N&CycleIdToValidateTokens=8c880d36-6e8f-4ebb-a725-3c2f0f689dbf", objContext.props.history);
            break;
        }
        case 'LearningTest': {
            RouterHelper.RouteTo("TeacherLearningTest/TeacherLearningTestSystem?CycleId=" + strLearningCycleId, objContext.props.history);
            break;
        }
        case 'Document': {
            RouterHelper.RouteTo("TeacherDocument", objContext.props.history);
            break;
        }
        case 'News': {
            RouterHelper.RouteTo("TeacherNews", objContext.props.history);
            break;
        }
    }
}

/**
 * @summary   returns the component initial state
 */
export function GetInitialState() {
    return {
        isLoadComplete: false,
        strSelectedClassId: "",
        isPreSelectValueSet: false,
        arrPupilData: [],
        blnClassChangedInDropdown: false,
        arrOrientationTestPupil: [],
        arrOrientationTestResult: [],
        arrHighStakeTestPupil: [],
        arrHighStakeTestResult: [],
        arrLearningTestPupil: [],
        arrDocumentData: [],
        arrNewsData: []
    };
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @summary   Sets the component state
 */
export function Reducer(state, action) {
    switch (action.type) {
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
        case 'DATA_LOAD_COMPLETE':
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
    }
};
