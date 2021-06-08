/**
* @name GetAddEditMetaData
* @summary it returns the array of AddEdit MetaDatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "t_Testdrive_Task_Question_Data.vQuestion",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "Stammdaten"
        },
        {
            "vColumnName": "iPolarityId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "Stammdaten"
        },
        {
            "vColumnName": "iDisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "Stammdaten"
        },
        {
            "vColumnName": "iNumberOfQuestionsPerPage",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "Extra"
        },
        {
            "vColumnName": "iStartIndexForSurvey",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "Extra"
        },
        {
            "vColumnName": "vSurveyListNumeringSymbol",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "iTabId": "Extra"
        }
    ];
};