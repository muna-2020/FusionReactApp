//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDummySlideObject
 * @summary returns a dummy object of the slide
 * @returns {object} Dummy Slide Value
 */
export const GetDummySlideObject = () => {
    return {
        "iElementId": UniqueId.GetUniqueId(),
        "vElementTypeName": "Empty"
    };
};

/**
 * @name GetTextObject
 * @param {unique} iElementTextId Text element ID
 * @summary returns a dummy object of the Text
 * @returns {object} Dummy Text element value
 */
export const GetTextElementObject = (iElementTextId) => {
    return {
        "iElementTextId": iElementTextId,
        "vElementTypeName":"Text"
    };
};

/**
 * @name GetDefaultElementJson
 * @param {number} iOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for multipage.
 * @returns {object} default multipage json.
 */
export const GetDefaultElementJson = (iOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": iOrder,
        "iElementTypeId": "28",
        "vElementTypeName": "MultiPageElement",
        "vElementJson": {
            "cShowHeaderText": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            //"iElementWidth": "382",
            //"iElementHeight": "524",
            //"SetHeight": "false",
            "ElementValues":[],
            "Values": [],
            "TextElements": []
        }
    };
    return objElementJson;
};
