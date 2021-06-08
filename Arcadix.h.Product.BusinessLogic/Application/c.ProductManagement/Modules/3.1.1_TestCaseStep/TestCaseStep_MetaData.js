/**
* @name GetMetaDataForTestCaseStep
* @summary it returns the array of Meta Data for TestCaseStep
* @returns {array} MetaData
*/
export const GetMetaDataForTestCaseStep = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vTestCaseStepName",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "TestCaseStepName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vTestCaseStepDescription",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Description",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uTestCaseStepId",
    };
    return objMeta;
};