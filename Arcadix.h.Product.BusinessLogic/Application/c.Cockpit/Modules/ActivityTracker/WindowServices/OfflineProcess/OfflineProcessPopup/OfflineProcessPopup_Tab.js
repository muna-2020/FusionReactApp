
/**
 * @name GetAddEditOfflineProcessTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditOfflineProcessTab(objContext,objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "OfflineProcess"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "OfflineProcess"),
                    "Id": "OfflineProcess",
                    "Event": () => {
                        objData.ShowDiv("OfflineProcess");
                    }
                }
            ]
        }
    ];
    return arrContentData;    
}