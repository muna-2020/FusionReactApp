//React Imports
import React from 'react';

/**
 * @name AnimationImagePreviewPopup
 * @param {object} props parent props
 * @summary Contains the JSX for animation image preview popup.
 * @returns {component} Component
 */
const AnimationImagePreviewPopup = (props) => {

    /**
     * @name GetContent
     * @summary Contains the JSX of the component.
     * @returns {any} JSX
     */
    const GetContent = () => {
        return (
            <div>
                <img src={props.Data.ImageDetails["vValue"]} />
            </div>
        );
    };

    /**
     * @summary Calls the GetContent().
     */
    return GetContent();
};

/**
 * @name AnimationImagePreviewPopup.DynamicStyles
 * @param {object} props props from which JConfiguration is used.
 * @summary Dynamic style array of editor frame to which all required styles will be added.
 * @returns {array} Sytles array
 */
AnimationImagePreviewPopup.DynamicStyles = (props) => {
    return [
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSAnimationWrapper/AnimationWrapperSidebar/AnimationImagePreviewPopup/AnimationImagePreviewPopupStyles.css"
    ];
};

export default AnimationImagePreviewPopup;
