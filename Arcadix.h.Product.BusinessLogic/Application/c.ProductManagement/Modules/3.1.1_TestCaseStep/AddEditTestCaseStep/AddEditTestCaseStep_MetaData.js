/**
* @name GetAddEditMetaData
* @summary it returns the array of addedit metadatas
* @returns {array} MetaData
*/
export const GetAddEditMetaData = () => {
    return [

        {
            "vColumnName": "vTestCaseStepName",
            "vControlType": "textbox",
            "IsMandatory": "Y",
            "vValidationType": null
        },
        {
            "vColumnName": "vTestCaseStepDescription",
            "vControlType": "textbox",
            "IsMandatory": null,
            "vValidationType": null
        }
    ];
};

