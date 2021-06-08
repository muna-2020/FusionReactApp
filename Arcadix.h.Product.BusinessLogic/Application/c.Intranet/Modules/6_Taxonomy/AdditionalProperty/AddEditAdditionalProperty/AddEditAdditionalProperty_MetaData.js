/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [

        {
            "vColumnName": "iOrderId",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage"
        },
        {
            "vColumnName": "t_TestDrive_Task_AdditionalTaskProperty_Data.vAdditionalTaskProperty",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
        },
        {
            "vColumnName": "cIsAnswerMandatory",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
        },
        {
            "vColumnName": "vDependencyName",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
        },
        {
            "vColumnName": "vSubjectName",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
        },

    ];
};

