//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

//Module related files
import Object_Editor_TaskContent_CMSElement from "@shared/Object/e.Editor/TaskContent/3_CMSElement/CMSElement";

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

/**
 * @name LinkedPageDetails_ModuleProcessor
 * @summary Contains ImageManagement popup component specific methods.
 */
class LinkedPageDetails_ModuleProcessor extends ContextMenuBase_ModuleProcessor {

    /**
     * @name StoreMapList
     * @param {object} props component prop
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList(props) {
        return [`Object_Editor_TaskContent_CMSElement_GetLinkedPageDetails;ielementid;${props.Data.ElementJson.iElementId}`];
    }

    /**
     * @name LoadLinkedPageDetailsData
     * @param {object} objContext passes Context object
     */
    LoadLinkedPageDetailsData(objContext) {
        Object_Editor_TaskContent_CMSElement.GetLinkedElementPageDetails({ "iElementId": objContext.props.ElementDetails.iElementId });
    }

}

export default LinkedPageDetails_ModuleProcessor;
