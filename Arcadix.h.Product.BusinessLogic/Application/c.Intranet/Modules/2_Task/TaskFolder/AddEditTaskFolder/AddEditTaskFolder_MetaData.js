/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "vPageFolderName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
        },  
        {
            "vColumnName": "t_CMS_FileSystem_PageFolder_Data.vPageFolderTitle",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
        },        
        {
            "vColumnName": "uSkinId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
        },
        {
            "vColumnName": "cIsForInternalTesting",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
        },
        {
            "vColumnName": "vPageFolderDescription",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
        },

        
    ];
};