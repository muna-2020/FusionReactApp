/**
 * @name GetAddEditUseCaseTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditUseCaseTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;  
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "UseCase"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "UseCase"),
                    "Id": "UseCase",
                    "Event": () => {
                        objData.ShowDiv("UseCase");
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