
/**
 * @name GetAddEditTipTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditTipTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Tip"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Tip"),
                    "Id": "Tip",
                    "Event": () => {
                        objData.ShowDiv("Tip");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}