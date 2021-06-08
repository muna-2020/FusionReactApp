/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vMainClientName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "MainClient",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dtStartTime",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "PreloadStartDate",
            "vControlType": "datetime",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "dtEndTime",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "PreloadEndTime",
            "vControlType": "datetime",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "vError",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Error",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uPreloadLogId",
    };
    return objMeta;
};
