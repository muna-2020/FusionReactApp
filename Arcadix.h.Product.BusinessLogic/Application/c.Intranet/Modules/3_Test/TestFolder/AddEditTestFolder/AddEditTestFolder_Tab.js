/**
 * @name GetAddEditTestFolderTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditTestFolderTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Create"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "BaseData"),
                    "Id": "TestFolder",
                    "Event": () => {
                        objData.ShowDiv("TestFolder");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}