/**
 * @name GetAddCycleSchoolMetaData
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetAddCycleSchoolMetaData = () => {
    return [
        {
            "vColumnName": "iStateId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null
        },
        {
            "vColumnName": "uSchoolId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null
        }
    ];
};