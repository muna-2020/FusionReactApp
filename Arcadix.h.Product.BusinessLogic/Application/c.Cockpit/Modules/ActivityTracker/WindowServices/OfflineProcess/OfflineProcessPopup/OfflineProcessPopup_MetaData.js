/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vExecutionName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "ExecutionName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }, {
            "vColumnName": "vOfflineProcessKeyword",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "ExecutionType",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dateLastExecutedOn",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "ExecutedOn",
            "vControlType": "custom",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dateExecutionStart",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "StartTime",
            "vControlType": "custom",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dateExecutionEnd",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "EndTime",
            "vControlType": "custom",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "Status",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Status",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "DownloadExecution",
            "vDataType": "string",
            "vTextResourceKey": "DownloadFile",
            "vControlType": "custom",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uOfflineProcessExecutionId"
    };
    return objMeta;
};
