import * as Grid_DisplayGrid_Sample_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Grid_Sample/Grid_DisplayGrid_Sample/Grid_DisplayGrid_Sample_MetaData';
import * as Grid_DisplayGrid_Sample_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Grid_Sample/Grid_DisplayGrid_Sample/Grid_DisplayGrid_Sample_ResourceData';
import * as Grid_DisplayGrid_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Blocks/Grid_Sample/Grid_DisplayGrid_Sample/Grid_DisplayGrid_Sample_Data';
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";

/**
* @name DisplayGrid_Sample_ModuleProcessor.
* @summary Class for ApplicationType module display.
*/
class DisplayGrid_Sample_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: Grid_DisplayGrid_Sample_Data.GetData(),
                ["Meta"]: Grid_DisplayGrid_Sample_MetaData.GetMetaData(),
                ["Resource"]: Grid_DisplayGrid_Sample_ResourceData.GetResourceData()
            }
        };
    }

    /**
     * @name StoreMapList
     * @summary CallBack for on click row
     */
    OnClickRow(objSelectedRow, objContext) {
        //Just write your logic here for the seleceted row
    }

    /**
     * @name StoreMapList
     * @summary CallBack for on click row
     */
    OnBeforeGridRowRender(objRow, objContext) {
        //Just write your logic here for the row
        return objRow;
    }

    /**
    * @name StoreMapList
    * @summary Returns object that contains all the CallBack methods.
    * @return {object}
    */
    GetEvents(objContext) {
        let objCallBacks = {
            OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext)
        };
        return objCallBacks;
    }

    /**
    * @name StoreMapList
    * @summary Returns object that contains all the CallBack methods.
    * @return {object}
    */
    GetCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => this.OnBeforeGridRowRender(objRow, objContext)
        };
        return objCallBacks;
    }

    GetData(objContext) {

    }
    
}

export default DisplayGrid_Sample_ModuleProcessor;