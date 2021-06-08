import React, { useEffect } from 'react';

const Sample = (props) => {

    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    });

    return (
        <div className="demo-table">
            In Step 5, In this step we need to create following methods in Sample_Hook.js
              
        File Path = G:\Arcadix\Product.Fusion\Arcadix.h.Product.BusinessLogic\Application\l.Demo\Modules\Step5\Sample_Hook.js

            <ul>
                <li>1. GetInitialState() => in this method, define all the state variables required ("isLoadComplete" is mandatpry to check if data is loaded) </li>
                <li>2. Initialize => This is used to initialize all the custom hooks(methods using useEffects())  </li>
                <li>3. useDataLoader() and useDataLoaded() are mandatory useEffects reuired to load data and check if data is loaded respectively  </li>
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