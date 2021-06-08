/**
* @name GetTimeKeepingExtrasMetaData
* @summary it returns the array of TimeKeepingExtras metadatas
* @returns {array} MetaData
*/
export const GetTimeKeepingExtrasMetaData = () => {
    return [
        {
            "vColumnName": "iDurationOfTestInMinutes",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage"
        },
        {
            "vColumnName": "iMinimumTasksBeforeTestLimitIsConsidered",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
        },
    ];
};