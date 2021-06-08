//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
* @name TabbedPopup_ComponentProcessor
* @summary Class for TabbedPopup component display.
*/
class TabbedPopup_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name SetNavigationData
     * @param {any} arrNavigationData
     * @summary To be used in module component to Set the navigation data.
     */
    SetNavigationData(arrPopupNavigationData, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { arrPopupNavigationData } });
         //To select the first tab
        this.NavigateTabs(arrPopupNavigationData[0].Children[0].Id, objContext);
    }

    /**
     * @name SetNavigationData
     * @param {any} arrNavigationData
     * @summary To be used in module component to Set the OfficeRibbon data.
     */
    SetOfficeRibbonData(arrOfficeRibbonData, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { arrOfficeRibbonData} });
    }

    /**
     * @name SetNavigationData
     * @param {any} arrNavigationData
     * @summary To be used in module component to navigate the tab.
     * The TabId should be passed as an argument
     */
    NavigateTabs(strNabId, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { strSelectedNavId: "Nav_" + strNabId} });
    }
}

export default TabbedPopup_ComponentProcessor;