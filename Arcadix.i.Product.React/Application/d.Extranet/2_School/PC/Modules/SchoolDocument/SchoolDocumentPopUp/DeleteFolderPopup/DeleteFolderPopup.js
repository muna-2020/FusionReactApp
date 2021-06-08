//React imports.
import React from "react";

//Module specific imports
import * as DeleteFolderPopup_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup_Hook';
import DeleteFolderPopup_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup_ModuleProcessor';

/**
 * @name SchoolDeleteFolderPopup
 * @summary confirmation for delete folder or document.
 * @param {any} props
 */
const SchoolDeleteFolderPopup = props => {

    /**
     * @name Header.
     * @summary header for popup.
     * */
    let strHeader = '';

    /**
     * @name MessageText.
     * @summary confirmation message 
     * */
    let strMessageText = "";

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = {  props, ["DeleteFolderPopup_ModuleProcessor"]: new DeleteFolderPopup_ModuleProcessor() };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    DeleteFolderPopup_Hook.Initialize(objContext);

    /**
     * @name objTextResource
     * @summary objTextResource
     */
    let objTextResource = props.Resource.Text.objTextResource;

    if (props.Data.strType == "Folder") {
        strMessageText = Localization.TextFormatter(objTextResource, 'DeleteFolderPopUpMessage').replace("{}", "<b>" + props.Data.strFolderName + "</b>");
        strHeader = Localization.TextFormatter(objTextResource, 'DeleteFolderPopUpHeader');
    }
    else {
        strMessageText = Localization.TextFormatter(objTextResource, 'DeleteDocumentPopUpMessage').replace("{}", "<b>" + props.Data.strDocumentName + "</b>");
        strHeader = Localization.TextFormatter(objTextResource, 'DeleteDocumentPopUpHeader');
    }

    return (
        <div className="delete-folder-wrapper-class">
            <div className="delete-message">
                <span>{strHeader}</span>
                <span className="delete-text" dangerouslySetInnerHTML={{ __html: strMessageText }}></span>
            </div>

            <div class="delete-footer-block">
                <button className="footerclose-button button" onClick={e => Popup.ClosePopup(props.Id)}> {Localization.TextFormatter(objTextResource, 'Close')} </button>
                <button className="button yellow-button" onClick={() => { OnClickDelete() }}>{Localization.TextFormatter(objTextResource, 'Delete')}</button>
            </div>
        </div>
    );

    /**
     * @name OnClickDelete
     * @summary closes the popup and calls the delete method of parent component.
     * */
    function OnClickDelete() {
        Popup.ClosePopup(props.Id);
        props.Events.OnClickSave();
    }
};

/**
 * @name DynamicStyles
 * @summary returns the list of css paths for the component.
 * @param {any} props
 * @returns {Array}
 */
SchoolDeleteFolderPopup.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolDocument/SchoolDocumentPopUp/DeleteFolderPopup.css"];
};

export default SchoolDeleteFolderPopup;
