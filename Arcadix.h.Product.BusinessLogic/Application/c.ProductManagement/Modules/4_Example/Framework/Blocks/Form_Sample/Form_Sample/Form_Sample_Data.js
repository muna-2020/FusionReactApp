/**
* @name GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {

    let FormData = {
        "uSchoolId": "5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B",
        "vSchoolName": "RS-School",
        "iStateId": 437,
        "iTitleId": 0,
        "vFirstName": "RashmiS",
        "vName": "Bhattad",
        "vStreet": "434",
        "iZIPCode": 434111,
        "vTown": "454333",
        "vPhone": "4324",
        "vEmail": "demo.school@arcadix.co.in",
        "vPassword": "111",
        "dtCreatedOn": "2017-09-22T08:01:00",
        "dtModifiedOn": "2019-01-02T16:09:13.237",
        "vIPLastModifiedFrom": null,
        "dtWhenLoginlEmailSent": "2018-04-16T12:33:00",
        "cIsDeleted": "N",
        "iMainClientId": 97,
        "iLanguageId": null,
        "cIsTestSchool": "Y",
        "iSchoolTypeId": 5,
        "cHasLearnCoacher": null,
        "iProfilePictureFileSize": null,
        "iProfilePictureFileVersion": null,
        "vProfilePictureFileType": null,
        "vPhonePrivate": null,
        "uUserId": "AB9B70E9-A89D-4B87-991D-018178934614",
        "vAdministrationIP": null,
        "vTestIP": null,
        "vPasswordHash": "AP3zRtSGOsVy+rkKRkdfiIa0NQ2Gtg4WU0mvEWreq6dZrDH1C+cm7V37aPAdNMA3LA==",
        "uLastVisitedTeacherId": null,
        "cIsExternal": null,
        "cIsExternalMember": null
    };

    let DropDownData = {
        "iSchoolTypeId": {
            "ValueColumn": "iSchoolTypeId",
            "DisplayColumn": "vSchoolTypeName",
            "cISLanguageDependent": "Y",
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
                            "vSchoolTypeName": "öffentlich"
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
                            "vSchoolTypeName": "privat"
                        }
                    ]
                }
            ]
        },
        "iTitleId": {
            "ValueColumn": "iTitleId",
            "DisplayColumn": "vTitleName",
            "cISLanguageDependent": "Y",
            "ShowDefaultOption": true, 
            "DefaultOptionValue": -1,
            "DependingTableName": "t_TestDrive_Member_Title_Data",
            "Data": [
                {
                    "iTitleId": 0,
                    "iDisplayOrder": 1,
                    "dtModifiedOn": "2018-07-24T12:17:53.89",
                    "t_TestDrive_Member_Title_Data": [
                        {
                            "iTitleId": 0,
                            "vTitleName": "Herr",
                            "iLanguageId": 3,
                            "cIsTranslatedBySystem": null
                        },
                        {
                            "iTitleId": 0,
                            "vTitleName": "Monsieur",
                            "iLanguageId": 2,
                            "cIsTranslatedBySystem": null
                        },
                        {
                            "iTitleId": 0,
                            "vTitleName": "Mister",
                            "iLanguageId": 1,
                            "cIsTranslatedBySystem": null
                        },
                        {
                            "iTitleId": 0,
                            "vTitleName": "Sig",
                            "iLanguageId": 4,
                            "cIsTranslatedBySystem": null
                        },
                        {
                            "iTitleId": 0,
                            "vTitleName": "Herr",
                            "iLanguageId": 6,
                            "cIsTranslatedBySystem": null
                        }
                    ]
                },
                {
                    "iTitleId": 1,
                    "iDisplayOrder": 2,
                    "dtModifiedOn": "2018-07-24T12:17:53.89",
                    "t_TestDrive_Member_Title_Data": [
                        {
                            "iTitleId": 1,
                            "vTitleName": "Frau",
                            "iLanguageId": 3,
                            "cIsTranslatedBySystem": null
                        },
                        {
                            "iTitleId": 1,
                            "vTitleName": "Madame",
                            "iLanguageId": 2,
                            "cIsTranslatedBySystem": null
                        },
                        {
                            "iTitleId": 1,
                            "vTitleName": "Madame",
                            "iLanguageId": 1,
                            "cIsTranslatedBySystem": null
                        },
                        {
                            "iTitleId": 1,
                            "vTitleName": "Signora",
                            "iLanguageId": 4,
                            "cIsTranslatedBySystem": null
                        },
                        {
                            "iTitleId": 1,
                            "vTitleName": "žena",
                            "iLanguageId": 6,
                            "cIsTranslatedBySystem": null
                        }
                    ]
                }
            ]
        }
    };

    let LabelData =  {
        //"iStateId": "sss"
        "iStateId": {
            "ValueColumn": "iStateId",
            "DisplayColumn": "vStateName",
            "cISLanguageDependent": "Y",
            "DependingTableName": "t_TestDrive_Member_State_Data",
            "Data": {
                "iStateId": 437,
                "iDisplayOrder": 17,
                "iMainClientId": 97,
                "iStateNumberForTestToken": 98,
                "cHasLearnCoacher": null,
                "vLogoFileName": null,
                "iLogoSize": null,
                "iLogoFileVersion": null,
                "vLogoFileType": null,
                "iTitleId": null,
                "vFirstName": null,
                "vName": null,
                "vLongName": null,
                "cIsUsedForDemoTestActivityRecording": null,
                "cIsDeleted": "N",
                "dtModifiedOn": "2018-07-24T12:36:46.72",
                "dtCreatedOn": "2018-07-24T12:36:46.72",
                "uUserId": null,
                "t_TestDrive_Member_State_Data": [
                    {
                        "iLanguageId": 3,
                        "vShortStateName": "TG",
                        "vStateName": "St. Gallen"
                    }
                ]
            }
        }
    };

    return {
        FormData, //The data has all the fields corresponding to the metadata keys(vColumnNmae), except for those with “vControlTYpe” as “DropDown” or “Label”.
        LabelData, //LabelData is like the DropdownData…. it is an object that has the fields corresponding to the metadata fields with vControltype as “label”.
        DropDownData //DropdownData is an object that has the fields corresponding to the metadata fields with vControltype as “dropdown”
    };
    
};