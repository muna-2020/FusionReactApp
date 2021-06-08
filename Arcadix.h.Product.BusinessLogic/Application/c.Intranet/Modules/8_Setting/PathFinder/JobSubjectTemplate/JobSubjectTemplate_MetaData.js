/**
* @name GetMetaData
* @param null
* @summary it returns the array of MetaData
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vSubjectName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Subject",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cHasMinimumValue",
            "vDataType": "boolean",
            "iDisplayOrder": 2,
            "vTextResourceKey": "HasMinimumValue",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cHasFromToValue",
            "vDataType": "boolean",
            "iDisplayOrder": 3,
            "vTextResourceKey": "HasFromToValue",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iOrderId",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourceKey": "Order",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uSubjectTemplateId",
    };
    return objMeta;
};
