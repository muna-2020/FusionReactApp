//Module Objects

/**
 * @name ActiveServiceStatus_ModuleProcessor
 * @param NA
 * @summary Class for ActiveServiceStatus module display.
 * @return NA
 */
class ActiveServiceStatus_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name GetActiveServiceStatus
     * @param {any} objContext
     */
    GetActiveServiceStatus(objContext) {
        ArcadixFetchData.ExecuteCustom("API/Object/Framework/SystemTracking/ActiveServiceStatus/GetActiveServiceStatus", "Post", {})
            .then(response => response.json())
            .then(json => {
                objContext.dispatch({ type: "SET_STATE", payload: { "arrServiceStatus": json["Data"] } });
            });
    }
}

export default ActiveServiceStatus_ModuleProcessor;