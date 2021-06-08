/**
* @name GetAddEditSubjectTab
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetAddEditHierarchyTab(objContext, objData) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Resource.Text["Hierarchy"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Resource.Text["Hierarchy"],
                    "Id": "Hierarchy",
                    "Event": () => { objData.ShowDiv("Hierarchy") }
                }   
            ]
        }
    ];
    return arrContentData;
}