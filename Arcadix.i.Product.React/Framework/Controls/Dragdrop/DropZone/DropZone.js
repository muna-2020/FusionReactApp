// React related imports.
import React, { useEffect } from 'react';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name DropZone
 * @param {object} props props
 * @summary Returns the DropZone for the Dragdrop.
 * @returns {Component} DropZone
 */
const DropZone = (props) => {

    // useEffect(() => {
    //     return () => {
    //         if (window.DragDropApi) {
    //             window.DragDropApi.DragDrop_DestroyDragAndDropZone(props.Meta.GroupId.toString());
    //         }
    //     };
    // }, []);

    const GetContent = () => {
        if (!props.Meta.Disable && window && window !== null && window.DragDropApi && window.DragDropApi !== null) {
            let intUniqueId = UniqueId.GetUniqueId();
            if (window.DragDropApi.DragDrop_SetDropZoneDetails) {
                window.DragDropApi.DragDrop_SetDropZoneDetails(intUniqueId, props);
            }
            if (window.DragDropApi.Arcadix_Dragdrop && window.DragDropApi.Arcadix_Dragdrop.length > 0 && window.DragDropApi.Arcadix_Dragdrop.filter(objTempData => objTempData["GroupId"].toString() === props.Meta.GroupId.toString()).length > 0) {
                return (
                    <div dragdrop_drop_id={intUniqueId} dragdrop_type="DropZone" style={{ "height": "100%", "width": "100%" }}>
                        {
                            props.children
                        }
                    </div>
                );
            }
        }
        return (
            <React.Fragment>
                {
                    props.children
                }
            </React.Fragment>
        );
    };

    return GetContent();
};

export default DropZone;
