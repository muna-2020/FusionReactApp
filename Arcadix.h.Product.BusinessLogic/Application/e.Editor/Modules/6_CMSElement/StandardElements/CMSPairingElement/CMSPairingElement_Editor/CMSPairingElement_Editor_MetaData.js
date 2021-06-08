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
        "vElementTypeName": "PairingElement",
        "iElementTypeId": 35,
        "vElementJson": {
            "iHeight": null,
            "iWidth": null,
            "iMinResizeHeight": -1,
            "iMinResizeWidth": -1,
            "cShowHeaderText": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "dCorrectPoint": 1,
            "dWrongPoint": -0.5,
            "dNotAnsweredPoint": 0.0,
            "PairingElements": [],
            "SubElements": [],
            "Values": [],
            "TextElements": []
        },
        ["MappedElements"]: []
    };
    return objElementJson;
};
