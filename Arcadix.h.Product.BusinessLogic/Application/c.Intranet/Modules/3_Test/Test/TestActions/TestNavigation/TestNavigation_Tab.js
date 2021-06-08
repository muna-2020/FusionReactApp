
/**
 * @name GetAssignTaskTestTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetTestNavigationTab(objContext, objData) {
    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "TaskToTest"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "AssignTest"),
                    "Id": "AssignTest",
                    "Event": () => objData.ShowDiv("AssignTest", objContext)
                }
            ]
        }
    ];
    return arrContentData;
}