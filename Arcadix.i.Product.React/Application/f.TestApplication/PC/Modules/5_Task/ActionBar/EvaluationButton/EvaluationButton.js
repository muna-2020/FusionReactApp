//React Related Modules
import React from "react";

//EvaluationTask_ModuleProcessor  where Api is get called and Returning Popup
import EvaluationTask_ModuleProcessor from "@shared/Application/f.TestApplication/PC/Modules/5_Task/ActionBar/EvaluationTask/EvaluationTask_ModuleProcessor";

/**
 * @name ResultButton
 * @summary Evaluation Button
 * @param {any} props
 * @returns {object}
 */
const EvaluationButton = (props) => {
  /**
   * @name Assigning objContext
   * @summary  which can be passed across method in the module and used
   */
  const objContext = {
    props,
    TestState: props.TestState,
    EvaluationTask_ModuleProcessor: new EvaluationTask_ModuleProcessor(),
  };

  /**
   * @name EvaluationClick
   * @summary where AnswerJson and PageJson is sending as arguments to EvaluationClickMethod
   */
  const EvaluationClick = (event) => {
    ApplicationState.SetProperty("blnShowAnimation", true);
    event.preventDefault();
    let AnswerJson = objContext.props.TaskLayoutRef.current.GetUserResponse();
    var objParams = {
      AnswerJson: AnswerJson["Containers"],
      iPageId:
        objContext.props.TestState.TaskPageProperties.PageJson["iPageId"],
      PageJson:
        objContext.props.TestState.TaskPageProperties["IsEditorPreview"] === "Y"
          ? objContext.props.TestState.TaskPageProperties.PageJson
          : null,
    };

    objContext.EvaluationTask_ModuleProcessor.EvaluationClick(
      objContext,
      objParams
    );
  };

  return (
    <WrapperComponent
      ComponentName={"Button"}
      Meta={{ ClassName: "button" }}
      ParentProps={props}
      Events={{ OnClickEventHandler: EvaluationClick }}
      Resource={{
        ButtonText: Localization.TextFormatter(
          props.TestState.TaskPageProperties.TextResources,
          "EvaluationButtonText"
        ),
        ButtonImagePath: props.JConfiguration.TestApplicationSkinPath,
      }}
    />
  );
};

export default EvaluationButton;
