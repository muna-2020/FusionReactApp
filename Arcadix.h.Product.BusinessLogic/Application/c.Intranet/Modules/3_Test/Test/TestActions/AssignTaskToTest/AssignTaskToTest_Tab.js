
/**
 * @name GetAssignTaskTestTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAssignTaskTestTab(objContext, objData) {
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
        },
        {
            "Text": Localization.TextFormatter(objTextResource, "Audit") + " (-NI-)",
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Audit") + " (-NI-)",
                    "Id": "AuditDiv",
                    "Event": () => {                       
                    }
                }
            ]
        } 
    ];
    return arrContentData;
}