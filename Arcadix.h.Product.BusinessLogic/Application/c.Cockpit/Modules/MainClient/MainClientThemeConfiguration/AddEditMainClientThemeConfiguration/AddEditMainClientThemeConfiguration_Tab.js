
/**
 * @name GetAddEditMainClientThemeConfigurationTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditMainClientThemeConfigurationTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "MainClientThemeConfiguration"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "MainClientThemeConfiguration"),
                    "Id": "MainClientThemeConfiguration",
                    "Event": () => {
                        objData.ShowDiv("MainClientThemeConfiguration");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}