/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "iDisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatusShortName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatus",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
        },
        {
            "vColumnName": "t_TestDrive_WorkflowStatus_Data.vWorkflowStatusDescription",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
        }
    ];
};

