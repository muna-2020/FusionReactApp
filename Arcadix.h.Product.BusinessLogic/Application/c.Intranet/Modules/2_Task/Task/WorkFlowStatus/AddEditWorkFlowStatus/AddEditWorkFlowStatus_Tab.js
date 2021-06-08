
/**
 * @name GetAddEditWorkFlowStatusTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditWorkFlowStatusTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "WorkflowStatus"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "WorkflowStatus"),
                    "Id": "WorkflowStatus",
                    "Event": () => {
                        objData.ShowDiv("WorkflowStatus");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}