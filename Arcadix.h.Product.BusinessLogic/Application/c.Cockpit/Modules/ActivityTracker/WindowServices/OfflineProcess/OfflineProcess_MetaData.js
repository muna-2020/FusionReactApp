/**
* @name GetMetaData
* @param null
* @summary it returns the array of Meta Data
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "ServerName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Server",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Status",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Status",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "vHostName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "HostName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "StartType",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "StartType",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uApplicationServerId",
    };
    return objMeta;
};
