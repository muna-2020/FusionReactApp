
/**
 * @name GetAssignTaskToDescriptionTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAssignTaskToDescriptionTab(objContext, objData) {
    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": "TaskToDescription",//Localization.TextFormatter(objTextResource, "Topic"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": "TaskToDescription",//Localization.TextFormatter(objTextResource, "Topic"),
                    "Id": "TaskToDescription",
                    "Event": () => {
                        objData.ShowDiv("Topic");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}