//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultTextJson
 * @param {number} intElementId Element Id of the Text Element
 * @summary Returns the default Element Json for the CMSText Component.
 * @returns {object} Element Json of text element.
 */
export const GetDefaultTextJson = (intElementId = null) => {
    let objElementJson = {
        "iElementId": intElementId !== null ? intElementId : UniqueId.GetUniqueId(),
        "iElementTypeId": 1,
        "vElementTypeName": "Text",
        "vElementJson": {
            "vText": "Text",
            "SubElements": []
        }
    };
    return objElementJson;
};
