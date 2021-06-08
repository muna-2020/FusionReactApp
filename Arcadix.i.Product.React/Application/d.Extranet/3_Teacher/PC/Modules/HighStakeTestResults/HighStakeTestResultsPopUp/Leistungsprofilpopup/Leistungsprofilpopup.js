import React, { useState } from 'react';

const Leistungsprofilpopup = (props) => {
    return (
        <div className="leistungsprofilpopup-wrapper">
            
        </div>
    );
};

Leistungsprofilpopup.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/HighStakeTestResults/HighStakeTestResultsPopUp/Leistungsprofilpopup.css"
    ];
    return arrStyles;
};
export default Leistungsprofilpopup;