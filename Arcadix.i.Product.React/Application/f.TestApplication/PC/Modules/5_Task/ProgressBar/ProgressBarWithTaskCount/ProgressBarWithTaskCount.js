//React Related import
import React from 'react';

//Progress Bar import
import ProgressBarControl from '@root/Framework/Controls/ProgressBar/ProgressBar';

//Component Related import
import ProgressBarWithTaskCount_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ProgressBar/ProgressBarWithTaskCount/ProgressBarWithTaskCount_ModuleProcessor';

/**
 * @name ProgressBarWithTaskCount
 * @param {object} props props
 * @summary This component displays the ProgressBarWithTaskCount.
 * @returns {object} React.Fragement that encapsulated the bar
 * */
const ProgressBarWithTaskCount = (props) => {

    /**
     * @name Assigning objContext
     * @summary Groups props and object of module processor which can be passed across method in the module and used 
     * */
    let objContext = { props, objProgressBarWithTaskCount_ModuleProcessor: new ProgressBarWithTaskCount_ModuleProcessor() };

    /**
     * @name objContext
     * @summary  Calling SetProgressBar Method.
     * @returns {object} objContext
     * */
    objContext.objProgressBarWithTaskCount_ModuleProcessor.SetProgressBar(objContext);

    /**
     * @name GetContent
     * @summary required jsx for component.
     * @returns {object} jsx, React.Fragment
     * */
    function GetContent() {
        let objTaskcount = objContext.props.TestState.CurrentTaskIndex + 1;
        let dblPercentage = objContext.props.CompletionPercent;
        let objData = {
            'Percentage': dblPercentage.toFixed(2),
            'ProgressText': 'frage ' + objTaskcount + ' von ' + objContext.props.TestState.TotalTasks + ''// Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "ProgressCompleted") + objTaskcount + Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "ProgressTotal") + objContext.props.TestState.TotalTasks + ''
        };
        return (
            <ProgressBarControl Id="ProgressBarWithTaskCount" Data={objData} />
        );
    }

    return GetContent();
};

export default ProgressBarWithTaskCount;
