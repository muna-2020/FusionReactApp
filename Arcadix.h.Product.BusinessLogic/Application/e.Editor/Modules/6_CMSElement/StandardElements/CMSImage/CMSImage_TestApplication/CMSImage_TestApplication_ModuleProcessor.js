//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

/**
 * @name CMSImage_Editor_ContextMenu
 * @summary Contains the context menu related methods of the CMSImage
 * */
class CMSImage_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {
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
}

export default CMSImage_TestApplication_ModuleProcessor;
