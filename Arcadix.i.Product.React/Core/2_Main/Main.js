//React related imports
import React, { useRef } from 'react';
import { connect } from "react-redux";

//Component related imports
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';
import * as Main_Hook from '@root/Core/2_Main/Main_Hook';
import Main_Processor from '@root/Core/2_Main/Main_Processor';

//Base Component related import
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import Animation from '@root/Framework/Controls/Animation/Animation';

/**
 * @name Main
 * @param {object} props Props
 * @summary Main Component to be rendered.
 * @returns {JSX} Returns the JSX
 */
const Main = (props) => {

    //Global variable to keep the modules rendered.
    if (ApplicationState.GetProperty('FullServerRenderedModules')) {
        let objFullSSRedModules = ApplicationState.GetProperty('FullServerRenderedModules');
        global.arrModulesRendered = [...new Set([...global.arrModulesRendered, ...objFullSSRedModules])];//to merge list of SSR modules without duplicates.

    }
    Main_Hook.useOnApplicationRefresh();

    let strMaster = null;
    let strMasterHtml = "";
    let blnIsForceClientRender = false;
    if ((props.LoggedIn != undefined && props.LoggedIn.IsLoggedIn == true) ||  UserLoggedIn) {
        strMaster = 'Master';
        if (props.LoggedIn != undefined &&  props.LoggedIn.MasterHTML != undefined) {
            strMasterHtml = props.LoggedIn.MasterHTML;
        }   
        FullServerRenderedModules = global.arrModulesRendered;
    }
    else {
        strMaster = 'Login';
        blnIsForceClientRender = true;
    }
    return (
        <React.Fragment>
            <Animation
                Resource={{ "ImagePath": (props.JConfiguration.ApplicationTypeId == 4 || props.JConfiguration.ApplicationTypeId == 7 || props.JConfiguration.ApplicationTypeId == 24) ? `${props.JConfiguration.IntranetSkinPath}/Images/Common/JNavigation/Preloader_Module.gif` : `${props.JConfiguration.ExtranetSkinPath}/Images/Common/Icons/Clock.gif` }}//As Animation is used from Main in Intranet/Extranet only
                Meta={{ "ShowAnimationImage": true }}
                Id="AnimationId"
            />
            <ComponentLoader
                ComponentController={props.ComponentController}
                JConfiguration={JConfiguration}
                ClientUserDetails={ApplicationState.GetProperty('ClientUserDetails')}
                ComponentName={strMaster}
                IsForceClientRender={blnIsForceClientRender}
                DivName={"div" + props.JConfiguration.ApplicationName}
                ServerRenderedHTML={strMasterHtml}
            />
        </React.Fragment>
    );
};

/**
 * @name DynamicStyles
* @param {object} props Props
* @summary to Get Style for the component
* @returns {Array} returns array of styles.
*/
Main.DynamicStyles = (props) => {
    let iApplicationTypeId = typeof props.JConfiguration.ApplicationTypeId === "string" ? parseInt(props.JConfiguration.ApplicationTypeId) : props.JConfiguration.ApplicationTypeId;

    if (iApplicationTypeId === 4) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Common/ReactJs/PC/Font.css"
        ];
    }
    else if (iApplicationTypeId === 6 || iApplicationTypeId === 1 || iApplicationTypeId === 16 || iApplicationTypeId === 12) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Font.css"
        ];
    }
    else if (iApplicationTypeId === 7) {
        return [
            props.JConfiguration.CockpitSkinPath + "/Css/Common/ReactJs/PC/Font.css"
        ];
    }
    else if (iApplicationTypeId === 24) {
        return [
            props.JConfiguration.ProductManagementSkinPath + "/Css/Common/ReactJs/PC/Font.css"
        ];
    }
};

export default connect(Base_Hook.MapStoreToProps(Main_Processor.StoreMapList()))(Main);
