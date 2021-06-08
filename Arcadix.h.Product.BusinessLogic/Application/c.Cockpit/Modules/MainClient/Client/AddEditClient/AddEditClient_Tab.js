/**
 * @name GetAddEditClientTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditClientTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Client"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Client"),
                    "Id": "Client",
                    "Event": () => {
                        objData.ShowDiv("Client");
                    }
                }
            ]
        }
    ];
    return arrContentData;    
}