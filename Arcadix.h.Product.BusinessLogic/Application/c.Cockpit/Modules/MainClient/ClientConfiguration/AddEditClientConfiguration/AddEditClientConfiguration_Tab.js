
/**
 * @name GetAddEditClientConfigurationTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditClientConfigurationTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "ClientConfiguration"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "ClientConfiguration"),
                    "Id": "ClientConfiguration",
                    "Event": () => {
                        objData.ShowDiv("ClientConfiguration");
                    }
                }                
            ]
        }
    ];
    return arrContentData;    
}