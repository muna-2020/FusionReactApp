/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadata
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "Type",
            "vDataType": "image",
            "iDisplayOrder":1,
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
            "iDisplayOrder": 2,
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
        },
        {
            "vColumnName": "TestUsage",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Usage",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "NumberOfTasks",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "NumberOfTasks",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
    ];
    
    return arrHeaderData;
};