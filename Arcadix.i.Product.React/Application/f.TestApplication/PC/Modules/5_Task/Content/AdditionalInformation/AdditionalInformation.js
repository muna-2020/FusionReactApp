//React Related Imports 
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

//Component related import
import AdditionalInformation_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/Content/AdditionalInformation/AdditionalInformation_ModuleProcessor';
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name AdditionalInformation
 * @param {object} props props object
 * @summary Loading the AdditionalInformation
 * @returns {Component} AdditionalInformation component.
 */
const AdditionalInformation = (props) => {

    /**
    * @name GetComponent
    * @summary Contains the JSX of Content Component.
    * @returns {JSX} JSX.
    */
    const GetComponent = () => {
        let objTextElementProps = {
            JConfiguration: props.JConfiguration,
            ComponentController: props.ComponentController,
            ["ElementJson"]: {
                ...props.TestState.TaskPageProperties.PageJson.AdditionalInformation.TextElements[0]
            },
            ["ElementRef"]: React.createRef()
        };

        return props.IsShowAdditionalInformation ? <div className="additional-infobar"> <img alt="" src={props.JConfiguration.TestApplicationSkinPath + '/Images/Common/Icons/lightbulb.png'} /> <CMSText_TestApplication {...objTextElementProps} /></div> :""
    };

    return props.TestState.TaskPageProperties.PageJson.AdditionalInformation && props.TestState.TaskPageProperties.PageJson.AdditionalInformation !== null ? GetComponent() : <React.Fragment />;
};


export default withRouter(connect(TestApplicationBase_Hook.MapStoreToProps(AdditionalInformation_ModuleProcessor.StoreMapList()))(AdditionalInformation));
