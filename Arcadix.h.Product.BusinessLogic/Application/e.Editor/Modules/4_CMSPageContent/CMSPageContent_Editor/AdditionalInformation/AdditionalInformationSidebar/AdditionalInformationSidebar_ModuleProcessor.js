//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Objects required for module.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

class AdditionalInformationSidebar_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {any} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/4_CMSPageContent/AdditionalInformation/AdditionalInformationSidebar"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext {state, props, dispatch, AdditionalInformationSidebar_ModuleProcessor}
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(objContext.AdditionalInformationSidebar_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {array} return arrDataRequest
     */
    InitialDataParams(props) {
        let arrResourceParams = ["/e.Editor/Modules/4_CMSPageContent/AdditionalInformation/AdditionalInformationSidebar"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        let arrDataRequest = [Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name OnClickDeleteButton
     * @param {object} objContext {state, props, dispatch, AdditionalInformationSidebar_ModuleProcessor}
     * @summary Opens up confirmation popup.
     */
    OnClickDeleteButton(objContext) {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/e.Editor/Modules/4_CMSPageContent/AdditionalInformation/AdditionalInformationSidebar", objContext.props);
        let objTextResourceForDelete = {
            "DELETE_ConfirmText": objContext.AdditionalInformationSidebar_ModuleProcessor.TextFormatter(objTextResource, "DeletePopup_Message"),
            "DELETE_ConfirmButtonText": objContext.AdditionalInformationSidebar_ModuleProcessor.TextFormatter(objTextResource, "DeletePopup_ConfirmButtonText"),
            "DELETE_CloseButtonText": objContext.AdditionalInformationSidebar_ModuleProcessor.TextFormatter(objTextResource, "DeletePopup_CloseButtonText"),
            "DELETE_Title": objContext.AdditionalInformationSidebar_ModuleProcessor.TextFormatter(objTextResource, "DeletePopup_Title"),
            "DELETE_SubTitle": objContext.AdditionalInformationSidebar_ModuleProcessor.TextFormatter(objTextResource, "DeletePopup_SubTitle")
        };
        editorPopup.ShowConfirmationPopup({
            "Resource": {
                "Text": objTextResourceForDelete,
                "TextResourcesKey": "DELETE",
                "Variables": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Meta": {
                "ShowHeader": true,
                "ShowCloseIcon": true,
                "Height": 'auto',
                "Width": '390px'
            },
            "Data": {},
            "Events": {
                "ConfirmEvent": (strPopupId) => {
                    editorPopup.ClosePopup(strPopupId);
                    objContext.props.PassedEvents.RemoveAdditionalInformation();

                }
            },
            "CallBacks": {}
        });
    }

    /**
     * @name OnClickSaveButton
     * @param {object} objContext {state, props, dispatch, AdditionalInformationSidebar_ModuleProcessor}.
     * @summary Trigerred when the Save button is clicked.
     */
    async OnClickSaveButton(objContext) {
        let objTextElement = await objContext.state.ElementJson["TextElements"][0].Ref.current.GetElementJson();
        let objElementJson = {
            ...objContext.state.ElementJson,
            ["TextElements"]: [
                {
                    ...objTextElement
                }
            ]
        };
        objContext.props.PassedEvents.SaveAdditionalInformation(objElementJson);
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @summary Contains dynamic style for Additional Information Sidebar.
     * @returns {array} Styles.
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/4_CMSPageContent/AdditionalInformation/AdditionalInformationSidebar/AdditionalInformationSidebarStyles.css"
        ];
    }
}

export default AdditionalInformationSidebar_ModuleProcessor;
