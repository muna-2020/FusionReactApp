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
            "vColumnName": "SubjectName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "SubjectPath",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "SubSubjectName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourceKey": "Subject",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsAnswerMandatory",
            "vDataType": "boolean",
            "iDisplayOrder": 1,
            "vTextResourceKey": "AnswerMandatory",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
        
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iTestTaskId"
    };
    return objMeta;
};
