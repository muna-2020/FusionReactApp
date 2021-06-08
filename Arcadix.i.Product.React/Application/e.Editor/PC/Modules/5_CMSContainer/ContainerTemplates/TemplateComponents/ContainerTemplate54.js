//React imports
import React, { useEffect } from 'react';

/**
 * @name ContainerTemplate54
 * @param {object} props props from parent
 * @summary ContainerTemplate54 component.
 * @returns {Component} ContainerTemplate54
 */
const ContainerTemplate54 = (props) => {

    const GetContent = () => {
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} id={itemplateId} className="container-template template-54" onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div id={`${itemplateId}-row-1`} className="CE-wrapper inline-block">
                    {props.GetElement(1, "form_placeholder")}
                </div>
                <div id={`${itemplateId}-row-2`} className="CE-wrapper">
                    {props.GetElement(2, "form_placeholder")}
                </div>
                <div className="third-column">
                    <div id={`${itemplateId}-row-3`}>
                        {props.GetElement(3, "form_placeholder")}
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
ContainerTemplate54.GetDefaultElements = () => {
    return [{ "iOrder": 1, "vElementTypeName": "Text" }];
}

export default ContainerTemplate54;
