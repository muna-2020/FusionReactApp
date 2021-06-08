//React imports
import React, { useEffect } from 'react';

/**
 * @name ContainerTemplate40
 * @param {object} props props from parent
 * @summary ContainerTemplate40 component.
 * @returns {Component} ContainerTemplate40
 */
const ContainerTemplate40 = (props) => {

    const GetContent = () => {
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} id={itemplateId} className="container-template template-40" onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div id={`${itemplateId}-row-1`} className="CE-wrapper">
                    {props.GetElement(1, "form_placeholder")}
                </div>
                <div id={`${itemplateId}-row-2`}>
                    {props.GetElement(2, "form_placeholder")}
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
ContainerTemplate40.GetDefaultElements = () => {
    return [{ "iOrder": 1, "vElementTypeName": "Text" }];
}

export default ContainerTemplate40;
