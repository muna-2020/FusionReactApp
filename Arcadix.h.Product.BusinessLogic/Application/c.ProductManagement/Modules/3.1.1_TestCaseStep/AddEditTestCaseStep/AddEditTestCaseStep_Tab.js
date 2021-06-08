/**
 * @name GetAddEditTestCaseTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditTestCaseTab(objContext, objData) {

    //let objTextResource = objContext.props.Resource.Text;
    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1_TestCase/TestCase", objContext.props);
    let arrContentData = [
        {
            "Text":Localization.TextFormatter(objTextResource, "TestCase"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text":Localization.TextFormatter(objTextResource, "TestCase"),
                    "Id": "TestCase",
                    "Event": () => {
                        objData.ShowDiv("TestCase");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}