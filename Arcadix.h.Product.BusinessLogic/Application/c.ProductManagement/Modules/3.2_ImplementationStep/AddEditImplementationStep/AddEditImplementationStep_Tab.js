/**
 * @name GetAddEditImplementationStepTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditImplementationStepTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": "ImplementationStep",//Localization.TextFormatter(objTextResource, "ImplementationStep"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": "ImplementationStep",//Localization.TextFormatter(objTextResource, "ImplementationStep"),
                    "Id": "ImplementationStep",
                    "Event": () => {
                        objData.ShowDiv("ImplementationStep");
                    }
                },
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