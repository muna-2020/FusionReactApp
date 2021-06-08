/**
* @name GetResourceData
* @summary it returns the object for TextResource
* @returns {object} TextResource
*/
export const GetData = () => {

    let arrMainClientLanguageData = [
        {
            "iLanguageMainClientId": 2180,
            "iLanguageId": 3,
            "iMainClientId": 97,
            "iApplicationTypeId": 21,
            "dtModifiedOn": "2019-07-17T11:39:06.583",
            "dtCreatedOn": "2018-07-24T14:00:06.513",
            "cIsDeleted": "N",          
            "vLanguageCultureInfo": "de"
        },
        {
            "iLanguageMainClientId": 2174,
            "iLanguageId": 1,
            "iMainClientId": 97,
            "iApplicationTypeId": 21,
            "dtModifiedOn": "2019-07-17T11:39:06.583",
            "dtCreatedOn": "2018-07-24T14:00:06.513",
            "cIsDeleted": "N",
            "vLanguageCultureInfo": "en"
        }
    ]; //Data of main client languages.

    let arrLanguageData = [
        {
            "iFrameworkLanguageId": 1,
            "vLanguageCultureInfo": "en",
            "vLanguageIdentifier": "English",
            "iDisplayOrder": 2,
            "cIsActive": "Y",
            "vDefaultLanguageCountryInfo": "us",
            "dtModifiedOn": "2018-07-24T12:17:39.563",
            "t_Framework_Language_Data": [
                {
                    "iFrameworkLanguageId": 1,
                    "iLanguageId": 1,
                    "vLanguageName": "English",
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
            "dtModifiedOn": "2018-07-24T12:17:39.563",
            "t_Framework_Language_Data": [
                {
                    "iFrameworkLanguageId": 3,
                    "iLanguageId": 1,
                    "vLanguageName": "Deutsch",
                    "cIsTranslatedBySystem": null
                }
            ]
        }
    ];  // Langauges Details

    return {
        MultiLanguageData: arrMainClientLanguageData,
        LanguageData: arrLanguageData
    };
};