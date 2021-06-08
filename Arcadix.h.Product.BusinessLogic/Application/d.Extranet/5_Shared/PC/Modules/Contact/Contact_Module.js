//Common functionality imports
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * @name Extranet_SharedModule_ContactEmail
 * @summary This object consists of sendemail method.
 */
var Extranet_SharedModule_ContactEmail = {

    /**
    * @summary URL
    */
    URL: "API/Extranet/SharedModule/ContactEmail_Module/SendContactEmail",

    /**
    * @name SendEmail
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary SendEmail to MainClient
    */
    SendEmail: (objParams, fnCallback) => {
        let arrParams =
            [{
                ["URL"]: Extranet_SharedModule_ContactEmail.URL,
                ["Params"]: objParams
            }];
        ArcadixFetchData.Execute(arrParams,fnCallback);
    }
};

/**
* @summary Exports the object.
*/
export default Extranet_SharedModule_ContactEmail;