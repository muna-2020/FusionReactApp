/**
* @name GetMetaDataForImplementationStep
* @summary it returns the array of Meta Data for TestCase
* @returns {array} MetaData
*/
export const GetMetaDataForImplementationStep = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vImplementationStepName",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "ImplementationStepName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vImplementationStepDescription",
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
        },
        {
            "vColumnName": "uImplementationStepLayerId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "ImplementationStepLayer",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "uImplementationStepLayerTaskTypeId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "ImplementaionStepLayerTask",
            "vControlType": "dropdown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vUniqueCode",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "UniqueCode",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uUseCaseImplementationStepId",
    };
    return objMeta;
};