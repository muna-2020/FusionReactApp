//React Imports
import React, { useState } from 'react';

//Controls
import TestPreview from "@root/Application/f.TestApplication/PC/InlineStart/Preview/TestPreview/TestPreview";

/**
 * @name TestPopUp
 * @summary Displaying for test preview.
 * @param {any} props
 */
const TestPopUp = (props) => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <span onClick={e => Popup.ClosePopup(props.Id)}>Schliessen</span>
            <TestPreview TestTaskDetails={{ 'iTestId': props.Data.TestId, 'iLanguageId': JConfiguration.InterfaceLanguageId, 'IsDirectLogin': 'Y' }} JConfiguration={{ ...JConfiguration }} SkinName={props.Data.SkinName} LearningTestSkinId={props.Data.LearningTestSkinId} />
        </div>
    );
};

export default TestPopUp;