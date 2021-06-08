//React Related import
import React from 'react';

//Progress Bar import
import ProgressBarControl from '@root/Framework/Controls/ProgressBar/ProgressBar';

//Component Related import
import ProgressBarWithTaskPercentage_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ProgressBar/ProgressBarWithTaskPercentage/ProgressBarWithTaskPercentage_ModuleProcessor';

/**
 * @name ProgressBarWithTaskPercenatge
 * @param {object} props props
 * @summary This component displays the ProgressBarWithTaskPercenatge.
 * @returns {object} React.Fragement that encapsulated the bar
 * */
const ProgressBarWithTaskPercentage = (props) => {

    /**
     * @name Assigning objContext
     * @summary Groups props and object of module processor which can be passed across method in the module and used 
     * */
    let objContext = { props, objProgressBarWithTaskPercentage_ModuleProcessor: new ProgressBarWithTaskPercentage_ModuleProcessor() };

    /**
     * @name objContext
     * @summary Calling SetProgressBar Method.
     * @returns {object} objContext
     * */
    objContext.objProgressBarWithTaskPercentage_ModuleProcessor.SetProgressBar(objContext);

    /**
     * @name GetContent
     * @summary required jsx for component.
     * @returns {object} jsx, React.Fragment
     * */
    function GetContent() {
        let objData = {
            'Percentage': objContext.props.CompletionPercent,
            'ProgressText': '' + objContext.props.CompletionPercent +'% ausgefuhart '
        };
        return (
            <ProgressBarControl Id="ProgressBarWithTaskPercentage" Data={objData} />
        );
    }

    return GetContent();
};

export default ProgressBarWithTaskPercentage;
