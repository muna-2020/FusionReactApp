//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Component specific modules.
import Object_Extranet_Shared_DiskSpaceManagement from "@shared/Object/d.Extranet/5_Shared/DiskSpaceManagement/DiskSpaceManagement";

//Common functionalities
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
* @name DiskSpaceManagement_ComponentProcessor
* @summary Class for DiskSpaceManagement.
*/
class DiskSpaceManagement_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @returns {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { "StoreKey": "ApplicationState", "DataKey": "SelectedClassId" },
            { "StoreKey": "ApplicationState", "DataKey": "LoadDiskSpaceManagement" }
        ];
    }

    GetData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let objParams = {
            "uClassId": strClassId
        }
        if (strClassId && strClassId != "") {
            Object_Extranet_Shared_DiskSpaceManagement.GetDiskSpaceInfoForClass(objParams, (objRes) => {
                let strUsedMemory = objRes["Arcadix_Extranet_Shared_DiskSpaceManagement"]["Data"][0]["UsedMemoryInMb"];
                objContext.dispatch({ type: 'SET_STATE', payload: { strUsedMemory: strUsedMemory } })
                console.log("data of dis space", objRes);
            })
        }
    }
}

export default DiskSpaceManagement_ComponentProcessor;