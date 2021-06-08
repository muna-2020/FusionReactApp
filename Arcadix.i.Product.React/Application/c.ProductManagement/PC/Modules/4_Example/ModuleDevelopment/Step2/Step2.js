import React, { useEffect } from 'react';

const Sample = (props) => {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    });
    return (
        <div className="demo-table">
            This is step 2.
                Styles are Loaded. 
            <ul>
                <li>Item1</li>
                <li>Item2</li>
                <li>Item3</li>
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