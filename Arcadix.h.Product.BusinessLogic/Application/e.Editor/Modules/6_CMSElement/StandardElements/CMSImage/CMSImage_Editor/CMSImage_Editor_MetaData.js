//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetTextObject
 * @param {unique} iElementTextId Text element ID
 * @summary returns a dummy object of the Text
 * @returns {object} Dummy Text element value
*/
export const GetTextElementObject = (iElementTextId) => {
    return {
        "iElementTextId": iElementTextId,
        "vElementTypeName": "Text",
        "cIsCorrectValue": "N",
        "dCorrectPoint": null,
        "dNotAnsweredPoint": null,
        "dWrongPoint": null,
        "iDisplayOrder": 1,
        "vVerticalAlign": "top"
    };
};

/**
 * @name GetDefaultContainerElementProperties
 * @returns {object} returns default container element properties for an image element.
 * */
export const GetDefaultContainerElementProperties = () => {
    return {
        "vContainerElementProperties": {
            "vElementVerticalAlignment": "middle",
            "vElementHorizontalAlignment": "center",
            "iElementWidth": null,
            "iElementHeight": null
        }
    }
}

/**
 * @name GetDefaultElementJson
 * @param {number} iOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for Image.
 * @returns {object} default image json
*/
export const GetDefaultElementJson = (iOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": iOrder,
        "iElementTypeId": 2,
        "vElementTypeName": "Image",
        "cIsDisplayedInElementTree": "Y",
        "cIsFusionVersion": "Y",
        "vElementJson": {
            "cShowHeaderText": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "vElementImageDescription": "",
            "vImageName": null,
            "vElementImageFileName": "",
            "vElementImageTitle": "",
            "vImageType": "",
            "cHasTextOnTop": "N",
            "cIsHighResolution": "N",
            "cShowDescription": "N",
            "cShowTitle": "N",
            "iElementImageHeight": "",
            "iElementImageWidth": "",
            "iImageFileSize": "",
            "iImageFileVersion": 1,
            "iImageHighResolutionFileSize": 0,
            "cIsFileChanged": "N",
            "TextElements": []
        },
        ...GetDefaultContainerElementProperties()
    };
    return objElementJson;
};
