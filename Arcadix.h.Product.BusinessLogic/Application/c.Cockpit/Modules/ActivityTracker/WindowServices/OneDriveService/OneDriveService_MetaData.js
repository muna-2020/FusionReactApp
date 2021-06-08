/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vFileType",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "FileType",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFilePath",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourceKey": "FilePath",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFileId",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourceKey": "FileId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsFaulted",
            "vDataType": "bool",
            "iDisplayOrder": 4,
            "vTextResourceKey": "IsFaulted",
            "vControlType": "image",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsMovedToOneDrive",
            "vDataType": "bool",
            "iDisplayOrder": 5,
            "vTextResourceKey": "IsMovedToOneDrive",
            "vControlType": "image",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iNumberOfAttemptsToMoveFile",
            "vDataType": "string",
            "iDisplayOrder": 6,
            "vTextResourceKey": "NumberOfAttemptsToMoveFile",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iMainClientId",
            "vDataType": "string",
            "iDisplayOrder": 7,
            "vTextResourceKey": "MainClient",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dtCreatedOn",
            "vDataType": "string",
            "iDisplayOrder": 8,
            "vTextResourceKey": "CreatedOn",
            "vControlType": "datetime",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dtModifiedOn",
            "vDataType": "string",
            "iDisplayOrder": 9,
            "vTextResourceKey": "ModifiedOn",
            "vControlType": "datetime",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uFileHandlerFieldId"
    };
    return objMeta;
};