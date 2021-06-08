/**
 * @name GetAddEditMainClientTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */

export function GetAddEditMainClientTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "MainClient"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "MainClient"),
                    "Id": "MainClient",
                    "Event": () => {
                        objData.ShowDiv("MainClient");
                    }
                }
            ]
        }
    ];
    return arrContentData;    
}