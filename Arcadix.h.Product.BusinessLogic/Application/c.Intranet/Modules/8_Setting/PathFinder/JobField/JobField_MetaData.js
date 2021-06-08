/**
* @name GetMetaData
* @param null
* @summary it returns the array of MetaData
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "t_PathFinder_JobField_Data.vJobFieldName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Berufsfelder",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "vStateName",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourceKey": "Organisationseinheit",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uJobFieldId",
    };
    return objMeta;
};
