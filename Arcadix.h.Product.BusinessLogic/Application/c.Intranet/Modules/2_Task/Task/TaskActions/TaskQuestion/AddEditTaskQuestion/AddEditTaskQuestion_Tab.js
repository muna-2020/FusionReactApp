/**
* @name GetAddEditTaskQuestionTab
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetAddEditTaskQuestionTab(objContext, objData) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Resource.Text["DataEingeben"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Resource.Text["Stammdaten"],
                    "Id": "Stammdaten",
                    "Event": () => { objData.ShowDiv("Stammdaten") }
                },
                {
                    "Text": objContext.props.Resource.Text["Extra"],
                    "Id": "Extra",
                    "Event": () => { objData.ShowDiv("Extra") }
                }
            ]
        }
    ];
    return arrContentData;
}