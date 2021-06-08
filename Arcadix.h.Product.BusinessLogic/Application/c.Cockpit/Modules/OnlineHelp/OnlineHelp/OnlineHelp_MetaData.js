/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vHelpKey",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "OnlineHelp",
            "vTextResourceKey": "helpKey",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iOrderId",
            "vDataType": "string",
            "iDisplayOrder": 9,
            "vTextResourcePage": "OnlineHelp",
            "vTextResourceKey": "OrderId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vDisplayPosition",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "OnlineHelp",
            "vTextResourceKey": "DisplayPosition",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iHelpId",
        
    };
    return objMeta;
};