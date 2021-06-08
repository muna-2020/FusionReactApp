/**
 * @name GetFTPMemberImportDemoMetaData
 * @param null
 * @summary it returns the array of metadata
 * @returns {array} MetaData
 */
export const GetFTPMemberImportDemoMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "dtCreatedOn",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "FTPMemberImportDemo",
            "vTextResourceKey": "CreatedOn",
            "vControlType": "datetime",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFileName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "FTPMemberImportDemo",
            "vTextResourceKey": "FileName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vTransactionId",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "FTPMemberImportDemo",
            "vTextResourceKey": "TransactionId",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uFTPSyncId",
        Filter: {},
        AllowPaging: "Y"
    };
    return objMeta;
};
