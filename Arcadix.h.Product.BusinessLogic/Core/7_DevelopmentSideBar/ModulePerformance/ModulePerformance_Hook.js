//React related imports
import { useEffect  } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/** 
 * @name GetInitialState
 * @summary to Get Initial State
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        arrPerformanceLogs: [],
        strTabName: "JS",
        arrProcedures: [],
        blnIsLoadComplete: false,
        arrProcsList:[]
    };
}


/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext takes objContext
 * @summary Calls the DataCall method.
 */
export function useDataLoader(objContext) {
    useEffect(() => {

        //latest performance log on the top.
        if (objContext.props.PerformanceLog != undefined) {
            objContext.dispatch({ type: "SET_STATE", payload: { arrPerformanceLogs: objContext.props.PerformanceLog } });
            objContext.dispatch({ type: "SET_STATE", payload: { blnIsLoadComplete: true } });
            objContext.props.PerformanceLog.map((objData) => {
                if (Object.keys(objData)[0] == "Message"
                    && Object.values(objData)[0] != "ViewFileContent"
                    && Object.values(objData)[0] != "ViewCSRStateProps"
                    && Object.values(objData)[0] != "ShowProcedureDefinition") {
                    objContext.dispatch({ type: "SET_STATE", payload: { ModuleName: Object.values(objData)[0] } });
                    objContext.dispatch({ type: "SET_STATE", payload: { PreviuosModuleName: objContext.state.ModuleName } });
                }
            })
            objContext.ModulePerformance_ModuleProcessor.GetConnectionString(objContext);
        }

        if (objContext.state.ModuleName != objContext.state.PreviuosModuleName ) {
            objContext.dispatch({ type: "SET_STATE", payload: { FileList: [] } });
            objContext.dispatch({ type: "SET_STATE", payload: { BusinessLogicFileList: [] } });
            ApplicationState.SetProperty("arrProcList", []);
            
        }
    }, [
        objContext.props.PerformanceLog
    ]);
}