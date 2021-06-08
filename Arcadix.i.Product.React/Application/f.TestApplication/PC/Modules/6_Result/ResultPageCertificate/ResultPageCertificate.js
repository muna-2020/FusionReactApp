//React Related Imports
import * as React from 'react';

//StandardLogin is for Standard Login Form
import ResultPageController from '@root/Application/f.TestApplication/PC/Modules/6_Result/ResultPageCertificate/ResultPageController/ResultPageController';

/**
 * @name ResultPageCertificate
 * @param {object} props props object
 * @summary Result Page Layout
 */
const ResultPageCertificate = (props) => {

    /**
     * @name ResultControl
     * @param {object} props props object
     * @summary contains all the Result Controls.
     * @returns null
     */
    const ResultControl = ResultPageController.GetResultControl(props.TestState.ResultPageProperties.ComponentName);

    return props.TestState.ResultPageProperties.ComponentName ? <ResultControl {...props} /> : <React.Fragment/>;
}

export default ResultPageCertificate;