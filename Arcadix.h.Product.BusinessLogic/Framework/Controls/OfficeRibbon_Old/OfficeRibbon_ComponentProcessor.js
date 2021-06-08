//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';


/**
* @name OfficeRibbon_ComponentProcessor
* @summary Class for OfficeRibbon Component.
*/
class OfficeRibbon_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * 
     * @param {*} objContext 
     * @param {*} objOfficeRibbonData 
     * CallBack from the OfficeRibbonTab with the Tab Data that got clicked on...
     */
    OnOfficeRibbonTabClick(objContext, objOfficeRibbonContentData){
        objContext.dispatch({ type: "SET_STATE", payload: { "objOfficeRibbonContentData": objOfficeRibbonContentData } });
    }   

}


export default OfficeRibbon_ComponentProcessor;