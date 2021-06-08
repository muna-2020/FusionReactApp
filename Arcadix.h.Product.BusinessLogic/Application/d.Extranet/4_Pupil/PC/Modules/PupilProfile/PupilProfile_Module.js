
var Extranet_Pupil_PupilProfile_Module = {

    /**
     * @name URL
     * @summary Path for server object.
    */
    URL: "API/Extranet/Pupil/PupilProfile_Module/SaveProfileDetails",
    
    /**
    * @sumamry Gets the data without caching
    * @param {any} objParams objParams
    * @param {any} fnCallback fnCallback
    * */
    SaveProfileDetails: (objParams, fnCallback) => {
        let arrParams =
            [{
                ["URL"]: Extranet_Pupil_PupilProfile_Module.URL,
                ["Params"]: objParams
            }];
        ArcadixFetchData.Execute(arrParams, fnCallback);
    }
};

export default Extranet_Pupil_PupilProfile_Module;