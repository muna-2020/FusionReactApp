
/**
 * @name GetAddEditTaskFolderTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditTaskFolderTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Folder"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "BaseData"),
                    "Id": "TaskFolder",
                    "Event": () => {
                        objData.ShowDiv("TaskFolder");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}