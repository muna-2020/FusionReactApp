//React imports
import React, { useEffect } from 'react';

/**
 * @name ContainerTemplate53
 * @param {object} props props from parent
 * @summary ContainerTemplate53 component.
 * @returns {Component} ContainerTemplate53
 */
const ContainerTemplate53 = (props) => {

    const GetContent = () => {
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} id={itemplateId} className="container-template template-53" onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div>
                    <div className="text-padd row-1">
                        <div id={"question_" + props.Mode + props.ContainerJson.iContainerId}>
                            <div id={`${itemplateId}-row-2`}>
                                {props.GetElement(2, "form_placeholder", "Aufgabe", 4)}
                            </div>
                        </div>
                    </div>
                    <div id={`${itemplateId}-row-1`}>
                        {props.GetElement(1, "SubjectPlaceholder")}
                    </div>
                    <div style={{ position: "relative" }}>
                        <div id={`${itemplateId}-row-3`} className="CE-wrapper row-2">
                            {props.GetElement(3, "form_placeholder")}
                        </div>
                        <div id={`${itemplateId}-audio`} className="audio-placeholder">
                            {props.GetElement(4, "audio_placeholder")}
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
ContainerTemplate53.GetDefaultElements = () => {
    return [{ "iOrder": 3, "vElementTypeName": "Text" },
            { "iOrder": 2, "vElementTypeName": "Text", "TextType" : "Question" }];
}

export default ContainerTemplate53;
