/**
 * @name Cockpit_SoftwareEngineerSupport_DatabaseCompare
 * @summary DatabaseCompare object
 */
var Cockpit_SoftwareEngineerSupport_DatabaseCompare = {

    /**
     * @name GetDbConnectionStrings
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary 
     */
    GetDbConnectionStrings: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/GetDbConnectionStrings", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    /**
     * @name GetScriptsForProcs
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary 
     */
    GetScriptsForProcs: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/GetScriptsForProcs", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    /**
     * @name GetScriptsForTables
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary 
     */
    GetScriptsForTables: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/GetScriptsForTables", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    /**
     * @name ExecuteScript
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary 
     */
    ExecuteScript: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/ExecuteScript", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    /**
     * @name ExecuteScript
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary 
     */
    GetNewProcedures: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/GetNewProcedures", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    /**
     * @name ExecuteScript
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary 
     */
    GetProcedures: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/GetProcedures", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    },

    /**
     * @name ExecuteScript
     * @param {objParams} objParams Passes objParams
     * @param {callback} fnCallback Callback function
     * @summary 
     */
    GetEditedProcedures: (objParams, fnCallback) => {
        ArcadixFetchData.ExecuteCustom("API/Cockpit/DatabaseCompare/GetEditedProcedures", "Post", objParams).then(response => response.json()).then(json => {
            fnCallback(json);
        });
    }
};

export default Cockpit_SoftwareEngineerSupport_DatabaseCompare;