//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {number} iOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for ColorFillWrapper.
 * @returns {object} default ColorFillWrapper json
*/
export const GetDefaultElementJson = (iOrder, objColorFillElementJson) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": iOrder,
        "iElementTypeId": 43,
        "vElementTypeName": "ColorFillInstance",
        "vElementJson": {
            "cShowHeaderText": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "iElementColorFillId": objColorFillElementJson["iElementId"],
            "vColorFillJson": [],
            "vCapturedColors": [],
            "Values": [],
            "cIsPointOverride": "N",
            "dCorrectPoint": 1,
            "dWrongPoint": -0.5,
            "dNotAnsweredPoint": 0.0,
            "TextElements": []
        },
        "cIsFusionVersion": "Y",
        "vColorFillElementJson": {
            ...objColorFillElementJson
        },
        "cIsFirstLoad": "Y"
    };
    return objElementJson;
};

/**
 * @name GetDefaultAnswerRange
 * */
export const GetDefaultAnswerRange = (objParams) => {
    const { vColorCode, vClientElementId, iColorFillInstanceValueId } = objParams;
    return {
        "vColorCode": vColorCode,
        "vClientElementId": vClientElementId,
        "iColorFillInstanceValueId": iColorFillInstanceValueId
    };
}