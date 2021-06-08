//React imports
import { connect } from "react-redux";
import React, { useState, useReducer, useRef } from "react";

//Module specific imports
import * as PupilDocument_Hook from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocument_Hook';
import PupilDocument_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocument_ModuleProcessor';

//Controls
import Tree from "@root/Framework/Controls/Tree/Tree";
import DocumentDisplay from '@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/DocumentDisplay/DocumentDisplay';

//Inline Images import
import imgPlusWhite from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/pluswhite.svg?inline';
import imgCogWhite from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/cog_white.svg?inline';
import imgSharedGroupWhite from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/shared_group_white.svg?inline';
import imgDeleteWhite from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/delete_white.svg?inline';
/**
 * @name PupilDocument
 * @param {any} props
 */
const PupilDocument = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, PupilDocument_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to functions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "PupilDocument", ["PupilDocument_ModuleProcessor"]: new PupilDocument_ModuleProcessor() };

    /**
     * @name domTreeRef
     * @summary reference of tree component
     * */
    const domTreeRef = useRef(null);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.PupilDocument_ModuleProcessor.Initialize(objContext, objContext.PupilDocument_ModuleProcessor);

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    PupilDocument_Hook.Initialize(objContext);

    const [showMenu, SetShowMenu] = useState(false);

    const ShowMenu = (e) => {
        SetShowMenu(true);
        document.addEventListener("click", CloseMenu);
    };

    const CloseMenu = (e) => {
        SetShowMenu(false);
        document.removeEventListener("click", CloseMenu);
    };

    /**
    * @name GetContent
    * @summary returns the jsx.
    * @param {any} props
    * @returns {Element}
    */
    const GetContent = (props) => {

        let strClassId = state.strClassId;
        var objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilDocument", objContext.props)

        var arrFolderData = DataRef(objContext.props.Extranet_Pupil_PupilDocumentFolder_Module, "Extranet_Pupil_PupilDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
        var arrAllFolderData = objContext.PupilDocument_ModuleProcessor.ManipulateFolderData(objContext, arrFolderData, objTextResource);
        let objTreeData = {
            NodeData: arrAllFolderData
        };
        let arrSchoolYearPeriodData = [];
        if (DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")) {
            arrSchoolYearPeriodData = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        }
        let strSchoolYearPeriodId = state.objSchoolYearPeriod.uSchoolYearPeriodId == "" ? arrSchoolYearPeriodData.length > 0 ? arrSchoolYearPeriodData[0]["uSchoolYearPeriodId"] : "" : state.objSchoolYearPeriod.uSchoolYearPeriodId;
        arrSchoolYearPeriodData = arrSchoolYearPeriodData.sort((a, b) => a["iDisplayOrder"] - b["iDisplayOrder"])
        let objSchoolYearPeriodDropdownData = {
            DropdownData: arrSchoolYearPeriodData,
            SelectedValue: strSchoolYearPeriodId
        };
        let arrDocument = objContext.PupilDocument_ModuleProcessor.GetFolderDocuments(objContext);

        let objSelectedFolder = ApplicationState.GetProperty("SelectedNode");
        //let blnIsFolderSelected = objSelectedFolder ? objSelectedFolder.PupilDocumentTree ? true : false : false;
        let blnIsFolderSelected = state.objSelectedFolder ? true : false;
        return (
            <div className="pupilparent-wrapper">
                <div className="toplan-border" id="NavigationSecondaryMenu" />
                <div className="pupildocument-flex">
                    <div className="pupildocument-left">
                        <div className="pupildocument-subheader" id="PupilDocumentSubHeader">
                            <div>
                                <span>{Localization.TextFormatter(objTextResource, 'SchoolYear')}</span>
                                <PerformanceProfiler ComponentName={"PupilDocumentSchoolYearPeriodDropdown"} JConfiguration={props.JConfiguration} >
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id="PupilDocumentSchoolYearPeriodDropdown"
                                        Meta={objContext.PupilDocument_ModuleProcessor.GetMetaDataSchoolYearPeriodDropdown()}
                                        Data={objSchoolYearPeriodDropdownData}
                                        Resource={objContext.PupilDocument_ModuleProcessor.GetResourceDataSchoolYearPeriodDropdown()}
                                        Events={objContext.PupilDocument_ModuleProcessor.GetEventsDataSchoolYearPeriodDropdown(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </div>
                            <div className="pupildocument-left-header">
                                {state.blnCurrentSchoolYearPeriod ? <button className="button new-group-button" onClick={() => {
                                    objContext.PupilDocument_ModuleProcessor.OpenFolderPopup(objContext, false, objTextResource);
                                }}>
                                    <img
                                        src={
                                            imgPlusWhite
                                        }
                                        alt=""
                                    />
                                    <span>
                                        {Localization.TextFormatter(objTextResource, 'NewFolder')}
                                    </span>
                                </button> : ''}
                            </div>
                        </div>

                        <div className="folder-list" id="documentParent" onClick={(event) => { objContext.PupilDocument_ModuleProcessor.OnClickOutSideTree(objContext, domTreeRef); }}>
                            <WrapperComponent
                                ComponentName={"FillHeight"}
                                Id="PupilProfile_FillHeight_DocLeft"
                                Meta={{
                                    HeaderIds: ["PupilHeader", "NavigationSecondaryMenu", "PupilDocumentSubHeader"],
                                    FooterIds: ["bottomSpacing", "BgFooter", "LeftBlockFooter"]
                                }}
                                ParentProps={{ ...props }}>
                                <PerformanceProfiler ComponentName={"PupilDocumentTree"} JConfiguration={props.JConfiguration} >
                                    <Tree
                                        Id="PupilDocumentTree"
                                        ref={domTreeRef}
                                        Meta={objContext.PupilDocument_ModuleProcessor.GetTreeMetaData()}
                                        Data={objTreeData}
                                        Events={objContext.PupilDocument_ModuleProcessor.GetTreeEvents(objContext)}
                                        CallBacks={{
                                            OnBeforeShowNode: (objNode) => { return objContext.PupilDocument_ModuleProcessor.OnBeforeShowNode(objNode) }
                                        }}
                                        Resource={objContext.PupilDocument_ModuleProcessor.GetTreeResourceData()}
                                        ParentProps={{ ...props }}
                                    />
                                </PerformanceProfiler>
                            </WrapperComponent>
                        </div>
                        <div className="left-block-footer" id="LeftBlockFooter"></div>
                    </div>

                    <div className="pupildocument-right">
                        <div className="document-right-header" id="DocumentRightHeader">
                            {
                                state.objSelectedFolder ?

                                    <div className="pupildocument-right-header">
                                        <span className="folder-heading"> {state.objSelectedFolder ? state.objSelectedFolder.vFolderName + (state.objSelectedFolder.cIsSchool != "Y" ? " (Besitzer: " + objContext.PupilDocument_ModuleProcessor.GetAuthorName(objContext) + ")" : '') : ''}</span>
                                        <div className="folder-controls">
                                            {
                                                !state.blnDefaultFolder && state.blnCurrentSchoolYearPeriod ?
                                                    <React.Fragment>
                                                        <img src={imgCogWhite} alt="" onClick={() => ShowMenu()} />
                                                        {
                                                            showMenu
                                                                ? (
                                                                    <div className="create-delete-folders">
                                                                        <ul className="menu">
                                                                            {(!state.blnDefaultFolder && state.blnOwnerOfFolder && !state.blnSharedFolder) ? <li onClick={() => { objContext.PupilDocument_ModuleProcessor.OpenFolderPopup(objContext, true, objTextResource) }}>{Localization.TextFormatter(objTextResource, 'RenameFolder')} </li> : ''}
                                                                            {(!state.blnDefaultFolder && state.blnOwnerOfFolder && !state.blnSharedFolder) ? <li onClick={() => { objContext.PupilDocument_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Folder") }}>{Localization.TextFormatter(objTextResource, 'Delete')}</li> : ''}
                                                                            {!state.blnSharedFolder ? <li onClick={() => { objContext.PupilDocument_ModuleProcessor.OpenMoveCopyFolderPopup(objContext, objTextResource, true) }}>{Localization.TextFormatter(objTextResource, 'MoveFolder')} </li> : ''}
                                                                            <li onClick={() => { objContext.PupilDocument_ModuleProcessor.OpenMoveCopyFolderPopup(objContext, objTextResource, false) }}>{Localization.TextFormatter(objTextResource, 'CopyFolder')}</li>
                                                                        </ul>
                                                                    </div>
                                                                )
                                                                : (
                                                                    null
                                                                )
                                                        }

                                                        {
                                                            !state.blnParentFolder ?
                                                                <img
                                                                    src={
                                                                        imgSharedGroupWhite
                                                                    }
                                                                    alt="" onClick={() => {
                                                                        objContext.PupilDocument_ModuleProcessor.OpenAssignUserPopup(objContext, objTextResource);
                                                                    }}
                                                                /> : ''
                                                        }
                                                        <img
                                                            src={
                                                                imgDeleteWhite
                                                            }
                                                            alt="" onClick={() => {
                                                                objContext.PupilDocument_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Folder");
                                                            }}

                                                        />
                                                    </React.Fragment> : ''
                                            }
                                        </div>
                                    </div>
                                    : <React.Fragment />
                            }
                        </div>

                        <div className="files-list">
                            <WrapperComponent
                                ComponentName={"FillHeight"}
                                Id="PupilProfile_FillHeight_DocRight"
                                Meta={{
                                    HeaderIds: ["PupilHeader", "DocumentRightHeader", "NavigationSecondaryMenu"],
                                    FooterIds: ["bottomSpacing", "UpdateDataFooterButton", "BgFooter", "RightBlockFooter"]
                                }}
                                ParentProps={{ ...props }}>
                                {
                                    blnIsFolderSelected ?
                                        arrDocument && arrDocument.length > 0 ?
                                            <table>
                                                <DocumentDisplay
                                                    arrDocument={arrDocument}
                                                    JConfiguration={props.JConfiguration}
                                                    Delete={(objDocument) => { objContext.PupilDocument_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Document", objDocument) }}
                                                    objTextResource={objTextResource}
                                                    EditDocument={(objDocument) => { objContext.PupilDocument_ModuleProcessor.EditDocument(objContext, objDocument) }}
                                                />
                                            </table>
                                            : <React.Fragment>
                                                <div className="no-file-text">
                                                    {
                                                        state.objSelectedFolder && state.objSelectedFolder["cIsSchool"] == "Y" ?
                                                            Localization.TextFormatter(objTextResource, 'SchoolFolderDoesNotHaveFiles')
                                                            : Localization.TextFormatter(objTextResource, 'ClickUploadButtonText')
                                                    }
                                                </div>
                                            </React.Fragment>
                                        : <div className="no-file-text">{Localization.TextFormatter(objTextResource, 'NoFolderSelectedMessage')}</div>
                                }
                            </WrapperComponent>

                            <div className="updateData" id="UpdateDataFooterButton">
                                {
                                    (!state.blnDefaultFolder && state.objSelectedFolder && state.objSelectedFolder.cIsReadOnly != "Y" && state.blnCurrentSchoolYearPeriod) ?
                                        <button className="button orange-button" onClick={() => { objContext.PupilDocument_ModuleProcessor.OpenFileUploadPopup(objContext, objTextResource); }}>{Localization.TextFormatter(objTextResource, 'UploadFile')}</button>
                                        : ''}
                            </div>
                        </div>
                        <div className="right-block-footer" id="RightBlockFooter"></div>
                    </div>
                </div>
                <div className="bgfooter" id="BgFooter"></div>
            </div>
        );

    };
    return (
        <div>
            {props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <div> </div>}
        </div>
    );
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(PupilDocument_ModuleProcessor.StoreMapList()))(PupilDocument);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = PupilDocument_ModuleProcessor;

//{
//    (!state.blnDefaultFolder && state.blnOwnerOfFolder && !state.blnSharedFolder && state.objSelectedFolder.cIsReadOnly != "Y") ?
//        <button className="button orange-button" onClick={() => { objContext.PupilDocument_ModuleProcessor.OpenFileUploadPopup(objContext, objTextResource); }}>{Localization.TextFormatter(objTextResource, 'UploadFile')}</button>
//        : ''
//}
