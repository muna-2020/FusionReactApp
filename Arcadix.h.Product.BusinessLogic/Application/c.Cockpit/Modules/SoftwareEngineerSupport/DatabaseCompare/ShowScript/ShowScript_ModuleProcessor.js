//Base classes.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';
import Cockpit_SoftwareEngineerSupport_DatabaseCompare from '@shared/Application/c.Cockpit/Modules/SoftwareEngineerSupport/DatabaseCompare/DatabaseCompare_Module';

/**
 * @name ShowScript_ModuleProcessor
 * @param NA
 * @summary Class for Subject module display.
 * @return NA
 */
class ShowScript_ModuleProcessor extends IntranetBase_ModuleProcessor {

    HandleChange(strScriptTochange, intIndexToCHange, objContext) {
        let arrScripts = objContext.state.arrScriptData;
        let arrNewScripts = arrScripts.map((strScript, intIndex) => intIndex == intIndexToCHange ? strScriptTochange : strScript);
        objContext.dispatch({ type: "SET_STATE", payload: { arrScriptData: arrNewScripts } });
    }

    /**
     * @name GetScriptsForTables
     * @param {any} objContext
     * @summary to call the API to get the scripts
     */
    GetScriptsForTables(objContext) {
        let objParams = {
            TableData: objContext.props.Data.TableData,
            ConnectionString: objContext.props.Data.SourceConnectionString
        }
        Cockpit_SoftwareEngineerSupport_DatabaseCompare.GetScriptsForTables(objParams, (objReturn) => {
            let arrScripts = objReturn.DatabaseCompare && objReturn.DatabaseCompare.Scripts ? objReturn.DatabaseCompare.Scripts.map(obj => obj["Script"]) : [];
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete : true, arrScriptData: arrScripts } });
        });
    }

    /**
     * @name GetScriptsForTables
     * @param {any} objContext
     * @summary to call the API to get the scripts
     */
    GetScriptsForProcs(objContext) {
        let objParams = {
            ProcsData: objContext.props.Data.ProcsData,
            ConnectionString: objContext.props.Data.SourceConnectionString
        }
        ApplicationState.SetProperty("blnShowAnimation", true);
        Cockpit_SoftwareEngineerSupport_DatabaseCompare.GetScriptsForProcs(objParams, (objReturn) => {
            let arrScripts = objReturn.DatabaseCompare && objReturn.DatabaseCompare.Scripts ? objReturn.DatabaseCompare.Scripts.map(obj => {
                let strScript = obj["vProcedureDefinition"];
                if (objContext.props.Data.ScriptsForEditedProcs) {
                    strScript = strScript.replace(/create Proc /gi, "alter PROC ");
                    strScript = strScript.replace(/create  Proc /gi, "alter  PROC ");
                    strScript = strScript.replace(/create   Proc /gi, "alter   PROC ");
                    strScript = strScript.replace(/create Procedure /gi, "alter PROCEDURE ");
                    strScript = strScript.replace(/create  Procedure /gi, "alter  PROCEDURE ");
                    strScript = strScript.replace(/create   Procedure /gi, "alter   PROCEDURE ");
                }
                return strScript;
            }) : [];
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: "SET_STATE", payload: { isLoadComplete: true, arrScriptData: arrScripts } });
        });
    }


    /**
     * @name ExecuteScript
     * @param {any} objContext
     * @summary to call the API to execute the scripts
     */
    ExecuteScript(objContext) {
        let strScriptToRun = "GO \n ";
        objContext.state.arrScriptData.map(strScript => {
            if (strScript != "") {
                strScriptToRun += strScript + " \n GO \n ";
            }
        });
        let objParams = {
            ConnectionString: objContext.props.Data.DestinationConnectionString,
            Script: objContext.state.arrScriptData
        };
        Cockpit_SoftwareEngineerSupport_DatabaseCompare.ExecuteScript(objParams, (objReturn) => {
            Popup.ClosePopup(objContext.props.Id);
        });
    }
}

export default ShowScript_ModuleProcessor;