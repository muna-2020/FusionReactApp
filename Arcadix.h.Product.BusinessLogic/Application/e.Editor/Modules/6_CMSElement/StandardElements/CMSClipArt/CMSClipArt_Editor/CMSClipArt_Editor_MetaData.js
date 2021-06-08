//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for clipart.
 * @returns {object} default clipart json.
 */
export const GetDefaultElementJson = (intOrder = null) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "vElementTypeName": "ClipArt",
        "iElementTypeId": 37,
        "vElementJson": {
            "iClipArtFileVersion": 1,
            "iHeight": 24,
            "iWidth": 24,
            "vFileName": ""
        }
    };
    return objElementJson;
};