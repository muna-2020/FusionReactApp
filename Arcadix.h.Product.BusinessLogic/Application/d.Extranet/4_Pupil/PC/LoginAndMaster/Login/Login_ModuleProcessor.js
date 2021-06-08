//Base classes.
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';

//Objects required for module.
import Extranet_ExtranetLogin_Module from '@shared/Application/d.Extranet/5_Shared/PC/Modules/ExtranetLogin/ExtranetLogin';
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

//Global declaration of the base files.
global.ExtranetBase_ModuleProcessor = ExtranetBase_ModuleProcessor;

/**
 * @name Login_ModuleProcessor
 * @summary Class for Notes module display and manipulate.
 */
class Login_ModuleProcessor extends ExtranetBase_ModuleProcessor {
    /**
    * @name LoadInitialData
    * @param {object} objContext passes Context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name OnLoginClick
     * @param {any} strUserName strUserName
     * @param {any} strPassword strPassword
     * @summary The user is validated 
     */
    OnLoginClick(strUserName, strPassword, objContext) {
        if (strUserName == "" && strPassword !== "") {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnEmailNotEntered": true, "blnPasswordNotEntered": false, "blnLoginFailed": false, "blnLoginDataNotEntered": false } });
        }
        else if (strUserName !== "" && strPassword == "") {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnPasswordNotEntered": true, "blnEmailNotEntered": false, "blnLoginFailed": false, "blnLoginDataNotEntered": false } });
        }
        else if (strUserName !== "" && strPassword !== "") {

            //objContext.dispatch({ type: "SET_STATE", payload: { "blnLoginDataNotEntered": false } });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnEmailNotEntered": false, "blnPasswordNotEntered": false, "blnLoginDataNotEntered": false } });


            var objLoginDataRequest = {
                Params: {
                    UserName: strUserName.trim(),
                    Password: strPassword.trim(),
                    Host: window.location.host + '/' + window.location.pathname.split('/')[1],
                    JConfiguration: JConfiguration
                }
            };
            ApplicationState.SetProperty("blnShowAnimation", true);
            Extranet_ExtranetLogin_Module.ValidateUser(objLoginDataRequest, (objReturnData) => {
                if (objReturnData) {
                    if (objReturnData.login.Data.Success === true) {
                        ApplicationState.SetProperty('ClientUserDetails', objReturnData.login.Data);
                        ClientUserDetails = objReturnData.login.Data;
                        global.ClientUserDetails = ClientUserDetails;
                        //ApplicationState.SetProperty('FullServerRenderedModules', objReturnData["FullServerRenderedModules"] ?? []);
                        ApplicationState.SetProperty('SelectedClassId', objReturnData.login.Data.SelectedClassId);
                        ApplicationState.SetProperty('LoggedIn', { 'IsLoggedIn': true, 'MasterHTML': objReturnData["ServerRenderHtml"] });
                        objContext.dispatch({ type: "SET_STATE", payload: { "blnLoginFailed": false } });

                        let strSchoolId = ClientUserDetails.PupilDetails.t_TestDrive_Member_School_Pupil[0]["uSchoolId"]
                        let objSchoolParams = {
                            "SearchQuery": {
                                "must": [
                                    {
                                        "match": {
                                            "uSchoolId": strSchoolId
                                        }
                                    }]
                            }
                        };
                        (new ArcadixFetchAndCacheData()).ExecuteSingle("API/Object/Extranet/School/School", objSchoolParams, "Get", () => { });

                    } else {
                        ApplicationState.SetProperty("blnShowAnimation", false);
                        objContext.dispatch({ type: "SET_STATE", payload: { "blnLoginFailed": true } });
                    }
                    ApplicationState.SetProperty("blnShowAnimation", false);
                }
            });
        }
        else {
            //objContext.dispatch({ type: "SET_STATE", payload: { "blnLoginDataNotEntered": true } });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnEmailNotEntered": true, "blnPasswordNotEntered": false, "blnLoginFailed": false, "blnLoginDataNotEntered": true } }); //when both userid and password are empty, then show email validation failed
        }
    }


    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        return [];
    }

    GetDynamicStyles(props) {
        let arrDynamicStyles = [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/LoginAndMaster/Login.css"
        ];
        if (JConfiguration.Performance) {
            arrDynamicStyles = [...arrDynamicStyles, props.JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css"];
        }
        return arrDynamicStyles;
    };

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }
}
export default Login_ModuleProcessor;