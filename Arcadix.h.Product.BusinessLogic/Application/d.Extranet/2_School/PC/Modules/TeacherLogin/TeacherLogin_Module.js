
/**
 * @name Extranet_School_TeacherLogin
 * @summary This object consists of sendemail method.
 */
var Extranet_School_TeacherLogin = {

    /**
    * @summary URL
    */
    URL: "API/Extranet/School/Modules/TeacherLogin_Module/SendTeacherLogin",

    /**
    * @name SendEmail
    * @param {objParams} objParams Passes objParams
    * @param {callback} fnCallback Callback function
    * @summary SendEmail to MainClient
    */
    SendEmail: (objParams, fnCallback) => {
        let arrParams =
            [{
                ["URL"]: Extranet_School_TeacherLogin.URL,
                ["Params"]: objParams
            }];
        ArcadixFetchData.Execute(arrParams, fnCallback);
    }
};

/**
* @summary Exports the object.
*/
export default Extranet_School_TeacherLogin;