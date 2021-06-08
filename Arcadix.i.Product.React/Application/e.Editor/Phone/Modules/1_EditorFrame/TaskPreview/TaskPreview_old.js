//React Imports
import React, { useEffect, useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module Related Imports
import CMSPageContent from '@root/Application/e.Editor/PC/Modules/4_CMSPageContent/CMSPageContent_TestApplication/CMSPageContent_TestApplication';
import * as BusinessLogic from '@shared/Application/e.Editor/Modules/1_EditorFrame/TaskPreview/TaskPreviewBusinesslogic.js';

/**
 * @name TaskPreview
 * @param {object} props props from the parent
 * @summary Returns the TaskPreview Component
 */
const TaskPreview = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * */
    const [state, dispatch] = useReducer(BusinessLogic.Reducer, BusinessLogic.GetInitialState());

    /**
     * @name Task
     * @summary Reference passed to objContext.
     * */
    const Task = useRef(null);

    /**
     * @name objContext
     * @summary Combined object of state, props, dispatch and other objects used throughout the component.
     * */
    let objContext = { state, props, dispatch, Task };

    /**
     * @name BusinessLogic.useDataLoaded
     * @summary DataLoaded custom hook
     */
    BusinessLogic.useDataLoaded(objContext);

    /**
     * @name GetContent
     * @sumamry Contains the JSX for the component.
     * */
    const GetContent = () => {
        return (
            <div id="task_preview_div" className="preview-area">
                <span onClick={() => props.closePreview()} className="close-icon">
                    Close
                </span>
                <div class="test-preview-wrapper">
                    <div class="test-preview-header">
                        <div class="header-left">
                        </div>
                        <div class="header-center">
                            <img src={props.JConfiguration.TestApplicationSkinPath + "/Images/Common/Test.svg"} alt="" />
                            <span>
                                {state.PageId}
                            </span>
                        </div>
                        <div class="header-right">
                            <img src="./Reload.svg" alt="" />
                        </div>
                    </div>
                    <div class="test-preview-content">
                        <h3>
                            Aufgabe
                    </h3>
                        {
                            state.PageId > 0 ? <CMSPageContent ref={Task} PageJson={state.PageJson} PageId={state.PageId} Mode={"display"} ComponentController={props.ComponentController} JConfiguration={props.JConfiguration} /> : ""
                        }
                    </div>
                    <div class="test-preview-footer flex-center">
                        <button class="pink-button" onClick={(event) => BusinessLogic.Evaluate(objContext, event)}>
                            Evaluate
                    </button>
                    </div>
                </div>
                <div className="workarea-container">
                </div>
            </div>
        );
    };

    /**
     * @summary Checks if the state is Loaded and calls the GetContent().
     */
    return state.isLoadComplete ? GetContent() : "";
};

export default TaskPreview;

//export default connect(BusinessLogic.MapStateToProps)(TaskPreview);
