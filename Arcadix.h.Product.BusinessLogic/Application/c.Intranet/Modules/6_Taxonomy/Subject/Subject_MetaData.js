/**
 * @name GetMetaData
 * @param null
 * @summary it returns the array of metadata
 * @returns {array} MetaData
 */
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "iSubjectId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "SubjectId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vKeyForImage",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "KeyForImage",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iParentSubjectId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "ParentSubjectId",
            "vControlType": "dropdown",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_Subject_Data.vSubjectName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "SubjectName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "iDisplayOrder",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "DisplayOrder",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsLearnCoacherSubject",
            "vDataType": "boolean",
            "iDisplayOrder": 1,
            "vTextResourceKey": "IsLearnCoacherSubject",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsActive",
            "vDataType": "boolean",
            "iDisplayOrder": 1,
            "vTextResourceKey": "IsActive",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "dConstance",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Constance",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "iWidth": null,
            "cShowMultiLanguage": "number"
        },
        {
            "vColumnName": "dVariance",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Variance",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_Subject_Data.vSubjectDisplayName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "DisplayName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_Subject_Data.tSubjectDescription",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Description",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_TestDrive_Subject_Data.vSubjectShortName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "ShortName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "cIsTestedAtThisTime",
            "vDataType": "boolean",
            "iDisplayOrder": 1,
            "vTextResourceKey": "IsTestedAtThisTime",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsReadyForSystemLearningTest",
            "vDataType": "boolean",
            "iDisplayOrder": 1,
            "vTextResourceKey": "IsReadyForSystemLearningTest",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "cIsReadyForManualLearningTest",
            "vDataType": "boolean",
            "iDisplayOrder": 1,
            "vTextResourceKey": "IsReadyForManualLearningTest",
            "vControlType": "image",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iSubjectId"
    };
    return objMeta;
};