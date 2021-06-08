import React, { useEffect } from 'react';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

const Sample = (props) => {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    });
    return (
        <div className="demo-table">
            In Step 3, we need to create the js Files required and the text resource files
                
            <ul>
                <li>Object(s) required, if not there : Sample.js</li>
                <li>Module processor will be created as : Sample_ModuleProcessor.js</li>
                <li>Hook file will be craeted as : Sample_Hook.js</li>
                <li>Text resource file will be craeted as : Sample.json</li>
            </ul>
        </div>
        )

}

Sample.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.DemoSkinPath + "/Css/Application/ReactJs/PC/Modules/Sample/Sample.css"
    ];
    return arrStyles;
};

export default Sample;