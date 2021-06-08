//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSHotspot_TextApplication_ModuleProcessor
 * @summary Contains the Hotspot's editor version module specific methods.
 * */
class CMSHotspot_TextApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
    * @name GetAlignmentValue
    * @param {string} strAlignmentType vertical/horizontal
    * @param {string} strAlignmentValue top/bottom/center
    * @returns{string} returns proper alignment value
    */
    GetAlignmentValue(strAlignmentType, strAlignmentValue) {
        var strValue = "center";
        if (strAlignmentValue === "top" || strAlignmentValue === "left") {
            strValue = "flex-start";
        }
        else if (strAlignmentValue === "bottom" || strAlignmentValue === "right") {
            strValue = "flex-end";
        }
        return strValue;
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSHotspot/CMSHotspotStyles.css"
        ];
    }
}

export default CMSHotspot_TextApplication_ModuleProcessor;
