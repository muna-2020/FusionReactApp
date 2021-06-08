
/**
 * @name GetAddEditClientHostUrlTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditClientHostUrlTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "ClientHostUrl"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "ClientHostUrl"),
                    "Id": "ClientHostUrl",
                    "Event": () => {
                        objData.ShowDiv("ClientHostUrl");
                    }
                }
            ]
        }
    ];
    return arrContentData;    
}