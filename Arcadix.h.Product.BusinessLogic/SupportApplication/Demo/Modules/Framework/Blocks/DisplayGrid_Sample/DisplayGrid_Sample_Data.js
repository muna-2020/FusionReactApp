/**
* @name GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {

    function GetRowBigData() {
        var arrRows = [];
        for (var i = 0; i < 500; i++) {
            let objRow = {
                "iSubjectId": 2417,
                "dConstance": null,
                "dVariance": null,
                "iParentSubjectId": 2416,
                "iDisplayOrder": 1,
                "iMainClientId": 97,
                "vKeyForImage": null,
                "vEmail": "arun@arcadix.com",
                "cIsDeleted": "N",
                "cEnforceDisplayNameForTest": "N",
                "iConfidenceIntervalLowerUpperBound": null,
                "cIsSubSubjectToSelectFromMany": "N",
                "cIsLearnCoacherSubject": null,
                "uUserId": null,
                "dtModifiedOn": null,
                "dtCreatedOn": null,
                "cIsTestedAtThisTime": "Y",
                "cIsActive": "Y",
                "cIsSchoolSubject": null,
                "uSchoolId": null,
                "cIsHighStakeSubject": null,
                "cIsReadyForManualLearningTest": null,
                "cIsReadyForSystemLearningTest": null,
                "vFile": "down.png",
                "t_TestDrive_Subject_Data": [
                    {
                        "iLanguageId": 1,
                        "vSubjectName": "test0",
                        "vSubjectDisplayName": null,
                        "vSubjectShortName": null,
                        "tSubjectDescription": null,
                        "iDataMainClientId": null
                    },

                    {
                        "iLanguageId": 2,
                        "vSubjectName": "test1",
                        "vSubjectDisplayName": null,
                        "vSubjectShortName": null,
                        "tSubjectDescription": null,
                        "iDataMainClientId": null
                    },



                ],
                "t_TestDrive_Member_Class_Teacher": [{
                    cIsCoTeacher: "N",
                    cIsDeleted: "Y",
                    cIsSubjectExpert: "N",
                    dtCreatedOn: "2018-04-06T14:51:00",
                    dtModifiedOn: "2018-04-06T14:51:00",
                    iStateId: 459,
                    uSchoolId: "5CEAFB1D-A0A4-4EC1-8148-22F6412D65A0",
                    uTeacherId: "91D5B445-5AE2-43FE-9D8D-24C9CA67CC30"
                }],
            };
            arrRows = [...arrRows, objRow];
        }
        return arrRows;
    }
    let arrBigRowData = GetRowBigData();

    //The data has all the fields corresponding to the Header (meta data) keys. It is a mandatory props
    let RowData = [
        {
            "TextBoxColumn": "TextBox_Value",
            "LabelColumn": "LabelColumn_Value",
            "DateColumn": "19.11.1994",
            "DateTimeColumn": "19.11.1994",
            "ImageColumn": "image.img",
            "ImageColumn_CheckBox": "Y",
            "DropDownValueColumnName": 1,
            "DropDownTableName": [
                {
                    "DropDownValueColumnName": 1,
                }
            ]            
        }
    ]

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
    ] 

    //Will hold the information of the different language that the client uses. It is a mandatory props.
    var DropDownData =
    {
        iTitleId: {
            "DisplayColumn": "disp",//to be displayed
            "ValueColumn": "value",//like a key
            "Data": [{ "value": "1", "disp": "11" }, { "value": "2", "disp": "22" }]


        },

        "DropDownTableName.DropDownValueColumnName":
        {
            "cISLanguageDependent": "N",
            "ValueColumn": "DropDownValueColumnName",
            "DisplayColumn": "DropDownDisplayColumnName",
            "DependingTableName": "DropDownDependingTableName",
            "Data": [
                {
                    "DropDownValueColumnName": 1,
                    "DropDownDisplayColumnName": "value_DD_1",
                    "DropDownDependingTableName": [
                        {
                            "DropDownDisplayColumnName": "value_DD_1",
                        }
                    ]
                },
                {
                    "DropDownValueColumnName": 2,
                    "DropDownDisplayColumnName": "value_DD_1",
                    "DropDownDependingTableName": [
                        {
                            "DropDownDisplayColumnName": "value_DD_2",
                        }
                    ]
                }]

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
    }

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
        LanguageData,
        DropDownData,
        MultiLanguageData        
    };
};