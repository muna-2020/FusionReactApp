//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module realted fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name GetDefaultElementJson
 * @param {boolean} blnIsTextOverlay true/false if it is a text overlay or image
 * @param {string} strOverlayKeyword selected keyword
 * @summary This method returns the Initial Json for checkbox.
 * @returns {object} default checkbox json.
 */
export const GetDefaultElementJson = (blnIsTextOverlay, strOverlayKeyword = null) => {
    let intElementOverlayId = UniqueId.GetUniqueId();
    let intElementTextId = UniqueId.GetUniqueId();
    let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId);
    let objElementJson = {
        "iElementId": intElementOverlayId,
        "vElementTypeName": "Overlay",
        "iElementTypeId": 47,
        "vElementJson": {
            "cIsTextOverlay": blnIsTextOverlay ? "Y" : "N",
            "cIsFixedWidth": "N",
            "iWidth": 0,
            "Values": [
                {
                    "iElementTextId": intElementTextId,
                    "vOverlayKeyword": strOverlayKeyword
                }
            ],
            "TextElements": [
                {
                    ...objTextElementJson,
                    ["vElementJson"]: {
                        ...objTextElementJson["vElementJson"],
                        ["vText"]: ""
                    }
                }
            ]
        },
        "cIsFirstLoad": "Y"
    };
    return objElementJson;
};
