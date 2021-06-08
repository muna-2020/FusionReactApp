/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [

        {
            "vColumnName": "vImplementationStepName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null
        },
        {
            "vColumnName": "vImplementationStepDescription",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
};

