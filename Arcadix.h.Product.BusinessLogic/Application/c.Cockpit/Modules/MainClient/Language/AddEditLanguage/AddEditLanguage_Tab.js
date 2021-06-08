
/**
 * @name GetAddEditLanguageTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditLanguageTab(objContext,objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Language"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Language"),
                    "Id": "Language",
                    "Event": () => {
                        objData.ShowDiv("Language");
                    }
                }
            ]
        }
    ];
    return arrContentData;    
}