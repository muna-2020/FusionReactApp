/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "vTestFolderName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null,
        },   
        {
            "vColumnName": "cIsForInternalTesting",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
        },
        {
            "vColumnName": "vTestFolderDescription",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
        }
    ];
};