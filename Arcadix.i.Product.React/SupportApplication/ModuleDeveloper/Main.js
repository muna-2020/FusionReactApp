//React related imports
import React from 'react';

//Component related imports
import ComponentController from '../../SupportApplication/ModuleDeveloper/Controller/ComponentController/ComponentController';

/**
 * @name Main
 * @param {object} Props Props
 * @summary Dev index application will loaded based on the application
 * @returns {Jsx} Component to be loaded in DOM.
 */
const Main = (props) => {

    const GetComponent = () => {
        let AppComponent = null;
        if (JConfiguration.ApplicationTypeId === "1")
        {
            AppComponent = ComponentController.GetComponent("ExtranetTeacher");
        }
        else if (props.JConfiguration.ApplicationTypeId == "4") {
            AppComponent = ComponentController.GetComponent("Intranet");
        }
        else if (props.JConfiguration.ApplicationTypeId == "6") {
            AppComponent = ComponentController.GetComponent("ExtranetSchool");
        }
        else if (props.JConfiguration.ApplicationTypeId == "7") {
            AppComponent = ComponentController.GetComponent("Cockpit");
        }
        else if (props.JConfiguration.ApplicationTypeId == "16") {
            AppComponent = ComponentController.GetComponent("ExtranetPupil");
        }
        return (
            <React.Fragment>
                <AppComponent JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} />
            </React.Fragment>)
    }

    return GetComponent()
}

/**
 * @name DynamicStyles
 * @param {object} Props Props
 * @summary to Get Stle for the component
 * @returns {Array} returns array of styles.
 */
Main.DynamicStyles = (props) => {
    let arrDynamicStyle = [props.JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css"];
    if (props.JConfiguration.ApplicationTypeId == 4) {
        return [...arrDynamicStyle,
            props.JConfiguration.IntranetSkinPath + "/Css/Common/ReactJs/PC/Font.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css"
        ];
    }
    else if (props.JConfiguration.ApplicationTypeId == 6 || props.JConfiguration.ApplicationTypeId == 1 || props.JConfiguration.ApplicationTypeId == 16) {
        return [...arrDynamicStyle,
            props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Font.css"
        ];
    }
    else if (props.JConfiguration.ApplicationTypeId == 7) {
        return [...arrDynamicStyle,
            props.JConfiguration.CockpitSkinPath + "/Css/Common/ReactJs/PC/Font.css"
        ];
    }
};

export default Main;
