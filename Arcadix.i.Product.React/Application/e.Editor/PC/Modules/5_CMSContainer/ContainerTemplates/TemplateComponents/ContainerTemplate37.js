//React imports
import React, { useEffect } from 'react';

/**
 * @name ContainerTemplate37
 * @param {object} props props from parent
 * @summary ContainerTemplate37 component.
 * @returns {Component} ContainerTemplate37
 */
const ContainerTemplate37 = (props) => {

    const GetContent = () => {
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} id={itemplateId} className="container-template template-37" onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div id={`${itemplateId}-row-1`} className="column left-column">
                    {props.GetElement(1, "SubjectPlaceholder")}
                </div>
                <div className="column right-column">
                    <div class="text-padd row-1">
                        <div id={"answer_" + props.Mode + props.ContainerJson.iContainerId} className="pink-head">
                            <div id={`${itemplateId}-row-2`}>
                                {props.GetElement(2, "form_placeholder", "Anleitung")}
                            </div>
                        </div>
                        <div className="stretch-div">
                            <div id={`${itemplateId}-row3-`} class="row-3">
                                {props.GetElement(3, "form_placeholder")}
                            </div>
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
ContainerTemplate37.GetDefaultElements = () => {
    return [{ "iOrder": 3, "vElementTypeName": "Text" },
            { "iOrder": 2, "vElementTypeName": "Text", "TextType" : "Answer" }];
}

export default ContainerTemplate37;
