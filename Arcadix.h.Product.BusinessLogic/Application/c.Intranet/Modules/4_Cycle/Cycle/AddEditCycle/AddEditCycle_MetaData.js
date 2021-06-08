/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "vCycleName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null
        },
        {
            "vColumnName": "iCycleNumberOfRepetitions",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage"
        },
        {
            "vColumnName": "cIsArchiveSchool",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "cIsArchiveTeacher",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "cIsActive",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "cIsExternalAccessAllowed",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "vKeyword",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "tCycleDescription",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
       
    ];
};

