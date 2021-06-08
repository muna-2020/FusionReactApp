//React imports
import React, { useEffect } from 'react';

/**
 * @name ContainerTemplate36
 * @param {object} props props from parent
 * @summary ContainerTemplate36 component.
 * @returns {Component} ContainerTemplate36
 */
const ContainerTemplate36 = (props) => {

    const GetContent = () => {
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} id={itemplateId} className="container-template template-36" onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div id={"question_" + props.Mode + props.ContainerJson.iContainerId} className="CE-wrapper grid-4">
                    <div id={`${itemplateId}-row-1`} className={"element-wrapper"}>
                        {props.GetElement(1, "form_placeholder", 'Aufgabe', 3)}
                    </div>
                </div>
                <div id={"left_" + props.Mode + props.ContainerJson.iContainerId} className="CE-wrapper grid-2">
                    <div id={`${itemplateId}-row-2`} className="question-placeholder-36" style={{ position: "relative" }}>
                        {props.GetElement(2, "form_placeholder")}
                    </div>
                    <div id={`${itemplateId}-audio`} className="audio-placeholder">
                        {props.GetElement(3, "audio_placeholder")}
                    </div>
                </div>
                <div id={"answer_" + props.Mode + props.ContainerJson.iContainerId} className="CE-wrapper grid-4">
                    <div className="answer-wrapper">
                        <div id={`${itemplateId}-row-4`} className="calc-wrapper">
                            {props.GetElement(4, "form_placeholder", "Antwort")}
                        </div>
                    </div>
                </div>
                <div id={"right_" + props.Mode + props.ContainerJson.iContainerId} className="CE-wrapper grid-4">
                    <div id={`${itemplateId}-row-5`} className={"element-wrapper"}>
                        {props.GetElement(5, "form_placeholder")}
                    </div>
                </div>
            </div>
        );
    };

    return GetContent();
};

/**
 * @name GetDefaultElement
 * @summary this returns the default elements for template.
 */
ContainerTemplate36.GetDefaultElements = () => {
    return [{ "iOrder": 2, "vElementTypeName": "Text" }, 
            { "iOrder": 1, "vElementTypeName": "Text", "TextType" : "Question" }, 
            { "iOrder": 4, "vElementTypeName": "Text", "TextType" : "Answer" }];
}

export default ContainerTemplate36;
