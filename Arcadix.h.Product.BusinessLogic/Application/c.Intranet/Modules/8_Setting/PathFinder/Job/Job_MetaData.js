/**
* @name GetMetaData
* @param null
* @summary it returns the array of MetaData
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "t_PathFinder_Jobs_Data.vJobName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Bezeichnung",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "vJobFieldName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Berufsfelder",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsAnchorJob",
            "vDataType": "boolean",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Ankerberuf",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uJobId",
        Filter: {},
        AllowPaging: "Y"
    };
    return objMeta;
};
