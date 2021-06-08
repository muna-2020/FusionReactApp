/**
* @name GetMetaData
* @summary it returns the array of meta data
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    return [
        {
            "vColumnName": "AccessControl",
            "vDataType": "image",
            "vTextResourcePage": "Task",
            "vTextResourceKey": "AccessControl",
            "vControlType": "image",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "TaskTypeIcon",
            "vDataType": "image",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "Type",
            "vControlType": "image",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Adaptive",
            "vDataType": "image",
            "vTextResourcePage": "Task",
            "vTextResourceKey": "Adaptive",
            "vControlType": "image",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "WorkFlowIcons.JSX",
            "vDataType": "image",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "WorkFlowIcon",
            "vControlType": "custom",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "WorkFlowStatus",
            "vDataType": "string",
            "vTextResourcePage": "Task",
            "vTextResourceKey": "WorkflowStatus",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Name", //common for "vPageName,vPageFolderName"
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
            "vColumnName": "Id", //common for "iPageId,iPageFolderId"
            "vDataType": "int",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "ID",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vCustomerTaskId",
            "vDataType": "string",
            "vTextResourcePage": "Task",
            "vTextResourceKey": "KundenID",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "DifficultyLevel",
            "vDataType": "string",
            "vTextResourcePage": "Task",
            "vTextResourceKey": "Difficulty",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dtModifiedOn",
            "vDataType": "string",
            "vTextResourcePage": "Test",
            "vTextResourceKey": "LastModified",
            "vControlType": "date",
            "IsMandatory": "Y",
            "vValidationType": "date",
            "iWidth": null,
            "cShowMultiLanguage": null
        },   
        {
            "vColumnName": "TaskType", 
            "vDataType": "string",
            "vTextResourcePage": "Task",
            "vTextResourceKey": "TaskType",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Description",
            "vDataType": "string",
            "vTextResourcePage": "Task",
            "vTextResourceKey": "Description",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];   
};