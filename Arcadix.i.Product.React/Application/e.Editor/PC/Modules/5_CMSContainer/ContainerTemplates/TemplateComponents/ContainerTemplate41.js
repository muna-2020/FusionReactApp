//React imports
import React, { useEffect } from 'react';

/**
 * @name ContainerTemplate41
 * @param {object} props props from parent
 * @summary ContainerTemplate41 component.
 * @returns {Component} ContainerTemplate41
 */
const ContainerTemplate41 = (props) => {

    const GetContent = () => {
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} id={itemplateId} className="container-template template-41" onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div className="row-top">
                    <div className="row-right">
                        <div id={"question_" + props.Mode + props.ContainerJson.iContainerId}>
                            <div id={`${itemplateId}-row-1`}>
                                {props.GetElement(1, "form_placeholder", "Aufgabe", 3)}
                            </div>
                        </div>
                        <div id={`${itemplateId}-row-2`} className="">
                            <span>
                                {props.GetElement(2, "form_placeholder")}
                            </span>
                        </div>
                        <div id={`${itemplateId}-audio`} className="audio-placeholder">
                            {props.GetElement(3, "audio_placeholder")}
                        </div>
                    </div>
                </div>
                <div style={{ height: "50%" }}>
                    <div id={"answer_" + props.Mode + props.ContainerJson.iContainerId}>
                        <div id={`${itemplateId}-row-4`} style={{ display: "inline-block" }}>
                            {props.GetElement(4, "form_placeholder", "Antwort")}
                        </div>
                    </div>
                    <div style={{ position: "relative", height: "calc(100% - 43px)" }}>
                        <div id={`${itemplateId}-row-5`}>
                            {props.GetElement(5, "form_placeholder")}
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
ContainerTemplate41.GetDefaultElements = () => {
    return [{ "iOrder": 2, "vElementTypeName": "Text" },
            { "iOrder": 1, "vElementTypeName": "Text", "TextType" : "Question" }, 
            { "iOrder": 4, "vElementTypeName": "Text", "TextType" : "Answer" }];
}

export default ContainerTemplate41;
