/**
 * @name GetAddCycleClassMetaData
 * @summary it returns the array of metadatas
 * @returns {array} MetaData
 */
export const GetAddCycleClassMetaData = () => {
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
        },
        {
            "vColumnName": "uTeacherId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null
        },
        {
            "vColumnName": "uClassId",
            "vControlType": "dropdown",
            "IsMandatory": "Y",
            "vValidationType": null
        }
    ];
};