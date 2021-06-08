/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [
        {
            "vColumnName": "iGenreId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "iTabId": "1"
        },
        {
            "vColumnName": "iEdition",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": "number",
            "iTabId": "1"
        },
        {
            "vColumnName": "t_Fusion_Demo_Book_Data.vBookName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "t_Fusion_Demo_Book_Data.vAuthor",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        },
        {
            "vColumnName": "t_Fusion_Demo_Book_Data.vPublisher",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iTabId": "1"
        }
    ];
}

