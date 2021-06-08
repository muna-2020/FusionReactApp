/**
 * @name GetAddEditClassTypeMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditClassTypeMetaData = () => {
    return [
        {
            "vColumnName": "iClassTypeId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "ClassType"
        },
        {
            "vColumnName": "iStateId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "ClassType"
        },
        {
            "vColumnName": "t_TestDrive_Member_ClassType_Data.vClassTypeName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "ClassType"
        },
        {
            "vColumnName": "t_TestDrive_Member_ClassType_Data.vLongClassTypeName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "ClassType"
        },
        {
            "vColumnName": "iDisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "ClassType"
        }

    ];
};