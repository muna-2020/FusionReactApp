//Base class imports
import SchoolNews_ModuleProcessor_Browser from "@shared/Application/d.Extranet/2_School/PC/Modules/SchoolNews/SchoolNews_ModuleProcessor";

/**
 * @name SchoolNews_ModuleProcessor.
 * @summary business layer for schoolnews.
 * */
class SchoolNews_ModuleProcessor extends SchoolNews_ModuleProcessor_Browser {

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/Phone/Modules/SchoolNews/SchoolNews.css"
        ];
    }

    /**
    * @name SelectTeacherOrPupil
    * @param {object} objContext Context object
    * @param {String} strTeacherOrPupil Teacher/Pupil string
    * @summary updates selected chat name and shows the Display chat.
    */
    SelectTeacherOrPupil(objContext, strTeacherOrPupil) {
        objContext.dispatch({ type: 'SET_STATE', payload: { strTeacherOrPupil: strTeacherOrPupil, strMessagetext: "", Reload: true, blnShowChat: true } });
    }

    /**
    * @name GetIsAttachmentCreatedToday
    * @param {String} strDateCreatedOn Creation date of the Attachment
    * @summary Compares current date with the Created date and returns true if matches
    * @returns {boolean} true/false
    */
    GetIsAttachmentCreatedToday(strDateCreatedOn) {
        let strCreatedDate = new Date(strDateCreatedOn).toISOString().split("T")[0];
        let strCurrentDate = new Date().toISOString().split("T")[0];

        return strCreatedDate == strCurrentDate;
    }

    /**
    * @name OpenDeleteConfirmationPopup
    * @summary opens the generic confirmation popup.
    * @param {object} objContext Context object
    * @param {object} objNews News Object
    */
    OpenDeleteConfirmationPopup(objContext, objNews) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolNews", objContext.props);
        let objPopupResoure = {
            Delete_ConfirmText: Localization.TextFormatter(objTextResource, 'ConfirmationMessage'),
            Delete_ConfirmButtonText: Localization.TextFormatter(objTextResource, 'ConfirmationBtnText'),
            Delete_CloseButtonText: Localization.TextFormatter(objTextResource, 'Close'),
            Delete_Title: Localization.TextFormatter(objTextResource, 'DeleteHeader')
        };

        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                Height: "auto",
                Width: "100%" //required only for phone version
            },
            Resource: {
                Text: objPopupResoure,
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "Delete"
            },
            Events: {
                ConfirmEvent: (strPopupUniqueId) => {
                    this.DeleteMessage(objContext, objNews);
                    Popup.ClosePopup(strPopupUniqueId);
                }
            },
            CallBacks: {}
        });
    }
}

export default SchoolNews_ModuleProcessor;