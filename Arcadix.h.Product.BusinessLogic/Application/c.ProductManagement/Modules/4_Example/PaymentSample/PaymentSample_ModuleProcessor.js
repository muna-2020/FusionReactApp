//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

/**
 * @name PaymentSample_ModuleProcessor
 * @param NA
 * @summary Class for PaymentSample module display.
 * @return NA
 */
class PaymentSample_ModuleProcessor extends CockpitBase_ModuleProcessor {

    /**
    * @name OnPullLatestClick
    * @param {object} event takes event object
    * @summary Handles button click event
    */
    OnActivateClick(objContext, objItem) {

        //Forming the params to be sent with customized options as required
        let objParams = {
            "key": "rzp_test_B1aOCGafoZbdAT",//API Key
            "amount": objItem["price"], // amount in paisa
            "name": "Arcadix",
            "description": objItem["item"] + "Activation",
            "image": "/your_logo.png",
            "handler": (objResp) => {
                this.OpenPaymentResultPopup(objResp, objItem, objContext);
            },
            "theme": {
                "color": "#F37254"
            }
        };

        //Create Instance of RazorPay
        let rzp = new Razorpay(objParams);
        //To open the Checkout popup - form RazorPay
        rzp.open();         
    }
        
    OpenPaymentResultPopup(objResp, objItem, objContext) {
        console.log(objResp);
        //Temporarily using ErrorPopup component to display status of payment
        let objVaribales = {
            Variable_1: objResp.razorpay_payment_id,
            Variable_2: objItem["item"]
        };
        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                "ShowCloseIcon": true,
            },
            Resource: {
                Text: {
                    "ConfirmationPopup_ConfirmText": "Payment of Succesfull for {!@Variable_2} and payment Id is {!@Variable_1}",
                    "ConfirmationPopup_ConfirmButtonText": "Okay",
                    "ConfirmationPopup_CloseButtonText": "Close",
                },
                TextResourcesKey: "ConfirmationPopup",
                SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                Variables: objVaribales
            },
            CallBacks: {}
        });
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css"
        ]
    }
}

export default PaymentSample_ModuleProcessor;