/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = (objContext) => {
    let arrMetaData = [
        {
            "vColumnName": "cIsCheckedOut",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "CheckedOutStatus",
            "vControlType": "custom",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vDocumentName", 
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "DocumentName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFileName",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "FileName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFileType",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "FileType",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vDescription",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Description",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Read",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Read",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Edit",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Edit",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "LastModifiedBy",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "LastModifiedBy",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },       
    ];
    if (!objContext.props?.Data?.IsForModule) {
        arrMetaData = [
            ...arrMetaData,
            {
                "vColumnName": "CopyLink",
                "vDataType": "string",
                "vTextResourcePage": "Test",
                "vTextResourceKey": "CopyLink",
                "vControlType": "custom",
                "IsMandatory": "N",
                "vValidationType": null,
                "iWidth": null,
                "cShowMultiLanguage": null
            }
        ];
    }
    return arrMetaData;
};