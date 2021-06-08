//React imports
import React from 'react';

/**
 * @name PointOverrideTooltip
 * @param {object} props props form parent
 * @summary display tool-tip with order for point override.
 * @returns {any} returns the point override tool-tip.
 */
const PointOverrideTooltip = (props) => {

    /**
     * @name GetContent
     * @summary Returns the JSX for the tool-tip.
     * */
    const GetContent = () => {
        return (
            <div class="pointer-override-container">
                <div class="pointer-override-tooltip" style={{display : props.showTooltip ? "flex" : "none"}}>
                    {props.iDisplayOrder}
                </div>
                {props.children}
            </div>
        );
    };

    return GetContent();
};

/**
 * @name PointOverrideTooltip.DynamicStyles
 * @param {object} props props.
 * @summary required for loading css.
 * @returns {any} Styles array.
 */
PointOverrideTooltip.DynamicStyles = (props) => {
    return [
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/4_CMSPageContent/PointOverrideSidebar/PointOverrideTooltip/PointOverrideTooltipStyles.css"
    ];
};

export default PointOverrideTooltip;
