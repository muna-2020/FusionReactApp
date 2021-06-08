//React imports
import React, { useEffect } from 'react';

/**
 * @name ContainerTemplate55
 * @param {object} props props from parent
 * @summary ContainerTemplate55 component.
 * @returns {Component} ContainerTemplate55
 */
const ContainerTemplate55 = (props) => {

    const GetContent = () => {
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} 
                 id={itemplateId} className="container-template template-55" 
                 onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div id={`${itemplateId}-row-1`}>{props.GetElement(1, "form_placeholder")} </div>
            </div>
        );
    };

    return GetContent()
};

/**
 * @name GetDefaultElement
 * @summary this returns the default elements for template.
 */
ContainerTemplate55.GetDefaultElements = () => {
    return [{ "iOrder": 1, "vElementTypeName": "Text" }];
}

export default ContainerTemplate55;
