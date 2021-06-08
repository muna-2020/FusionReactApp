/**
* @name GetExtrasMetaData
* @summary it returns the array of Extras metadatas
* @returns {array} MetaData
*/
export const GetExtrasMetaData = () => {
    return [
        {
            "vColumnName": "dPrice",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "iTabId": "General",
            "vValidationKey": "NumberValidationMessage",
        }
    ];
};