import React, { useEffect } from 'react';

const Sample = (props) => {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    });
    return (
        <div className="demo-table">
            In Step 4, In this step we need to create following methods in Sample_ModuleProcessor.js
              
        File Path = G: \Arcadix\Product.Fusion\Arcadix.h.Product.BusinessLogic\Application\l.Demo\Modules\Step4\Sample_ModuleProcessor.js
                
            <ul>
                <li>1. StoreMapList() = > This method returns an array of the Object names requuired for the module</li>
                <li>2. LoadInitialData() => This method queues all the Calls  required for the module and are executed through the common method "QueueAndExecute"</li>
                <li>3. InitialDataParams() => This methos is called in Jsx,For server side queue(will be explained in next step) and called inside above method.
                       This methods initializes the objects required and put in an array.
                    </li>
                
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