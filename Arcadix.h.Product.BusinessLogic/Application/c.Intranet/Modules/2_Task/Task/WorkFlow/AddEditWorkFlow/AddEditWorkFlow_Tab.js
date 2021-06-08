
/**
 * @name GetAddEditWorkFlow
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditWorkFlowTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Workflow"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Workflow"),
                    "Id": "Workflow",
                    "Event": () => {
                        objData.ShowDiv("Workflow");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}