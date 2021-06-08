//React related imports
import React from 'react';

//Handle's onclick event
import NextTaskButton_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/NextTaskButton/NextTaskButton_ModuleProcessor'
import TestApplicationTask_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask_ModuleProcessor';

/**
 * @name  IndexDisplay
 * @summary for Linear Index Method
 * @param {any} props
 * @returns {object} 
 */
const IndexDisplay = (props) => {

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
     */
    const objContext = { props, TestState: props.TestState, NextTaskButton_ModuleProcessor: new NextTaskButton_ModuleProcessor(), objTestApplicationTask_ModuleProcessor: new TestApplicationTask_ModuleProcessor() };

    /**
     * @name NextClick
     * @summary For Next Click and sending Answer Json
     * @returns {[]} state and dispatch
     */
    const NextClick = (objContext, i) => {
        event.preventDefault();
        ApplicationState.SetProperty("blnShowAnimation", true);
        if (typeof objInterval !== "undefined") {
            clearInterval(objInterval);
        }
        objContext.objTestApplicationTask_ModuleProcessor.ClearTimeTakenforTask(objContext);
        let AnswerJson = objContext.props.TaskLayoutRef.current.GetUserResponse();
        var objParams = {
            "AnswerJson": AnswerJson["Containers"],
            "NextTaskIndex": i
        };
        if (props.TestState.cIsAnswerMandatory === "Y") {
            if (AnswerJson["cIsAnswered"] === "N") {
                ApplicationState.SetProperty("blnShowAnimation", false);
                objContext.NextTaskButton_ModuleProcessor.ShowTaskConfirmationPopup(objContext, objParams)
            }
        }
        objContext.NextTaskButton_ModuleProcessor.NextTaskClick(objContext, objParams)
    }

    /**
     * @name  Index
     * @summary for Index Button Click
     * @param {any} props
     * @returns {object}
     */
    var countTask = props.TestState.LinearTestProperties ? props.TestState.LinearTestProperties.TotalTasksInGroup : "";
    const IndexButtonClick = (countTask) => {

        let arr = [];
        for (var i = objContext.props.TestState.LinearTestProperties.GroupStartIndex; i <= objContext.props.TestState.LinearTestProperties.GroupEndIndex; i++) {
            arr.push(i);
        }

        let Tasks = arr;
        let x = [];
        var j = 0;
        Tasks.map((i, index) => {
            j = j + 1;
            if (props.TestState.LinearTestProperties.CurrentTaskIndex == i) {
                x = [...x, <li style={{ "border": "1px solid #000000" }} onClick={() => NextClick(objContext, i)} value={i}>{j}</li>]
            }
            else if (props.TestState.LinearTestProperties.IndexDisplayStatus && props.TestState.LinearTestProperties.IndexDisplayStatus[index] == "NotAnswered") {
                x = [...x, <li style={{ "border": "1px solid #ffffff" }} onClick={() => NextClick(objContext, i)} value={i}>{j}</li>]
            }
            else if (props.TestState.LinearTestProperties.IndexDisplayStatus && props.TestState.LinearTestProperties.IndexDisplayStatus[index] == "Answered") {
                x = [...x, <li style={{ "border": "1px solid green" }} onClick={() => NextClick(objContext, i)} value={i}>{j}</li>]
            }
            else {
                x = [...x, <li style={{ "border": "1px solid #ffffff" }} onClick={() => NextClick(objContext, i)} value={i}>{j}</li>]
            }
        })

        return x;
    }

    /**
     * @name  IndexDisplay
     * @summary Get Data for index
     * @param {any} props
     * @returns {object} jsx for index
     */
    const GetData = () => {
        return (
            <div>
                <div className="pagination-center-text">{props.TestState.LinearTestProperties ? props.TestState.LinearTestProperties.IndexToDoExplanation : ""}</div>
                <div className="pagination">
                    <div className="left-block">
                        <div className="pagination-flex">
                            <div className="color" style={{ "background": "green" }} />
                            {Localization.TextFormatter(props.objTextResource, "TaskCompleted")}
                        </div>
                        <div className="pagination-flex">
                            <div className="color" style={{ "background": "white" }} />
                            {Localization.TextFormatter(props.objTextResource, "CurrentTask")}
                        </div>
                        <div className="pagination-flex">
                            <div className="color" style={{ "background": "black" }} />
                            {Localization.TextFormatter(props.objTextResource, "NotAnsweredTask")}
                        </div>
                    </div>
                    <div className="page-no">
                        <ul>
                            {IndexButtonClick(countTask)}
                        </ul>
                    </div>
                </div>
            </div>)
    }

    return (
        <div> {GetData()}</div>
    );

}

export default IndexDisplay;