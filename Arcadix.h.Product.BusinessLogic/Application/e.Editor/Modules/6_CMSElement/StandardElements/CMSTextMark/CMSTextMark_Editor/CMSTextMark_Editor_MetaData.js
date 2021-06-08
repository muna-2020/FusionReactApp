//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name GetDefaultTextMarkElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the initial json for adding a TextMark element.
 * @returns {object} Initial TextMark Json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let iElementTextMarkId = UniqueId.GetUniqueId();
    let objElementJson = {
        "iElementId": iElementTextMarkId,
        "iElementTypeId": 19,
        "vElementTypeName": "TextMark",
        "iOrder": intOrder,
        "vElementJson": {
            "cIsPointOverride": "N",
            "cIsCollapsable": "N",
            "dNotAnsweredPoint": 0,
            "cIsShowFrame": "N",
            "vText": "Text",
            "Values": [],
            "SubElements": []
        }
    };
    return objElementJson;
};
