//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for checkbox.
 * @returns {object} default checkbox json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "IFrame",
        "iElementTypeId": 49,
        "vElementJson": {
            "iHeight": null,
            "iWidth": null,
            "cShowHeaderText": "N",
            "cIsScroll": "N",
            "vURL": "",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "TextElements": []
        },
        "cIsFirstLoad": "Y"
    };
    return objElementJson;
};
