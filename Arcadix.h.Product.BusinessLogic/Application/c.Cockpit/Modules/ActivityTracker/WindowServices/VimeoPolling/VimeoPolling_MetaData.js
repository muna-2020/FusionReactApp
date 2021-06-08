/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of Meta Data
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vFileName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "VideoFileName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dtModifiedOn",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "DateModifiedOn",
            "vControlType": "datetime",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iElementId",
    };
    return objMeta;
};
