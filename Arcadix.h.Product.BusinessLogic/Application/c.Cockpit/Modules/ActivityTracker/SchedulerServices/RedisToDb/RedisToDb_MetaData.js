/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vKeyName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "AuditKeyName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        
        {
            "vColumnName": "StartTime",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourceKey": "StartTime",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "EndTime",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "EndDate",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "vError",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourceKey": "Error",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vRawData",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourceKey": "RawData",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uActivityId",
    };
    return objMeta;
};
