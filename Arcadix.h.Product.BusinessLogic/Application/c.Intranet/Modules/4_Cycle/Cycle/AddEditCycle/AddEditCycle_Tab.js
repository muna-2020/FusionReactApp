/**
 * @name GetAddEditCycleTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditCycleTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Cycle"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "BaseData"),
                    "Id": "BaseData",
                    "Event": () => {
                        objData.ShowDiv("BaseData");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}