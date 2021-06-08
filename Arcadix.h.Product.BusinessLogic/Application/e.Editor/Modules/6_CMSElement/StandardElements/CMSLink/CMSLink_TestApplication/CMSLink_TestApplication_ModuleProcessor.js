//Base classes/hooks.
import EditorBase_ModuleProcessor from "@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor";

/**
 * @name CMSLink_TestApplication_ModuleProcessor
 * @summary Contains the Link's test application version module specific methods.
 * */
class CMSLink_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {
  /**
   * @name OpenLinkInfoPopUp
   * @param {object} objContext {state, props, dispatch}
   * @param {string} strElementTypeName element name
   */
  OpenLinkInfoPopUp(objContext, strElementTypeName) {
    TestApplicationPopup.ShowPopup({
      Data: {
        ComponentController: objContext.props.ComponentController,
        ElementJson: objContext.state.ElementJson["LinkElementDetails"],
        ElementTypeName: strElementTypeName,
      },
      Meta: {
        PopupName: "LinkInfoPopup",
        Height: "auto",
        Width: "800px",
        ShowHeader: true,
        ShowCloseIcon: true,
        ShowToggleMaximizeIcon: true,
      },
      Resource: {
        Text: {},
        SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
      },
      Events: {},
      CallBacks: {},
    });
  }
}

export default CMSLink_TestApplication_ModuleProcessor;
