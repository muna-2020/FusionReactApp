/**
 * @name GetAddEditTestNavigationTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditTestNavigationTab(objContext, objData) {

    //let objTextResource = objContext.props.Resource.Text;
    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation", objContext.props);
    let arrContentData = [
        {
            "Text":Localization.TextFormatter(objTextResource, "TestNavigation"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text":Localization.TextFormatter(objTextResource, "TestNavigation"),
                    "Id": "TestNavigation",
                    "Event": () => {
                        objData.ShowDiv("TestNavigation");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}