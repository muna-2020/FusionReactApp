// React related imports.
import React, { useReducer } from 'react';

//store related imports.
import { connect } from "react-redux";

//Module related imports.
import * as ClipartPopup_Hooks from '@shared/Application/e.Editor/Modules/2_OfficeRibbon/2_InsertTab/ClipartPopup/ClipartPopup_Hook';
import * as ClipartPopup_MetaData from '@shared/Application/e.Editor/Modules/2_OfficeRibbon/2_InsertTab/ClipartPopup/ClipartPopup_MetaData';
import ClipartPopup_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/2_InsertTab/ClipartPopup/ClipartPopup_ModuleProcessor";
import * as ClipArt_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSClipArt/CMSClipArt_Editor/CMSClipArt_Editor_MetaData";

//Base classes/methods.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Text Action import.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

/**
 * @name ClipartPopup
 * @param {object} props props from parent.
 * @summary Clipboard Popup dispalay the content from the clipboard.
 */
const ClipartPopup = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, ClipartPopup_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    const objContext = { props, state, dispatch, ["ClipartPopup_ModuleProcessor"]: new ClipartPopup_ModuleProcessor() };

    /**
     * @name ClipartPopup_Hooks.Initialize
     * */
    ClipartPopup_Hooks.Initialize(objContext);

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
     */
    EditorBase_Hook.InitializeCss(props, objContext.ClipartPopup_ModuleProcessor);

    /**
     * @name AddClipartToText
     * @summmary this add clipart to the text.
     * */
    const AddClipartToText = () => {
        let objElementJson = ClipArt_Editor_MetaData.GetDefaultElementJson();
        TextActions.AddSubElement({
            ...objElementJson,
            'vElementJson': {
                ...objElementJson.vElementJson,
                "vFileName": state.SelectedImage,
                "vFolderName": state.ActiveFolder
            }
        });
        editorPopup.ClosePopup(props.Id);
    }

    /**
     * @name GetContent
     * @summary returns the common jsx of the table properties sidebar.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        let objImageMeta = ClipartPopup_MetaData.GetImageMeta();
        return (
            <div className="clip-art-popup">
                <div className="clip-art-header">
                    <h3>Clip-Art</h3>
                    <h4>Clip Kunst</h4>
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: objImageMeta.SpaceImage
                        }}
                        Events={{
                            OnClickEventHandler: objEvent => editorPopup.ClosePopup(props.Id)
                        }}
                        ParentProps={props}
                    />
                </div>
                <div className="clip-art-content">
                    <div className="clip-art-title">
                        Wählen Sie Clip Art Typ
                         </div>
                    <div className="select-flex">
                        <span>ClipArt Typ</span>
                        <select id="cmbClipArtFolderName" value={objContext.state.ActiveFolder}
                            onChange={objEvent => objContext.ClipartPopup_ModuleProcessor.OnFolderChange(objContext, objEvent.target.value)}
                            className="Dropdown"
                            style={{ width: '250px' }}>
                            {
                                objContext.state.Folders.map(objFolder => {
                                    return <option value={objFolder.FolderName}>{objFolder.FolderName}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="clip-art-title">
                        Geld
                    </div>
                    <div className="image-box">
                        {
                            objContext.state.Folders[objContext.state.ActiveFolderIndex]["Cliparts"].map(objClipart => {
                                return <div className="image-container"
                                    style={{ outline: state.SelectedImage === objClipart["Clipart"] ? "1px solid black" : "none" }}
                                    onClick={objEvent => objContext.ClipartPopup_ModuleProcessor.ChangeSelectedImage(objContext, objClipart["Clipart"])}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta[objClipart["Clipart"] + "Image"]
                                        }}
                                        ParentProps={props}
                                    />
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="clip-art-footer">
                    <button className="btn" onClick={objEvent => AddClipartToText()}>OK</button>
                    <button className="btn" onClick={objEvent => editorPopup.ClosePopup(props.Id)}>Abbrechen</button>
                </div>
            </div>
        );
    };

    /**
     * @summary calls GetContent method to get the JSX.
     * */
    return state.isLoadComplete ? GetContent() : <React.Fragment />;
}

export default connect(EditorBase_Hook.MapStoreToProps(ClipartPopup_ModuleProcessor.StoreMapList()))(ClipartPopup);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ClipartPopup_ModuleProcessor; 