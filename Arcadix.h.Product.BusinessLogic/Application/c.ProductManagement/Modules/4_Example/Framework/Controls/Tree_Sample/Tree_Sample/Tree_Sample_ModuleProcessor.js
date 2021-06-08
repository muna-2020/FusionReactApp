import * as Tree_Sample_Data from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Tree_Sample/Tree_Sample/Tree_Sample_Data';
import * as Tree_Sample_Meta from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Tree_Sample/Tree_Sample/Tree_Sample_Meta';
import * as Tree_Sample_ResourceData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Tree_Sample/Tree_Sample/Tree_Sample_ResourceData';
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";
/**
* @name Tree_Sample_ModuleProcessor
* @summary Class for Tree_Sample module display.
*/
class Tree_Sample_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: Tree_Sample_Data.GetData()
            };
        };
    }

    /**
     * @name OnSelectNode
     * @param {any} objSelectedNode
     * @param {any} arrNewNodes
     * @summary Perform the module specific logic from the Selected node.
     */
    OnSelectNode(objSelectedNode, arrNewNodes) {
        console.log("objSelectedNode ", objSelectedNode);
        console.log("arrNewNodes ", arrNewNodes);
    }

    /**
     * @name OnDragAndDrop
     * @param {any} arrDraggedNodes
     * @summary Takes the dragged nodes to save in the DB.
     */
    OnDragAndDrop(arrDraggedNodes) {
        console.log("arrDraggedNodes ", arrDraggedNodes);
    }

    /**
     * @name OnExpandOrCollapse
     * @param {any} arrNewNodes
     * @param {any} SelectedParent
     * @summary Takes the expaneded nodes and Selected parent to perform the requred action.
     */
    OnExpandOrCollapse(arrNewNodes, SelectedParent) {
        console.log("arrNewNodes ", arrNewNodes);
        console.log("SelectedParent ", SelectedParent);
    }

    /**
    * @name GetCallBacks
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods.
    * @return {object} 
    */
    GetEvents() {
        return {
            OnSelectNode: this.OnSelectNode,
            OnDragAndDrop: this.OnDragAndDrop,
            OnExpandOrCollapse: this.OnExpandOrCollapse
        };
    }

    /**
     * @name OnBeforeShowNode
     * @param {any} objNodde
     * @summary Takes the node object abd returns true if the node has to be shown.
     */
    OnBeforeShowNode(objNodde) {
        //based on the logic from the module
        return {
            ...objNodde , "ImageType": "Folder"
        }
    }

    /**
     * @name GetCallBacks
     * @summary returns all the callbacks.
     * */
    GetCallBacks() {
        return {
            OnBeforeShowNode: this.OnBeforeShowNode
        };
    }

    /**
     * @name GetMeta
     * @summary Returns the meta data.
     * */
    GetMeta() {
        return Tree_Sample_Meta.GetMetaData();
        
    }

    /**
     * @name GetResourceData
     * @summary Returns the Resource data.
     * */
    GetResourceData() {
        return Tree_Sample_ResourceData.GetResourceData();
    }
}

export default Tree_Sample_ModuleProcessor;