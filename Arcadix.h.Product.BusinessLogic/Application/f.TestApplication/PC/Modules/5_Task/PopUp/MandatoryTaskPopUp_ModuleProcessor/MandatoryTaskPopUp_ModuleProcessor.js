 /**
  * @name MandatoryTaskPopUp_ModuleProcessor
  * @summary Handling  Button Click
  */
class MandatoryTaskPopUp_ModuleProcessor {

    /**
     * @name MandatoryTaskPopUp
     * @summary Button Click Method
     */
    MandatoryTaskPopUp(objContext) {
        if (true) {
            let objPopupTextResource = {
                Confirm_ConfirmText: "MandatoryTask Text",
                Confirm_ConfirmBtnText: "Ok",
                Confirm_CloseBtnText: "Cancel",
                Confirm_Title: "strHeaderText",
                TextResourcesKey:"Confirm"
            }
            Popup.ShowConfirmationPopup({
                "Meta": {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Height:"auto",
                TextResources: objPopupTextResource,
                TextResourcesKey: 'Confirm',
                ConfirmEvent: (objModal) => {
                    Popup.ClosePopup(objModal);
                    this.DeleteData(objContext, strType, objDocument)
                }
            });
        }
    }
}

export default MandatoryTaskPopUp_ModuleProcessor;