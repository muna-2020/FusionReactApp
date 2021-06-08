// React related imports.
import React, { useEffect } from 'react';

//Module realted fies.
import * as Dragdrop_Api from '@root/Framework/Library/DragDrop/DragDrop';
import FillHeight from '@root/Framework/Controls/FillHeight/FillHeight';

//Application state Classes
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name Dragdrop
 * @param {object} props props
 * @summary Dragdrop component.
 * @returns {component} Dragdrop Component.
 */
const Dragdrop = (props) => {

    useEffect(() => {
        Dragdrop_Api.DragDrop_Initialize();
        return () => {
            Dragdrop_Api.DragDrop_Destroy();
        };
    }, []);

    /**
     * @name GetContent
     * @summary Contains the JSX.
     * @returns {JSX} JSX
     */
    const GetContent = () => {
        let objDragDropApiWrapper = ApplicationState.GetProperty("DragDropApiWrapper");
        let blnLoad = false;
        if (!objDragDropApiWrapper || objDragDropApiWrapper === null || !objDragDropApiWrapper["ApplicationName"] || objDragDropApiWrapper["ApplicationName"] === null || objDragDropApiWrapper["ApplicationName"] === props.ApplicationName) {
            objDragDropApiWrapper = {
                "ApplicationName": props.ApplicationName
            };
            blnLoad = true;
            ApplicationState.SetProperty("DragDropApiWrapper", objDragDropApiWrapper);
        }
        let objMetaData = {
            "HeaderIds": [""],
            "FooterIds": [""],
            "DoNotOverFlow": true
        };
        if (blnLoad) {
            return (
                <FillHeight id="FillHeightDragDrop" Meta={objMetaData} ParentProps={{ ...props }}>
                    <div id="DragDropApiWrapper" style={{ "height": "inherit", "overflow": "auto" }} dragdrop_type="DragdropWrapper">
                        {
                            props.children
                        }
                    </div>
                </FillHeight>
            );
        }
        else {
            return (
                <React.Fragment>
                    {
                        props.children
                    }
                </React.Fragment>
            );
        }
    };

    return GetContent();
};

export default Dragdrop;
