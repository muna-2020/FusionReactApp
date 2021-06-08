
var Intranet_Member_PupilManagement_Module = {

    /**
      * @name GetPupilManagementData
      * @param {objParams} objParams Passes objParams
      * @param {callback} fnCallback Callback function
      * @summary Gets data for PupilManagement
      */
    GetPupilManagementData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteSingle("API/Intranet/Member/PupilManagement_Module", objParams, "Get", fnCallback);
    },

    /**
     * @name EditPupilManagementData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Edits data for PupilManagement
     */
    EditPupilManagementData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteSingle("API/Intranet/Member/PupilManagement", objParams, "Put", fnCallback);
    },

    /**
     * @name SendLogins
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Edits data for PupilManagement
     */
    SendLogins: (objParams) => {
        let arrRequest = [
            {
                "URL": "API/Intranet/Member/PupilManagement_Module/sendPupilManagementLogin",
                "Params": objParams
            }
        ];
        ArcadixFetchData.Execute(arrRequest, () => ({}));
    },

    /**
     * @name OpenExtranetPupil
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Edits data for PupilManagement
     */
    OpenExtranetPupil: (objParams,fnCallback) => {
        ArcadixFetchData.ExecuteCustom("Product/Core/Controllers/OpenApplicationController/Index", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    }
};

export default Intranet_Member_PupilManagement_Module;