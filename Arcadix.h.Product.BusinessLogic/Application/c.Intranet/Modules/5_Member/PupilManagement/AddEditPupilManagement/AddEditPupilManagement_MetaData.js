/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditPupilManagementMetaData = () => {
    return [
        {
            "vColumnName": "iStateId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "PupilManagement"
        },
        {
            "vColumnName": "vSchoolName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iTitleId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "PupilManagement"
        },
        {
            "vColumnName": "vFirstName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iSchoolTypeId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vStreet",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vPhone",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iZIPCode",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vEmail",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": "email",
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vTown",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
};