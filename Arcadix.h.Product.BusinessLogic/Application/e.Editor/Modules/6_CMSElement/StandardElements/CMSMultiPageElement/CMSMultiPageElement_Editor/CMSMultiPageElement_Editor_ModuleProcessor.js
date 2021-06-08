//React related imports
import React from 'react';

//Module realted fies.
import CMSMultiPageElement_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_Editor/CMSMultiPageElement_Editor_ContextMenu";

//Module realted fies.
import * as CMSMultiPageElement_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_Editor/CMSMultiPageElement_Editor_MetaData";
import * as CMSText_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor_MetaData";

/**
 * @name CMSMultiPageElement_Common_ModuleProcessor
 * @summary Contains the multipageelement's editor version module specific methods.
 * */
class CMSMultiPageElement_Editor_ModuleProcessor extends CMSMultiPageElement_Editor_ContextMenu {

    /**
     * @name DeleteSlideShow
     * @param {*} objContext {state, props, dispatch}
     * @summary Deletes the Multi Page Element.
     */
    DeleteSlideShow(objContext) {
        let objTextResource = {
            "DELETE_ConfirmText": objContext.objTextResource["Delete_SlideShow_Message"],
            "DELETE_ConfirmButtonText": objContext.objTextResource["Yes"],
            "DELETE_CloseButtonText": objContext.objTextResource["No"],
            "DELETE_Title": objContext.objTextResource["Title"],
            "DELETE_SubTitle": objContext.objTextResource["Subtitle"]
        };
        editorPopup.ShowConfirmationPopup({
            "Resource": {
                "Text": objTextResource,
                "TextResourcesKey": "DELETE",
                "Variables": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Meta": {
                "ShowHeader": true,
                "ShowCloseIcon": true,
                "Height": 'auto',
                "Width": '390px'
            },
            "Data": {},
            "Events": {
                "ConfirmEvent": (objModal) => {
                    editorPopup.ClosePopup(objModal);
                    objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]);
                }
            },
            "CallBacks": {}
        });
    }

    /**
     * @name DeleteElement
     * @param {object} objContext {state, props, dispatch}
     * @param {boolean} blnShowPopup
     * @summary Deletes a silde from slide show.
     */
    DeleteElement(objContext, blnShowPopup = true) {
        if (blnShowPopup) {
            let objTextResource = {
                "DELETE_ConfirmText": 'Are you sure you want to delete the interaction type "' + objContext.state.objCurrentSlideElementJson["vElementTypeName"] + '"?',
                "DELETE_ConfirmButtonText": "Yes",
                "DELETE_CloseButtonText": "No",
                "DELETE_Title": "Delete Element",
                "DELETE_SubTitle": "Delete Element"
            };
            editorPopup.ShowConfirmationPopup({
                "Resource": {
                    "Text": objTextResource,
                    "TextResourcesKey": "DELETE",
                    "Variables": {},
                    "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
                },
                "Meta": {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                    "Height": 'auto',
                    "Width": '390px'
                },
                "Data": {},
                "Events": {
                    "ConfirmEvent": (strPopupId) => {
                        objContext.CMSMultiPageElement_Editor_ModuleProcessor.DeleteSlideElement(objContext);
                        editorPopup.ClosePopup(strPopupId);
                    }
                },
                "CallBacks": {}
            });
        }
        else {
            objContext.CMSMultiPageElement_Editor_ModuleProcessor.DeleteSlideElement(objContext);
        }
    }

    /**
     * @name DeleteSlideElement
     * @param {object} objContext {state, props, dispatch}
     */
    DeleteSlideElement(objContext) {
        let arrSubElements = objContext.state.ElementJson["vElementJson"].Values;
        arrSubElements[objContext.state.intCurrentSlideIndex] = CMSMultiPageElement_Editor_MetaData.GetDummySlideObject();
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.AddOrDeleteSlide(objContext, objContext.state.intCurrentSlideIndex, {
            "ElementJson": {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: arrSubElements
                }
            }
        });
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name ShowHeader
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objElementJson element JSON
     */
    ShowHeader(objContext, objElementJson) {
        let arrUpdatedValues = objContext.state.ElementJson["vElementJson"].Values.map((objEle) => { if (objEle["iElementId"] === objElementJson["iElementId"]) { return objElementJson; } else { return ele; } });
        objContext.dispatch({
            "type": "SET_STATE",
            "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: arrUpdatedValues
                    }
                }
            }
        });
    }

    /**
     * @name AddElement
     * @param {object} objContext {props, state, dispatch}
     * @summary Add's text element to the slide 
     */
    AddElement(objContext) {
        let objElementJson = null;
        let objValueJson = null;
        if (objContext.strElementType.toLowerCase() === "text") {
            objElementJson = CMSText_Editor_MetaData.GetDefaultElementJson(1, objContext.state.objCurrentSlideElementJson.iElementId);
            objElementJson = {
                ...objElementJson,
                ["vElementJson"]: {
                    ...objElementJson["vElementJson"],
                    ["vText"]: "Default_Text"
                },
                ["Ref"]: React.createRef()
            };
            objValueJson = {
                ...CMSMultiPageElement_Editor_MetaData.GetTextElementObject(objContext.state.objCurrentSlideElementJson.iElementId), ["Ref"]: React.createRef()
            };
        }
        let arrSubElements = [
            ...objContext.state.ElementJson["vElementJson"].Values.slice(0, objContext.state.intCurrentSlideIndex),
            objValueJson,
            ...objContext.state.ElementJson["vElementJson"].Values.slice(objContext.state.intCurrentSlideIndex + 1, objContext.state.intSlideLength)
        ];
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: [...arrSubElements],
                        ["TextElements"]: [
                            ...objContext.state.ElementJson["vElementJson"].TextElements,
                            objElementJson
                        ]
                    }
                },
                "objCurrentSlideElementJson": objElementJson
            }
        });
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name DeleteCurrentSlide
     * @param {object} objContext {props, state, dispatch}
     * @summary Deletes the selected slide and updates element json 
     */
    DeleteCurrentSlide(objContext) {
        let intCurrentIndex;
        let arrSubElements = objContext.state.ElementJson["vElementJson"].Values;
        arrSubElements = arrSubElements.filter((elm, i) => { if (i !== parseInt(objContext.state.intCurrentSlideIndex)) return elm; });
        if (objContext.state.intCurrentSlideIndex > 0 && objContext.state.intCurrentSlideIndex < objContext.state.intSlideLength) {
            intCurrentIndex = objContext.state.intCurrentSlideIndex - 1;
        }
        else {
            intCurrentIndex = 0;
        }
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.AddOrDeleteSlide(objContext, intCurrentIndex, {
            "ElementJson": {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: arrSubElements
                }
            },
            "intSlideLength": objContext.state.intSlideLength - 1
        });
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name AddSlideBeforeOrAfterwards
     * @param {object} objContext {props, state, dispatch}
     * @summary Adds new slide before or afterwards
     */
    AddSlideBeforeOrAfterwards(objContext) {
        let intStartIndex = parseInt(objContext.state.intCurrentSlideIndex);
        if (objContext.slideIndex === 1) {
            intStartIndex = intStartIndex + 1;
        }
        let objDummyElm = CMSMultiPageElement_Editor_MetaData.GetDummySlideObject();
        let arrSubElements = [
            ...objContext.state.ElementJson["vElementJson"].Values.slice(0, intStartIndex),
            objDummyElm,
            ...objContext.state.ElementJson["vElementJson"].Values.slice(intStartIndex, objContext.state.intSlideLength)
        ];
        let intCurrentIndex = arrSubElements.indexOf(objDummyElm);
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.AddOrDeleteSlide(objContext, intCurrentIndex, {
            "ElementJson": {
                ...objContext.state.ElementJson,
                ["vElementJson"]: {
                    ...objContext.state.ElementJson["vElementJson"],
                    ["Values"]: arrSubElements
                }
            },
            "intSlideLength": objContext.state.intSlideLength + 1
        });
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }


    /**
     * @name AddOrDeleteSlide
     * @param {object} objContext {props, state, dispatch}
     * @param {int} intSelectedIndex current slide index
     * @param {object} unSavedState unsaved state params 
     * @summary Adds/Deletes the selected slide and also gets the updated element json of child
     */
    AddOrDeleteSlide(objContext, intSelectedIndex, unSavedState = {}) {
        let objElementJson, iElementsCount, arrSubElements, objStateParams = {};
        if (unSavedState.ElementJson && unSavedState.ElementJson["vElementJson"].Values) {
            iElementsCount = unSavedState.ElementJson["vElementJson"].Values.length;
            arrSubElements = [...unSavedState.ElementJson["vElementJson"].Values];
        }
        else {
            iElementsCount = objContext.state.ElementJson["vElementJson"].Values.length;
            arrSubElements = [...objContext.state.ElementJson["vElementJson"].Values];
        }
        let intIndex = parseInt(intSelectedIndex);
        intSelectedIndex = intIndex > iElementsCount - 1 || intIndex === 0 ? 0 : intIndex < 0 ? iElementsCount - 1 : intIndex;
        objElementJson = arrSubElements[intSelectedIndex];
        if (objElementJson) {
            if (objElementJson.vElementTypeName.toLowerCase() !== "empty") {
                if (objElementJson.vElementTypeName.toLowerCase() === "text") {
                    objElementJson = objContext.state.ElementJson["vElementJson"].TextElements.filter(ele => ele.iElementId === objElementJson.iElementTextId)[0];
                }
                else {
                    objElementJson = objContext.state.ElementJson["vElementJson"].Values.filter(ele => ele.iElementId === objElementJson.iElementId)[0];
                }
            }

            objStateParams = {
                ...objStateParams,
                ...unSavedState,
                "intCurrentSlideIndex": intSelectedIndex,
                "objCurrentSlideElementJson": objElementJson
            };
            objContext.dispatch({ "type": "SET_STATE", "payload": objStateParams });
        }
        else {
            //objElementJson = CMSMultiPageElement_Editor_MetaData.GetDummySlideObject()
            //objContext.dispatch({
            //    "type": "SET_STATE", "payload": {
            //        "ElementJson": {
            //            ...objContext.state.ElementJson,
            //            ["vElementJson"]: {
            //                ...objContext.state.ElementJson["vElementJson"],
            //                "Values": [objElementJson]
            //            }
            //        },
            //        "intCurrentSlideIndex": 0,
            //        "objCurrentSlideElementJson": objElementJson
            //    }
            //});
            objContext.props.ParentRef.current.DeleteElement(objContext.props.ElementJson["iElementId"]);
        }
    }

    /**
     * @name HandleSlideNavigation
     * @param {object} objContext {props, state, dispatch}
     * @param {int} strNavigateTo Previous/Next
     * @summary handles slide navigation
     */
    HandleSlideNavigation(objContext, strNavigateTo) {
        let intSlideValue = 1;
        if (strNavigateTo === "Previous") {
            intSlideValue = -1;
        }
        if (objContext.state.intSlideLength > 1) {
            objContext.CMSMultiPageElement_Editor_ModuleProcessor.AddOrDeleteSlide(objContext, intSlideValue + objContext.state.intCurrentSlideIndex);
        }
    }

    /**
     * @name UpdateElementJson
     * @param {object} objContext {props, state, dispatch}
     * @param {object} objElementJson element json
     * @summary gets the selected elemnt json 
     */
    UpdateElementJson(objContext, objElementJson) {
        let arrSubElements = [...objContext.state.ElementJson["vElementJson"].Values.slice(0, objContext.state.intCurrentSlideIndex), { ...objElementJson, ["Ref"]: React.createRef() }, ...objContext.state.ElementJson["vElementJson"].Values.slice(objContext.state.intCurrentSlideIndex + 1, objContext.state.intSlideLength)];
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson["vElementJson"],
                        ["Values"]: [...arrSubElements]
                    }
                },
                "objCurrentSlideElementJson": objElementJson
            }
        });
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name OpenAddPopup
     * @param {object} objContext {props, state, dispatch}
     * @summary opens image/Video add edit popup
     */
    OpenAddPopup(objContext) {
        editorPopup.ShowPopup({
            "Data": {
                "ElementJson": { ...objContext.state.ElementJson },
                "MediaType": objContext.strElementType,
                "ComponentController": objContext.props.ComponentController
            },
            "Meta": {
                "PopupName": "MultiMediaPopup",
                "Height": '602px',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                "GetElementJson": (objElementJson) => {
                    objContext.CMSMultiPageElement_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
                }
            }
        });
    }

    /**
     * @name OpenSlideShowSidebar
     * @param {object} objContext {state, props, dispatch}
     * @summary Opens up the side bar.
     */
    OpenSlideShowSidebar(objContext) {
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.CloseSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            ...objContext.props,
            "ElementJson": objContext.state.ElementJson,
            "PassedEvents": {
                SetContainerProperties: (objParams) => { objContext.CMSMultiPageElement_Editor_ModuleProcessor.SetContainerProperties(objContext, objParams); }
            },
            "SidebarProps": {
                "SidebarName": "MultiPageFeatures",
                "Header": objContext.objTextResource["Title"],
                "Title": objContext.objTextResource["SlideShow_Properties"],
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name CloseSidebar
     * @summary Closes the side bar.
     */
    CloseSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }

    /**
     * @name SetContainerProperties
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objContainerElementProperties width and height
     */
    SetContainerProperties(objContext, objContainerElementProperties) {
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    "vContainerElementProperties": { ...objContainerElementProperties }
                }
            }
        });
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.CloseSidebar();
        objContext.CMSMultiPageElement_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    GetSliderContainerProperties(objContext) {
        var iWidth = 0; var iHeight = 0;
        var slider = objContext.slideWrapper.current.cloneNode(true);
        slider.style.visibility = "visible";
        slider.style.backgroundColor = "transparent";
        slider.style.position = "absolute";
        slider.style.left = 0;
        slider.style.top = 0;
        slider.style.zIndex = -99999;
        slider.style.border = "2px solid red";
        objContext.slideContainer.current.appendChild(slider);
        var slides = slider.querySelectorAll(`[type='Multipage-slide-${objContext.state.ElementJson.iElementId}']`);
        for (var intCount = 0; intCount < slides.length; intCount++) {
            var slide = slides[intCount];
            slide.style.display = "block";
            if (slide.offsetWidth > iWidth) {
                iWidth = slide.offsetWidth;
                iHeight = slide.offsetHeight;
            }
            slide.style.display = "none";
        }
        slider.remove();
        if (objContext.slideContainer.current && objContext.slideContainer.current.offsetHeight > iHeight) {
            iHeight = objContext.slideContainer.current.offsetHeight;
        }
        return {
            "vContainerElementProperties": {
                "vElementVerticalAlignment": null,
                "vElementHorizontalAlignment": null,
                "iElementWidth": iWidth,
                "iElementHeight": iHeight
            }
        };
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSMultiPageElement/CMSMultiPageElement.css"];
    }
}

export default CMSMultiPageElement_Editor_ModuleProcessor;
