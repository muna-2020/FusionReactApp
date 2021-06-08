//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder Order id of the text element
 * @param {number} intElementId Element Id of the Text Element
 * @summary Returns the default Element Json for the CMSText Component.
 * @returns {object} Element Json of text element.
 */
export const GetDefaultElementJson = (intOrder, intElementId = null, strDefaultText = null) => {
    let objElementJson = {
        "iElementId": intElementId !== null ? intElementId : UniqueId.GetUniqueId(),
        "iElementTypeId": 1,
        "vElementTypeName": "Text",
        "vJsonType" : "client",
        "iOrder": intOrder,
        "vContainerElementProperties": {
            "vElementVerticalAlignment": "top",
            "vElementHorizontalAlignment": "left",
        },
        "vElementJson": {
            "vText": strDefaultText !== null ? strDefaultText : "Text",
            "SubElements": [],
            "cIsToggleText": "N",
            "cIsWithBorder" : "N",
            "iShowContentTime": 0,           
        }
    };
    return objElementJson;
};
