//React imports
import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';

//Application state methods/classes
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//ComponentLoader import.
import ComponentLoader from '@root/Core/4_ComponentLoader/ComponentLoader';

/**
 * @name mapStateToProps
 * @param {object} state Component local state.
 * @returns {object} mapped state.
 */
export function mapStateToProps(state) {
    return {
        Sidebar: state.ApplicationState["Sidebar"]
    };
}

/**
 * @name Sidebar
 * @param {object} props props from parent.
 * @summry Contains the Sidebar.
 * @returns {any} sidebar
 */
const Sidebar = (props) => {
    let [state, setState] = useState({ SidebarProps: { Status: 0 }, ShowHtmlImage: false, HtmlImageProps: {} });
    let strStyleToModify = "flex-direction: row-reverse;";
    let SidebarComponent_Ref = useRef(null);
    let HtmlImageComponent_Ref = useRef(null);
    let HtmlImage_Ref = useRef(null);

    /**
     * @name useEffect
     * @summary this useEffect adds showSidebar and hideSidebar to the store
     */
    useEffect(() => {
        ApplicationState.SetProperty("showSidebar", ShowSidebar);
        ApplicationState.SetProperty("hideSidebar", HideSidebar);
    }, []);

    /**
     * @name useEffect
     * @summary Initialize the state with props.
     */
    useEffect(() => {
        setState({ ...props });
    }, [props]);

    /**
     * @name useEffect
     * @summry Attaches/Removes the onClick event.
     */
    useEffect(() => {
        if (props.PageId) {
            let domActiveWorkArea = document.getElementById('activeworkarea_' + "edit" + '_' + props.PageId);
            if (domActiveWorkArea && props.Sidebar && props.Sidebar.SidebarProps && props.Sidebar.SidebarProps.AutoHide) {
                domActiveWorkArea.addEventListener('click', HideSidebar);
            }
        }
        return () => {
            if (props.PageId) {
                let domActiveWorkArea = document.getElementById('activeworkarea_' + "edit" + '_' + props.PageId);
                if (domActiveWorkArea) {
                    domActiveWorkArea.removeEventListener('click', HideSidebar);
                }
            }
        };
    }, [props]);

    /**
     * @name UpdateSidebarStatusToEditor
     * @param {string} strPosition 
     * @param {bool} blnStatus 
     */
    const UpdateSidebarStatusToEditor = (strPosition, blnStatus) =>{
        let objEditorRef = EditorState.GetReference("EditorRef");
        if (objEditorRef.current && objEditorRef.current !== null) {
           objEditorRef.current.SetSidebarStatus(strPosition, blnStatus);
        }
    }

    /**
     * @name ShowSidebar
     * @param {objecy} objSidebar Sidebar props.
     * @summary display the sidebar
     */
    const ShowSidebar = (objSidebar) => {
        //if (objSidebar.SidebarProps && objSidebar.SidebarProps.Position && objSidebar.SidebarProps.Position.toLowerCase() === "left") {
        //    let objParent = document.getElementById("pagecontent_sidebar_container");
        //    let strStyle = objParent.getAttribute("style") ? objParent.getAttribute("style") : "";
        //    if (!strStyle.includes(strStyleToModify)) {
        //        strStyle += strStyleToModify;
        //        objParent.setAttribute("style", strStyle);
        //    }
        //}
        //else if (objSidebar.SidebarProps && (!objSidebar.SidebarProps.Position || objSidebar.SidebarProps.Position.toLowerCase() === "right")) {
        //    let objParent = document.getElementById("pagecontent_sidebar_container");
        //    let strStyle = objParent.getAttribute("style") ? objParent.getAttribute("style") : "";
        //    if (strStyle.includes(strStyleToModify)) {
        //        strStyle = strStyle.replace(strStyleToModify, "");
        //        objParent.setAttribute("style", strStyle);
        //    }
        //}
        UpdateSidebarStatusToEditor("right", true);
        ApplicationState.SetProperty("Sidebar", { ...objSidebar });
    };

    /**
     * @name HideSidebar
     * @param {any} fnCallback callback to the caller so that he can do operations before saving.
     * @summary Hide the sidebar
     */
    const HideSidebar = (fnCallback) => {
        let objSidebar = ApplicationState.GetProperty("Sidebar");
        if (typeof fnCallback === "function") {
            fnCallback(props.Sidebar.Data);
        }
        if (props.Sidebar && props.Sidebar.PassedEvents && props.Sidebar.PassedEvents.CloseCallback) {
            props.Sidebar.PassedEvents.CloseCallback();
        }
         UpdateSidebarStatusToEditor("right", false)
        if (objSidebar) {
            ApplicationState.SetProperty("Sidebar", {});
        }
    };

    const ShowHtmlImageComponent = (objHtmlImageProps) => {
        SidebarComponent_Ref.current.style.display = "none";
        HtmlImageComponent_Ref.current.style.display = "block";
        HtmlImage_Ref.current.UpdateComponentState(objHtmlImageProps);
        // setState({ ...state, ShowHtmlImage: true, HtmlImageProps: { ...objHtmlImageProps } });
    }

    const HideHtmlImageComponent = () => {
        SidebarComponent_Ref.current.style.display = "block";
        HtmlImageComponent_Ref.current.style.display = "none";
        // setState({ ...state, ShowHtmlImage: false, HtmlImageProps: {} });
    }

    /**
     * @name RenderSidebarComponent
     * @summary Renders the sidebar component.
     * @returns {any} SidebarComponent
     * */
    const RenderSidebarComponent = () => {
        if (props.Sidebar.SidebarProps && props.Sidebar.SidebarProps && props.Sidebar.SidebarProps.SidebarName) {
            let objServerRenderModule = props.JConfiguration["SSR_Components"].filter(x => x["Name"] == props.Sidebar.SidebarProps.SidebarName);
            let blnServerRenderModule = false;
            let blnCacheSSRComponent = false;
            if (objServerRenderModule.length > 0) {
                blnServerRenderModule = true;
                blnCacheSSRComponent = objServerRenderModule[0]["IsCached"] == "Y" ? true : false;
            }
            let objSidebarProps = {
                ...props.Sidebar,
                "IsEditor": "Y",
                "hideSidebar": HideSidebar,
                "HideSidebar": HideSidebar,
                "Mode": props.Sidebar.Mode,
                "PageId": props.Sidebar.PageId,
                "AddSubElement": props.Sidebar.AddSubElement,
                "UpdateSubElement": props.Sidebar.UpdateSubElement,
                "JConfiguration": { ...props.JConfiguration, IsSSREnabled: blnServerRenderModule },
                ShowHtmlImageComponent,
                HideHtmlImageComponent,
                CacheSSRComponent: blnCacheSSRComponent
            };
            let CMSHtmlImage = props.ComponentController.GetComponent("CMSHtmlImage");

            return (
                <React.Fragment>
                    <div ref={SidebarComponent_Ref} style={{ display: "block", height: "100%" }}>
                        <ComponentLoader
                            {...objSidebarProps}
                            ComponentController={props.ComponentController}
                            ComponentControllerPath={props.JConfiguration.BasePhysicalPath + "/Arcadix.i.Product.React/Application/e.Editor/PC/Controller/ComponentController/ComponentController"}
                            DivName={"Sidebar_Div"}
                            ComponentName={props.Sidebar.SidebarProps.SidebarName}
                        />
                    </div>
                    <div ref={HtmlImageComponent_Ref} style={{ display: "none", height: "100%" }}>
                        <CMSHtmlImage ComponentRef={HtmlImage_Ref} JConfiguration={JConfiguration} ComponentController={props.ComponentController} />
                    </div>
                </React.Fragment>
            );
        }
        else {
            return "";
        }
    };

    /**
     * @name GetContent
     * @summary Contains Sidebar JSX
     * @returns {any} JSX
     */
    const GetContent = () => {


        return (
            props.Sidebar ?
                <div className={"sidebar right-sidebar"} style={{ display: props.Sidebar && props.Sidebar.SidebarProps && props.Sidebar.SidebarProps.Status === 1 ? "block" : "none" }}>
                    <div className="sidebar-header">
                        <div className="sb-header-left">
                            <h2>
                                {
                                    props.Sidebar.SidebarProps && props.Sidebar.SidebarProps.Header ? props.Sidebar.SidebarProps.Header : ""
                                }
                            </h2>
                            <h3>
                                {
                                    props.Sidebar.SidebarProps && props.Sidebar.SidebarProps.Title ? props.Sidebar.SidebarProps.Title : ""
                                }
                            </h3>
                        </div>
                        <div className="sb-close" onClick={() => HideSidebar(props.Sidebar.PassedEvents ? props.Sidebar.PassedEvents.CloseSidebar : undefined)}>
                            <img src={props.JConfiguration.IntranetSkinPath + "/Images/editor/Icon_Close.svg"} alt />
                        </div>
                    </div>
                    {
                        RenderSidebarComponent()
                    }
                    <div />
                </div> : ""
        );
    };

    return GetContent();
};

export default connect(mapStateToProps)(Sidebar);

