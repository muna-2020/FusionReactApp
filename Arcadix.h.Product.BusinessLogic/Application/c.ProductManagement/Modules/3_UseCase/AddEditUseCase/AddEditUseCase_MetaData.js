/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [

        {
            "vColumnName": "vUseCaseName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
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

