// Base Moudule Object /Class
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';


/**
 * @name OfficeRibbon_ModuleProcessor
 * @summary module processor for Office ribbon.
 */
class SourceViewPopup_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/1_EditorFrame/TopLeft/SourceViewPopup/SourceViewPopup.css"];
    }

}
export default SourceViewPopup_ModuleProcessor;