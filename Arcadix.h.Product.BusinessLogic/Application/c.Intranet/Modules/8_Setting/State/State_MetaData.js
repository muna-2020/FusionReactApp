/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadata
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [        
        {
            "vColumnName": "iStateNumberForTestToken",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "State",
            "vTextResourceKey": "StateNumberForTestToken",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iStateId",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "State",
            "vTextResourceKey": "StateId",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_Member_State_Data.vStateName",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "State",
            "vTextResourceKey": "StateName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_Member_State_Data.vShortStateName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "State",
            "vTextResourceKey": "ShortStateName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "iTitleId",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "State",
            "vTextResourceKey": "TitleId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vFirstName",
            "vDataType": "string",
            "iDisplayOrder": 6,
            "vTextResourcePage": "State",
            "vTextResourceKey": "FirstName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vName",
            "vDataType": "string",
            "iDisplayOrder": 7,
            "vTextResourcePage": "State",
            "vTextResourceKey": "Name",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iDisplayOrder",
            "vDataType": "string",
            "iDisplayOrder": 8,
            "vTextResourcePage": "State",
            "vTextResourceKey": "DisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vLongName",
            "vDataType": "string",
            "iDisplayOrder": 9,
            "vTextResourcePage": "State",
            "vTextResourceKey": "LongName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        } 
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iStateId",
        Filter: {"cIsDeleted" : "N"},
    };
    return objMeta;
};