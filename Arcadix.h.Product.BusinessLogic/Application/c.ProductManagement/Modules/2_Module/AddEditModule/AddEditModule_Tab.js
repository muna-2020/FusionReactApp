/**
 * @name GetAddEditModuleTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditModuleTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Module"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "BaseData"),
                    "Id": "Module",
                    "Event": () => {
                        objData.ShowDiv("Module");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}