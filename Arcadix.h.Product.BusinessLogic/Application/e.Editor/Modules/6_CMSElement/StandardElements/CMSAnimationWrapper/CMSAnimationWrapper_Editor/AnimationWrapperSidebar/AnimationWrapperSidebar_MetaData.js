/**
 * @name GetDefaultFieldsForRadio
 * @param {object} objTextResource Text resource
 * @summary Forms an array for adding radios for adding a new row in default array.
 * @returns {array} Default Fields For Radio
 */
export function GetDefaultFieldsForRadio(objModuleProcessor, objTextResource, strAttributeType = "initial", blnFusionVersion = true) {
    let arrDefaultFieldsForRadio = [
        {
            "vRadioType": "Text",
            "vDisplayName": objModuleProcessor.TextFormatter(objTextResource, "Text"),
            "cIsSelected": "Y"
        },
        {
            "vRadioType": "Number",
            "vDisplayName": objModuleProcessor.TextFormatter(objTextResource, "Number"),
            "cIsSelected": "N"
        }
    ];
    if (strAttributeType.toLowerCase() === "initial" || strAttributeType.toLowerCase() === "resource") {
        arrDefaultFieldsForRadio = [
            ...arrDefaultFieldsForRadio,
            {
                "vRadioType": "TextArea",
                "vDisplayName": objModuleProcessor.TextFormatter(objTextResource, "TextArea"),
                "cIsSelected": "N"
            },
            {
                "vRadioType": "Character",
                "vDisplayName": objModuleProcessor.TextFormatter(objTextResource, "Character"),
                "cIsSelected": "N"
            },
            {
                "vRadioType": "Image",
                "vDisplayName": objModuleProcessor.TextFormatter(objTextResource, "Image"),
                "cIsSelected": "N"
            }
        ];
        if (blnFusionVersion) {
            arrDefaultFieldsForRadio = [
                ...arrDefaultFieldsForRadio,
                {
                    "vRadioType": "HtmlImage",
                    "vDisplayName": objModuleProcessor.TextFormatter(objTextResource, "HtmlImage"),
                    "cIsSelected": "N"
                }
            ];
        }
    }
    return arrDefaultFieldsForRadio;
}
