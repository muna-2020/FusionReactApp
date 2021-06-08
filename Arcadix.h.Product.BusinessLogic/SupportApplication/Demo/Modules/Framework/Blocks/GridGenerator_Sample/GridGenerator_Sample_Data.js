/**
* @name GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = (objContext) => {

    //The data has all the fields corresponding to the Header (meta data) keys. It is a mandatory props
    let RowData = [
        {
            "uTeacherId": "E92A7F5F-5C82-43E7-8743-001C5855F6CD",
            "iTitleId": 0,
            "vFirstName": "Benny",
            "vName": "Götsch",
            "vPhoneSchool": "0716348574",
            "vPhonePrivate": "1111",
            "vEmail": "benny.goetsch@schulebuerglen.ch",
            "cIsDeleted": "N",
            "iMainClientId": 97,
            "vShortCut": "begö",
            "cIsSubjectExpertTeacherMarkedBySchool": "Y",
            "t_TestDrive_Member_Teacher_School": [
                {
                    "cIsDeleted": "Y"
                }
            ]
        },
        {
            "uTeacherId": "44D930BD-A6C5-40B7-8D8D-002F34B6E914",
            "iTitleId": 0,
            "vFirstName": "Jürg",
            "vName": "Raschle",
            "vPhoneSchool": "794604629",
            "vPhonePrivate": "794604629",
            "vEmail": "Juerg.Raschle@sg.ch",
            "cIsDeleted": "N",
            "iMainClientId": 97,
            "cIsSubjectExpertTeacherMarkedBySchool": null,
            "t_TestDrive_Member_Teacher_School": [
                {
                    "cIsDeleted": "N",
                }
            ]
        },
        {
            "uTeacherId": "E214F341-6930-4FDF-8032-00432046E6C1",
            "iTitleId": 1,
            "vFirstName": "sg2333",
            "vName": "Lehrperson",
            "vPhoneSchool": null,
            "vPhonePrivate": "111",
            "vEmail": "sg2.lp@lernlupesg.ch",
            "cIsDeleted": "N",
            "iMainClientId": 97,
            "cIsSubjectExpertTeacherMarkedBySchool": null,
            "t_TestDrive_Member_Teacher_School": [
                {
                    "cIsDeleted": "N",
                }
            ]
        },
        {
            "uTeacherId": "622C26E9-A19C-40A6-9D61-004612E67961",
            "iTitleId": 1,
            "vFirstName": "Macro1234",
            "vName": "Eugster",
            "vPhoneSchool": "043 466 02 83",
            "vPhonePrivate": "123",
            "vEmail": "marco.eugster@ps-mettmenstetten.ch",
            "cIsDeleted": "N",
            "iMainClientId": 97,
            "cIsSubjectExpertTeacherMarkedBySchool": null,
            "t_TestDrive_Member_Teacher_School": [
                {
                    "cIsDeleted": "N",
                }
            ]
        }
    ];

    //Is an object that has the fields corresponding to the metadata fields with vControlType as dropdown. It is not a mandatory props.
    let LanguageData = [
        {
            "iFrameworkLanguageId": 1,
            "vLanguageCultureInfo": "en",
            "vLanguageIdentifier": "English",
            "iDisplayOrder": 2,
            "cIsActive": "Y",
            "vDefaultLanguageCountryInfo": "us",
            "vDefaultCurrency": "EUR",
            "dtModifiedOn": "2018-07-24T12:17:39.563",
            "cIsDeleted": "N",
            "t_Framework_Language_Data": [
                {
                    "iFrameworkLanguageId": 1,
                    "iLanguageId": 1,
                    "vLanguageName": "English",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 1,
                    "iLanguageId": 3,
                    "vLanguageName": "Englisch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 1,
                    "iLanguageId": 2,
                    "vLanguageName": "English",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 1,
                    "iLanguageId": 4,
                    "vLanguageName": "English",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 1,
                    "iLanguageId": 6,
                    "vLanguageName": "English",
                    "cIsTranslatedBySystem": null
                }
            ]
        },
        {
            "iFrameworkLanguageId": 2,
            "vLanguageCultureInfo": "fr",
            "vLanguageIdentifier": "French",
            "iDisplayOrder": 3,
            "cIsActive": "Y",
            "vDefaultLanguageCountryInfo": "ch",
            "vDefaultCurrency": "EUR",
            "dtModifiedOn": "2018-07-24T12:17:39.563",
            "cIsDeleted": "N",
            "t_Framework_Language_Data": [
                {
                    "iFrameworkLanguageId": 2,
                    "iLanguageId": 1,
                    "vLanguageName": "Français",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 2,
                    "iLanguageId": 3,
                    "vLanguageName": "Französisch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 2,
                    "iLanguageId": 2,
                    "vLanguageName": "Française",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 2,
                    "iLanguageId": 4,
                    "vLanguageName": "Français",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 2,
                    "iLanguageId": 6,
                    "vLanguageName": "French",
                    "cIsTranslatedBySystem": null
                }
            ]
        },
        {
            "iFrameworkLanguageId": 3,
            "vLanguageCultureInfo": "de",
            "vLanguageIdentifier": "German",
            "iDisplayOrder": 1,
            "cIsActive": "Y",
            "vDefaultLanguageCountryInfo": "ch",
            "vDefaultCurrency": "EUR",
            "dtModifiedOn": "2018-07-24T12:17:39.563",
            "cIsDeleted": "N",
            "t_Framework_Language_Data": [
                {
                    "iFrameworkLanguageId": 3,
                    "iLanguageId": 1,
                    "vLanguageName": "Deutsch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 3,
                    "iLanguageId": 3,
                    "vLanguageName": "Deutsch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 3,
                    "iLanguageId": 2,
                    "vLanguageName": "Allemande",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 3,
                    "iLanguageId": 4,
                    "vLanguageName": "Deutsch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 3,
                    "iLanguageId": 6,
                    "vLanguageName": "Deutsch",
                    "cIsTranslatedBySystem": null
                }
            ]
        },
        {
            "iFrameworkLanguageId": 4,
            "vLanguageCultureInfo": "it",
            "vLanguageIdentifier": "Italian",
            "iDisplayOrder": 4,
            "cIsActive": "Y",
            "vDefaultLanguageCountryInfo": "ch",
            "vDefaultCurrency": "EUR",
            "dtModifiedOn": "2018-07-24T12:17:39.563",
            "cIsDeleted": "N",
            "t_Framework_Language_Data": [
                {
                    "iFrameworkLanguageId": 4,
                    "iLanguageId": 1,
                    "vLanguageName": "Italien",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 4,
                    "iLanguageId": 3,
                    "vLanguageName": "Italienisch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 4,
                    "iLanguageId": 2,
                    "vLanguageName": "italienne",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 4,
                    "iLanguageId": 4,
                    "vLanguageName": "Italien",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 4,
                    "iLanguageId": 6,
                    "vLanguageName": "Italian",
                    "cIsTranslatedBySystem": null
                }
            ]
        }
    ];

    //Will hold the information of the different language that the client uses. It is a mandatory props.
    var DropDownData =
    {
        iSchoolTypeId: {
            "cISLanguageDependent": "Y",
            "ValueColumn": "iSchoolTypeId",
            "DisplayColumn": "vSchoolTypeName",
            //"DependingTableName": "t_TestDrive_Member_School_SchoolType_Data.vSchoolTypeName",
            "DependingTableName": "t_TestDrive_Member_School_SchoolType_Data",
            "Data": [
                {
                    "iSchoolTypeId": 5,
                    "iMainClientId": 97,
                    "dtModifiedOn": "2018-07-24T12:17:53.277",

                    "t_TestDrive_Member_School_SchoolType_Data": [
                        {
                            "iLanguageId": 1,
                            "vSchoolTypeName": "Public"
                        },
                        {
                            "iLanguageId": 3,
                            "vSchoolTypeName": "�ffentlich"
                        }
                    ]
                },
                {
                    "iSchoolTypeId": 6,
                    "iMainClientId": 97,
                    "dtModifiedOn": "2018-07-24T12:17:53.277",
                    "t_TestDrive_Member_School_SchoolType_Data": [
                        {
                            "iLanguageId": 1,
                            "vSchoolTypeName": "Private"
                        },
                        {
                            "iLanguageId": 3,
                            "vSchoolTypeName": "ffentlich"
                        }
                    ]
                }
            ]
        },
        iTitleId: {
            "DisplayColumn": "disp",//to be displayed
            "ValueColumn": "value",//like a key
            "Data": [{ "value": "1", "disp": "11" }, { "value": "2", "disp": "22" }]


        },
        "t_TestDrive_Member_Class_Teacher.uTeacherId":
        {
            "cISLanguageDependent": "N",
            "ValueColumn": "uTeacherId",
            "DisplayColumn": "vFirstName",
            "Data": [
                {
                    "uTeacherId": "91D5B445-5AE2-43FE-9D8D-24C9CA67CC30",
                    "uSchoolId": "5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B",
                    "iTitleId": 1,
                    "vFirstName": "OIUI",
                    "vName": "IUOUI",
                    "vPhoneSchool": "456",
                    "vPhonePrivate": "4564",
                    "vEmail": "LKL",
                    "vPassword": "",
                    "dtCreatedOn": "2018-12-26T17:00:00",
                    "dtModifiedOn": "2018-12-26T17:02:00",
                    "vIPLastModifiedFrom": "",
                    "dtWhenLoginEmailSent": "1900-01-01T00:00:00",
                    "cIsDeleted": "N",
                    "iMainClientId": 97,
                    "vStreet": "",
                    "vTown": "",
                    "iZip": 0,
                    "vFunction": "",
                    "uLastVisitedClassId": "00000000-0000-0000-0000-000000000000",
                    "iProfilePictureFileSize": 0,
                    "iProfilePictureFileVersion": 0,
                    "vProfilePictureFileType": "",
                    "cIsTeacherCreatedByTeacher": " ",
                    "uUserId": "5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B",
                    "uTeacherCreatedById": "00000000-0000-0000-0000-000000000000",
                    "iLanguageId": 0,
                    "vAdministrationIP": "",
                    "vTestIP": "",
                    "vPasswordHash": "",
                    "vShortCut": "IO",
                    "cIsExternal": null,
                    "cIsTestTeacher": "N",
                    "t_TestDrive_Member_Teacher_School": [
                        {
                            "uTeacherSchoolId": "3A1120AC-F9B2-4C97-8445-CE038C5DDF10",
                            "uTeacherId": "8A5BF85A-4CF7-48A2-8BAD-4A05E7949BEC",
                            "uSchoolId": "5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B",
                            "cIsDeleted": "N",
                            "cIsAdmin": "N",
                            "iStateId": 437
                        }
                    ]
                },
                {
                    "uTeacherId": "9F0D6FA4-C3BF-49A5-A4DD-8F4F99B46E6D",
                    "uSchoolId": "5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B",
                    "iTitleId": 1,
                    "vFirstName": "sdgh",
                    "vName": "bnv",
                    "vPhoneSchool": "22222",
                    "vPhonePrivate": "77777",
                    "vEmail": "g@gmail.com",
                    "vPassword": "",
                    "dtCreatedOn": "2018-12-27T14:54:00",
                    "dtModifiedOn": "2018-12-27T14:54:00",
                    "vIPLastModifiedFrom": "",
                    "dtWhenLoginEmailSent": "1900-01-01T00:00:00",
                    "cIsDeleted": "N",
                    "iMainClientId": 97,
                    "vStreet": "",
                    "vTown": "",
                    "iZip": 0,
                    "vFunction": "",
                    "uLastVisitedClassId": "00000000-0000-0000-0000-000000000000",
                    "iProfilePictureFileSize": 0,
                    "iProfilePictureFileVersion": 0,
                    "vProfilePictureFileType": "",
                    "cIsTeacherCreatedByTeacher": " ",
                    "uUserId": "5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B",
                    "uTeacherCreatedById": "00000000-0000-0000-0000-000000000000",
                    "iLanguageId": 0,
                    "vAdministrationIP": "",
                    "vTestIP": "",
                    "vPasswordHash": "",
                    "vShortCut": "g",
                    "cIsExternal": null,
                    "cIsTestTeacher": " ",
                    "t_TestDrive_Member_Teacher_School": [
                        {
                            "uTeacherSchoolId": "F9B2A4A5-94CA-4755-83DA-BC3B71EA502F",
                            "uTeacherId": "9F0D6FA4-C3BF-49A5-A4DD-8F4F99B46E6D",
                            "uSchoolId": "5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B",
                            "cIsDeleted": "N",
                            "cIsAdmin": "N",
                            "iStateId": 437
                        }
                    ]
                },]

        },

        "t_TestDrive_Member_Class_Pupil.uClassGroupId": {
            "cISLanguageDependent": "Y",
            "DependingTableName": "t_TestDrive_Member_Class_Group_Data",
            "ValueColumn": "uClassGroupId",
            "DisplayColumn": "vGroupName",
            "Data": [
                {
                    "uClassGroupId": "3F91A4B9-6E37-4C72-8FD6-B95A67D60BED",
                    "iMainClientId": 97,
                    "uClassId": "00000000-0000-0000-0000-000000000000",
                    "cIsDeleted": "N",
                    "dtCreatedOn": "2017-08-14T13:44:07.157",
                    "dtModifiedOn": "2017-08-14T13:44:07.157",
                    "uUserId": null,
                    "iDisplayOrder": 1,
                    "t_TestDrive_Member_Class_Group_Data": [
                        {
                            "iLanguageId": 3,
                            "vGroupName": "A",
                            "iDisplayOrder": 1
                        }
                    ]
                },
                {
                    "uClassGroupId": "FA346BE3-5D54-4309-9F34-E538909FB3FF",
                    "iMainClientId": 97,
                    "uClassId": "00000000-0000-0000-0000-000000000000",
                    "cIsDeleted": "N",
                    "dtCreatedOn": "2017-08-14T13:44:07.157",
                    "dtModifiedOn": "2017-08-14T13:44:07.157",
                    "uUserId": null,
                    "iDisplayOrder": 2,
                    "t_TestDrive_Member_Class_Group_Data": [
                        {
                            "iLanguageId": 3,
                            "vGroupName": "B",
                            "iDisplayOrder": 2
                        }
                    ]
                }
            ]
        }
    };

    //Will hold the information of the different language that the client uses. It is a mandatory props.
    let MultiLanguageData = [
        {
            "iFrameworkLanguageId": 1,
            "iLanguageId": 1,
            "vLanguageName": "Deutsch",
            "cIsTranslatedBySystem": null
        },
        {
            "iFrameworkLanguageId": 2,
            "iLanguageId": 3,
            "vLanguageName": "Deutsch",
            "cIsTranslatedBySystem": null
        },
        {
            "iFrameworkLanguageId": 3,
            "iLanguageId": 2,
            "vLanguageName": "Allemande",
            "cIsTranslatedBySystem": null
        },
        {
            "iFrameworkLanguageId": 4,
            "iLanguageId": 4,
            "vLanguageName": "Deutsch",
            "cIsTranslatedBySystem": null
        },
        {
            "iFrameworkLanguageId": 5,
            "iLanguageId": 6,
            "vLanguageName": "Deutsch",
            "cIsTranslatedBySystem": null
        }
    ]

    return {
        RowData,
       // LanguageData,
        DropDownData,
       // MultiLanguageData        
    };
};