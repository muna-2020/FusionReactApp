//React related imports.
import React from 'react';

/**
 * @name IntroductionDisplay
 * @summary Introduction page
 */
const IntroductionDisplay = (props) => {

    return (
        <p>{Localization.TextFormatter(props.TextResources, 'TestApplicationFrame_IntroductionTitle_Text')}</p>   
    );
}

export default IntroductionDisplay;