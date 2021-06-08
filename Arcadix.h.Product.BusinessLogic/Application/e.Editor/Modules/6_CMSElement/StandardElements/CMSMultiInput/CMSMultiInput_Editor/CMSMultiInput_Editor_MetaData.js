//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDragDropSortElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the initial json for adding a DragdropSort element.
 * @returns {object} Initial DragdropSort Json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let iElementMultiInputId = UniqueId.GetUniqueId();
    let objElementJson = {
        "iElementId": iElementMultiInputId,
        "iElementTypeId": 17,
        "vElementTypeName": "MultiInput",
        "iOrder": intOrder,
        "vElementJson": {
            "vMeasurementUnit": "",
            "cHasMeasurementPrefix": "N",
            "cIsCaseSensitive": "N",
            "iWidthInPixel": 50,
            "iNumberOfInputDisplay": 0,
            "cIsNumber": "N",
            "iTextFieldType": 7,
            "dWrongPoint": null,
            "dNotAnsweredPoint": null,
            "cIsEditableInput": "Y",
            "cIsPointOverride": "N",
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
        "cIsFirstLoad": "Y",
    };
    return objElementJson;
};
