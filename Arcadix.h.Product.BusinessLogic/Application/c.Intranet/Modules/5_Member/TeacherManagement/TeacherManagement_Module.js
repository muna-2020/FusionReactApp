import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

var Object_Intranet_Member_TeacherManagement_Module = {

    /**
     * @name GetTeacherManagment
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Gets data for AssignTaskToTest
     */
    GetTeacherManagmentData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Member/TeacherManagement/GetData", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },


    /**
     * @name EditTeacherManagementData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Edits data for TeacherManagment
     */
    AddTeacherManagmentData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Member/TeacherManagement/AddData", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    /**
     * @name AddTeacherManagementData
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary Edits data for TeacherManagment
     */
    EditTeacherManagmentData: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Member/TeacherManagement/EditData", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    /**
     * @name SendLogins
     * @param {objParams} objParams passes objParams
     * @param {callback} fnCallback callback function
     * @summary Send Login Mail for TeacherManagement
     */
    SendLogins: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Intranet/Member/TeacherManagement/sendTeacherManagementLogin", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    }
};

export default Object_Intranet_Member_TeacherManagement_Module;
