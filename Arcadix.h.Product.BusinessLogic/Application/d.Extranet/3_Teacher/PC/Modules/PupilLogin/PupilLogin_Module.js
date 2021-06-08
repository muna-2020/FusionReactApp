//Helper classes.
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
* @name Extranet_PupilLogin_SavePupilLogin
* @summary SavePupilLogin object
*/
var Extranet_PupilLogin_SavePupilLogin = {

    /**
    * @summary URL
    */
    URL: "API/Extranet/Teacher/PupilLogin_Module/SavePupilLogin",

    /**
       * @name SavePupilLogin
       * @param {objParams} objParams Passes objParams
       * @param {callback} fnCallback Callback function
       * @summary Saves pupil login
       */
    SavePupilLogin: (objParams, fnCallback) => {
        let arrParams =
            [{
                ["URL"]: Extranet_PupilLogin_SavePupilLogin.URL,
                ["Params"]: objParams
            }];
        ArcadixFetchData.Execute(arrParams, fnCallback);
    }    
};

export default Extranet_PupilLogin_SavePupilLogin;