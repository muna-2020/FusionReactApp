/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        //{
        //    "vColumnName": "uPreloadLogObjectId",
        //    "vDataType": "string",
        //    "iDisplayOrder": 1,
        //    "vTextResourceKey": "PreloadLogObject",
        //    "vControlType": "textbox",
        //    "IsMandatory": "N",
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        {
            "vColumnName": "vObjectName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "ObjectName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsSuccess",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "IsSucess",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iTimeTaken",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "TimeTaken",
            "vControlType": "custom",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iDataCountFromDb",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "DataCountFromDb",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iDataCountFromElastic",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "DataCountfromElastic",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vError",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Error",
            "vControlType": "custom",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uPreloadLogObjectId"
    };
    return objMeta;
};
