/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "t_Testdrive_Task_Question_Data.vQuestion",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "TaskQuestion",
            "vTextResourceKey": "QuestionName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "cPolarity",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "TaskQuestion",
            "vTextResourceKey": "Polarity",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iDisplayOrder",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "TaskQuestion",
            "vTextResourceKey": "Order",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iPageQuestionId",
    };
    return objMeta;
};
