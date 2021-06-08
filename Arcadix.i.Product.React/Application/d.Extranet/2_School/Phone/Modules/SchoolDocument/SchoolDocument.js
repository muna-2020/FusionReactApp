//React imports.
import React, { useState, useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module specific imports
import * as SchoolDocument_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/SchoolDocument/SchoolDocument_Hook';
import SchoolDocument_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/Modules/SchoolDocument/SchoolDocument_ModuleProcessor';

//Controls
import Tree from '@root/Framework/Controls/Tree/Tree';
import DocumentDisplay from '@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/DocumentDisplay/DocumentDisplay';

//Inline Images import
import imgCogWhite from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/cog_white.svg?inline';
import imgDeleteWhite from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/delete_white.svg?inline';
import imgPlusWhite from '@inlineimage/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/pluswhite.svg?inline';

/**
* @name SchoolDocument
* @param {object} props props
* @summary This component displays the SchoolDocument data in tree.
* @returns {object} React.Fragement that encapsulated the display tree with Folder details. and document details in table.
*/
const SchoolDocument = (props) => {

    const [schoolDocumentRightVisible, setSchoolDocumentRightVisible] = useState(false);
    const [schoolDocumentLeftVisible, setSchoolDocumentLeftVisible] = useState(true);

    /**
    * @name Reduce Initializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, SchoolDocument_Hook.GetInitialState(props));


    /**
     * @name domTreeRef
     * @summary reference of tree component
     * */
    const domTreeRef = useRef(null);

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "SchoolDocument", ["SchoolDocument_ModuleProcessor"]: new SchoolDocument_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.SchoolDocument_ModuleProcessor.Initialize(objContext, objContext.SchoolDocument_ModuleProcessor);

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    SchoolDocument_Hook.Initialize(objContext);

    /**
     * @name MenuToggler
     * @summary holds the value of wether the menu has to visible or not
     * */
    const [showMenu, SetShowMenu] = useState(false);

    /**
     * @name ShowMenu
     * @summary sets showMenu as true to show menu.
     * @param {any} e event
     */
    const ShowMenu = (e) => {
        if (!state.blnDefaultFolder) {
            SetShowMenu(true);
            document.addEventListener("click", CloseMenu);
        }
    };

    /**
     * @name CloseMenu
     * @summary sets showMenu as fasle to hide menu.
     * @param {any} e
     */
    const CloseMenu = (e) => {
        SetShowMenu(false);
        document.removeEventListener("click", CloseMenu);
    };

    const GetTextMessageForDocumentRight = (objTextResource) => {
        let strText = "";
        if (!state.objSchoolYearPeriod || state.objSchoolYearPeriod["iDisplayOrder"] == 1) {
            strText = Localization.TextFormatter(objTextResource, 'CurrentSchoolYearSelectFolderMessage');
            return (
                <div className="SelectFolderMessage"> <span>{strText}</span></div>
            );
        }
        else {
            strText = Localization.TextFormatter(objTextResource, 'OldSchoolYearSelectFolderMessage');
            return (
                <div className="SelectFolderMessage"> <span>{strText}</span></div>
            );
        }
    };

    /**
     * @name GetContent
     * @summary returns the required jsx for component
     * @param {any} props
     * @returns {Element}
     */
    const GetContent = (props) => {
        var arrFolderData = DataRef(props.Object_Extranet_School_DocumentFolder, "Object_Extranet_School_DocumentFolder;uClassId;00000000-0000-0000-0000-000000000000;uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + props.ClientUserDetails.UserId + ";cIsSchool;Y;cIsDeleted;N")["Data"];
        var arrAllFolderData = objContext.SchoolDocument_ModuleProcessor.ManipulateFolderData(objContext, arrFolderData);
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolDocument", props);
        let arrSchoolYearPeriodData = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        let strSchoolYearPeriodId = "00000000-0000-0000-0000-000000000000";
        if (arrSchoolYearPeriodData === undefined)
            arrSchoolYearPeriodData = [];
        else
            strSchoolYearPeriodId = arrSchoolYearPeriodData[0]["uSchoolYearPeriodId"];


        let objSchoolYearPeriodDropdownData = {
            DropdownData: arrSchoolYearPeriodData,
            SelectedValue: strSchoolYearPeriodId
        };
        let objTreeData = {
            NodeData: arrAllFolderData ? arrAllFolderData : []
        };
        let arrDocument = state.objSelectedFolder ? objContext.SchoolDocument_ModuleProcessor.GetFolderDocuments(objContext) : [];

        return (
            <div className="school-document">
                <div className="school-document-title">
                    <span>Dokumente</span>

                    {
                        state.showDocumentListTab ?
                            <button className="back-button"

                                onClick={() => dispatch({ type: 'SET_STATE', payload: { showDocumentListTab: false } })}><img
                                    src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_left_dark.svg")}

                                />Back</button>
                            : <React.Fragment />
                    }
                    <img
                        src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/exclamation_mark.svg")}

                    />
                </div>
                {
                    !state.showDocumentListTab ?
                        <div className="school-document-left-wrapper">
                            <div className="document-left-header">
                                <span>Schuljahr:</span>
                                <div className="content-dropdown">
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id="DocumentSchoolYearPeriodDropdown"
                                        Meta={objContext.SchoolDocument_ModuleProcessor.GetMetaDataSchoolYearPeriodDropdown()}
                                        Data={objSchoolYearPeriodDropdownData}
                                        Resource={objContext.SchoolDocument_ModuleProcessor.GetResourceDataSchoolYearPeriodDropdown()}
                                        Events={objContext.SchoolDocument_ModuleProcessor.GetEventsDataSchoolYearPeriodDropdown(objContext)}
                                        ParentProps={{ ...props }}
                                    />
                                </div>

                                {state.blnCurrentSchoolYearPeriod ?
                                    <button className="btn-brown" onClick={() => { objContext.SchoolDocument_ModuleProcessor.OpenFolderPopup(objContext, false, objTextResource); }}>
                                        <img
                                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/plusWhite.svg")}

                                        />
                                        <span>{Localization.TextFormatter(objTextResource, 'NewFolder')}</span>
                                    </button>
                                    : ''}
                            </div>

                            <Tree
                                Id="SchoolDocumentTree"
                                ref={domTreeRef}
                                Meta={objContext.SchoolDocument_ModuleProcessor.GetTreeMetaData()}
                                Data={objTreeData}
                                Events={objContext.SchoolDocument_ModuleProcessor.GetTreeEvents(objContext)}
                                CallBacks={{
                                    OnBeforeShowNode: (objNode) => { return objContext.SchoolDocument_ModuleProcessor.OnBeforeShowNode(objNode) }
                                }}
                                Resource={objContext.SchoolDocument_ModuleProcessor.GetTreeResourceData()}
                                ParentProps={{ ...props }}
                            />

                        </div>
                        : <React.Fragment />
                }

                {
                    state.showDocumentListTab ?
                        <div className="school-document-right-wrapper">
                            <div className="document-right-header">
                                <span className="folder-heading">Alle Lernenden</span>
                                <span className="folder-controls">

                                    {!objContext.SchoolDocument_ModuleProcessor.IsDefaultFolder(objContext) && state.blnCurrentSchoolYearPeriod ?
                                        <img onClick={() => ShowMenu()}
                                            src={imgCogWhite}
                                            alt=""
                                        /> : ''}
                                    {
                                        showMenu
                                            ? <div className="create-delete-folders">
                                                {!objContext.SchoolDocument_ModuleProcessor.IsDefaultFolder(objContext) ? <ul className="menu">
                                                    <li onClick={() => { objContext.SchoolDocument_ModuleProcessor.OpenFolderPopup(objContext, true, objTextResource); }}> {Localization.TextFormatter(objTextResource, 'RenameFolder')} </li>
                                                    <li onClick={() => { objContext.SchoolDocument_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Folder"); }}>{Localization.TextFormatter(objTextResource, 'Delete')}</li>
                                                    <li onClick={() => { objContext.SchoolDocument_ModuleProcessor.OpenCopyFolderPopup(objContext, objTextResource, true); }} >{Localization.TextFormatter(objTextResource, 'MoveFolder')} </li>
                                                    <li onClick={() => { objContext.SchoolDocument_ModuleProcessor.OpenCopyFolderPopup(objContext, objTextResource, false); }}>{Localization.TextFormatter(objTextResource, 'CopyFolder')}</li>
                                                </ul> : ''}
                                            </div>
                                            : null
                                    }
                                    {!objContext.SchoolDocument_ModuleProcessor.IsDefaultFolder(objContext) == true ?
                                        <img
                                            src={imgDeleteWhite}
                                            alt=""
                                            onClick={() => { objContext.SchoolDocument_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Folder"); }}
                                        /> : ''}
                                </span>
                            </div>

                            <div className="table-main">
                                <table className="school-document-right-table">
                                    <DocumentDisplay
                                        arrDocument={arrDocument}
                                        JConfiguration={props.JConfiguration}
                                        Delete={(objDocument) => { objContext.SchoolDocument_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Document", objDocument); }}
                                        objTextResource={objTextResource}
                                    />
                                </table>
                            </div>
                            <div className="school-document-right-footer">
                                {state.objSelectedFolder && (state.objSchoolYearPeriod.uSchoolYearPeriodId == "" || state.objSchoolYearPeriod["iDisplayOrder"] == 1) && state.blnCurrentSchoolYearPeriod ? <div className="footer-btn">
                                    <button onClick={() => { objContext.SchoolDocument_ModuleProcessor.OpenFileUploadPopup(objContext, objTextResource); }}>{Localization.TextFormatter(objTextResource, 'UploadFile')}</button>
                                </div>
                                    : <React.Fragment />}

                            </div>
                        </div>
                        : <React.Fragment />
                }

            </div>
        );


    };

    return props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <React.Fragment />;
};

/**
 * @name Connector
 * @summary connects component to store.
 * */
export default connect(ExtranetBase_Hook.MapStoreToProps(SchoolDocument_ModuleProcessor.StoreMapList()))(SchoolDocument);


/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SchoolDocument_ModuleProcessor; 