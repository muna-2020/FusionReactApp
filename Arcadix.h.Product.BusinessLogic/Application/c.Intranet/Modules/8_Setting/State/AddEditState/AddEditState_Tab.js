/**
 * @name GetAddEditStateTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditStateTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "General"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "StateManagement"),
                    "Id": "StateManagement",
                    "Event": () => {
                        objData.ShowDiv("StateManagement");
                    }
                },
                {
                    "Text": Localization.TextFormatter(objTextResource, "LogoUpload") + "(-NI-)",
                    "Id": "LogoUpload",
                    "Event": () => {
                        objData.ShowDiv("LogoUpload");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}