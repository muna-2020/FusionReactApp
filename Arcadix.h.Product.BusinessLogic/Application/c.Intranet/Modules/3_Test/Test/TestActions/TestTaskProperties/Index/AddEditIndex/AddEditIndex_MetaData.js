/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "iSubjectId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "SubjectManagementMain"
        },
        {
            "vColumnName": "vKeyForImage",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": 1
        },
        {
            "vColumnName": "iParentSubjectId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": 1
        },
        {
            "vColumnName": "t_TestDrive_Subject_Data.vSubjectName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "SubjectManagementMain"
        },
        {
            "vColumnName": "iDisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "SubjectManagementMain"
        },
        {
            "vColumnName": "cIsLearnCoacherSubject",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": 1
        },
        {
            "vColumnName": "cIsActive",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": 1
        },
        {
            "vColumnName": "dConstance",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "AdaptiveDetails"
        },
        {
            "vColumnName": "dVariance",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "AdaptiveDetails"
        },
        {
            "vColumnName": "t_TestDrive_Subject_Data.vSubjectDisplayName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": 1
        },
        {
            "vColumnName": "t_TestDrive_Subject_Data.tSubjectDescription",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": 1
        },
        {
            "vColumnName": "t_TestDrive_Subject_Data.vSubjectShortName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": 1
        },
        {
            "vColumnName": "cIsTestedAtThisTime",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": 1
        },
        {
            "vColumnName": "cIsReadyForSystemLearningTest",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": 1
        },
        {
            "vColumnName": "cIsReadyForManualLearningTest",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": 1
        }
    ];
};