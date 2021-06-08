//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Text Action import.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

/**
 * @name CMSLink_Editor_ModuleProcessor
 * @summary Contains the Link's editor version module specific methods.
 * */
class CMSLink_Editor_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name HandleOnClick
     * @param {objContext} objContext {props, state, dispatch}
     * @param {boolean} blnDoubleClicked
     * @summary This method will be called when anchor tag is clicked.
     */
    HandleOnClick(objContext, blnDoubleClicked) {
        if (blnDoubleClicked) {
            TextActions.Link.ShowLinkPopup(objContext, true, objContext.state.ElementJson.vElementJson.vLinkType, () => {
                objContext.CMSLink_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
            });
        }
    }
}

export default CMSLink_Editor_ModuleProcessor;