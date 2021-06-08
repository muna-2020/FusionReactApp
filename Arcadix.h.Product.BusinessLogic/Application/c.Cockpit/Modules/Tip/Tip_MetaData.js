/**
 * @name GetAddEditMetaData
 * @summary it returns the array of addedit metadatas
 * @returns {array} MetaData
 */
export const GetAddEditMetaData = () => {
    let arrHeaderData = [
        //{
        //    "vColumnName": "iApplicationTypeId",
        //    "vDataType": "int",
        //    "iDisplayOrder": 1,
        //    "vTextResourcePage": "Tip",
        //    "vTextResourceKey": "ApplicationType",
        //    "vControlType": "dropdown",
        //    "IsMandatory": "Y",
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        //{
        //    "vColumnName": "iMainclientId",
        //    "vDataType": "int",
        //    "iDisplayOrder": 2,
        //    "vTextResourcePage": "Tip",
        //    "vTextResourceKey": "MainClient",
        //    "vControlType": "dropdown",
        //    "IsMandatory": "Y",
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        {
            "vColumnName": "t_TestDrive_Tip_Data.vTipTitle",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Tip",
            "vTextResourceKey": "TipTitle",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uTipId"

    };
    return objMeta;
};