//LoadSolution_Module for LoadSolutionButtonClick method
import LoadSolution_Module from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/LoadSolution/LoadSolution_Module';


/**
 *@name EvaluationButton_ModuleProcessor
 *@summary for event on click handling methods
 */
class LoadSolution_ModuleProcessor {


    /**
     * @name StoreMapList
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            { StoreKey: "ApplicationState", DataKey: "ShowLoadSolutiontButton" }
        ];
    }

    /**
     * @name LoadSolutionClick
     * @param {object} objContext  component context
     * @summary calls module object method for API call
     * */
    LoadSolutionClick(objContext, objParams) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        LoadSolution_Module.GetData(objContext, objParams, (objReturn) => {
            if (objReturn.Success) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.props.TaskLayoutRef.current.LoadSolution(objReturn["json"]["LoadSolution"]["LoadSolutionResult"]);
            }
        });
    };
}

export default LoadSolution_ModuleProcessor;
