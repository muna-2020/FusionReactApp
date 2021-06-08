//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name ImageManagement_ModuleProcessor
 * @summary Contains the Image's management version module specific methods.
 * */
class ImageManagement_ModuleProcessor extends ContextMenuBase_ModuleProcessor {

    /**
    * @name GetDynamicStyles
    * @param {object} props component props.
    * @summary this returns the styles for the SSR.
    */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSImage/CMSImageAddEdit/ImageManagement/ImageManagementStyles.css"]
    };
}

export default ImageManagement_ModuleProcessor;


