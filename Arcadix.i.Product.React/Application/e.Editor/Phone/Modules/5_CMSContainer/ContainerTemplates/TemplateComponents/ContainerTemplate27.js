//React imports
import React, { useEffect } from 'react';

/**
 * @name ContainerTemplate27
 * @param {object} props props from parent
 * @summary ContainerTemplate27 component.
 * @returns {Component} ContainerTemplate27
 */
const ContainerTemplate27 = (props) => {

    const GetContent = () => {
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} id={itemplateId} className="container-template template-27" onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div className="column left-column">
                    <div id={"question_" + props.Mode + props.ContainerJson.iContainerId} className="text-padd row-1">
                        <div className="answer-wrapper">
                            <div id={`${itemplateId}-row-1`}>
                                {props.GetElement(1, "form_placeholder", "Antwort")}
                            </div>
                        </div>
                    </div>
                    <div id={`${itemplateId}-row-3`} className="CE-wrapper row-2 relative">
                        {props.GetElement(3, "form_placeholder")}
                    </div>
                </div>
                <div className="column right-column">
                    <div id={`${itemplateId}-row-1`} className="text-padd row-1">
                        <div id={"answer_" + props.Mode + props.ContainerJson.iContainerId}>
                            {props.GetElement(2, "form_placeholder", "Aufgabe", 5)}
                        </div>
                    </div>
                    <div style={{ position: "relative" }}>
                        <div id={`${itemplateId}-row-4`} className="CE-wrapper row-2">
                            {props.GetElement(4, "form_placeholder")}
                        </div>
                        <div id={`${itemplateId}-audio`} className="audio-placeholder">
                            {props.GetElement(5, "audio_placeholder")}
                        </div>
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
    return [{ "iOrder": 4, "vElementTypeName": "Text" }, 
            { "iOrder": 2, "vElementTypeName": "Text", "TextType" : "Question"},
            { "iOrder": 1, "vElementTypeName": "Text", "TextType" : "Answer"  }];
}

export default ContainerTemplate27;
