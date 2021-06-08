/**
* @name GetMetaData
* @summary it returns the array of Meta Data
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    return [			
        {
            "vColumnName": "vModuleName", 
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Name",
            "vControlType": "textbox",
            "IsMandatory": "Y",
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
            "vColumnName": "iOrderId",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "DisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        }   
    ];
};