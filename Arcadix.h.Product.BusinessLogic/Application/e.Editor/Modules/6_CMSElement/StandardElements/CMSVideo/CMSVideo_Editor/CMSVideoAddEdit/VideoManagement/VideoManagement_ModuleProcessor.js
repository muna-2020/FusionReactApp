//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name VideoManagement_ModuleProcessor
 * @summary Contains the Video's management version module specific methods.
 * */
class VideoManagement_ModuleProcessor extends ContextMenuBase_ModuleProcessor {

    /**
    * @name GetDynamicStyles
    * @param {object} props component props.
    * @summary this returns the styles for the SSR.
    */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSVideo/CMSVideoAddEdit/VideoManagement/VideoManagementStyles.css"]
    };
}

export default VideoManagement_ModuleProcessor;
