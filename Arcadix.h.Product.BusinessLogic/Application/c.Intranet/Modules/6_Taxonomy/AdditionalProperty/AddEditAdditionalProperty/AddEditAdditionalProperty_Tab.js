/**
 * @name GetAddEditAdditionalPropertyTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditAdditionalPropertyTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "AdditionalProperty"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "AdditionalProperty"),
                    "Id": "AdditionalProperty",
                    "Event": () => {
                        objData.ShowDiv("AdditionalProperty");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}