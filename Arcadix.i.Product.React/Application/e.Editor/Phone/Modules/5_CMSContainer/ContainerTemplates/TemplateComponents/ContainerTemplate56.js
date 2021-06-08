//React imports
import React, { useEffect } from 'react';

/**
 * @name ContainerTemplate56
 * @param {object} props props from parent
 * @summary ContainerTemplate56 component.
 * @returns {Component} ContainerTemplate56
 */
const ContainerTemplate56 = (props) => {

    const GetContent = () => {
        let blnIsEditable = props.Mode.toUpperCase() === "EDIT" ? true : false;
        let { iContainerId, iContainerTemplateId } = props.ContainerJson;
        let itemplateId = `container-${iContainerId}-template-${iContainerTemplateId}`;
        return (
            <div ref={props["ContainerTemplate_Ref"]} id={itemplateId} className="container-template template-56" onContextMenu={(event) => { props.OpenContextMenu ? props.OpenContextMenu(event) : props.OpenContextMenu; }}>
                <div id={"answer_" + props.Mode + props.ContainerJson.iContainerId} className="grid-1">
                    <div id={`${itemplateId}-row-1`}>
                        {props.GetElement(1, "form_placeholder", "Anleitung")}
                    </div>
                </div>
                <div className="stretched-div">
                    <div className="cms-text">
                        <div className="cms-text">
                            <div id={`${itemplateId}-row-2`}>
                                <span className="PageOutputContentText">
                                    <b>
                                        {blnIsEditable ? props.GetElement(2, "form_placeholder") : props.GetElement(2)}
                                    </b>
                                </span>
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
ContainerTemplate56.GetDefaultElements = () => {
    return [{ "iOrder": 2, "vElementTypeName": "Text" },
            { "iOrder": 1, "vElementTypeName": "Text", "TextType" : "Answer" }];
}

export default ContainerTemplate56;
