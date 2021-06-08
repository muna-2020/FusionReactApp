import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultTextHighlightElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the initial json for adding a TextHighlight element.
 * @returns {object} Initial TextHighlight Json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "TextHighlight",
        "iElementTypeId": 59,
        "vElementJson": {
            "dCorrectPoint": 1,
            "dWrongPoint": -0.5,
            "dNotAnsweredPoint": 0.0,
            "Colors": ["#fff"],
            "vText": "The texthighlight element allow users to highlight block of text with different colors",
            "Values": [],
            "SubElements": [],
            "TextElements": []
        }
    }
    return objElementJson;
}