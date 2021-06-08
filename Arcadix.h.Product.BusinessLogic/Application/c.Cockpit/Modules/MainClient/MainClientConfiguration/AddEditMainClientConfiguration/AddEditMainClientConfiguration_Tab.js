
/**
 * @name GetAddEditMainClientConfigurationTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditMainClientConfigurationTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "MainClientConfiguration"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "MainClientConfiguration"),
                    "Id": "MainClientConfiguration",
                    "Event": () => {
                        objData.ShowDiv("MainClientConfiguration");
                    }
                }                
            ]
        }
    ];
    return arrContentData;    
}