/**
 * @name GetMetaData
 * @summary it returns the array of Meta Data
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iApplicationTypeId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "ApplicationType",
            "vTextResourceKey": "ApplicationTypeId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vApplicationName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "ApplicationType",
            "vTextResourceKey": "ApplicationName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_Framework_ApplicationType_Data.vApplicationTypeName",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "ApplicationType",
            "vTextResourceKey": "ApplicationTypeName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "vApplicationGroupName",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "ApplicationType",
            "vTextResourceKey": "ApplicationGroupName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "iDisplayOrder",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "ApplicationType",
            "vTextResourceKey": "DisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        Filter: { "cIsDeleted": "N" },
        PrimaryKey: "iApplicationTypeId"
    };
    return objMeta;
};