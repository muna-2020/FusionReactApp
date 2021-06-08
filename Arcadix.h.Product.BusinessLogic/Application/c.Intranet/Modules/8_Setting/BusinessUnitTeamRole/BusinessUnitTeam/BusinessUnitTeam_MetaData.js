/**
* @name GetMetaData
* @param null
* @summary it returns the array of meta Data
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vTeamName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Team",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vUserRoleName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourceKey": "Roles",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uTeamId"
    };
    return objMeta;
};