/**
 * @name ProgressBar_ModuleProcessor
 * @summary Calculating Completion percentage of Task 
 * @returns {object} CompletionPercent
 */
class objProgressBarWithTaskPercentage_ModuleProcessor_ModuleProcessor {

    /**
     * @summary Calculating the Completion percentage 
     * @param {any} objContext
     */
    SetProgressBar(objContext) {
        var CompletionPercent = 0;
        if (objContext.props.TestState.CurrentTaskIndex >=0) {
            var CurrentTaskDone = objContext.props.TestState.CurrentTaskIndex;
            CompletionPercent = ((CurrentTaskDone) / objContext.props.TestState.TotalTasks) * 100;
            objContext.props = { ...objContext.props, 'CompletionPercent': Math.floor(CompletionPercent) };
        }
    }
}

export default objProgressBarWithTaskPercentage_ModuleProcessor_ModuleProcessor;
