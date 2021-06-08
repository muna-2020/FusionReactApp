//React related imports.
import React from 'react';

/**
* @name PracticeTestPopUp
* @param {object} props props
* @summary This component displays the Practice Test Popup.
* @returns {object} div that encapsulated the grid with Teacher details.
*/
const PracticeTestPopUp = (props) => {    

    /**
     * @name OnClickStart
     * @summary Executes after start is clicked
     * @returns {boolean} returns false
     */
    const OnClickStart = () => {
        Popup.ClosePopup(props.ObjModal);
        window.open(props.Data.TestUrl, '_blank');
        return false;
    };

    return (
        <div className="pupil-test-wrapper">
            <a href="javascript:"><button className="button pupil-test-button" onClick={() => { OnClickStart();}}>Start</button></a> 
        </div>
    );
};

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {object} arrStyles
*/
PracticeTestPopUp.DynamicStyles = () => {
    return [JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilTest/PupilTest.css"];
};

export default PracticeTestPopUp;