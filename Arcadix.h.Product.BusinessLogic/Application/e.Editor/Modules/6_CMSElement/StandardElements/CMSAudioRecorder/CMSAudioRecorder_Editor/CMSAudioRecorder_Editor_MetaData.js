//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {number} iOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for Audio.
 * @returns {object} default audio json
 */
export const GetDefaultElementJson = (iOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": iOrder,
        "iElementTypeId": 62,
        "vElementTypeName": "AudioRecorder",
        "cIsDisplayedInElementTree": "Y",
        "vElementJson": {
            "cShowHeaderText": "N",
            "cIsTaskAudio": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "TextElements": [],
            "AudioSources":[],
        },
    };
    return objElementJson;
};