//React imports
import React from 'react';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module realted fies.
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name GetDefaultElementJson
 * @param {string} strWikiKeyword selected keyword
 * @summary Gets the default element json for wiki.
 * @returns {object} wiki ElementJson
 */
export const GetDefaultElementJson = (strWikiKeyword) => {
    let intElementTextId = UniqueId.GetUniqueId();
    let objTextElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, intElementTextId);
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "vElementTypeName": "Wiki",
        "iElementTypeId": 50,
        "cIsDeleted": "N",
        "cIsFirstLoad": "Y",
        "cIsFusionVersion": "N",
        "vElementJson": {
            "iWidth": 100,
            "Values": [
                {
                    "iElementTextId": intElementTextId,
                    "vWikiKeyword": strWikiKeyword
                }
            ],
            "TextElements": [
                {
                    ...objTextElementJson,
                    ["vElementJson"]: {
                        ...objTextElementJson["vElementJson"],
                        ["vText"]: ""
                    },
                    "Ref": React.createRef()
                }
            ]
        }
    };
    return objElementJson;
};
