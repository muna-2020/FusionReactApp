/**
 * @name GetAddEditCountryTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditCountryTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Country"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Country"),
                    "Id": "Country",
                    "Event": () => {
                        objData.ShowDiv("Country");
                    }
                }
                //,
                //{
                //    "Text": "Advanced",
                //    "Id": "Advanced",
                //    "Event": () => {
                //        objData.ShowDiv("Advanced");
                //    }
                //}
            ]
        }
    ];
    return arrContentData;    
}