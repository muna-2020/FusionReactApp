//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name ColorFillManagement_ModuleProcessor
 * @summary Contains the ColorFill's management version module specific methods.
 * */
class ColorFillManagement_ModuleProcessor extends ContextMenuBase_ModuleProcessor {

    /**
    * @name GetDynamicStyles
    * @param {object} props component props.
    * @summary this returns the styles for the SSR.
    */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSColorFillWrapper/CMSColorFillAddEdit/ColorFillManagement/ColorFillManagementStyles.css"]
    };
}

export default ColorFillManagement_ModuleProcessor;
