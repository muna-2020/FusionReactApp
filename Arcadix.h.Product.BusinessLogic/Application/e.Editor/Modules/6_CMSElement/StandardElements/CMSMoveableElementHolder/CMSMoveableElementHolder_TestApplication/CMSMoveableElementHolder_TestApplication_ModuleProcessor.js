//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSMoveableElementHolder_TestApplication_ModuleProcessor
 * @summary Contains the MoveableElementHolder's test application version module specific methods.
 * */
class CMSMoveableElementHolder_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetMappedElementProps
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_Editor_ModuleProcessor}
     * @param {object} objElementJson Element json of mapped element.
     * @summary Returns props for mapped element.
     */
    GetMappedElementProps(objContext, objElementJson) {
        let objElementProps = {
            ...(objContext.props.IsForServerRenderHtml ? objContext.props : {}),
            "Mode": objContext.props.Mode,
            "ContainerId": objContext.props.ContainerId,
            "ParentRef": objContext.props.ElementRef,
            "PageId": objContext.props.PageId,
            "ElementRef": objElementJson.Ref,
            "ComponentController": objContext.props.ComponentController,
            "ElementJson": objElementJson,
            "JConfiguration": objContext.props.JConfiguration,
            // "PreservedState": Container_UndoRedoDataRef.current[ElementJson["iElementId"]]
        };
        return objElementProps;
    }

    /**
     * @name ResetAnswer
     * @param {object} objContext {state, props, dispatch, CMSMoveableElementHolder_TestApplication_ModuleProcessor}
     * @summary Resets the user response.
     */
    ResetAnswer(objContext) {
        objContext.CMSMoveableElementHolder_TestApplication_ModuleProcessor.ResetAnswerForTextElements(objContext);
        objContext.state.ElementJson["MappedElements"].map(x => {
            if (x.Ref.current !== null && x.Ref.current.ResetAnswer) {
                x.Ref.current.ResetAnswer();
            }
        });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSMoveableElementHolder/CMSMoveableElementHolderStyles.css"
        ];
    }
}

export default CMSMoveableElementHolder_TestApplication_ModuleProcessor;
