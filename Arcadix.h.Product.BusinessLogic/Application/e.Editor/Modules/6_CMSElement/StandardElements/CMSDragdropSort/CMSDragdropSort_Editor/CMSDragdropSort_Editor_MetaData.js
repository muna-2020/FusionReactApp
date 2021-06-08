//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module realted fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name GetDefaultValue
 * @param {object} objContext {state, props, dispatch, CMSDragdropSort_Editor_ModuleProcessor}
 * @param {string} iElementTextId ielementid of mapped text element.
 * @summary Forms a default object for DragdropSort value
 * @returns {object} Default DragdropSort Value
*/
export const DefaultValue = (objContext, iElementTextId) => {
    let objDefaultValue = {
        "iElementDragDropSortValueId": UniqueId.GetUniqueId(),
        "iElementTextId": iElementTextId,
        "iDisplayOrder": 1,
        "dCorrectPoint": 0,
        "dWrongPoint": 0
    };
    return objDefaultValue;
};

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the initial json for adding a DragdropSort element.
 * @returns {object} Initial DragdropSort Json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let iElementDragDropSortId = UniqueId.GetUniqueId();
    let iElementTextId1 = UniqueId.GetUniqueId();
    let iElementTextId2 = UniqueId.GetUniqueId();
    let objTextElementJson1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId1);
    let objTextElementJson2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId2);
    let objElementJson = {
        "iElementId": iElementDragDropSortId,
        "iOrder": intOrder,
        "vElementTypeName": "DragDropSort",
        "iElementTypeId": 18,
        "vElementJson": {
            "cIsHorizontal": "N",
            "cShowHeaderText": "N",
            "cIsFitToContent": null,
            "cIsPointOverride": "N",
            "dNotAnsweredPoint": 0,
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "Values": [
                {
                    "iElementDragDropSortValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextId1,
                    "iDisplayOrder": 1,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                },
                {
                    "iElementDragDropSortValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextId2,
                    "iDisplayOrder": 2,
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
