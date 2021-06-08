/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "vTeamName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null
        },
        {
            "vColumnName": "vUserRoleName",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
        }
    ];
};