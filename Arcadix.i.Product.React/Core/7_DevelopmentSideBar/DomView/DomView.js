//React related imports
import React, { useState, useEffect } from 'react';
import Inspector from 'react-inspector';

//Application related imports
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * 
 * @param {*} props 
 * DomView is the Component to show the Html dom view of the full page or the main module based on the choice of user.
 * We take the node object using the id "divRoot" when we show the full view or the id "ModuleController" when we show the view for the main module
 * Inspector just takes this node object and dispaly the view in the DOM tree format.
 */
const DomView = props => {

    const [blnShowFullReduxContent, setShowFullReduxContent] = useState(true);//To decide either to show Full content or the module content
    window.strBackgroundColor = "";
    window.cIsAllNodeEventAdded = false;

    useEffect(() => {
        let objDomInspector = document.getElementById("DomInspector")
        if (objDomInspector) {
            addEventListenerToNodes(objDomInspector,);
        }
    }, [])

    /**
     * @name addEventListenerToNodes
     * @param {any} objNode
     * @param {any} intNodeIndex
     * @summary add event to the Elements
     */
    const addEventListenerToNodes = (objNode, intNodeIndex = 0) => {
        {
            let objList = objNode.querySelectorAll("li[role=treeitem]");
            if (objList && objList.length > 1) {
                ApplicationState.SetProperty("blnShowAnimation", true);
                Array.from(objList).map(objSubNode => {
                    let objSpanList = objSubNode.querySelectorAll("div")[0].querySelectorAll("span");
                    let blnAddTag = true;
                    if (objSpanList[1].innerText.indexOf("</") == 0 || objSpanList[1].innerText.indexOf("<")!=0)
                        blnAddTag = false;
                    if (blnAddTag) {
                        var objActualSpan = objSpanList[1];
                        objActualSpan.setAttribute("intIndex", intNodeIndex);
                        objActualSpan.addEventListener("mouseenter", (e) => { onMouseHover("MouseEnter", e) }, false)
                        objActualSpan.addEventListener("mouseleave", (e) => { onMouseHover("MouseLeave", e) }, false)

                        intNodeIndex += 1;
                    }
                });
                ApplicationState.SetProperty("blnShowAnimation", false);
            }
            else {
                window.setTimeout(() => { addEventListenerToNodes(objNode) }, 500);
            }
        }
    }

    const onMouseHover = (strType, e) => {
        let domElement = document.getElementById(blnShowFullReduxContent ? "MasterContainerParent" : "ModuleContainerParent");
        if (JConfiguration.ApplicationTypeName == "TestApplication") {
            domElement = document ? document.getElementById(blnShowFullReduxContent ? "TestApplicationMasterWrapper" : "TaskContent") : false;
        }
        domElement = domElement.querySelectorAll("*");
        var intNodeIndex = e.target.getAttribute("intIndex");
        let domInspectorOverlay = document.getElementById("InspectorOverlay");
        if (strType == "MouseEnter" && domInspectorOverlay) {
            //domElement[intNodeIndex].style.position = 'fixed';
            var objPosition = domElement[intNodeIndex].getBoundingClientRect();            
            domInspectorOverlay.style.position = 'fixed';
            domInspectorOverlay.style.left = objPosition.x + "px";
            domInspectorOverlay.style.top = objPosition.y + "px";
            domInspectorOverlay.style.width = objPosition.width + "px";
            domInspectorOverlay.style.height = objPosition.height + "px";
            domInspectorOverlay.style.backgroundColor = "rgb(22 180 255 / 37%)";
            domInspectorOverlay.style.zIndex = "999999";

        }
        if (strType == "MouseLeave" && domInspectorOverlay) {
            //domElement[intNodeIndex].style.outline = "";
            domInspectorOverlay.style.position = 'fixed';
            domInspectorOverlay.style.left = "";
            domInspectorOverlay.style.top = "";
            domInspectorOverlay.style.width = "";
            domInspectorOverlay.style.height = "";
            domInspectorOverlay.style.backgroundColor = "";
            domInspectorOverlay.style.zIndex = "";
        }
    }


    /**
     * returns the main jsx content
     */
    const GetContent = () => {
        let domInspectorDiv = document ? document.getElementById(blnShowFullReduxContent ? "MasterContainer" : "ModuleContainer") : false;

        if (JConfiguration.ApplicationTypeName == "TestApplication") {
            domInspectorDiv = document ? document.getElementById(blnShowFullReduxContent ? "TestApplicationMasterWrapper" : "TaskContent") : {};
        }

        return <React.Fragment>
            <div className="plog-radio-flex">
                <div className="plog-radio-item">
                    <span>FullContent</span>
                    <label className="plog-radio">
                        <input type="radio" checked={blnShowFullReduxContent} onChange={() => setShowFullReduxContent(true)} />
                        <span className="checkmark" />
                    </label>
                </div>
                <div className="plog-radio-item">
                    <span>ModuleContent</span>
                    <label className="plog-radio">
                        <input type="radio" checked={!blnShowFullReduxContent} onChange={() => setShowFullReduxContent(false)} />
                        <span className="checkmark" />
                    </label>
                </div>
            </div>
            {domInspectorDiv ? <div id="DomInspector">
                <Inspector data={domInspectorDiv} expandLevel={1000} />
            </div> : <React.Fragment />}
        </React.Fragment>
    }

    return <React.Fragment>{GetContent()}</React.Fragment>
};

export default DomView;