/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "t_testDrive_Subject_FeedbackThreshold_Topic_Data.vFeedbackThresholdTopic",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "Topic",
            "vTextResourceKey": "FeedbackThresholdTopic",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uSubjectFeedbackThresholdId"

    };
    return objMeta;
};