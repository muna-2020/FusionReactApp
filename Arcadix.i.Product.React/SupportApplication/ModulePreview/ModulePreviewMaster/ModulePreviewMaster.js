// React related imports.
import React from "react";

//Loadable import
import { loadableReady } from '@loadable/component';

//Components used
import ComponentController from '@appfolder/Controller/ComponentController/ComponentController';
import { LoadDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';

//Internal service class imports
import Animation from '@root/Framework/Controls/Animation/Animation';
import Popup from "@root/Framework/Blocks/Popup/Popup";
import ContextMenu from '@root/Framework/Controls/ContextMenu/ContextMenu';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import Iframe from 'react-iframe';

//global imports
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';
global.IntranetBase_Hook = IntranetBase_Hook;
global.IntranetBase_ModuleProcessor = IntranetBase_ModuleProcessor;
global.Base_Form = Base_Form;

const ModulePreviewMaster = (props) => {
    let AppComponent = ComponentController.GetComponent(PreviewComponent.ComponentName);

    if (typeof AppComponent.load !== "undefined") {
        AppComponent.load()
            .then((LoadedComponent) => {
                if (LoadedComponent.default.DynamicStyles && typeof document !== "undefined") {
                    LoadedComponent.default.DynamicStyles({ JConfiguration: JConfiguration }).map((objItem) => {
                        LoadDynamicStyles(objItem);
                    });
                }
            });
    }
    if (!PreviewComponent.ComponentName.includes("HTML")) {
        return (
            <React.Fragment>
                <Animation Id="SampleAnimationId"
                    Meta={{ "ShowAnimationImage": true }}
                    Resource={{ "ImagePath": JConfiguration.IntranetSkinPath + '/Images/Common/JNavigation/Preloader_Module.gif' }}
                />
                <Popup Id="PopupId"
                    Meta={{ GroupName: "Popup" }}
                    Resource={{ SkinPath: JConfiguration.IntranetSkinPath }}
                    ParentProps={props}
                />
                <ContextMenu JConfiguration={JConfiguration} ParentProps={props} />
                <AppComponent
                    ComponentController={ComponentController}
                    JConfiguration={JConfiguration} />
            </React.Fragment>
        );
    }
    else {
        return (
            <Iframe src={props.JConfiguration.BaseUrl + 'DemoHTMLSample/' + PreviewComponent.ComponentName + "/" + PreviewComponent.ComponentName + ".html"}
                width="100%" height="100%" position="fixed" frameBorder="0" overflow="auto"/>
        );
    }
};


/**
* @name DynamicStyles
* @param {props} props to the methos
* @summary Forms the whole jsx required for the module.
* @returns {Array} Array of the css
*/
ModulePreviewMaster.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.IntranetSkinPath + "/Css/Core/7_DevelopmentSideBar/DevelopmentSideBar.css"
    ];
    return arrStyles;
};

export default ModulePreviewMaster;