/**
 * @name GetAddEditDocumentTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditDocumentTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;  
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Document"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Document"),
                    "Id": "Document",
                    "Event": () => {
                        objData.ShowDiv("Document");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}