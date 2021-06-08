//React Related Imports 
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

//Component related import
import Hint_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/Content/Hint/Hint_ModuleProcessor';
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

//Element Controller
import ElementController_TestApplication from "@root/Application/e.Editor/PC/Controller/ElementController/TestApplication/ElementController_TestApplication";

/**
 * @name Content
 * @param {object} props props object
 * @summary Loading the Task Hint 
 * @returns {Component} Content component.
 */
const Hint = (props) => {

    /**
    * @name Assigning objContext
    * @summary  which can be passed across method in the module and used
    */
    const objContext = { props, TestState: props.TestState, Hint_ModuleProcessor: new Hint_ModuleProcessor() };

    /**
    * @name GetComponent
    * @summary Contains the JSX of Content Component.
    * @returns {JSX} JSX.
    */
    const GetComponent = () => {
        let objTextElementProps = {
          JConfiguration: props.JConfiguration,
            ComponentController: {
                ...props.ComponentController,
                "GetElement": (strComponentName) => {
                    return ElementController_TestApplication.GetComponent(strComponentName);
                }
            },
            ["ElementJson"]: {
                ... props.TestState.TaskPageProperties.PageJson.TaskHint.TextElements[0]
            },
            ["ElementRef"]: React.createRef()
        };

        const OnClickCloseHint = (event) => {
            objContext.Hint_ModuleProcessor.OnClickCloseHint()
        }

        return (
            props.IsShowHint ? <div className="hint-block">
                <h3 class="hint-title">Lerntipp</h3>
                <img src="https://intranet.lernpassplus.ch/Test/close.svg" alt="" class="hint-close" onClick={OnClickCloseHint} />
                <CMSText_TestApplication {...objTextElementProps} /> </div> : <React.Fragment />
        )
};

    return props.TestState.TaskPageProperties.PageJson.TaskHint && props.TestState.TaskPageProperties.PageJson.TaskHint !==null ? GetComponent() : <React.Fragment />;
};


export default withRouter(connect(TestApplicationBase_Hook.MapStoreToProps(Hint_ModuleProcessor.StoreMapList()))(Hint));
