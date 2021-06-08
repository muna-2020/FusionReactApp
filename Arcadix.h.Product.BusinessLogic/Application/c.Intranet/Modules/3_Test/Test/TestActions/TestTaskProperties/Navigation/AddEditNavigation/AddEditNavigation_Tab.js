/**
* @name GetAddEditNavigationTab
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetAddEditNavigationTab(objContext, objData) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Resource.Text["Navigation"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Resource.Text["Navigation"],
                    "Id": "Navigation",
                    "Event": () => { objData.ShowDiv("Navigation") }
                }   
            ]
        }
    ];
    return arrContentData;
}