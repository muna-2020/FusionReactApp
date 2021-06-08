// React related imports.
import React, { useMemo } from "react";

//Component related imports
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';

/**
* @name ComponentPopup
* @param {object} props props
* @summary This component displays the ComponentPopup.
* @returns {object} returns a jsx .
*/
const ComponentPopup = props => {
    let objServerRenderModule = props.ParentProps.JConfiguration["SSR_Components"].filter(x => x["Name"] == props.Meta.PopupName);
    let blnServerRenderModule = false;
    let blnCacheSSRComponent = false;
    if (objServerRenderModule.length > 0) {
        blnServerRenderModule = true;
        blnCacheSSRComponent = objServerRenderModule[0]["IsCache"] == "Y" ? true : false;
    }
    let objJConfiguration = { ...props.ParentProps.JConfiguration, IsSSREnabled: blnServerRenderModule };
    return useMemo(() => <ComponentLoader
        key={props.Id + 'popup'}
        DivName={"divPopUp" + props.Id}
        ComponentName={props.Meta.PopupName}
        JConfiguration={objJConfiguration}
        ComponentController={props.ParentProps.ComponentController}
        IsEditor={props.ParentProps.IsEditor}
        CacheSSRComponent={blnCacheSSRComponent}
        {...props}
    />, [])
};

/**
 * @name GetDimensions
 * @param {any} objPopupData
 * @summary Gets the Height and Width from the meta.
 * @returns {object} Dimension
 */
ComponentPopup.GetDimensions = (objPopupData) => {
    return {
        Height: objPopupData && objPopupData.Meta.Height ? objPopupData.Meta.Height : 662,
        Width: objPopupData && objPopupData.Meta.Width ? objPopupData.Meta.Width : 950
    };
};

export default ComponentPopup;
