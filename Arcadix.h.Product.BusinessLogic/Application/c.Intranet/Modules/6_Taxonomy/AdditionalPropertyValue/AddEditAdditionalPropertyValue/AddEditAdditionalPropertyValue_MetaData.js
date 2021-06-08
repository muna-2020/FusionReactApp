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
            "vColumnName": "t_TestDrive_Task_AdditionalTaskProperty_Value_Data.vAdditionalTaskPropertyValueText",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null
        }
    ];
};

