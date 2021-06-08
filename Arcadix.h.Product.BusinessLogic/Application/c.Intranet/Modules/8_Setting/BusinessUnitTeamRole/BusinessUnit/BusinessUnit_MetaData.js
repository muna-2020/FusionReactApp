﻿/**
* @name GetMetaData
* @param null
* @summary it returns the array of Meta Data
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vBusinessUnitName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "BusinessUnit",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uBusinessUnitId",
    };
    return objMeta;
};
