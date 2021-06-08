
/**
* @name GetNavigationCommonPageOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetNavigationCommonPageOfficeRibbonData(objContext) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/LoginAndMaster/Navigation", objContext.props);
    objTextResource = objTextResource ? objTextResource : {};
    let objSubNavigationData = objContext.NavigationCommonPage_ModuleProcessor.GetSubNavigationData(objContext);
    let arrSubNavigationData = objSubNavigationData["SubNavigationData"];
    let arrOfficeRibbonData = arrSubNavigationData.map(objSubNavigation => {
        return {
            "vTextName": Localization.TextFormatter(objTextResource, objSubNavigation["TextResourceKey"]),
            "uImageUrl": "/" + objSubNavigation["ImagePath"],
            "type": "single",
            "OnClick": () => objContext.NavigationCommonPage_ModuleProcessor.OnSubNavigationClick(objContext, objSubNavigation )//arrSubNavigationData
        }
    });
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, objSubNavigationData["ParentNavigationName"]),
                ToolBarData: [
                    {
                        "vGroupName": objTextResource.Course,
                        "t_GroupData": arrOfficeRibbonData
                    }
                ]
            }
        ]
    );
}