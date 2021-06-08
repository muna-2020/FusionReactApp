/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "t_TestDrive_Workflow_Data.vName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
        },
        {
            "vColumnName": "uWorkflowTypeId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
        },
        {
            "vColumnName": "t_TestDrive_Workflow_Data.vDescription",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
        },
       
    ];
};

