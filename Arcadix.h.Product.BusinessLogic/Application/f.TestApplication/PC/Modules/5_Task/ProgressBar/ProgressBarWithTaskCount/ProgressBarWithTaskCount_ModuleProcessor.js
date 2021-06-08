/**
 * @name ProgressBar_ModuleProcessor
 * @summary Calculating Completion percentage of Task 
 * @returns {object} CompletionPercent
 */
class ProgressBarWithTaskCount_ModuleProcessor {

    /**
     * @summary Calculating the Completion percentage 
     * @param {any} objContext
     */
    SetProgressBar(objContext) {
        var CompletionPercent = 0;
        if (objContext.props.TestState.CurrentTaskIndex >=0) {
            var CurrentTaskDone = objContext.props.TestState.CurrentTaskIndex + 1;
            CompletionPercent = ((CurrentTaskDone) / objContext.props.TestState.TotalTasks) * 100;
            objContext.props = { ...objContext.props, 'CompletionPercent': CompletionPercent };
        }
    }
}

export default ProgressBarWithTaskCount_ModuleProcessor;
