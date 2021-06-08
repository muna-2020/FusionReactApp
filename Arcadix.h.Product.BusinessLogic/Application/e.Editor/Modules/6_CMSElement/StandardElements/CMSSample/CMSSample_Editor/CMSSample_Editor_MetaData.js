//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for Sample.
 * @returns {object} default Sample json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "Sample",
        "iElementTypeId": 100,
        "vElementJson": {
            "Attribute1": "Text1",
            "Attribute2": "Text2"
        }
    };
    return objElementJson;
};
