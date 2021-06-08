/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iOrderId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "TaskTestPropertyId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "PageName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "AufgabenName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "PageType",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "PageTyp",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        //{
        //    "vColumnName": "iTaskGroupTimeLimit",
        //    "vDataType": "string",
        //    "iDisplayOrder": 4,
        //    "vTextResourceKey": "TaskGroupTimeLimit",
        //    "vControlType": "textbox",
        //    "IsMandatory": null,
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        {
            "vColumnName": "iTaskTimeLimit",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "TaskTimeLimit",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iMinimumTaskTime",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "MinimumTaskTime",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsUnlimitedTime",
            "vDataType": "boolean",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Ohne Zeitbegrenzung",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iTestProgressDisplayId",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "TestProgressDisplayId",
            "vControlType": "dropdown",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iTestTaskId",
    };
    return objMeta;
};
