/**
* @name GetFinalPageMetaData
* @summary it returns the array of FinalPage metadatas
* @returns {array} MetaData
*/
export const GetFinalPageMetaData = () => {
    return [
        {
            "vColumnName": "t_TestDrive_Test_Data.vTestTitle",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "t_TestDrive_Test_Data.vStartButtonText",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "t_TestDrive_Test_Data.vIntroductionPageTopLeftTitle",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "t_TestDrive_Test_Data.vIntroductionPageRightTitle",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "t_TestDrive_Test_Data.iIntroductionPageRightTitleFontSize",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "iTabId": "FinalPage",
            "vValidationKey": "NumberValidationMessage",
        }
    ];
};