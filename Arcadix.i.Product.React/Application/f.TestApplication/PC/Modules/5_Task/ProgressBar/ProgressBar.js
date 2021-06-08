//React Related import
import React from 'react';

//Component Controller Import
import ComponentController from "@root/Application/f.TestApplication/PC/Controller/Componentcontroller/Componentcontroller";

/**
 * @name ProgressBar
 * @param {object} props props
 * @summary This component displays the ProgressBar.
 * @returns {object} React.Fragement that encapsulated the bar
 * */
const ProgressBar = (props) => {

    /**
     * @name GetContent
     * @summary required jsx for component.
     * @returns {object} jsx, React.Fragment
     * */
    function GetContent() {
        let ProgressComponent = null;
        if (props.TestState.TaskPageProperties) {
            if (props.TestState.TaskPageProperties.ProgressComponent) {
                ProgressComponent = props.TestState.TaskPageProperties ? props.TestState.TaskPageProperties.ProgressComponent ? props.TestState.TaskPageProperties.ProgressComponent : "" : ""
            }
            else if (props.TestState.LinearTestProperties) {
                ProgressComponent = props.TestState.LinearTestProperties ? props.TestState.LinearTestProperties.ProgressComponent !== -1? props.TestState.LinearTestProperties.ProgressComponent : "" : ""
            }
            
        }
       
        ProgressComponent = ComponentController.GetComponent(ProgressComponent);
        return (
            ProgressComponent !== undefined ?
            <div>
                <ProgressComponent {...props} />
            </div> : ""
        );
    }

    return props.TestState.IsShowProgressBar ? GetContent() : "";
};

export default ProgressBar;
