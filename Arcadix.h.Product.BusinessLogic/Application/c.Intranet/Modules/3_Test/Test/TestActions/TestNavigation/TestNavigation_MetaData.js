/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "Type",
            "vDataType": "image",
            // "iDisplayOrder":3,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Type",
            "vControlType": "image",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Name",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Name",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dtModifiedOn",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "LastModified",
            "vControlType": "date",
            "IsMandatory": "Y",
            "vValidationType": "date",
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
    
    return arrHeaderData;
};