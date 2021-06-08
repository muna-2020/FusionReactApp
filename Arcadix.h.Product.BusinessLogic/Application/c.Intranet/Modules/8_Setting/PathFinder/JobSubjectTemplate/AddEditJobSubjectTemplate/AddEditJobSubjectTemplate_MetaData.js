/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "iSubjectId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null
        },
        {
            "vColumnName": "iOrderId",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage"
        },
        {
            "vColumnName": "cHasMinimumValue",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "cHasFromToValue",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
};

