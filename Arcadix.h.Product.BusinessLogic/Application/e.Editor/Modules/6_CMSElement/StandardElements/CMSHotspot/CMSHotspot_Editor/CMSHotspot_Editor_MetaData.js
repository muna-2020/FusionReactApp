//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for Hotspot.
 * @returns {object} default hotspot json
*/
export const GetDefaultElementJson = (intOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iElementTypeId": 16,
        "iOrder": intOrder,
        "vElementTypeName": "Hotspot",
        "vElementJson": {
            "iMinimumToBeCorrect": null,
            "iMarkerCount": 0,
            "iHotspotMarkerId": 0,
            "cShowHeaderText": "N",
            "cIsPointOverride": "N",
            "dNotAnsweredPoint": 0,
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "Values": [],
            "dCorrectPoint": 1,
            "TextElements": []
        },
        "vImageElementJson": {}
    };
    return objElementJson;
};

/**
 * @name GetHotspotMarkerName
 * @param {integer} iMarkerId 
 * */
export const GetHotspotMarkerName = (iMarkerId) => {
    var strMarkerName = "";
    switch (iMarkerId) {
        case 1:
            strMarkerName = "HotspotCircle.png";
            break;
        case 2:
            strMarkerName = "HotspotHand.png";
            break;
        case 3:
            strMarkerName = "HotspotPoint.png";
            break;
        case 4:
            strMarkerName = "HotspotHandPointing.png";
            break;
        case 5:
            strMarkerName = "HotspotStar.png";
            break;
        case 6:
            strMarkerName = "HotspotX.png";
            break;
        default:
            strMarkerName = GetDefaultMarker();
            break;
    }
    return strMarkerName;
}

/**
 * @name GetDefaultMarker
 * */
export const GetDefaultMarker = () => {
    var iMainClientId = Number(JConfiguration.MainClientId);
    var strMarkerName;
    switch (iMainClientId) {
        case 97:
            strMarkerName = "JHotspotPointer.gif";
            break;
        case 115:
            strMarkerName = "JHotspotHandPointer.gif";
            break;
        default:
            strMarkerName = "JHotspotPointer.gif";
            break;
    }
    return strMarkerName;
}