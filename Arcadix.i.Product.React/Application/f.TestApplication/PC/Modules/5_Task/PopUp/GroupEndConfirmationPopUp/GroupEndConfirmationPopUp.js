//React Related Imports
import React from 'react';

/**
 * @name GroupEndConfirmationPopUp
 * @summary  Group End Confirmation PopUp
 * @param {any} props
 * @returns {object} 
 */
const GroupEndConfirmationPopUp = (props) => {


    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        return (
            <div id="GroupEndConfirmationPopup" className="yousty-popup">
                <div class="test-application">
                    <div class="popup-overlay">
                        <div class="popup-box">
                            <div class="popup-header">
                                <h3>Achtung</h3>
                            </div>
                            <div class="popup-content">
                                <div class="popup-content-flex">
                                    <img
                                        src="http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png"
                                        alt=""
                                    />
                                    <div class="right-div">
                                        <h3>Achtung</h3>
                                        <p>Die reguläre Bearbeitungszeit für dieses Gebiet ist zu Ende. Klicke auf den Knopf „OK“ um zur nächsten Aufgabe zu gelangen.</p>
                                    </div>
                                </div>

                                <div class="button-flex">
                                    <button onClick={() => {
                                        props.Events.NextTask(props.id)
                                        TestApplicationPopup.ClosePopup(props.Id);
                                    }}>OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return GetContent();
}

export default GroupEndConfirmationPopUp;
