/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vSourceLanguage",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "SourceLanguage",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        
        {
            "vColumnName": "vDestinationLanguage",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourceKey": "DestinationLanguage",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "vSourcePath",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "SourceFile",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "N"
        },
        {
            "vColumnName": "vDestinationPath",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourceKey": "DestinationFile",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }, 
        {
            "vColumnName": "iNumberOfWordTranslated",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourceKey": "NumberOfWordTranslated",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dtModifiedOn",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourceKey": "TranslatedOn",
            "vControlType": "datetime",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uTranslateId",
    };
    return objMeta;
};
