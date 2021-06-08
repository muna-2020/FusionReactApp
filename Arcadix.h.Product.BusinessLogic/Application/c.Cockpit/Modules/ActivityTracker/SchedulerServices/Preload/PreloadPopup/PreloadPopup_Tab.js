
/**
 * @name GetPreloadpopupTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetPreloadpopupTab(objContext,objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Preload"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Preload"),
                    "Id": "Preload",
                    "Event": () => {
                        objData.ShowDiv("Preload");
                    }
                }
            ]
        }
    ];
    return arrContentData;    
}