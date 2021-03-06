/**
 * @name GetAddEditApplicationServerTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditApplicationServerTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "ApplicationServer"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "ApplicationServer"),
                    "Id": "ApplicationServer",
                    "Event": () => {
                        objData.ShowDiv("ApplicationServer");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}