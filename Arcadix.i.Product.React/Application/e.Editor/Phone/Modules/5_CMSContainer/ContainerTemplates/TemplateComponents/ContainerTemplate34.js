//React imports
import React from 'react';

/**
 * @name ContainerTemplate34
 * @param {object} props props from parent
 * @summary ContainerTemplate34 component.
 * @returns {Component} ContainerTemplate34
 */
const ContainerTemplate34 = (props) => {

    const GetContent = () => {
        let blnIsEditable = props.Mode.toUpperCase() === "EDIT" ? true : false;
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} id={itemplateId} className="container-template template-34" onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div id={`${itemplateId}-row-1`} className="container-template-flex-child">
                    {props.GetElement(1, "form_placeholder")}
                </div>
            </div>
        );
    };

    return GetContent();
};

export default ContainerTemplate34;
