//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {number} iOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for ColorFill.
 * @returns {object} default ColorFill json
*/
export const GetDefaultElementJson = (iOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": iOrder,
        "iElementTypeId": 33,
        "vElementTypeName": "ColorFill",
        "cIsDisplayedInElementTree": "Y",
        "vElementJson": {
            "cShowHeaderText": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "vColorFillJson": "",
            "Value": [],
            "vColorFillName": "",
            "vElementColorFillDescription": "",
            "vElementColorFillFileName": "",
            "iColorFillFileVersion": 1,
            "iColorFillFileSize": "",
            "vColorFillType": "",
            "TextElements": []
        }
    };
    return objElementJson;
};

/**
 * @name GetDefaultAnswerRange
 * */
export const GetDefaultAnswerRange = (objParams) => {
    const { vColorValue, vClientElementId, iColorFillInstanceValueId } = objParams;
    return {
        "vColorValue": vColorValue,
        "vClientElementId": vClientElementId,
        "iColorFillInstanceValueId": iColorFillInstanceValueId
    };
}

/**
 * @name ConvertSVGIntoJson
 * @param {any} node
 */
export const ConvertSVGIntoJson = (node) => {
    var strSVGJson = ""
    switch (node.nodeName.toLowerCase()) {
        case "text":
            strSVGJson = ConvertTextIntoJson(node);
            break;
        case "image":
            strSVGJson = ConvertImageIntoJson(node);
            break;
        case "circle":
            strSVGJson = ConvertCircleIntoJson(node);
            break;
        case "rect":
            strSVGJson = ConvertRectIntoJson(node);
            break;
        case "ellipse":
            strSVGJson = ConvertEllipseIntoJson(node);
            break;
        case "path":
            strSVGJson = ConvertPathIntoJson(node);
            break;
        default:
            break;
    }
    return {
        ...strSVGJson,
        ["type"]: node.nodeName,
        ["IsColorFill"]: "N"
    };
}

/**
 * @name ConvertEllipseIntoJson
 * @param {any} node
 */
const ConvertEllipseIntoJson = (node) => {
    var objEllipseJson = {};
    var arrAttributes = node.attributes;
    for (var i = 0; i < arrAttributes.length; i++) {
        if (arrAttributes[i].style) {
            for (var intCount = 0; intCount < arrAttributes[i].style.length; intCount++) {
                var strProperty = arrAttributes[i].style[intCount];
                objEllipseJson = { ...objEllipseJson, [strProperty]: arrAttributes[i].style[strProperty] };
            }
            continue;
        }
        objEllipseJson = { ...objEllipseJson, [arrAttributes[i].name]: arrAttributes[i].value };
    }
    return objEllipseJson;
}

/**
 * @name ConvertPathIntoJson
 * @param {any} node
 */
const ConvertPathIntoJson = (node) => {

}

/**
 * @name ConvertRectIntoJson
 * @param {any} node
 */
const ConvertRectIntoJson = (node) => {

}

/**
 * @name ConvertCircleIntoJson
 * @param {any} node
 */
const ConvertCircleIntoJson = (node) => {

}

/**
 * @name ConvertImageIntoJson
 * */
const ConvertImageIntoJson = () => {

}

/**
 * @name ConvertTextIntoJson
 * */
const ConvertTextIntoJson = () => {

}