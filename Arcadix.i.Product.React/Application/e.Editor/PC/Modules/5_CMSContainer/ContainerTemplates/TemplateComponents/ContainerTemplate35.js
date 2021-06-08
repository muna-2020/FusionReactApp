//React imports
import React, { useEffect } from 'react';

/**
 * @name ContainerTemplate35
 * @param {object} props props from parent
 * @summary ContainerTemplate35 component.
 * @returns {Component} ContainerTemplate35
 */


const ContainerTemplate35 = (props) => {

    const GetContent = () => {
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} id={itemplateId} className="container-template template-35" onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div className="column left-column">
                    {props.GetElement(1, "SubjectPlaceholder")}
                </div>
                <div className="column right-column">
                    <div id={"question_" + props.Mode + props.ContainerJson.iContainerId} className="pink-text-heading">
                        <div id={`${itemplateId}-row-2`}>
                            {props.GetElement(2, "form_placeholder", 'Aufgabe', 4)}
                        </div>
                    </div>
                    <div style={{ position: "relative" }}>
                        <div id={`${itemplateId}-row-3`} className="simple-text static-overlay-image">
                            {props.GetElement(3, "form_placeholder")}
                        </div>
                        <div id={`${itemplateId}-audio`} className="audio-placeholder">
                            {props.GetElement(4, "audio_placeholder")}
                        </div>
                    </div>
                    <div id={"answer_" + props.Mode + props.ContainerJson.iContainerId} className="pink-text-heading">
                        <div className="answer-wrapper">
                            <div id={`${itemplateId}-row-5`}>
                                {props.GetElement(5, "form_placeholder", "Antwort")}
                            </div>
                        </div>
                    </div>
                    <div id={`${itemplateId}-row-6`} className="CE-wrapper row-2">
                        {props.GetElement(6, "form_placeholder")}
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
ContainerTemplate35.GetDefaultElements = () => {
    return [{ "iOrder": 3, "vElementTypeName": "Text" },
            { "iOrder": 2, "vElementTypeName": "Text", "TextType" : "Question"},
            { "iOrder": 5, "vElementTypeName": "Text", "TextType" : "Answer"  }];
}

export default ContainerTemplate35;
