//React imports
import React from 'react';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module realted fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

export const GetRefAttachedToElement = (objElementJson) => {
    objElementJson = {
        ...objElementJson,
        ["DivRef"]: React.createRef()
    };
    objElementJson = BaseCMSElement.AttachRef(objElementJson);
    return objElementJson;
};

export const GetTextElementJson = async () => {
    let objImport = await import(/* webpackChunkName: "[request]" */ `@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData`);
    let objElementJson = objImport.GetDefaultElementJson(1);
    objElementJson = {
        ...objElementJson,
        ["DivRef"]: React.createRef()
    };
    objElementJson = BaseCMSElement.AttachRef(objElementJson);
    return objElementJson;
};

export function GetDragObjectJson(objElementJson) {
    return {
        "iElementGenericDragObjectId": UniqueId.GetUniqueId(),
        ["iElement" + objElementJson["vElementTypeName"] + "Id"]: objElementJson["iElementId"],
        "vElementTypeName": objElementJson["vElementTypeName"],
        "Top": 2,
        "Left": 2,
        "cIsDraggable": "N",
        "cIsUsed": "N",
        "DivRef": React.createRef()
    };
}

export function GetDropObjectJson() {
    return {
        "iElementGenericDropObjectId": UniqueId.GetUniqueId(),
        "Top": 2,
        "Left": 2,
        "iHeight": 100,
        "iWidth": 100,
        "DraggedObjects": [],
        "dCorrectPoint": 0,
        "dWrongPoint": 0,
        "iDisplayOrder": 1,
        "DivRef": React.createRef()
    };
}

/**
 * @name GetDefaultElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for dragdrop.
 * @returns {object} default generic dragdrop json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "vElementTypeName": "GenericDragDrop",
        "iElementTypeId": 34,
        "iOrder": intOrder,
        "vElementJson": {
            "cShowHeaderText": "N",
            "cIsPointOverride": "N",
            "dNotAnsweredPoint": 0.0,
            "iHeight": null,
            "iWidth": null,
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "DragObjects": [],
            "DropObjects": [],
            "Values": [],
            "TextElements": []
        },
        "MappedElements": []
    };
    return objElementJson;
};
