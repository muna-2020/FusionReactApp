
/**
 * @name GetAddEditTopicTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditTopicTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Topic"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Topic"),
                    "Id": "Topic",
                    "Event": () => {
                        objData.ShowDiv("Topic");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}