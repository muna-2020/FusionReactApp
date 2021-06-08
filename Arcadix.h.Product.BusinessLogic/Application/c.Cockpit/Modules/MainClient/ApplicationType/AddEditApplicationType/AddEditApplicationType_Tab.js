
/**
 * @name GetAddEditApplicationTypeTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditApplicationTypeTab(objContext,objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "ApplicationType"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "ApplicationType"),
                    "Id": "ApplicationType",
                    "Event": () => {
                        objData.ShowDiv("ApplicationType");
                    }
                }
            ]
        }
    ];
    return arrContentData;    
}