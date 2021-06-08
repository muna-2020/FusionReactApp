/**
* @name GetBasicPropertiesMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetBasicPropertiesMetaData = () => {
    return [
         {
            "vColumnName": "vPageName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "iEstimatedTimeToSolveSolveInSeconds",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "t_CMS_Page_Data.vPageTitle",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        }, 
        {
            "vColumnName": "uSkinId",
            "vControlType": "dropdown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        },
        {
            "vColumnName": "vPageDescription",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "TaskDiv"
        }
];
};
