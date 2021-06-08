//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultElementJson
 * @param {number} iOrder The order where the Element needs to be added.
 * @summary This method returns the Initial Json for Document.
 * @returns {object} default document json.
*/
export const GetDefaultElementJson = (iOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": iOrder,
        "iElementTypeId": 4,
        "vElementTypeName": "Document",
        "cIsDisplayedInElementTree": "Y",
        "vElementJson": {
            "vElementDocumentDescription": "",
            "vDocumentName": "",
            "vDocumentFileName": "",
            "vDocumentType": "",
            "iDocumentSizeInBytes": "",
            "iDocumentFileVersion": 1,
            "cIsFileChanged": "N",
            "TextElements": [],
            "Values": []
        }
    };
    return objElementJson;
};