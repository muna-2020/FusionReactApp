// React related import
import React, { useEffect } from 'react';

import LinkedPageDetails from '@root/Application/e.Editor/PC/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_Element/MultiMediaMangement_ElementDetails/LinkedPageDetails/LinkedPageDetails';

const MultiMediaManagement_ElementDetails = (props) => {
    const Element = props.ComponentController.GetComponent(`${props.MediaType}Management_${props.MediaType}Details`);
    return (
        <div className="object-management-details-outer-wrapper" >
            <div><Element {...props} /></div>
            {
                props.MediaType.toLowerCase() !== "document" && <div>
                    <LinkedPageDetails {...props} />
                </div>
            }
        </div>
    );
};

export default MultiMediaManagement_ElementDetails;