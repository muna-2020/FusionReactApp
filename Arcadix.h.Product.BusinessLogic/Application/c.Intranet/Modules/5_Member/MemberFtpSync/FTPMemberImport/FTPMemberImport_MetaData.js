/**
 * @name GetFTPMemberImportMetaData
 * @param null
 * @summary it returns the array of metadata
 * @returns {array} MetaData
 */
export const GetFTPMemberImportMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "dtCreatedOn",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "FTPMemberImport",
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
            "vTextResourcePage": "FTPMemberImport",
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
            "vTextResourcePage": "FTPMemberImport",
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
