/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iOrderId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "OrderId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_Task_AdditionalTaskProperty_Data.vAdditionalTaskProperty",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourceKey": "vAdditionalProperty",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "cIsAnswerMandatory",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourceKey": "IsAnswerMandatory",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vDependencyName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "Dependency",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vSubjectName",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourceKey": "SubjectName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iAdditionalTaskPropertyId"
    };
    return objMeta;
};