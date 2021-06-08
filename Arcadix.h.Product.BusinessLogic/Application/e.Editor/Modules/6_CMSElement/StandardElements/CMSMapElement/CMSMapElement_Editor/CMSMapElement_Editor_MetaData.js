//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for MapElement.
 * @returns {object} default MapElement json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "MapElement",
        "iElementTypeId": 61,
        "vContainerElementProperties": {},
        "vElementJson": {
            "cShowHeaderText": "N",
            "cIsPointOverride": "N",
            "dNotAnsweredPoint": 0,
            "dCorrectPoint": 0,
            "dWrongPoint": 0,
            "cIsTaskType": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "Values": [],
            "Tolerance": 5,
            "PointsInterval": 10,
            "Coordinates": [],
            "TextElements": []
        },
        "MappedElements": [],
        "cIsFirstLoad": "Y",
    };
    return objElementJson;
};
