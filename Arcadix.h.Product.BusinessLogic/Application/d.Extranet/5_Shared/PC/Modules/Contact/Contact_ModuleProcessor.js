//Module Objects
import Extranet_SharedModule_ContactEmail from '@shared/Application/d.Extranet/5_Shared/PC/Modules/Contact/Contact_Module';


/**
 * @name Contact_ModuleProcessor
 * @summary Class for Contact module display and manipulate.
 */
class Contact_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of store objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/5_SharedModule/Contact"];
    }

    /**
    * @name LoadInitialData
    * @param {object} objContext passes Context object
    * @summary Calls the QueueAndExecute method from ObjectQueue class
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(objContext.Contact_ModuleProcessor.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {Array} Return arrDataRequest
     */
    InitialDataParams(props) {
        //TextResource        
        let arrResourceParams = ["/d.Extranet/5_SharedModule/Contact"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        return [Object_Framework_Services_TextResource];
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/Contact/Contact.css"
        ];
    }


    /**
* @name GetPrefetchFiles
* @param {object} props props
* @returns {object} PrefetchFiles
*/
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": [
                JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/download.svg"               
            ]
        }
    }

    /**
     * @name HandleChange
     * @param {any} objContext objContext
     * @param {any} strId strId
     * @param {any} strValue strValue
     * @summary To handle the change in the input text of subject or text
     */
    HandleChange(objContext, objTextResource, strId, strValue) {
        let strStateId = "";
        if (strId === "EmailSubject") {
            strStateId = "strEmailSubject";
            if (strValue === "") {
                objContext.dispatch({
                    type: "SET_STATE", payload: { "blnShowValidation": true, "strValidationMessage": Localization.TextFormatter(objTextResource, 'ValidationMessage'), [strStateId]: strValue }
                });
            }
            else {
                objContext.dispatch({
                    type: "SET_STATE", payload: { "blnShowValidation": false, [strStateId]: strValue }
                });
            }
        }
        else {
            strStateId = "strEmailtext";
            if (strValue === "") {
                objContext.dispatch({
                    type: "SET_STATE", payload: { "blnShowValidation": true, "strValidationMessage": Localization.TextFormatter(objTextResource, 'ValidationMessage'), [strStateId]: strValue }
                });
            }
            else {
                objContext.dispatch({
                    type: "SET_STATE", payload: { "blnShowValidation": false, [strStateId]: strValue }
                });
            }
        }
        
    }

    /**
     * @name ShowValidationMessageOnFocus
     * @param {any} objContext objContext
     * @param {any} strId strId
     * @summary Validates the field on focus
     */
    ShowValidationMessageOnFocus(objContext, objTextResource, strId) {
        if (strId === "Emailtext") {
            if (objContext.state.blnSubjectClicked) {
                if (objContext.state.strEmailtext === "") {
                    objContext.dispatch({
                        type: "SET_STATE", payload: { "blnShowValidation": true, "strValidationMessage": Localization.TextFormatter(objTextResource, 'ValidationMessage')}
                    });
                }
            }
        }
        if (strId === "EmailSubject") {
            if (objContext.state.strEmailSubject === "") {
                objContext.dispatch({ type: "SET_STATE", payload: { "blnSubjectClicked": true } });
            }
        }
    }

    /**
     * @name Validate
     * @param {any} objContext objContext
     * @summary To validate the text and subject field
     * @return {string} Returns string
     */
    Validate(objContext, EmailSubjectRef, EmailtextRef) {
        //var strElementToFocus = "";
        var objElementToFocus = null;
        if (objContext.state.strEmailSubject === "") {
            //strElementToFocus = "EmailSubject";
            objElementToFocus = EmailSubjectRef;
        }
        else if (objContext.state.strEmailtext === "") {
            //strElementToFocus = "Emailtext";
            objElementToFocus = EmailtextRef
        }
        return objElementToFocus;
    }

    /**
     * @name OnClickEmailSend 
     * @param {any} objContext objContext
     * @param {any} strAttachmentArray strAttachmentArray
     * @summary Creates object to send an email 
     */
    OnClickEmailSend(objContext, strAttachmentArray) {
        let objEmailNote = {
            ["SchoolId"]: objContext.props.ClientUserDetails.UserId,//TeacherDetails..uSchoolId,
            ["strSubject"]: objContext.state.strEmailSubject,
            ["strAttachmentsJson"]: strAttachmentArray,// objContext.state.str,
            ["strUserId"]: objContext.props.ClientUserDetails.UserId,//"D6B9E650-F2D7-40A6-9290-9E48540B1EDA",
            ["strComment"]: objContext.state.strEmailtext//"Testing Send Email",
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_SharedModule_ContactEmail.SendEmail(objEmailNote, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            //objContext.dispatch({ type: "SET_STATE", payload: { "blnShowMailSentDiv": true } });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnShowMailSentDiv": true, "blnShowValidation": false, "strValidationMessage": "" } });
        });
    }

    /**
    * @name GetMetaDataFillheightContact
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetMetaDataFillheightContact() {
        return {
            HeaderIds: ["Header", "outletBand"]
        };
    }

    /**
     * @name GetMetaData
     * @summary it returns the object of metadata
     * @returns {array} MetaData
    */
    GetMetaData() {
        return {
            ShowUploadedFiles: true, // To show details of uploaded files.
            UploadSingle: 'N', //restrict to select only one file.
            AllowDropFiles:false
        };
    }

    /**
     * @name GetResourceData
     * @param {*} objTextResource objTextResource
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceData(objTextResource) {
        let Text = {
            "UploadButtonText": Localization.TextFormatter(objTextResource, 'AddAttachmentText') // Button text
        };

        //let ImagePath = {
        //    UploadIcon: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/attachment.png" //by default plus will show.
        //};

        let SkinPath = JConfiguration.ExtranetSkinPath; // mandatory

        return {
            Text,
            SkinPath
            //   ImagePath
        };
    }
}

export default Contact_ModuleProcessor;