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
        {
            "vColumnName": "t_TestDrive_Test_Tasks_Data.vTaskTopLeftTitle",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourceKey": "TaskTopLeftTitle",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_Test_Tasks_Data.vBackButtonText",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "BackButtonText",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_Test_Tasks_Data.vNextButtonText",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourceKey": "NextButtonText",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }

    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iTestTaskId",
    };
    return objMeta;
};
