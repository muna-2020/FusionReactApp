//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name ContextMenuBase_ModuleProcessor
 * @summary Contains the common methods used for spell check.
 * */
class SpellCheckBase_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name SpellCheckUpdate
     * @param {object} objContext {state, props, dispatch, <module name>_Editor_ModuleProcessor}
     * @param {object} objCheckedElementJson spell checked elementjson (if null remove all the markings else mark all the bad word).
     * @summary send the spell checked text element to each of the Text element.
     */
    ElementSpellCheckUpdate(objContext, objCheckedElementJson = null) {
        if (objContext.props.ElementJson && objContext.props.ElementJson.iElementTypeId == 1) { // spell check for CMSText
            if (objContext.state.ElementJson.TextRef &&
                objContext.state.ElementJson.TextRef.current &&
                objContext.state.ElementJson.TextRef.current.SpellCheckUpdate) {
                let vText = objCheckedElementJson != null ?
                    objCheckedElementJson["vElementJson"]["vText"] :
                    objCheckedElementJson;
                objContext.state.ElementJson.TextRef.current.SpellCheckUpdate(vText);
            }
        } else {  // other elements.
            objContext.state["ElementJson"] &&
                objContext.state["ElementJson"]["vElementJson"] &&
                objContext.state["ElementJson"]["vElementJson"]["TextElements"] &&
                objContext.state["ElementJson"]["vElementJson"]["TextElements"].forEach(objTemp => {
                    if (objTemp.Ref && objTemp.Ref.current && objTemp.Ref.current.SpellCheckUpdate) {
                        let objCheckedCMSTextJson = objCheckedElementJson != null ?
                            objCheckedElementJson["vElementJson"]["TextElements"].find(objChecked => objChecked["iElementId"] == objTemp["iElementId"]) :
                            objCheckedElementJson;
                        objTemp.Ref.current.SpellCheckUpdate(objCheckedCMSTextJson);
                    }
                });
        }
    }
}

export default SpellCheckBase_ModuleProcessor;