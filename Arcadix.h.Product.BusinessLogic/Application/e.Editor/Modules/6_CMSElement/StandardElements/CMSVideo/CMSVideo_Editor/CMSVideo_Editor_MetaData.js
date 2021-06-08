//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

export const iNumberOfMediaReplay = 3; // default value for unlimited times

export const iWidth = 388; // default player width

export const iHeight = 300; // default player height

/**
 * @name GetDefaultContainerElementProperties
 * @returns {object} returns default container element properties for a video element.
 * */
export const GetDefaultContainerElementProperties = () => {
    return {
        "vContainerElementProperties": {
            "vElementVerticalAlignment": null,
            "vElementHorizontalAlignment": null,
            "iElementWidth": iWidth,
            "iElementHeight": iHeight,
            "iNumberOfMediaReplay": iNumberOfMediaReplay
        }
    }
}

/**
 * @name GetDefaultElementJson
 * @param {number} iOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for Video.
 * @returns {object} default video json
*/
export const GetDefaultElementJson = (iOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": iOrder,
        "vElementTypeName": "Video",
        "iElementTypeId": 12,
        "cIsDisplayedInElementTree": "Y",
        "vElementJson": {
            "cShowHeaderText": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "cIsFileChanged": "N",
            "iVideoFileSize": "",
            "iVideoFileVersion": 1,
            "iVideoTime": "",
            "vVideoDescription": "",
            "vVideoFileName": "",
            "vVideoName": "",
            "vVideoType": "",
            "cIsVimeo": "N",
            "iNumberOfReplays": iNumberOfMediaReplay,
            "cIsTranscodingComplete": "N",
            "vVimeoPath": "",
            "TextElements": []
        },
        ...GetDefaultContainerElementProperties()
    };
    return objElementJson;
};

export const GetDefaultVideoControl = (ElementJson, blnDisplayMode = false) => {
    let iElementWidth = iWidth;
    let iElementHeight = iHeight;
    if (ElementJson.vContainerElementProperties &&
        ElementJson.vContainerElementProperties.iElementWidth &&
        ElementJson.vContainerElementProperties.iElementHeight &&
        ElementJson.vContainerElementProperties.iElementWidth > 0 &&
        ElementJson.vContainerElementProperties.iElementHeight > 0 &&
        !blnDisplayMode) {
        iElementWidth = ElementJson.vContainerElementProperties.iElementWidth;
        iElementHeight = ElementJson.vContainerElementProperties.iElementHeight;
    }
    return {
        "boolFastForwardEnabled": true,
        "boolMediaLoaded": false,
        "boolPlay": false,
        "iCurrentTime": 0,
        "boolMute": false,
        "boolTrackEnd": false,
        "iReplayPlayed": 0,
        "iVideoTime": ElementJson.vElementJson.iVideoTime,
        "iWidth": iElementWidth,
        "iHeight": iElementHeight,
        "boolResetControls": false,
        "iVolume": 0.5 //0-1
    }
}