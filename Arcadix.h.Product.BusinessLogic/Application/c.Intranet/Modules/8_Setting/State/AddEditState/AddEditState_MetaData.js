/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "iStateNumberForTestToken",
            "vControlType": "label",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "iStateId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "t_TestDrive_Member_State_Data.vStateName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null
        },
        {
            "vColumnName": "t_TestDrive_Member_State_Data.vShortStateName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "iTitleId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "vFirstName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "vName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        },
        {
            "vColumnName": "iDisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": "number",
            "vValidationKey": "NumberValidationMessage"
        },
        {
            "vColumnName": "vLongName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
};