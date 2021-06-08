/**
* @name GetMetaData
* @param null
* @summary it returns the array of MetaData
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "vJobFieldName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Berufsfeld",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_PathFinder_JobField_JobLevel_Data.vJobLevelName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Niveau",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }

    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uJobLevelId",
    };
    return objMeta;
};
