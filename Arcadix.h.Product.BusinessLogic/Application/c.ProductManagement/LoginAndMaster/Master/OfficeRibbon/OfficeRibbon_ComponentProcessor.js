//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';


/**
* @name OfficeRibbon_ComponentProcessor
* @summary Class for OfficeRibbon Component.
*/
class OfficeRibbon_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { "StoreKey": "ApplicationState", "DataKey": "OfficeRibbonData" },
            { "StoreKey": "ApplicationState", "DataKey": "PopupOfficeRibbonData" }
        ];
    }

    /**
     * 
     * @param {*} objContext 
     * @param {*} objOfficeRibbonData 
     * CallBack from the OfficeRibbonTab with the Tab Data that got clicked on...
     */
    OnOfficeRibbonTabClick(objContext, objOfficeRibbonData){
        if (objOfficeRibbonData.OnTabClick) {
            objOfficeRibbonData.OnTabClick(objTabData);
        } 
        this.SetOfficeRibbonContentData(objContext, objOfficeRibbonData);
    }

    /**
     * 
     * @param {*} objContext 
     * @param {*} objOfficeRibbonData 
     * Sets the OfficeRibbonContentData in Local state
     */
    SetOfficeRibbonContentData(objContext, objOfficeRibbonData){
        objContext.dispatch({ type: "SET_STATE", payload: { "OfficeRibbonContentData": objOfficeRibbonData } });
    }

}


export default OfficeRibbon_ComponentProcessor;