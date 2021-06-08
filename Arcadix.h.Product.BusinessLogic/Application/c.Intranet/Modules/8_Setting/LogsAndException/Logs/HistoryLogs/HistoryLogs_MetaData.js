/**
* @name GetMetaData
* @summary it returns the array of metadata
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [ 
        
       {
            "vColumnName": "FileName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "FileName",
            "vTextResourceKey": "Url",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": 50,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dtLastWriteTime",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "FileLastModifiedTime",
            "vTextResourceKey": "DateTime",
            "vControlType": "datetime",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": 25,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Name",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "FileName",
            "vTextResourceKey": "Url",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": 50,
            //"cShowLess":"Y",
            "cShowMultiLanguage": null
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "FileName",
    };
    return objMeta;
};