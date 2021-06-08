//React imports 
import React, { useRef } from 'react';

//Base classes/methods
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports
import LookAndFeelSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/4_CMSPageContent/CMSPageContent_Editor/LookAndFeelSidebar_BusinessLogic/LookAndFeelSidebar_ModuleProcessor";

/**
 * @name LookAndFeelSidebar
 * @param {object} props props from parent
 * @param {ref} ref ref to component
 * @summary Contains LookAndFeelSidebar.
 * @returns {component} LookAndFeelSidebar
 */
const LookAndFeelSidebar = (props, ref) => {

    let objContext = {
        props,
        "PreviewImageDiv_Ref": useRef(null),
        "LookAndFeelSidebar_ModuleProcessor": new LookAndFeelSidebar_ModuleProcessor()
    };

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
     */
    Base_Hook.InitializeCss(props, objContext.LookAndFeelSidebar_ModuleProcessor);

    const PreviewImage = (intSkinId) => {
        let strSkinName = props.Data.Skins.find(x => x["SkinId"] === intSkinId)["SkinName"];
        let objElementJson = {
            ...props.Data.ElementJson,
            ["vContainerElementProperties"]: {
                ...props.Data.ElementJson["vContainerElementProperties"],
                ["vSkinName"]: strSkinName
            }
        };
        props.PassedEvents.Preview(objElementJson);
    };

    const RemovePreviewImage = () => {
        let strSkinName = props.Data.ElementJson["vContainerElementProperties"]["vSkinName"];
        let objElementJson = {
            ...props.Data.ElementJson,
            ["vContainerElementProperties"]: {
                ...props.Data.ElementJson["vContainerElementProperties"],
                ["vSkinName"]: strSkinName
            }
        };
        props.PassedEvents.Preview(objElementJson);
    };

    const SetLookNFeel = (intSkinId) => {
        let strSkinName = props.Data.Skins.find(x => x["SkinId"] === intSkinId)["SkinName"];
        let objElementJson = {
            ...props.Data.ElementJson,
            ["vContainerElementProperties"]: {
                ...props.Data.ElementJson["vContainerElementProperties"],
                ["vSkinName"]: strSkinName
            }
        };
        props.PassedEvents.UpdateElementJson(objElementJson);
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let strFolderPath = props.JConfiguration.EditorSkinPath + "/Images/Common/";
        return (
            <div className="look-n-feel">
                <div className="tab">
                    {
                        props.Data.Skins.map(x => {
                            return (
                                <div className="look-n-feel-row" id={x["SkinId"]} name={x["SkinName"]}>
                                    <div className="look-n-feel-cell">
                                        <img
                                            src={strFolderPath + x["SkinName"] + ".png"}
                                            onClick={() => { SetLookNFeel(x["SkinId"]); }} alt={x["SkinName"]}
                                            onMouseEnter={() => { PreviewImage(x["SkinId"]); }}
                                            onMouseLeave={() => { RemovePreviewImage(); }}
                                        />
                                        {
                                            props.Data.ElementJson["vContainerElementProperties"]["vSkinName"] === x["SkinName"] ? <span class="tick-mark">&#10003;</span> : ""
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    };

    return GetContent();
};

export default LookAndFeelSidebar;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LookAndFeelSidebar_ModuleProcessor; 