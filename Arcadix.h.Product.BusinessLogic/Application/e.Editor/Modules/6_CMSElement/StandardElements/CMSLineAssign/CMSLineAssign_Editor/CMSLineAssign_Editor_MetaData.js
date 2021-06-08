//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module realted fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for line assign.
 * @returns {object} default lineassign json.
 */
export const GetDefaultElementJson = (intOrder) => {

    let iElementQuestionId1 = UniqueId.GetUniqueId();
    let iElementQuestionId2 = UniqueId.GetUniqueId();
    let iElementQuestionId3 = UniqueId.GetUniqueId();
    let iElementQuestionId4 = UniqueId.GetUniqueId();
    let iElementAnswerId1 = UniqueId.GetUniqueId();
    let iElementAnswerId2 = UniqueId.GetUniqueId();
    let iElementAnswerId3 = UniqueId.GetUniqueId();
    let iElementAnswerId4 = UniqueId.GetUniqueId();
    let iElementTextId1 = UniqueId.GetUniqueId();
    let iElementTextId2 = UniqueId.GetUniqueId();
    let iElementTextId3 = UniqueId.GetUniqueId();
    let iElementTextId4 = UniqueId.GetUniqueId();
    let iElementTextId5 = UniqueId.GetUniqueId();
    let iElementTextId6 = UniqueId.GetUniqueId();
    let iElementTextId7 = UniqueId.GetUniqueId();
    let iElementTextId8 = UniqueId.GetUniqueId();
    let objTextElementJson1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId1, "Text");
    let objTextElementJson2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId2, "Text");
    let objTextElementJson3 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId3, "Text");
    let objTextElementJson4 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId4, "Text");
    let objTextElementJson5 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId5, "Text");
    let objTextElementJson6 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId6, "Text");
    let objTextElementJson7 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId7, "Text");
    let objTextElementJson8 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId8, "Text");
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "LineAssign",
        "iElementTypeId": 58,
        "vElementJson": {
            "iHeight": null,
            "iWidth": null,
            "cShowHeaderText": "N",
            "dCorrectPoint": 1,
            "dWrongPoint": -0.5,
            "dNotAnsweredPoint": 0.0,
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "Questions": [
                {
                    "iElementQuestionId": iElementQuestionId1,
                    "iElementTextId": iElementTextId1
                },
                {
                    "iElementQuestionId": iElementQuestionId2,
                    "iElementTextId": iElementTextId2
                },
                {
                    "iElementQuestionId": iElementQuestionId3,
                    "iElementTextId": iElementTextId3
                },
                {
                    "iElementQuestionId": iElementQuestionId4,
                    "iElementTextId": iElementTextId4
                }
            ],
            "Answers": [
                {
                    "iElementAnswerId": iElementAnswerId1,
                    "iElementTextId": iElementTextId5
                },
                {
                    "iElementAnswerId": iElementAnswerId2,
                    "iElementTextId": iElementTextId6
                },
                {
                    "iElementAnswerId": iElementAnswerId3,
                    "iElementTextId": iElementTextId7
                },
                {
                    "iElementAnswerId": iElementAnswerId4,
                    "iElementTextId": iElementTextId8
                }
            ],
            "Values": [
                //{
                //    "iElementValueId": UniqueId.GetUniqueId(),
                //    "iElementQuestionId": iElementQuestionId1,
                //    "iElementAnswerId": iElementAnswerId1
                //}
            ],
            "TextElements": [
                {
                    ...objTextElementJson1
                },
                {
                    ...objTextElementJson2
                },
                {
                    ...objTextElementJson3
                },
                {
                    ...objTextElementJson4
                },
                {
                    ...objTextElementJson5
                },
                {
                    ...objTextElementJson6
                },
                {
                    ...objTextElementJson7
                },
                {
                    ...objTextElementJson8
                }
            ]
        }
    }
    return objElementJson;
}