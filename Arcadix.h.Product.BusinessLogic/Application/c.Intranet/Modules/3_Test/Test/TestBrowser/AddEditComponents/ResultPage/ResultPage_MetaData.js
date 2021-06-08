/**
* @name GetResultPageMetaData
* @summary it returns the array of ResultPage metadatas
* @returns {array} MetaData
*/
export const GetResultPageMetaData = () => {
    return [
        {
            "vColumnName": "vTestCompleteNotificationEmailId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "email",
            "vValidationKey": "EmailValidationMessage",
            "iTabId": "ResultPage"
        }
    ];
};