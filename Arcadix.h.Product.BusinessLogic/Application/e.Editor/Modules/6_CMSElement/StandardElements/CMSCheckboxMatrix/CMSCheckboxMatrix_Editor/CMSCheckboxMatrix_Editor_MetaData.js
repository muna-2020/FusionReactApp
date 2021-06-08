//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module related fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name GetDefaultRow
 * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}
 * @param {number} intElementTextId Mapped TextElement's Id
 * @summary Contains the json for default object for Row value.
 * @returns {object} Row value object.
 */
export const GetDefaultRow = (objContext, intElementTextId) => {
    let objDefaultValue = {
        'iElementCheckBoxMatrixRowId': UniqueId.GetUniqueId(),
        "iElementTextId": intElementTextId,
        "vVerticalAlign": "top",
        "iDisplayOrder": 0
    };
    return objDefaultValue;
};

/**
 * @name GetDefaultColumn
 * @param {object} objContext {state, props, dispatch, CMSCheckboxMatrix_Editor_ModuleProcessor}
 * @param {number} intElementTextId Mapped TextElement's Id
 * @summary Contains the json for default object for Column value.
 * @returns {object} Column value object.
 */
export const GetDefaultColumn = (objContext, intElementTextId) => {
    let objDefaultValue = {
        "iElementCheckBoxMatrixColumnId": UniqueId.GetUniqueId(),
        "iElementTextId": intElementTextId,
        "iDisplayOrder": 0
    };
    return objDefaultValue;
};

/**
 * @name GetSkins
 * @summary Contains the Skins.
 * @returns {array} Skins
 */
export const GetSkins = () => {
    return [
        {
            "SkinId": 1,
            "SkinName": "TableDefault",
        },
        {
            "SkinId": 2,
            "SkinName": "TableBorderOnly",
        },
        {
            "SkinId": 3,
            "SkinName": "TableAlternate",
        },
        {
            "SkinId": 4,
            "SkinName": "TableOrangeAlternate",
        },
    ]
};

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the initial json for adding a CheckboxMatrix element.
 * @returns {object} default CheckboxMatrix Json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let iElementCheckBoxMatrixId = UniqueId.GetUniqueId();
    let iElementCheckBoxMatrixRowId1 = UniqueId.GetUniqueId();
    let iElementCheckBoxMatrixRowId2 = UniqueId.GetUniqueId();
    let iElementCheckBoxMatrixRowId3 = UniqueId.GetUniqueId();
    let iElementCheckBoxMatrixColumnId1 = UniqueId.GetUniqueId();
    let iElementCheckBoxMatrixColumnId2 = UniqueId.GetUniqueId();
    let iElementCheckBoxMatrixColumnId3 = UniqueId.GetUniqueId();
    let iElementTextIdRowHeader = UniqueId.GetUniqueId();
    let iElementTextIdRow1 = UniqueId.GetUniqueId();
    let iElementTextIdRow2 = UniqueId.GetUniqueId();
    let iElementTextIdRow3 = UniqueId.GetUniqueId();
    let iElementTextIdColumn1 = UniqueId.GetUniqueId();
    let iElementTextIdColumn2 = UniqueId.GetUniqueId();
    let iElementTextIdColumn3 = UniqueId.GetUniqueId();
    let objTextElementJsonRowHeader = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdRowHeader);
    let objTextElementJsonRow1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdRow1);
    let objTextElementJsonRow2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdRow2);
    let objTextElementJsonRow3 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdRow3);
    let objTextElementJsonColumn1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdColumn1);
    let objTextElementJsonColumn2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdColumn2);
    let objTextElementJsonColumn3 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdColumn3);
    let objElementJson = {
        "iElementId": iElementCheckBoxMatrixId,
        "iOrder": intOrder,
        "vElementTypeName": "CheckBoxMatrix",
        "iElementTypeId": 25,
        "vContainerElementProperties": {
            "vSkinName": "TableDefault",
        },
        "vElementJson": {
            "cIsRandomizedColumnDisplay": "N",
            "cIsRandomizedRowDisplay": "N",
            "cIsTitleToLeft": "Y",
            "cShowHeaderText": "N",
            "cIsPointOverride": "N",
            "dNotAnsweredPoint": 0,
            "cIsLikert": "N",
            "cSetHeaderFooterAsTitle": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                },
                {
                    "iElementTextId": iElementTextIdRowHeader,
                    "vHeaderType": "RowHeader"
                },
                {
                    "iElementTextId": null,
                    "vHeaderType": "TextLeft"
                },
                {
                    "iElementTextId": null,
                    "vHeaderType": "TextRight"
                }
            ],
            "MatrixRow": [
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId1,
                    "iElementTextId": iElementTextIdRow1,
                    "vVerticalAlign": "top",
                    "iDisplayOrder": 1
                },
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId2,
                    "iElementTextId": iElementTextIdRow2,
                    "vVerticalAlign": "top",
                    "iDisplayOrder": 2
                },
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId3,
                    "iElementTextId": iElementTextIdRow3,
                    "vVerticalAlign": "top",
                    "iDisplayOrder": 3
                }
            ],
            "MatrixColumn": [
                {
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId1,
                    "iElementTextId": iElementTextIdColumn1,
                    "iDisplayOrder": 1
                },
                {
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId2,
                    "iElementTextId": iElementTextIdColumn2,
                    "iDisplayOrder": 2
                },
                {
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId3,
                    "iElementTextId": iElementTextIdColumn3,
                    "iDisplayOrder": 3
                }
            ],
            "Values": [
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId1,
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId1,
                    "cIsCorrectValue": "Y",
                    "iDisplayOrder": 1,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                },
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId1,
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId2,
                    "cIsCorrectValue": "N",
                    "iDisplayOrder": 2,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                },
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId1,
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId3,
                    "cIsCorrectValue": "N",
                    "iDisplayOrder": 3,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                },
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId2,
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId1,
                    "cIsCorrectValue": "Y",
                    "iDisplayOrder": 4,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                },
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId2,
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId2,
                    "cIsCorrectValue": "N",
                    "iDisplayOrder": 5,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                },
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId2,
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId3,
                    "cIsCorrectValue": "N",
                    "iDisplayOrder": 6,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                },
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId3,
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId1,
                    "cIsCorrectValue": "Y",
                    "iDisplayOrder": 7,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                },
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId3,
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId2,
                    "cIsCorrectValue": "N",
                    "iDisplayOrder": 8,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                },
                {
                    "iElementCheckBoxMatrixRowId": iElementCheckBoxMatrixRowId3,
                    "iElementCheckBoxMatrixColumnId": iElementCheckBoxMatrixColumnId3,
                    "cIsCorrectValue": "N",
                    "iDisplayOrder": 9,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                }
            ],
            "TextElements": [
                {
                    ...objTextElementJsonRowHeader
                },
                {
                    ...objTextElementJsonRow1
                },
                {
                    ...objTextElementJsonRow2
                },
                {
                    ...objTextElementJsonRow3
                },
                {
                    ...objTextElementJsonColumn1
                },
                {
                    ...objTextElementJsonColumn2
                },
                {
                    ...objTextElementJsonColumn3
                }
            ]
        }
    };
    return objElementJson;
};
