/**
 * @name Intranet_Member_MemberFtpSync_FTPServiceStatus
 * @summary FTPServiceStatus object
 */
var Intranet_Member_MemberFtpSync_FTPServiceStatus = {

    /**
      * @name GetFtpServiceStatus
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Calls the API to check the service
      */
    GetFtpServiceStatus: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Member/MemberFtpSync/GetFtpServiceStatus", "Post", objParams).then(response => response.json()).then(json => { fnCallback(json); });
    }
};

export default Intranet_Member_MemberFtpSync_FTPServiceStatus;