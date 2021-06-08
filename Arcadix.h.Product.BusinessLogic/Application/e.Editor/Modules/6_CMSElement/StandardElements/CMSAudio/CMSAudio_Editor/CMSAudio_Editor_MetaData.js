//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

export const iNumberOfMediaReplay = 3; // default value for unlimited times

export const iAudioWidth = 388; // default width
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
        "iElementTypeId": 10,
        "vElementTypeName": "Audio",
        "cIsDisplayedInElementTree": "Y",
        "vElementJson": {
            "cShowHeaderText": "N",
            "cIsFileChanged": "N",
            "vAudioName": "",
            "vAudioDescription": "",
            "iAudioTime": null,
            "iAudioFileSize": null,
            "iAudioFileVersion": 1,
            "vAudioFileName": null,
            "vAudioType": "",
            "cHasBeenRecorded": "N",
            "iNoOfReplays": null,
            "cIsTaskAudio": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "TextElements": [],
        },
        ...GetDefaultContainerElementProperties()
    };
    return objElementJson;
};

export const GetDefaultAudioControl = (objElementJson) => {
    return {
        "iCurrentTime": 0,
        "boolPlay": false,
        "boolMute": false,
        "iReplayPlayed": 0,
        "iAudioTime": objElementJson.vElementJson.iAudioTime,
        "boolTrackEnd": false,
        "iWidth": iAudioWidth,
        "boolFastForwardEnabled": true,
        "boolMediaLoaded": false,
        "boolTrackEnd": false,
        "boolResetControls": false,
        "iVolume": 0.5 //0-1
    }
}

/**
 * @name GetDefaultContainerElementProperties
 * @returns {object} returns default container element properties for an audio element.
 * */
export const GetDefaultContainerElementProperties = (iReplay = null) => {
    return {
        "vContainerElementProperties": {
            "vElementVerticalAlignment": null,
            "vElementHorizontalAlignment": null,
            "iElementWidth": null,
            "iElementHeight": null,
            "iNumberOfMediaReplay": iReplay != null ? iReplay : iNumberOfMediaReplay
        }
    }
}