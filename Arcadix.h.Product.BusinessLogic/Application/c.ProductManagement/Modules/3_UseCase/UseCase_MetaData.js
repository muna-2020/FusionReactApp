/**
* @name GetMetaData
* @summary it returns the array of Meta Data
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    return [
        //{
        //    "vColumnName": "TestCase",
        //    "vDataType": "string",
        //    "vTextResourceKey": "TestCaseName",
        //    "vControlType": "Collapse",
        //    "IsMandatory": "N",
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        //{
        //    "vColumnName": "ImplementationStep",
        //    "vDataType": "string",
        //    "vTextResourceKey": "UseCaseName",
        //    "vControlType": "custom",
        //    "IsMandatory": "N",
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        {
            "vColumnName": "vUseCaseName", 
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "UseCaseName",
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
        }//,
        //{
        //    "vColumnName": "iOrderId",
        //    "vDataType": "string",
        //    "vTextResourcePage": "Test",
        //    "vTextResourceKey": "DisplayOrder",
        //    "vControlType": "textbox",
        //    "IsMandatory": "N",
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": "N"
        //} 
    ];
};
