//React imports
import React from 'react';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module realted fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name DefaultValue
 * @param {object} objContext {state, props, dispatch, CMSDragdropAssign_Editor_ModuleProcessor}
 * @param {number} iElementTextId iElementId of the mapped TextElement
 * @summary Returns the default object for value.
 * @returns {object} Defualt value object
 */
export const GetDefaultValue = (objContext, arrTextElementIds) => {
    return {
        "iElementDragDropAssignValueId": UniqueId.GetUniqueId(),
        "cIsTemporary": "Y",
        "iElementTextId": arrTextElementIds,
        "iBlockId": -1,
        "iDisplayOrder": 1
    };
};

/**
 * @name GetElementJsonForSavedValues
 * @param {object} objElementJson Element json to be corrected for usage.
 * @summary Makes the elememnt json usable for the module.
 * @returns {object} Elemenrt Json.
 */
export const GetElementJsonForSavedValues = (objElementJson) => {
    let arrTextElements = objElementJson["vElementJson"]["TextElements"];
    let arrValues = objElementJson["vElementJson"]["Values"].map((objTempData) => {
        if (objTempData["cIsTemporary"] && objTempData["cIsTemporary"] === "Y" && objTempData["iElementTextId"] === null) {
            let iElementTextIdValue1 = UniqueId.GetUniqueId();
            let iElementTextIdValue2 = UniqueId.GetUniqueId();
            let iElementTextIdValue3 = UniqueId.GetUniqueId();
            let objTextElementJsonValue1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue1, "");
            let objTextElementJsonValue2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue2, "");
            let objTextElementJsonValue3 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue3, "");
            arrTextElements = [
                ...arrTextElements,
                {
                    ...objTextElementJsonValue1,
                    ["Ref"]: React.createRef()
                },
                {
                    ...objTextElementJsonValue2,
                    ["Ref"]: React.createRef()
                },
                {
                    ...objTextElementJsonValue3,
                    ["Ref"]: React.createRef()
                },
            ];
            return {
                ...objTempData,
                ["iElementTextId"]: [iElementTextIdValue1, iElementTextIdValue2, iElementTextIdValue3]
            };
        }
        else {
            return {
                ...objTempData
            };
        }
    });
    let objNewElementJson = {
        ...objElementJson,
        ["vElementJson"]: {
            ...objElementJson["vElementJson"],
            ["Values"]: arrValues,
            ["TextElements"]: arrTextElements
        }
    };
    return objNewElementJson;
}

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for DragdropAssign.
 * @returns {object} default DragdropAssign json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let iElementDragDropAssignId = UniqueId.GetUniqueId();
    let iElementTextIdHeader1 = UniqueId.GetUniqueId();
    let iElementTextIdHeader2 = UniqueId.GetUniqueId();
    let iElementTextIdHeader3 = UniqueId.GetUniqueId();
    let iElementTextIdValue1 = UniqueId.GetUniqueId();
    let iElementTextIdValue2 = UniqueId.GetUniqueId();
    let iElementTextIdValue3 = UniqueId.GetUniqueId();
    let iElementTextIdValue4 = UniqueId.GetUniqueId();
    let iElementTextIdValue5 = UniqueId.GetUniqueId();
    let iElementTextIdValue6 = UniqueId.GetUniqueId();
    let iElementTextIdValue7 = UniqueId.GetUniqueId();
    let iElementTextIdValue8 = UniqueId.GetUniqueId();
    let iElementTextIdValue9 = UniqueId.GetUniqueId();
    let objTextElementJsonHeader1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdHeader1, "");
    let objTextElementJsonHeader2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdHeader2, "");
    let objTextElementJsonHeader3 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdHeader3, "");
    let objTextElementJsonValue1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue1, "");
    let objTextElementJsonValue2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue2, "");
    let objTextElementJsonValue3 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue3, "");
    let objTextElementJsonValue4 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue4, "");
    let objTextElementJsonValue5 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue5, "");
    let objTextElementJsonValue6 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue6, "");
    let objTextElementJsonValue7 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue7, "");
    let objTextElementJsonValue8 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue8, "");
    let objTextElementJsonValue9 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdValue9, "");
    let objElementJson = {
        "iElementId": iElementDragDropAssignId,
        "iOrder": intOrder,
        "vElementTypeName": "DragDropAssign",
        "iElementTypeId": 48,
        "vElementJson": {
            "cShowHeaderText": "N",
            "cIsPointOverride": "N",
            "dCorrectPoint": 0,
            "dWrongPoint": 0,
            "dNotAnsweredPoint": 0,
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                },
                {
                    "iElementDragDropAssignHeaderValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextIdHeader1,
                    "vHeaderType": "ColumnHeader",
                    "iBlockId": 1,
                    "iWidth": 170
                },
                {
                    "iElementDragDropAssignHeaderValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextIdHeader2,
                    "vHeaderType": "ColumnHeader",
                    "iBlockId": 2,
                    "iWidth": 170
                },
                {
                    "iElementDragDropAssignHeaderValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextIdHeader3,
                    "vHeaderType": "ColumnHeader",
                    "iBlockId": 3,
                    "iWidth": 170
                }
            ],
            "Values": [
                {
                    "iElementDragDropAssignValueId": UniqueId.GetUniqueId(),
                    "cIsTemporary": "Y",
                    "iElementTextId": [iElementTextIdValue1, iElementTextIdValue2, iElementTextIdValue3],
                    "iDisplayOrder": 1,
                    "iBlockId": -1
                },
                {
                    "iElementDragDropAssignValueId": UniqueId.GetUniqueId(),
                    "cIsTemporary": "Y",
                    "iElementTextId": [iElementTextIdValue4, iElementTextIdValue5, iElementTextIdValue6],
                    "iDisplayOrder": 2,
                    "iBlockId": -1
                },
                {
                    "iElementDragDropAssignValueId": UniqueId.GetUniqueId(),
                    "cIsTemporary": "Y",
                    "iElementTextId": [iElementTextIdValue7, iElementTextIdValue8, iElementTextIdValue9],
                    "iDisplayOrder": 3,
                    "iBlockId": -1
                }
            ],
            "TextElements": [
                {
                    ...objTextElementJsonHeader1
                },
                {
                    ...objTextElementJsonHeader2
                },
                {
                    ...objTextElementJsonHeader3
                },
                {
                    ...objTextElementJsonValue1
                },
                {
                    ...objTextElementJsonValue2
                },
                {
                    ...objTextElementJsonValue3
                },
                {
                    ...objTextElementJsonValue4
                },
                {
                    ...objTextElementJsonValue5
                },
                {
                    ...objTextElementJsonValue6
                },
                {
                    ...objTextElementJsonValue7
                },
                {
                    ...objTextElementJsonValue8
                },
                {
                    ...objTextElementJsonValue9
                },
            ]
        }
    };
    return objElementJson;
};
