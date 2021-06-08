/**
 * @name GetAuditMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetAuditMetaData = () => {
    let arrHeaderData = [        
        {
            "vColumnName": "vAction",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Audit",
            "vTextResourceKey": "Action",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "User",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Audit",
            "vTextResourceKey": "User",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dtCreatedOn",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "Audit",
            "vTextResourceKey": "ModifiedOn",
            "vControlType": "datetime",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Details",
            "vDataType": "image",
            "iDisplayOrder": 4,
            "vTextResourcePage": "Audit",
            "vTextResourceKey": "Details",
            "vControlType": "custom",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        } 
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uAuditId",
    };
    return objMeta;
};
