//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module realted fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name GetDefaultRadioValueObject
 * @param {object} objContext {props, state, dispatch, CMSRadio_Editor_ModuleProcessor}
 * @param {number} intElementTextId iElementId of the mapped TextElement
 * @summary Forms a default object for Radio value
 * @returns {object} Default Radio Value
*/
export const GetDefaultRadioValueObject = (objContext, intElementTextId) => {
    let objDefaultRadioValueObject = {
        "iElementRadioValueId": UniqueId.GetUniqueId(),
        "iElementTextId": intElementTextId,
        "cIsCorrectValue": "N",
        "vVerticalAlign": "top",
        "dWrongPoint": 0,
        "iDisplayOrder": 0
    };
    return objDefaultRadioValueObject;
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
 * @summary This method returns the initial json for adding a Radio element.
 * @returns {object} Initial Radio Json.
 */
export const GetRadioLikertDrfaultElementJson = (intOrder) => {
    let iElementRadioId = UniqueId.GetUniqueId();
    let iElementText_Header = UniqueId.GetUniqueId();
    let iElementText_Footer = UniqueId.GetUniqueId();
    let objTextElementJson_Header = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementText_Header);
    let objTextElementJson_Footer = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementText_Footer);
    let iElementTextId1 = UniqueId.GetUniqueId();
    let iElementTextId2 = UniqueId.GetUniqueId();
    let objTextElementJson1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId1);
    let objTextElementJson2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId2);
    let objElementJson = {
        "iElementId": iElementRadioId,
        "iElementTypeId": 7,
        "vElementTypeName": "Radio",
        "iOrder": intOrder,
        "vContainerElementProperties": {
            "vSkinName": "TableDefault",
        },
        "vElementJson": {
            "cIsHorizontal": "Y",
            "cIsRandomDisplay": "N",
            "cShowHeaderText": "N",
            "cIsPointOverride": "N",
            "dCorrectPoint": 0,
            "dNotAnsweredPoint": 0,
            "cIsLikert": "Y",
            "cShowHeaderFooter": "Y",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                },
                {
                    "iElementTextId": iElementText_Header,
                    "vHeaderType": "TextLeft"
                },
                {
                    "iElementTextId": iElementText_Footer,
                    "vHeaderType": "TextRight"
                },
            ],
            "Values": [
                {
                    "iElementRadioValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextId1,
                    "cIsCorrectValue": "Y",
                    "vVerticalAlign": "top",
                    "dWrongPoint": 0,
                    "iDisplayOrder": 1
                },
                {
                    "iElementRadioValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextId2,
                    "cIsCorrectValue": "N",
                    "vVerticalAlign": "top",
                    "dWrongPoint": 0,
                    "iDisplayOrder": 2
                }
            ],
            "TextElements": [
                {
                    ...objTextElementJson_Header
                },
                {
                    ...objTextElementJson_Footer
                },
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

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the initial json for adding a Radio element.
 * @returns {object} Initial Radio Json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let iElementRadioId = UniqueId.GetUniqueId();
    let iElementTextId1 = UniqueId.GetUniqueId();
    let iElementTextId2 = UniqueId.GetUniqueId();
    let objTextElementJson1 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId1);
    let objTextElementJson2 = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId2);
    let objElementJson = {
        "iElementId": iElementRadioId,
        "iElementTypeId": 7,
        "vElementTypeName": "Radio",
        "iOrder": intOrder,
        "vContainerElementProperties": {
            "vSkinName": "TableDefault",
        },
        "vElementJson": {
            "cIsHorizontal": "N",
            "cIsRandomDisplay": "N",
            "cShowHeaderText": "N",
            "cIsPointOverride": "N",
            "dCorrectPoint": 0,
            "dNotAnsweredPoint": 0,
            "cIsLikert": "N",
            "cShowHeaderFooter": "N",
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
                    "iElementRadioValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextId1,
                    "cIsCorrectValue": "Y",
                    "vVerticalAlign": "top",
                    "dWrongPoint": 0,
                    "iDisplayOrder": 1
                },
                {
                    "iElementRadioValueId": UniqueId.GetUniqueId(),
                    "iElementTextId": iElementTextId2,
                    "cIsCorrectValue": "N",
                    "vVerticalAlign": "top",
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
                }
            ]
        }
    };
    return objElementJson;
};
