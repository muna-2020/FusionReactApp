//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {number} iOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for Link.
 * @returns {object} default link json
*/
export const GetDefaultElementJson = () => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iElementTypeId": 3,
        "vElementTypeName": "Links",
        "vElementJson": {
            "Values": [],
            "vLinkText": null,
            "cIsExternalLink": "N",
            "vLinkURL": null,
            "vLinkType": null
        },
        "LinkElementDetails": {}
    };
    return objElementJson;
};