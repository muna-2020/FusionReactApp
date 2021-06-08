//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name PropertiesSidebar_ModuleProcessor
 * @summary Contains the PropertiesSidebar's editor version module specific methods.
 */
class PropertiesSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    OnInputChange(objContext, strValue, strKey) {
        if (strValue === "" || !isNaN(parseInt(strValue))) {
            if (strValue) {
                strValue = parseInt(strValue);
            }
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson["vElementJson"],
                            [strKey]: strValue
                        }
                    }
                }
            });
        }
    }

    OnSaveClick(objContext) {
        objContext.props.PassedEvents.UpdateElementJson(objContext.state.ElementJson);
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSMoveableElementHolder/PropertiesSidebar/PropertiesSidebarStyles.css"
        ];
    }
}

export default PropertiesSidebar_ModuleProcessor;
