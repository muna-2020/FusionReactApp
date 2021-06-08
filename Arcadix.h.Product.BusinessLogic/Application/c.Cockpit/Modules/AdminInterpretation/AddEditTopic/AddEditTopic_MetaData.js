/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "uSubjectFeedbackThresholdId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "Topic"
        },
        {
            "vColumnName": "t_testDrive_Subject_FeedbackThreshold_Topic_Data.vFeedbackThresholdTopic",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "Topic"
        }
    ];
};