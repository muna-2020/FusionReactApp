/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vServerName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Server",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vHostName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "URL",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "iNumberOfTimeToBeShown",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Gewichtung",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iOrder",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Anzeige",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "cIsActive",
            "vDataType": "boolean",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Aktiv",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iNumberOfTimeShown",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Aktuelle Anzeige",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iUrlDisplayCounter",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Zähler",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "uTargetTypeId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Zielgruppe",
            "vControlType": "DropDown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vQueryString",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "QueryString",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vApplicationName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "ApplicationName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vGroup",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Group",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vLanguageName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "LanguageName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uApplicationServerId",
    };
    return objMeta;
};
