//Application state Classes
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultInitialAndResourceAttributeValue
 * @param {string} strType data type
 * @summary Sets the initial attribute value for the data type.
 * @returns {object} initial and resource attribute value for the data type.
 */
const GetDefaultInitialAndResourceAttributeValue = (strType) => {
    if (strType.toLowerCase() === "image" || strType.toLowerCase() === "htmlimage") {
        return {
            "vType": strType,
            "vValue": null
        };
    }
    else if (strType.toLowerCase() === "array") {
        return [];
    }
    else if (strType.toLowerCase() === "number") {
        return {
            "vType": strType,
            "vValue": null
        };
    }
    else {
        return {
            "vType": strType,
            "vValue": null
        };
    }
};

/**
 * @name GetDefaultAnswerAttributeValue
 * @param {string} strType data type
 * @summary Sets the answer attribute value for the data type.
 * @returns {object} answer attribute value for the data type.
 */
const GetDefaultAnswerAttributeValue = (strType) => {
    if (strType.toLowerCase() === "array") {
        return {
            "Min": [],
            "Max": [],
            "Tolerance": []
        };
    }
    else if (strType.toLowerCase() === "number") {
        return {
            "Min": {
                "vType": strType,
                "vValue": null
            },
            "Max": {
                "vType": strType,
                "vValue": null
            },
            "Tolerance": {
                "vType": "Number",
                "vValue": 0
            }
        };
    }
    else {
        return {
            "Min": {
                "vType": strType,
                "vValue": null
            },
            "Max": {
                "vType": strType,
                "vValue": null
            },
            "Tolerance": {
                "vType": "Number",
                "vValue": 0
            }
        };
    }
};

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder Order of element in container.
 * @param {number} objAnimationElementJson keys to be included in th element json.
 * @summary This method returns the initial json for adding a construct element.
 * @returns {object} Initial construct Json.
 */
export const GetDefaultElementJson = (intOrder, objAnimationElementJson) => {
    objAnimationElementJson = objAnimationElementJson["objElementJson"];
    let objInitailAttributeValue = {};
    let objAnswerAttributeValue = {};
    let objResourceAttributeValue = {};
    let arrPoints = [];
    objAnimationElementJson["vElementJson"]["AnimationAttributes"].map(objTempData => {
        let strAttributeType = objTempData["vAttributeName"].split("_")[0];
        switch (strAttributeType.toLowerCase()) {
            case "initialarcadix":
                objInitailAttributeValue = {
                    ...objInitailAttributeValue,
                    [objTempData["vAttributeName"]]: GetDefaultInitialAndResourceAttributeValue(objTempData["vType"])
                };
                break;
            case "resourcearcadix":
                objResourceAttributeValue = {
                    ...objResourceAttributeValue,
                    [objTempData["vAttributeName"]]: GetDefaultInitialAndResourceAttributeValue(objTempData["vType"])
                };
                break;
            case "resultarcadix":
                objAnswerAttributeValue = {
                    ...objAnswerAttributeValue,
                    [objTempData["vAttributeName"]]: GetDefaultAnswerAttributeValue(objTempData["vType"])
                };
                arrPoints = [
                    ...arrPoints,
                    {
                        "vAttributeName": objTempData["vAttributeName"],
                        "dCorrectPoint": 0,
                        "dWrongPoint": 0
                    }
                ];
                break;
        };
    });
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "AnimationWrapper",
        "iElementTypeId": 31,
        "vElementJson": {
            "iElementAnimationId": objAnimationElementJson["iElementId"],
            "iHeight": parseInt(objAnimationElementJson["vElementJson"]["iHeight"]),
            "iWidth": parseInt(objAnimationElementJson["vElementJson"]["iWidth"]),
            "cIsPointOverride": "N",
            "dNotAnsweredPoint": 0,
            "dCorrectPoint": 0,
            "dWrongPoint": 0,
            "cShowHeaderText": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "InitialAttributeValue": objInitailAttributeValue,
            "AnswerAttributeValue": objAnswerAttributeValue,
            "ResourceAttributeValue": objResourceAttributeValue,
            "Points": arrPoints,
            "TextElements": []
        },
        "cIsFusionVersion": "Y",
        "vAnimationElementJson": {
            ...objAnimationElementJson
        },
        "cIsFirstLoad": "Y"
    };
    return objElementJson;
};
