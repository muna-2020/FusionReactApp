//React Related imports
import React from 'react';

/**
 * @name TestEndConfirmation
 * @summary  Test End Confirmation
 * @param {any} props
 * @returns {object} 
 */
const TestEndConfirmation = (props) => {

    return (
        <div id="GroupEndConfirmationPopup">
            <div class="test-application">
                <div class="popup-overlay">
                    <div class="popup-box">
                        <div class="popup-header">
                            <h3>Hinveis</h3>
                            <span class="popup-close" onClick={() => {
                                props.ClosePopup(props.ObjModal)
                            }}>&#10005;</span>
                        </div>
                        <div class="popup-content">
                            <div class="popup-content-flex">
                                <img
                                    src="http://www.pngall.com/wp-content/uploads/2017/05/Alert-Download-PNG.png"
                                    alt=""
                                />
                                <div class="right-div">
                                    <h3>Lorem ipsum</h3>
                                    <p>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                        Iste, nemo.
                                            </p>
                                </div>
                            </div>

                            <div class="button-flex">
                                <button onClick={() => {
                                    props.ClosePopup(props.ObjModal)
                                }}>Ja</button>
                                <button onClick={() => {
                                    props.ClosePopup(props.ObjModal)
                                }}>Nein</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default TestEndConfirmation;