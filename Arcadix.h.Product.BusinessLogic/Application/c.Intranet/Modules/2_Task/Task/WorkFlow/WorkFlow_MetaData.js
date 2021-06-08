/**
* @name GetMetaData
* @param null
* @summary it returns the array of Meta Data
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "t_TestDrive_Workflow_Data.vName",
            "vDataType": "int",
             "iDisplayOrder":1,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "WorkflowName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "uWorkflowTypeId",
            "vDataType": "int",
             "iDisplayOrder":2,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "WorkflowTypeId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_Workflow_Data.vDescription",
            "vDataType": "string",
             "iDisplayOrder":3,
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Description",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "IsActivate",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourceKey": "Activ",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uWorkflowId",
    };
    return objMeta;
};