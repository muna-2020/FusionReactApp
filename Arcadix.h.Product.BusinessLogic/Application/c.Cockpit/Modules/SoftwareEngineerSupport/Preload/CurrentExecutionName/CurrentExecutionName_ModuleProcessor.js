//Base classes.
import CockpitBase_ModuleProcessor from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_ModuleProcessor';

/**
* @name Preload_ModuleProcessor
* @summary Class for Preload module display.
*/
class CurrentExecutionName_ModuleProcessor extends CockpitBase_ModuleProcessor {
    onChangeText(objContext, event) {
        objContext.dispatch({ type: 'SET_STATE', payload: { "ExecutionName": event.target.value } });
        ApplicationState.SetProperty("vExecutionName", event.target.value);
    }
}

export default CurrentExecutionName_ModuleProcessor