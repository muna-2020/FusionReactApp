import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultCrossOutWordElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the initial json for adding a CrossOutWord element.
 * @returns {object} Initial CrossOutWord Json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "CrossOutWord",
        "iElementTypeId": 60,
        "vElementJson": {
            "dCorrectPoint": 1,
            "dWrongPoint": -0.5,
            "dNotAnsweredPoint": 0.0,
            "iAnswerCount": 0,
            "Colors": ["#fff"],
            "vText": "Strike out is represented by words with a horizontal line through their center. It implies that the text is wrong and was recently deleted or marked as such.",
            "Values": [],
            "SubElements": [],
            "TextElements": []
        }
    }
    return objElementJson;
}