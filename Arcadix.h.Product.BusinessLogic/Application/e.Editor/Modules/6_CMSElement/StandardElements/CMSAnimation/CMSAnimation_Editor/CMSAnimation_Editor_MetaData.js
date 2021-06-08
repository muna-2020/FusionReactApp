//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetCheckboxElementJson
 * @summary This method returns the Initial Json for checkbox.
 * @returns {object} default Animation json.
 */
export const GetDefaultAnimationObject = () => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "vElementTypeName": "Animation",
        "iElementTypeId": 29,
        "cIsDisplayedInElementTree": "Y",
        "vElementJson": {
            "iAnimationFileVersion": 1,
            "iZipFileVersion": 1
        }
    };
    return objElementJson;
};
