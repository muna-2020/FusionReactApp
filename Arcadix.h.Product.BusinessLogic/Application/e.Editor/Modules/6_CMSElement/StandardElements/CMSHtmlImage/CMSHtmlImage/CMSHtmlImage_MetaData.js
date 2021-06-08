//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module related fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for CMSHtmlImage.
 * @returns {object} default CMSHtmlImage json.
 */
export const GetDefaultElementJson = (strHtml = "") => {
    let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, null, strHtml);
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "vElementTypeName": "HtmlImage",
        "iElementTypeId": 51,
        "vElementJson": {
            "iVersion": 0,
            "Values": [
                {
                    "iElementTextId": objTextElementJson["iElementId"]
                }
            ],
            "TextElements": [
                objTextElementJson
            ]
        }
    };
    return objElementJson;
};
