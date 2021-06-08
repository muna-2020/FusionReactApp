//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSIFrame_TestApplication_ModuleProcessor
 * @summary Contains the IFrame's test application version module specific methods.
 * */
class CMSIFrame_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSIFrame_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.CMSIFrame_TestApplication_ModuleProcessor.ResetAnswerForTextElements(objContext);
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSIFrame/CMSIFrameStyles.css"
        ];
    }
}

export default CMSIFrame_TestApplication_ModuleProcessor;
