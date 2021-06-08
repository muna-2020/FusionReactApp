/**
* @name GetWelcomePageMetaData
* @summary it returns the array of WelcomePage metadatas
* @returns {array} MetaData
*/
export const GetWelcomePageMetaData = () => {
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
            "iTabId": "WelcomePage",
            "vValidationKey": "NumberValidationMessage",
        }
    ];
};