/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "vHostURL",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iTabId": "ClientHostUrl"
        },
        {
            "vColumnName": "iClientId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "ClientHostUrl"
        },
        
        //{
        //    "vColumnName": "uTestId",
        //    "vControlType": "textbox",
        //    "IsMandatory": null,
        //    "vValidationType": null,
        //    "iTabId": "ClientHostUrl"
        //},
        //{
        //    "vColumnName": "uLoginControlId",
        //    "vControlType": "textbox",
        //    "IsMandatory": null,
        //    "vValidationType": null,
        //    "iTabId": "ClientHostUrl"
        //},
        {
            "vColumnName": "cIsActive",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "ClientHostUrl"
        },
        {
            "vColumnName": "vStartPage",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "ClientHostUrl"
        },
        {
            "vColumnName": "cIsForTesting",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "ClientHostUrl"
        },
        {
            "vColumnName": "iTargetGroupId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "ClientHostUrl"
        },
        {
            "vColumnName": "cIsAngularApplication",
            "vControlType": "checkbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iTabId": "ClientHostUrl"
        },
        {
            "vColumnName": "iTargetDeviceId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage",
            "iTabId": "ClientHostUrl"
        }
    ];
};