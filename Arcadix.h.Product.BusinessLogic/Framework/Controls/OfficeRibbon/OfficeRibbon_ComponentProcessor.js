//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
* @name OfficeRibbon_ComponentProcessor
* @summary Class for OfficeRibbon.
*/
class OfficeRibbon_ComponentProcessor extends Base_ModuleProcessor {

    /**
    * @name OnTabClick
    * @param {object} objContext Context Object
    * @param {object} objItem Item
    * @summary Executes when Tab is selected
    */
    OnTabClick(objContext, objItem) {
        objContext.props.Data.TabData.map(objTabData => {
            if (objTabData.Text === objItem.Text) {
                if (objTabData.OnTabClick) {
                    objTabData.OnTabClick();
                }
            }
        });
        objContext.dispatch({ type: "SET_STATE", payload: { "objOfficeRibbonContentData": objItem } });        
    }
    /**
    * @name GetCallBacks
    * @param {object} objContext Context object
    * @param {object} objItem OfficeRibbonData
    * @summary Returns object that contains all the CallBack methods.
    * @return {object} objCallBasics
    */
    GetEvents(objContext) {
        return {
            OnTabClick: (objItem) => this.OnTabClick(objContext, objItem)
        };
    }
}

export default OfficeRibbon_ComponentProcessor;