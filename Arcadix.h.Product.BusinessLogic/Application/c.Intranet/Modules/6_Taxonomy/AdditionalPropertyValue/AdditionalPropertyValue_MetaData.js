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
            "vTextResourceKey": "iOrderId",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_TestDrive_Task_AdditionalTaskProperty_Value_Data.vAdditionalTaskPropertyValueText",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourceKey": "vAdditionalTaskPropertyValueText",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }
    ];
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "iAdditionalTaskPropertyValueId"
    };
    return objMeta;
};