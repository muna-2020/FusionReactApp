//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module realted fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name GetDefaultValue
 * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}
 * @param {number} intElementRadioMatrixRowId Row id.
 * @summary Contains row object.
 * @returns Default row value.
 */
export const GetDefaultValue = (objContext, intElementRadioMatrixRowId) => {
    let objValue = {
        "iElementRadioMatrixRowId": intElementRadioMatrixRowId,
        "iElementRadioMatrixColumnId": objContext.state.ElementJson["vElementJson"]["MatrixColumn"][0]["iElementRadioMatrixColumnId"],
        "dCorrectPoint": 0,
        "dWrongPoint": 0,
        "iDisplayOrder": 1
    };
    return objValue;
};

/**
 * @name GetDefaultRow
 * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}
 * @param {number} intElementTextId Mapped TextElement's Id
 * @summary Contains the json for default object for Row value.
 * @returns {object} Row value object.
 */
export const GetDefaultRow = (objContext, intElementTextId) => {
    let objDefaultValue = {
        'iElementRadioMatrixRowId': UniqueId.GetUniqueId(),
        "iElementTextId": intElementTextId,
        "vVerticalAlign": "top",
        "iDisplayOrder": 0
    };
    return objDefaultValue;
};

/**
 * @name GetDefaultColumn
 * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}
 * @param {number} intElementTextId Mapped TextElement's Id
 * @summary Contains the json for default object for Column value.
 * @returns {object} Column value object.
 */
export const GetDefaultColumn = (objContext, intElementTextId) => {
    let objDefaultValue = {
        "iElementRadioMatrixColumnId": UniqueId.GetUniqueId(),
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
 * @param {object} objContext {state, props, dispatch, CMSRadioMatrix_Editor_ModuleProcessor}
 * @param {number} objTextResource Text Resource object.
 * @summary This method returns the initial json for adding a RadioMatrix element.
 * @returns {object} Initial RadioMatrix Json.
 */
export const GetDefaultElementJsonForTrueFalse = (objContext, objTextResource) => {
    let iElementRadioMatrixRowId1 = UniqueId.GetUniqueId();
    let iElementRadioMatrixRowId2 = UniqueId.GetUniqueId();
    let iElementRadioMatrixRowId3 = UniqueId.GetUniqueId();
    let iElementRadioMatrixRowId4 = UniqueId.GetUniqueId();
    let iElementRadioMatrixColumnId1 = UniqueId.GetUniqueId();
    let iElementRadioMatrixColumnId2 = UniqueId.GetUniqueId();
    let iElementTextIdRowHeader = UniqueId.GetUniqueId();
    let iElementTextIdRow1 = UniqueId.GetUniqueId();
    let iElementTextIdRow2 = UniqueId.GetUniqueId();
    let iElementTextIdRow3 = UniqueId.GetUniqueId();
    let iElementTextIdRow4 = UniqueId.GetUniqueId();
    let iElementTextIdColumn1 = UniqueId.GetUniqueId();
    let iElementTextIdColumn2 = UniqueId.GetUniqueId();
    let objTextElementJsonRowHeader = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdRowHeader);
    let objTextElementJsonRow1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdRow1);
    let objTextElementJsonRow2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdRow2);
    let objTextElementJsonRow3 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdRow3);
    let objTextElementJsonRow4 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdRow4);
    let objTextElementJsonColumn1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdColumn1, objTextResource["Default_True_Text"]);
    let objTextElementJsonColumn2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextIdColumn2, objTextResource["Default_False_Text"]);
    let objElementJson = {
        "iElementId": objContext.state.ElementJson["iElementId"],
        "iOrder": objContext.state.ElementJson["iOrder"],
        "vElementTypeName": "RadioMatrix",
        "iElementTypeId": 24,
        "vContainerElementProperties": {
            "vSkinName": "TableDefault",
        },
        "vElementJson": {
            "cIsRandomizedColumnDisplay": "N",
            "cIsRandomizedRowDisplay": "N",
            "cIsTitleToLeft": "N",
            "cShowHeaderText": "N",
            "cIsPointOverride": "N",
            "cIsTrueFlase": "Y",
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
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId1,
                    "iElementTextId": iElementTextIdRow1,
                    "vVerticalAlign": "top",
                    "iDisplayOrder": 1
                },
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId2,
                    "iElementTextId": iElementTextIdRow2,
                    "vVerticalAlign": "top",
                    "iDisplayOrder": 2
                },
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId3,
                    "iElementTextId": iElementTextIdRow3,
                    "vVerticalAlign": "top",
                    "iDisplayOrder": 3
                },
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId4,
                    "iElementTextId": iElementTextIdRow4,
                    "vVerticalAlign": "top",
                    "iDisplayOrder": 4
                }
            ],
            "MatrixColumn": [
                {
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId1,
                    "iElementTextId": iElementTextIdColumn1,
                    "iDisplayOrder": 1
                },
                {
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId2,
                    "iElementTextId": iElementTextIdColumn2,
                    "iDisplayOrder": 2
                }
            ],
            "Values": [
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId1,
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId1,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0,
                    "iDisplayOrder": 1
                },
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId2,
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId1,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0,
                    "iDisplayOrder": 2
                },
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId3,
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId1,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0,
                    "iDisplayOrder": 3
                },
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId4,
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId1,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0,
                    "iDisplayOrder": 4
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
                    ...objTextElementJsonRow4
                },
                {
                    ...objTextElementJsonColumn1
                },
                {
                    ...objTextElementJsonColumn2
                }
            ]
        }
    };
    return objElementJson;
};

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the initial json for adding a RadioMatrix element.
 * @returns {object} Initial RadioMatrix Json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let iElementRadioMatrixId = UniqueId.GetUniqueId();
    let iElementRadioMatrixRowId1 = UniqueId.GetUniqueId();
    let iElementRadioMatrixRowId2 = UniqueId.GetUniqueId();
    let iElementRadioMatrixRowId3 = UniqueId.GetUniqueId();
    let iElementRadioMatrixColumnId1 = UniqueId.GetUniqueId();
    let iElementRadioMatrixColumnId2 = UniqueId.GetUniqueId();
    let iElementRadioMatrixColumnId3 = UniqueId.GetUniqueId();
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
        "iElementId": iElementRadioMatrixId,
        "iOrder": intOrder,
        "vElementTypeName": "RadioMatrix",
        "iElementTypeId": 24,
        "vContainerElementProperties": {
            "vSkinName": "TableDefault",
        },
        "vElementJson": {
            "cIsRandomizedColumnDisplay": "N",
            "cIsRandomizedRowDisplay": "N",
            "cIsTitleToLeft": "Y",
            "cShowHeaderText": "N",
            "cIsPointOverride": "N",
            "cIsTrueFlase": "N",
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
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId1,
                    "iElementTextId": iElementTextIdRow1,
                    "vVerticalAlign": "top",
                    "iDisplayOrder": 1
                },
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId2,
                    "iElementTextId": iElementTextIdRow2,
                    "vVerticalAlign": "top",
                    "iDisplayOrder": 2
                },
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId3,
                    "iElementTextId": iElementTextIdRow3,
                    "vVerticalAlign": "top",
                    "iDisplayOrder": 3
                }
            ],
            "MatrixColumn": [
                {
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId1,
                    "iElementTextId": iElementTextIdColumn1,
                    "iDisplayOrder": 1
                },
                {
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId2,
                    "iElementTextId": iElementTextIdColumn2,
                    "iDisplayOrder": 2
                },
                {
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId3,
                    "iElementTextId": iElementTextIdColumn3,
                    "iDisplayOrder": 3
                }
            ],
            "Values": [
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId1,
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId1,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0,
                    "iDisplayOrder": 1
                },
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId2,
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId1,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0,
                    "iDisplayOrder": 2
                },
                {
                    "iElementRadioMatrixRowId": iElementRadioMatrixRowId3,
                    "iElementRadioMatrixColumnId": iElementRadioMatrixColumnId1,
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0,
                    "iDisplayOrder": 3
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
