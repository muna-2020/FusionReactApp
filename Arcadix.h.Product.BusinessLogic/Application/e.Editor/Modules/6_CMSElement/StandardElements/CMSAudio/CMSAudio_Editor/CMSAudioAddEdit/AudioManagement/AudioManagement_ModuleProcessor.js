//Base classes/hooks.
import ContextMenuBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/ContextMenuBase_ModuleProcessor';

/**
 * @name AudioManagement_ModuleProcessor
 * @summary Contains the Audio's management version module specific methods.
 * */
class AudioManagement_ModuleProcessor extends ContextMenuBase_ModuleProcessor {

    /**
    * @name GetDynamicStyles
    * @param {object} props component props.
    * @summary this returns the styles for the SSR.
    */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSAudio/CMSAudioAddEdit/AudioManagement/AudioManagementStyles.css"]
    };
}

export default AudioManagement_ModuleProcessor;
