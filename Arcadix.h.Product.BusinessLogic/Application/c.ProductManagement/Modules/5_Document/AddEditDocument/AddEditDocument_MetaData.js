/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [

        {
            "vColumnName": "vDocumentName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null
        },     
        {
            "vColumnName": "vFileName",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }, 
        {
            "vColumnName": "vFileType",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }, 
        {
            "vColumnName": "vDescription",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
};

