/**
 * @name ResultPopUp_ModuleProcessor
 * @summary Handling  Button Click
 */
class TestEndConfirmationPopUp_ModuleProcessor {

    /**
     * @name TestEndConfirmationPopUp
     * @summary Button Click Method
     */
    TestEndConfirmationPopUp() {
        if (true) {
            let objPopupTextResource = {
                Confirm_ConfirmText: "TestEndConfirmation Text",
                Confirm_ConfirmBtnText: "Ok",
                Confirm_CloseBtnText: "Cancel",
                Confirm_Title: "strHeaderText"
            }
            Popup.ShowConfirmationPopup({
                "Meta": {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Height: "auto",
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

export default TestEndConfirmationPopUp_ModuleProcessor;