// React related imports.
import React, { useReducer, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

//Module realted fies.
import * as CMSLinkAddEdit_Hook from '@shared/Application/e.Editor/Modules/2_OfficeRibbon/2_InsertTab/CMSLinkAddEdit/CMSLinkAddEdit_Hook';
import CMSLinkAddEdit_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/2_InsertTab/CMSLinkAddEdit/CMSLinkAddEdit_ModuleProcessor";

//Helper classes.
import * as ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

// Tree component
import Tree from "@root/Application/e.Editor/PC/Modules/TreeDisplay/Tree";

import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//Helper classes.
import ArcadixFetchAndCacheData from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

/**
 * @name CMSLinkAddEdit
 * @summary This component is responsible for loading Link Popup.
 * @param {any} props Component Props.
 */
const CMSLinkAddEdit = (props) => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSLinkAddEdit_Hook.GetInitialState(props));

    const externalLinkRef = useRef(null);

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, externalLinkRef: externalLinkRef, ["CMSLinkAddEdit_ModuleProcessor"]: new CMSLinkAddEdit_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in CMSLinkAddEdit_Hook, that contains all the custom hooks.
    * @returns null
    */
    CMSLinkAddEdit_Hook.Initialize(objContext);

    /**
     * @name useEffect
     * @summary To load styles.
     */
    useEffect(() => {
        let AddStyles = EditorState.GetReference("AddStyles");
        AddStyles(CMSLinkAddEdit.DynamicStyles(props));
    }, []);

    /**
    * @name Nodeclick
    * @param {object} objNode Contains selected Link details
    * @summary Makes an API call to get details of the selected Link
    */
    const Nodeclick = objNode => {
        let ArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        let URL = "API/Editor/TaskContent/CMS" + objNode.Type + "AddEdit_Module/Get" + objNode.Type + "ElementDetails";
        let strProperty = "Editor_TaskContent_CMS" + objNode.Type + "AddEdit_Module_Get" + objNode.Type + "ElementDetails";
        ArcadixFetchAndCacheData.ExecuteSingle(URL, { iElementId: objNode.Id }, null, (objResponse) => {
            console.log(objResponse)
            objContext.dispatch({
                type: "SET_STATE", payload: {
                    "objSelectedElementJson": objResponse[strProperty][0],
                    "SelectedLink": true,
                    "strSelectedLinkType": objNode.Type
                }
            })
        }, true);
    };

    const GetSelectedLinkElement = () => {
        var arrElement;
        var strTextProperty = "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/6_CMSElement/CMS" + objContext.state.strSelectedLinkType + "/CMS" + objContext.state.strSelectedLinkType + "AddEdit"
        var objTextResource = objContext.props[strTextProperty]["Data"][0]["CMS" + objContext.state.strSelectedLinkType + "AddEdit"];
        var Element = objContext.state.strSelectedLinkType.toLowerCase() !== "image" ? props.ComponentController.GetEditorElement(objContext.state.strSelectedLinkType) : null;
        switch (objContext.state.strSelectedLinkType.toLowerCase()) {
            case "image":
                arrElement = [
                    <div className="object-detail">
                        <h2>{objTextResource["Main_Title"]}</h2>
                        <h3>{objTextResource["Title"]}</h3>
                        <table>
                            <tr>
                                <td>{objTextResource["Name"]}:</td>
                                <td>{objContext.state.objSelectedElementJson["vElementImageFileName"]}</td>
                            </tr>
                            <tr>
                                <td>{objTextResource["FileType_Text"]}:</td>
                                <td>{objContext.state.objSelectedElementJson["vImageType"]}</td>
                            </tr>
                            <tr>
                                <td>{objTextResource["FileSize_Text"]}:</td>
                                <td>{objContext.state.objSelectedElementJson["iImageFileSize"]}</td>
                            </tr>
                            <tr>
                                <td>{objTextResource["Title_Text"]}:</td>
                                <td>{objContext.state.objSelectedElementJson["vElementImageTitle"] !== "" ? objContext.state.objSelectedElementJson["vElementImageTitle"] : "NA"}</td>
                            </tr>
                            <tr>
                                <td>{objTextResource["ShowTitle_Text"]}:</td>
                                <td>{objContext.state.objSelectedElementJson["cShowTitle"] === "N" ? objTextResource["No"] : objTextResource["Yes"]}</td>
                            </tr>
                            <tr>
                                <td>{objTextResource["ShowDescription_Text"]}:</td>
                                <td>{objContext.state.objSelectedElementJson["cShowDescription"] === "N" ? objTextResource["No"] : objTextResource["Yes"]}</td>
                            </tr>
                            <tr>
                                <td>{objTextResource["Druckversion"]}:</td>
                                <td>{objContext.state.objSelectedElementJson["cIsHighResolution"] === "N" ? objTextResource["No"] : objTextResource["Yes"]}</td>
                            </tr>
                            <tr>
                                <td>{objTextResource["Created_On"]}:</td>
                                <td>{objContext.CMSLinkAddEdit_ModuleProcessor.getDate(objContext.state.objSelectedElementJson["dtCreatedOn"])}</td>
                            </tr>
                            <tr>
                                <td>{objTextResource["Edited_On"]}:</td>
                                <td>{objContext.CMSLinkAddEdit_ModuleProcessor.getDate(objContext.state.objSelectedElementJson["dtModifiedOn"])}</td>
                            </tr>
                        </table>
                        <h3>
                            {objTextResource["Description"]}:
                   </h3>
                        <p>-</p>
                        <h2>{objTextResource["Preview"]}</h2>
                        <img src={objContext.state.objSelectedElementJson["vImagePath"]} alt={objContext.state.objSelectedElementJson["vElementImageName"]} />
                        <h2>{objTextResource["Linked_Text"]}</h2>
                    </div>
                ]
                break;
            case "video":
                arrElement = [
                    <div className="object-detail">
                        <h2>{objTextResource["Main_Title"]}</h2>
                        <h3>{objTextResource["Title"]}</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{objTextResource["Name"]}:</td>
                                    <td>{objContext.state.objSelectedElementJson["vVideoName"]}</td>
                                </tr>
                                <tr>
                                    <td>{objTextResource["Running_Time"]}:</td>
                                    <td>{objContext.state.objSelectedElementJson["iVideoTime"]}</td>
                                </tr>
                                <tr>
                                    <td>{objTextResource["FileSize_Text"]}:</td>
                                    <td>{objContext.state.objSelectedElementJson["iVideoFileSize"]}</td>
                                </tr>
                                <tr>
                                    <td>{objTextResource["Created_On"]}:</td>
                                    <td>{objContext.CMSLinkAddEdit_ModuleProcessor.getDate(objContext.state.objSelectedElementJson["dtCreatedOn"])}</td>
                                </tr>
                                <tr>
                                    <td>{objTextResource["Edited_On"]}:</td>
                                    <td>{objContext.CMSLinkAddEdit_ModuleProcessor.getDate(objContext.state.objSelectedElementJson["dtModifiedOn"])}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>
                            {objTextResource["Description"]}:
                   </h3>
                        <p>-</p>
                        <h2>{objTextResource["Preview"]}</h2>
                        <Element {...objContext.props} ElementJson={objContext.state.objSelectedElementJson} />
                        <h2>{objTextResource["Linked_Text"]}</h2>
                        <p>
                            {objTextResource["Not_Used_Description"]}
                        </p>
                    </div>
                ];
                break;
            case "audio":
                break;
            default:
                break;
        }

        return arrElement;
    }


    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        var objTextResource = objContext.props[`Object_Framework_Services_TextResource;Id;${JConfiguration.LanguageCultureInfo}/e.Editor/Modules/2_OfficeRibbon/2_Insert/CMSLinkAddEdit`]["Data"][0]["CMSLinkAddEdit"];
        return (
            <section>
                <div className="popupContent">
                    <div className="tabPanel">
                        <nav>
                            <ul className="tabLists">
                                <li>
                                    <a href="#">{objTextResource["Local"]}</a>
                                </li>
                                <li>
                                    <a href="#">{objTextResource["Global"]}</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <div>
                            <div className="image-upload-grid">
                                <div className="folder-tree">
                                    <Tree
                                        JConfiguration={objContext.props.JConfiguration}
                                        NodeData={objContext.state.arrNodeData}
                                        NodeClick={Nodeclick}
                                    />
                                </div>
                                {
                                    !objContext.state.SelectedLink ? (
                                        <div className="description_content" >
                                            <div className="brwsrObjSec prgrphSection">
                                                <h5 className="prgrphTitle">{objTextResource["External_Link"]}</h5>
                                                <p>
                                                    {objTextResource["External_Link_description"]}
                                                </p>
                                            </div>
                                        </div>
                                    ) :
                                        (
                                            GetSelectedLinkElement()
                                        )
                                }
                            </div>
                        </div>
                        <div>
                            <div className="description_content" >
                                <div className="brwsrObjSec prgrphSection">
                                    <h5 className="prgrphTitle">{objTextResource["External_Link"]}</h5>
                                    <p>
                                        <input ref={externalLinkRef} type="text" defaultValue="http://" />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <footer>
                            <div className="fR">
                                <button className="btn btnOrnge" onClick={() => { objContext.CMSLinkAddEdit_ModuleProcessor.OkClick(objContext) }}> {objTextResource["Ok"]} </button>
                                <button className="btn btnOrnge" onClick={() => { props.ClosePopup(props.ObjModal) }}> {objTextResource["Abort"]} </button>
                            </div>
                        </footer>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <React.Fragment>{
            props.isLoadComplete || state.isLoadComplete ?
                <React.Fragment>{GetContent()}</React.Fragment> : <div></div>
        }
        </React.Fragment>
    );
};


/**
* @name InitialDataParams
* @param {object} props props
* @summary required for SSR
* @returns {object} InitialDataParams 
*/
CMSLinkAddEdit.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new CMSLinkAddEdit_ModuleProcessor()).InitialDataParams(props));
};

/**
* @name CMSLinkAddEdit.DynamicStyles
* @param {object} props props
* @summary required for loading css
* @returns Styles array
*/
CMSLinkAddEdit.DynamicStyles = (props) => {
    return [
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/2_OfficeRibbon/2_Insert/CMSLinkAddEdit/CMSLinkAddEdit.css",
    ];
};

export default connect(EditorBase_Hook.MapStoreToProps(CMSLinkAddEdit_ModuleProcessor.StoreMapList()))(CMSLinkAddEdit);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSLinkAddEdit_ModuleProcessor; 