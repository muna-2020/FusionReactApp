//React Related Imports 
import React from 'react';
import { connect } from "react-redux";

//Module Related imports
import ResultResponse_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/5_Task/Content/ResultResponse/ResultResponse_ModuleProcessor';

//Image Related Imports
import WrapperComponent from '@root/Framework/WrapperComponent/WrapperComponent';
import LearningBottomBlockCorrect_smileyImage from '@inlineimage/Application/f.TestApplication/Skin2018/Images/Common/ResultResponse/LearningBottomBlockCorrect_smiley.svg?inline';
import LearningBottomBlockWrong_smileyImage from '@inlineimage/Application/f.TestApplication/Skin2018/Images/Common/ResultResponse/LearningBottomBlockWrong_smiley.svg?inline';
import LearningBottomBlockNotAnswered_smileyImage from '@inlineimage/Application/f.TestApplication/Skin2018/Images/Common/ResultResponse/LearningBottomBlockNotAnswered_smiley.svg?inline';
import LearningBottomBlockPartial_smileyImage from '@inlineimage/Application/f.TestApplication/Skin2018/Images/Common/ResultResponse/LearningBottomBlockPartial_smiley.svg?inline';

/**
 * @name ResultResponse
 * @param {object} props props object
 * @summary Loading the Task SmilyImageResponse 
 * @returns {Component} Content component.
 */
const ResultResponse = (props) => {

    /**
     * @name Assigning objContext
     * @summary  which can be passed across method in the module and used
     */
    let objContext = {
        props
    };

    /**
    * @name GetComponent
    * @summary Contains the JSX of Content Component.
    * @returns {JSX} JSX.
    */
    const GetComponent = () => {
        let TestData;
        ApplicationState.SetProperty("blnShowAnimation", false);
        if (props.iTaskStatusId === 1) {
            TestData = <div className="result-response"><WrapperComponent
                ComponentName={"Image"}
                Data={{
                    Image: LearningBottomBlockCorrect_smileyImage
                }}
                ParentProps={objContext.props}
            />
                <div className="result-response-text">{Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "CorrectResult")}</div>
                </div>     
        }
        else if (props.iTaskStatusId === 2) {
            TestData = <div className="result-response"><WrapperComponent
                ComponentName={"Image"}
                Data={{
                    Image: LearningBottomBlockWrong_smileyImage
                }}
                ParentProps={objContext.props}
            />
            <div className="result-response-text">{Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "CorrectResult")}</div>
                </div >
        }
        else if (props.iTaskStatusId === 3) {
            TestData = <div className="result-response"><WrapperComponent
                ComponentName={"Image"}
                Data={{
                    Image: LearningBottomBlockNotAnswered_smileyImage
                }}
                ParentProps={objContext.props}
            />
            <div className="result-response-text">{Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "CorrectResult")}</div>
                </div >
        }
        else if (props.iTaskStatusId === 4) {
            TestData = <div className="result-response"><WrapperComponent
                ComponentName={"Image"}
                Data={{
                    Image: LearningBottomBlockPartial_smileyImage
                }}
                ParentProps={objContext.props}
            />
            <div className="result-response-text">{Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "CorrectResult")}</div>
                </div >
        }
        else if (props.iTaskStatusId === 0) {
            TestData = <div className="result-response"><WrapperComponent
                ComponentName={"Image"}
                Data={{
                    Image: LearningBottomBlockWrong_smileyImage
                }}
                ParentProps={objContext.props}
            /> 
            <div className="result-response-text">{Localization.TextFormatter(props.TestState.TaskPageProperties.TextResources, "CorrectResult")}</div>
                </div >
        }
        return (<div>{TestData}</div>)
    };
    return props.TestState.IsDirectLogin && props.iTaskStatusId !== null ? GetComponent() : <React.Fragment />;
};

export default connect(TestApplicationBase_Hook.MapStoreToProps(ResultResponse_ModuleProcessor.StoreMapList()))(ResultResponse);
