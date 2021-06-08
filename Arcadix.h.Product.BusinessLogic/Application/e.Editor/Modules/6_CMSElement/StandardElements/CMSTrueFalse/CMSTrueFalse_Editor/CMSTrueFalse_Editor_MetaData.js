//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module related fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
  * @name GetDefaultElementJson
  * @param {number} intOrder The order where the Element needs to be added.
  * @summary This method returns the Initial Json for checkbox.
  * @returns {object} default checkbox json.
  */
export const GetDefaultElementJson = (intOrder) => {
    let iElementTextId1 = UniqueId.GetUniqueId();
    let iElementTextId2 = UniqueId.GetUniqueId();
    let objTextElementJson1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId1,"True");
    let objTextElementJson2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId2,"False");
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "TrueFalse",
        "iElementTypeId": 200,
        "HeaderValues": [
            {
                "iElementTextId": null,
                "vHeaderType": "ElementHeader"
            }
        ],
        "vElementJson": {   
            "dNotAnsweredPoint": 0,
            "Values": [
                {
                    "iElementTrueFalseValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextId1,
                    "iDisplayOrder": 1,
                    "cIsCorrectValue": "N",
                    "vVerticalAlign": "top",
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                },
                {
                    "iElementTrueFalseValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextId2,
                    "iDisplayOrder": 2,
                    "cIsCorrectValue": "N",
                    "vVerticalAlign": "top",
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                }
            ],
            "TextElements": [
                {
                    ...objTextElementJson1
                },
                {
                    ...objTextElementJson2
                }
            ]
        }
    };
    return objElementJson;
};
