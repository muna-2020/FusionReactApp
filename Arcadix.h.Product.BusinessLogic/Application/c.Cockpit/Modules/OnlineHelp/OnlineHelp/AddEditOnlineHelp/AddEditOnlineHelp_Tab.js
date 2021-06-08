
/**
 * @name GetAddEditOnlineHelpTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditOnlineHelpTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "OnlineHelp"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "OnlineHelp"),
                    "Id": "OnlineHelp",
                    "Event": () => {
                        objData.ShowDiv("OnlineHelp");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}