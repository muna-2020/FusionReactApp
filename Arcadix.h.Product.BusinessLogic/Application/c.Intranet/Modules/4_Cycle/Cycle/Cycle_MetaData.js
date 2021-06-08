/**
* @name GetMetaData
* @param null
* @summary it returns the array of metadata
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [        
        {
            "vColumnName": "ActiveInactiveIcon",
            "vDataType": "image",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Cycle",
            "vTextResourceKey": "ActiveInactive",
            "vControlType": "image",
            "IsMandatory": null,
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "vCycleName",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Cycle",
            "vTextResourceKey": "CycleName",
            "vControlType": "label",
            "IsMandatory": "Y",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        } 
    ]
    let objMeta = {
        HeaderData: arrHeaderData,
        PrimaryKey: "uCycleId",
        Filter: {"cIsDeleted" : "N"},
    };
    return objMeta;
};
