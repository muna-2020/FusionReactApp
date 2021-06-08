/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vServerName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "ServerName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vAppPoolName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourceKey": "AppPoolName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vAction",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourceKey": "Action",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dtCreatedOn",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "Time",
            "vControlType": "datetime",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uArcadixAppPoolId"
    };
    return objMeta;
};