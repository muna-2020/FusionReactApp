/**
 * @name GetAddEditAdditionalPropertyValueTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditAdditionalPropertyValueTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "vAdditionalPropertyValue"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "vAdditionalPropertyValue"),
                    "Id": "vAdditionalPropertyValue",
                    "Event": () => {
                        objData.ShowDiv("vAdditionalPropertyValue");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}