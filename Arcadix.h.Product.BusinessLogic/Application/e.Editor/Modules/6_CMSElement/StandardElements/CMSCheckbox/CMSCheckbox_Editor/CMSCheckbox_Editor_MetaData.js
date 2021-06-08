//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module related fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name GetDefaultCheckboxValueObject
 * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
 * @param {string} iElementTextId ielementid of text element.
 * @summary Forms a default object for checkbox value
 * @returns {object} Default Checkbox Value
*/
export const GetDefaultCheckboxValueObject = (objContext, iElementTextId) => {
    let objDefaultCheckBoxValueObject = {
        "iElementCheckBoxValueId": UniqueId.GetUniqueId(),
        "iElementTextId": iElementTextId,
        "iDisplayOrder": 0,
        "cIsCorrectValue": "N",
        "vVerticalAlign": "top",
        "dCorrectPoint": 0,
        "dWrongPoint": 0
    };
    return objDefaultCheckBoxValueObject;
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
 * @summary This method returns the Initial Json for checkbox.
 * @returns {object} default checkbox json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let iElementTextId1 = UniqueId.GetUniqueId();
    let iElementTextId2 = UniqueId.GetUniqueId();
    let objTextElementJson1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId1);
    let objTextElementJson2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId2);
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "CheckBox",
        "iElementTypeId": 8,
        "vContainerElementProperties": {
            "vSkinName": "TableDefault",
        },
        "vElementJson": {
            "cIsHorizontal": "N",
            "cIsRandomDisplay": "N",
            "cIsMatrixDisplay": "N",
            "cShowHeaderText": "N",
            "cIsPointOverride": "N",
            "dNotAnsweredPoint": 0,
            "cIsLikert": "N",
            "cShowHeaderFooter": "Y",
            "MatrixInformation": {
                "iNumberOfCheckboxes": 2,
                "iNumberOfColumns": 1
            },
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                },
                {
                    "iElementTextId": null,
                    "vHeaderType": "TextLeft"
                },
                {
                    "iElementTextId": null,
                    "vHeaderType": "TextRight"
                },
            ],
            "Values": [
                {
                    "iElementCheckBoxValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextId1,
                    "iDisplayOrder": 1,
                    "cIsCorrectValue": "N",
                    "vVerticalAlign": "top",
                    "dCorrectPoint": 0,
                    "dWrongPoint": 0
                },
                {
                    "iElementCheckBoxValueId": UniqueId.GetUniqueId(),
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
