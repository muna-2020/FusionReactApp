//React import
import React from 'react';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module related fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

export const GetElementJsonForElementType = async (strElementTypeName, objAdditionalProperties) => {
    let objImport = await import(/* webpackChunkName: "[request]" */ `@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMS${strElementTypeName}/CMS${strElementTypeName}_Editor/CMS${strElementTypeName}_Editor_MetaData`);
    let objElementJson = objImport.GetDefaultElementJson(1, objAdditionalProperties);
    objElementJson = {
        ...objElementJson,
        ["DivRef"]: React.createRef()
    };
    objElementJson = BaseCMSElement.AttachRef(objElementJson);
    return objElementJson;
};

export const GetRefAttachedToElement = (objElementJson) => {
    objElementJson = {
        ...objElementJson,
        ["DivRef"]: React.createRef()
    };
    objElementJson = BaseCMSElement.AttachRef(objElementJson);
    return objElementJson;
}

export const GetTextElementForSubElement = (objSubElementJson) => {
    let iElementTextId = UniqueId.GetUniqueId();
    let objElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, iElementTextId, "");
    objElementJson = {
        ...objElementJson,
        ["vElementJson"]: {
            ...objElementJson["vElementJson"],
            ["vText"]: "<span ielementid='" + objSubElementJson["iElementId"] + "' ielementaccessid='" + objSubElementJson["iElementId"] + "' ielementtypeid='" + objSubElementJson["iElementTypeId"] + "'>",
            ["SubElements"]: [
                {
                    ...objSubElementJson
                }
            ]
        },
        ["DivRef"]: React.createRef()
    };
    objElementJson = BaseCMSElement.AttachRef(objElementJson);
    return objElementJson;
};

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for checkbox.
 * @returns {object} default checkbox json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "MoveableElementHolder",
        "iElementTypeId": 27,
        "vElementJson": {
            "iHeight": null,
            "iWidth": null,
            "cShowHeaderText": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "Values": [],
            "TextElements": []
        },
        ["MappedElements"]: []
    };
    return objElementJson;
};
