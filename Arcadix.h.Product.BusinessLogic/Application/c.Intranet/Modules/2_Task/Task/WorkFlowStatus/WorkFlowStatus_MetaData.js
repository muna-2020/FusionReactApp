/**
* @name GetMetaData
* @param null
* @summary it returns the array of Meta Data
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iDisplayOrder",
            "vDataType": "int",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Order",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatusShortName",
            "vDataType": "int",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Shortname",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatus",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "WorkflowStatus",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "cIsProductionReady",
            "vDataType": "int",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "ProductionReady",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatusDescription",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Description",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uWorkflowStatusId",
    };
    return objMeta;
};
