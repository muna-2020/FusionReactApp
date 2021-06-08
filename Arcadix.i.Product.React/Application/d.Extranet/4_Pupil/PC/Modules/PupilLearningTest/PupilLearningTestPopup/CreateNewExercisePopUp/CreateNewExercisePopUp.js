//React imports
import React from 'react';

/**
* @name CreateNewExercisePopUp
* @param {object} props Passes props
* @summary create test popup.
* @returns {object} jsx, div
*/
const CreateNewExercisePopUp = (props) => {
    let objTextResource = props.Resource.Text;
    return (
        <div className="create-task-wrapper" style={{ padding: "20px" }}>
            <div className="create-task-message">
                <div className="create-task-header">
                    <span>{Localization.TextFormatter(objTextResource, 'CreateTestHeading')}</span>
                </div>

                <div className="create-task-text">
                    <p>{Localization.TextFormatter(objTextResource, 'ReadyForNextExcercise')}</p>
                    <p>
                        {Localization.TextFormatter(objTextResource, 'CreateTestMessage')}
                    </p>
                </div>

            </div>
            <div className="create-task-close-button">
                <span className="button taskbluebtn " onClick={e => Popup.ClosePopup(props.Id)}>{Localization.TextFormatter(objTextResource, 'Close')}</span>
                <span className="button taskgreenbtn" onClick={(e) => {
                    props.Data.onClickCreateTest();
                    Popup.ClosePopup(props.Id);
                }}>{Localization.TextFormatter(objTextResource, 'Create')}</span>
            </div>
        </div>
    );
};

export default CreateNewExercisePopUp;

