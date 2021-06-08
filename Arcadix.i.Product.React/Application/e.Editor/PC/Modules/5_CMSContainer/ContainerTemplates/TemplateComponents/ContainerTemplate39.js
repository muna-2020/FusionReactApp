//React imports
import React, { useEffect } from 'react';

/**
 * @name ContainerTemplate39
 * @param {object} props props from parent
 * @summary ContainerTemplate39 component.
 * @returns {Component} ContainerTemplate39
 */
const ContainerTemplate39 = (props) => {

    /**
     * @name useEffect
     * @summary this add the default text to container.
     * */
    useEffect(() => {
        (async () => {
            if (props.AddDefaultElements) {
                await props.AddDefaultElements([{ "iOrder": 2, "vElementTypeName": "Text" }]);
            }
        })();
    }, []);

    const GetContent = () => {
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} id={itemplateId} className="container-template template-39" onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div id={"question_" + props.Mode + props.ContainerJson.iContainerId}>
                    <div id={`${itemplateId}-row-1`}>
                        {props.GetElement(1, "form_placeholder", 'Aufgabe', 3)}
                    </div>
                </div>
                <div>
                    <div id={`${itemplateId}-row-2`} className="CE-wrapper">
                        {props.GetElement(2, "form_placeholder")}
                    </div>
                    <div id={`${itemplateId}-audio`} className="audio-placeholder">
                        {props.GetElement(3, "audio_placeholder")}
                    </div>
                </div>
                <div id={"answer_" + props.Mode + props.ContainerJson.iContainerId} className="row-3">
                    <div id={`${itemplateId}-row-4`}>
                        {props.GetElement(4, "form_placeholder", "Antwort")}
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
ContainerTemplate39.GetDefaultElements = () => {
    return [{ "iOrder": 2, "vElementTypeName": "Text" },
            { "iOrder": 3, "vElementTypeName": "Text", "TextType" : "Question" }, 
            { "iOrder": 4, "vElementTypeName": "Text", "TextType" : "Answer" }];
}


export default ContainerTemplate39;
