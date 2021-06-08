// Base Moudule Object /Class
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

// Component used
import Editor from '@root/Application/e.Editor/PC/Editor';

/**
 * @name OfficeRibbon_ModuleProcessor
 * @summary module processor for Office ribbon.
 */
class OfficeRibbon_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name MinimizeEditor
     * @summary  Miminimize editor.
     */
    MinimizeEditor() {
        let objEditor = new Editor();
        objEditor.MinimizeEditor();
    }

    /**
     * @name CloseEditor
     * @summary  Close Editor.
     */
    CloseEditor(objContext) {
        let objEditor = new Editor();
        objEditor.CloseEditor();
        if (objContext && objContext.AddElementTabRef && objContext.AddElementTabRef.current !== null) {
            objContext.AddElementTabRef.current.Reset();
        }
    }

    /**
     * @name ExpandTabDetails
     * @param {object} objContext  { state, dispatch, props, OfficeRibbon_ModuleProcessor }.
     * @summary sets the CollapseTabDetails to false.
     */
    ExpandTabDetails(objContext) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: { 
                "blnCollapseTabDetails": false 
            }
        });
    }

    /**
     * @name ExpandTabDetails
     * @param {object} objContext  { state, dispatch, props, OfficeRibbon_ModuleProcessor }.
     * @summary sets the CollapseTabDetails to true.
     */
    CollapseTabDetails(objContext) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: { 
                "blnCollapseTabDetails": true
            }
        });
    }

    /**
     * @name SwitchTab
     * @param {object} objContext  { state, dispatch, props, OfficeRibbon_ModuleProcessor }.
     * @param {string} strTabName [START, INSERT, TABLES, INTERACTION_ELEMENTS, FORMULA].
     * @summary changes tab statea and sets the CollapseTabDetails to false.
     */
    SwitchTab(objContext, strTabName) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: { 
                "strActiveTab": strTabName,
                "blnCollapseTabDetails": false 
            }
        });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/2_OfficeRibbon/OfficeRibbon.css"];
    }

}
export default OfficeRibbon_ModuleProcessor;