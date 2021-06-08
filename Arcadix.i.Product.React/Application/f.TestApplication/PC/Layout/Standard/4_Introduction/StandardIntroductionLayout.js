//React Related Imports
import * as React from 'react';

//Module Related Imports
import IntroductionDisplay from '@root/Application/f.TestApplication/PC/Modules/4_Introduction/IntroductionDisplay/IntroductionDisplay';
import StartButton from '@root/Application/f.TestApplication/PC/Modules/4_Introduction/StartButton/StartButton';

/**
 * @name StandardIntroductionLayout
 * @summary Standard Introduction Layout page
 * @param {any} props Props
 */
const StandardIntroductionLayout = (props) => {

    return (
        <div className="introduction-layout">
            <div className="header">
                <img
                    src={props.TestState.Logo}
                    alt=""
                />
            </div>
            <h4>TESTAUFGABEN</h4>
            <div className="introduction-text">
                <IntroductionDisplay {...props} />
            </div>
            <div className="intro-footer">
                <StartButton {...props} />
            </div>
        </div>
    );
}

export default StandardIntroductionLayout;