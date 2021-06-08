/**
* @name GetMetaDataForTestCase
* @summary it returns the array of Meta Data for TestCase
* @returns {array} MetaData
*/
export const GetMetaDataForTestCase = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vTestCaseName",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "TestCaseName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vTestCaseDescription",
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
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uTestCaseId",
    };
    return objMeta;
};