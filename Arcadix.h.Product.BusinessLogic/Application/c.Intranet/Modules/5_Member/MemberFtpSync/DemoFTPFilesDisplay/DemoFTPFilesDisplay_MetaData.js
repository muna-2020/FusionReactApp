/**
 * @name GetDemoFTPFileDisplayMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetDemoFTPFileDisplayMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "Name",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "DemoFTPFileDisplay",
            "vTextResourceKey": "Name",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "LastModifiedOn",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "DemoFTPFileDisplay",
            "vTextResourceKey": "LastModifiedOn",
            "vControlType": "datetime",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "Name",
        Filter: {},
        AllowPaging: "Y"
    };
    return objMeta;
};