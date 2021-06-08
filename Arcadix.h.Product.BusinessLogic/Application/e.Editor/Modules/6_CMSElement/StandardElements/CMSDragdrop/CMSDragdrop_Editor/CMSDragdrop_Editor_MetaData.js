//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module realted fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name DefaultValue
 * @param {object} objContext {state, props, dispatch, CMSDragdrop_Editor_ModuleProcessor}
 * @param {number} intQuestionElementTextId iElementId of Text Element that is mapped to this returned default value.
 * @param {number} intAnswerElementTextId iElementId of Text Element that is mapped to this returned default value.
 * @summary Forms default object for dragdrop value.
 * @returns {object} Dragdrop's default value object.
 */
export const GetDefaultQuestionAnswerValue = (objContext, intQuestionElementTextId, intAnswerElementTextId) => {
    let iElementDragDropQuestionId = UniqueId.GetUniqueId();
    let iElementDragDropAnswerId = UniqueId.GetUniqueId();
    let objDefualtValue = {
        "Question": {
            "iElementDragDropQuestionId": iElementDragDropQuestionId,
            "iElementTextId": intQuestionElementTextId,
            "cIsHidden": "N"
        },
        "Answer": {
            "iElementDragDropAnswerId": iElementDragDropAnswerId,
            "iElementTextId": intAnswerElementTextId,
            "cIsHidden": "N"
        },
        "Value": {
            "iElementDragDropValueId": UniqueId.GetUniqueId(),
            "iElementDragDropQuestionId": iElementDragDropQuestionId,
            "iElementDragDropAnswerId": iElementDragDropAnswerId,
            "dCorrectPoint": 0,
            "dWrongPoint": 0,
            "iDisplayOrder": 1
        }
    };
    return objDefualtValue;
};

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for dragdrop.
 * @returns {object} default dragdrop json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let iElementTextId1 = UniqueId.GetUniqueId();
    let iElementTextId2 = UniqueId.GetUniqueId();
    let iElementTextId3 = UniqueId.GetUniqueId();
    let iElementTextId4 = UniqueId.GetUniqueId();
    let iElementDragDropQuestionId1 = UniqueId.GetUniqueId();
    let iElementDragDropQuestionId2 = UniqueId.GetUniqueId();
    let iElementDragDropAnswerId1 = UniqueId.GetUniqueId();
    let iElementDragDropAnswerId2 = UniqueId.GetUniqueId();
    let objTextElementJson1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId1);
    let objTextElementJson2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId2);
    let objTextElementJson3 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId3);
    let objTextElementJson4 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId4);
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "vElementTypeName": "DragDrop",
        "iElementTypeId": 13,
        "iOrder": intOrder,
        "vElementJson": {
            "iElementQuestionWidth": 180,
            "iElementAnswerWidth": 198,
            "cShowHeaderText": "N",
            "cIsPointOverride": "N",
            "dNotAnsweredPoint": 0.0,
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "Questions": [
                {
                    "iElementDragDropQuestionId": iElementDragDropQuestionId1,
                    "iElementTextId": iElementTextId1,
                    "cIsHidden": "N"
                },
                {
                    "iElementDragDropQuestionId": iElementDragDropQuestionId2,
                    "iElementTextId": iElementTextId2,
                    "cIsHidden": "N"
                }
            ],
            "Answers": [
                {
                    "iElementDragDropAnswerId": iElementDragDropAnswerId1,
                    "iElementTextId": iElementTextId3,
                    "cIsHidden": "N"
                },
                {
                    "iElementDragDropAnswerId": iElementDragDropAnswerId2,
                    "iElementTextId": iElementTextId4,
                    "cIsHidden": "N"
                }
            ],
            "Values": [
                {
                    "iElementDragDropValueId": UniqueId.GetUniqueId(),
                    "iElementDragDropQuestionId": iElementDragDropQuestionId1,
                    "iElementDragDropAnswerId": iElementDragDropAnswerId1,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0,
                    "iDisplayOrder": 1
                },
                {
                    "iElementDragDropValueId": UniqueId.GetUniqueId(),
                    "iElementDragDropQuestionId": iElementDragDropQuestionId2,
                    "iElementDragDropAnswerId": iElementDragDropAnswerId2,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0,
                    "iDisplayOrder": 2
                }
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
                }
            ]
        }
    };
    return objElementJson;
};
