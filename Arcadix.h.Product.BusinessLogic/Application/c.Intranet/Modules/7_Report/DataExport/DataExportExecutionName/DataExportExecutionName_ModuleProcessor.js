//Base classes.
import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';


/**
* @name DataExportExecutionName_ModuleProcessor
* @summary Class for DataExportExecutionName.
*/
class DataExportExecutionName_ModuleProcessor extends IntranetBase_ModuleProcessor {
    onChangeText(objContext, event) {
        objContext.dispatch({ type: 'SET_STATE', payload: { "DataExportExecutionName": event.target.value } });
        ApplicationState.SetProperty("vDataExportExecutionName", event.target.value);
    }
}
export default DataExportExecutionName_ModuleProcessor
