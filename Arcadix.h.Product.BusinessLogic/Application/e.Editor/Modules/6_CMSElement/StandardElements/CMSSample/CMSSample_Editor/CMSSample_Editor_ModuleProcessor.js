//Module realted files.
import CMSSample_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSSample/CMSSample_Editor/CMSSample_Editor_ContextMenu";


//Application State classes/methods
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

/**
 * @name CMSSample_Editor_ModuleProcessor
 * @summary Contains the Sample's editor version module specific methods.
 * */
class CMSSample_Editor_ModuleProcessor extends CMSSample_Editor_ContextMenu {
    /**
     * @name OnCheckChange
     * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
     * @param {object} objValue checkbox value object
     * @summary Trigerred when the checkbox is checked/unchecked.
     */
    OnClick(objContext, objValue) {
        alert("Click event")
    }

}

export default CMSSample_Editor_ModuleProcessor;