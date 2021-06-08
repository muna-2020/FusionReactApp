// React related import
import React, { useReducer, useEffect, useRef } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.          
import Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Common/CMSColorFillWrapper_Common';
import * as CMSColorFillWrapper_TestApplication_Hook from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_TestApplication/CMSColorFillWrapper_TestApplication_Hook';
import CMSColorFillWrapper_TestApplication_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_TestApplication/CMSColorFillWrapper_TestApplication_ModuleProcessor";
import CMSColorFillWrapper_Common_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Common/CMSColorFillWrapper_Common_ModuleProcessor";

//CMSText TestApplication version
import CMSText_TestApplication from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication';

/**
 * @name CMSColorFillWrapper_TestApplication
 * @param {object} props props from parent
 * @param {ref} ref ref to component
 * @summary CMSColorFillWrapper's TestApplication version.
 * @returns {component} component
 */
const CMSColorFillWrapper_TestApplication = (props) => {

    /**
    * @summary Define state and dispatch for the reducer to set state and also, holds ref's.
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, CMSColorFillWrapper_TestApplication_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    */
    let objContext = {
        props,
        state,
        dispatch,
        SVGRef: useRef(null),
        strSelectedColor: useRef(null),
        arrTransparentShapeIds: useRef([]),
        arrUserAnswers: useRef([]),
        ColorFillRef: useRef(null),
        ColorFillSolutionRef: useRef(null),
        "ModuleName": "CMSColorFillWrapper_TestApplication_" + props.ElementJson.iElementId,
        ["CMSColorFillWrapper_Common_ModuleProcessor"]: new CMSColorFillWrapper_Common_ModuleProcessor(),
        ["CMSColorFillWrapper_TestApplication_ModuleProcessor"]: new CMSColorFillWrapper_TestApplication_ModuleProcessor()
    };

    /**
     * @name CMSColorFillWrapper_TestApplication_Hook.Initialize
     * @summary Initialize method call in CMSColorFillWrapper_TestApplication_Hook, that contains all the custom hooks.
     */
    CMSColorFillWrapper_TestApplication_Hook.Initialize(objContext);

    /** @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.CMSColorFillWrapper_Common_ModuleProcessor.Initialize(objContext, objContext.CMSColorFillWrapper_Common_ModuleProcessor);

    /**
     *@name useEffect
     * @summary add's click event
     */
    useEffect(() => {
        GenerateSVGFromColorFillJson(objContext, false);
        var svgWrapper = objContext.ColorFillRef.current;
        svgWrapper.addEventListener("click", HandleOnClick);
        return () => {
            svgWrapper.removeEventListener("click", HandleOnClick);
        };
    }, []);

    /**
     * @name HandleOnClick
     * @param {object} event
     */
    const HandleOnClick = (event) => {
        if (event.target.getAttribute("IsColorFill") === "Y" && objContext.strSelectedColor.current) {
            event.target.setAttribute("fill", objContext.strSelectedColor.current);
            objContext.arrUserAnswers.current = [
                ...objContext.arrUserAnswers.current.filter(e => e.vClientElementId !== event.target.id.replace("test_", "")),
                {
                    "vColorCode": objContext.strSelectedColor.current,
                    "vClientElementId": event.target.id.replace("test_", "")
                }
            ]
        }
    };

    /**
     * @name useEffect
     * @summary executed when user clicks load solution 
     */
    useEffect(() => {
        if (objContext.state.ViewSolution || (objContext.state.ViewComparison && objContext.state.ElementStatus !== 1)) {
            GenerateSVGFromColorFillJson(objContext, true);
        }
    }, [
        objContext.state.ViewSolution,
        objContext.state.ViewComparison,
        objContext.state.ElementStatus
    ]);

    /**
     * @name GenerateSVGFromColorFillJson
     * @param {any} objContext {state, props, dispatch}
     */
    const GenerateSVGFromColorFillJson = (objContext, blnLoadSolution = true) => {
        var vColorFillJson = JSON.parse(objContext.props.ElementJson.vElementJson.vColorFillJson.replace(/{apos}/gi, '"').replace(/{fslash}/, '/').replace(/'/gi, '"'));
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        for (var intCount = 0; intCount < vColorFillJson.length; intCount++) {
            if (vColorFillJson[intCount].type === "paper") {
                Object.keys(vColorFillJson[intCount]).map((key) => {
                    svg.setAttribute([key], vColorFillJson[intCount][key]);
                });
                continue;
            }
            var element = document.createElementNS("http://www.w3.org/2000/svg", vColorFillJson[intCount].type);
            var objStyleProperties = {};
            var styleAttributes = vColorFillJson[intCount]["data-style-attributes"];
            console.log(styleAttributes)
            if (styleAttributes && styleAttributes.length > 0) {
                var arrStyleAttributes = styleAttributes.split(";");
                for (var i = 0; i < arrStyleAttributes.length; i++) {
                    var arrStyle = arrStyleAttributes[i].split(":");
                    objStyleProperties = { ...objStyleProperties, [arrStyle[0]]: true };
                }
            }
            Object.keys(vColorFillJson[intCount]).map((key) => {
                if (key === "path") {
                    element.setAttribute("d", vColorFillJson[intCount][key]);
                }
                else if (key === "transform") {
                    element.setAttribute([key], `matrix(${vColorFillJson[intCount][key]})`);
                }
                else {
                    element.setAttribute([key], vColorFillJson[intCount][key]);
                }

                if (key === "id") {
                    element.setAttribute([key], `test_${vColorFillJson[intCount][key]}`);
                }
            });

            element.classList.add("cursor-style")
            if (vColorFillJson[intCount].IsColorFill === "Y") {
                if (!blnLoadSolution) {
                    objContext.arrTransparentShapeIds.current = [...objContext.arrTransparentShapeIds.current, `test_${vColorFillJson[intCount].id}`]
                }
                else {
                    var strColor = objContext.state.ElementJson.vElementJson.Values.find(v => v.vClientElementId === vColorFillJson[intCount]["id"]);
                    if (strColor) {
                        element.style.fill = strColor["vColorCode"];
                    }
                }
            }
            svg.appendChild(element);
        }

        var svgWrapper
        if (!blnLoadSolution) {
            svgWrapper = objContext.ColorFillRef.current;
            svgWrapper.appendChild(svg);
        }
        else {
            svgWrapper = objContext.ColorFillSolutionRef.current;
            svgWrapper.innerHTML = "";
            svgWrapper.appendChild(svg);
        }
    }

    /**
     * @name ChangeTextSelectionColor
     * @param {string} color
     */
    const ChangeTextSelectionColor = (color) => {
        objContext.dispatch({ "type": "SET_STATE", "payload": { "strSelectedColor": color } });
        objContext.strSelectedColor.current = color;
    }

    /**
     * @name GetSVGElement
     * @summary Creates SVG element for SSR
     * */
    const GetSVGElement = () => {
        if (jsdom) {
            const { JSDOM } = jsdom;
            const { document } = (new JSDOM('')).window;
            var vColorFillJson = JSON.parse(props.ElementJson.vElementJson.vColorFillJson.replace(/{apos}/gi, '"').replace(/{fslash}/, '/').replace(/'/gi, '"'));
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            for (var intCount = 0; intCount < vColorFillJson.length; intCount++) {
                if (vColorFillJson[intCount].type === "paper") {
                    Object.keys(vColorFillJson[intCount]).map((key) => {
                        svg.setAttribute([key], vColorFillJson[intCount][key]);
                    });
                    continue;
                }
                var element = document.createElementNS("http://www.w3.org/2000/svg", vColorFillJson[intCount].type);
                var objStyleProperties = {};
                var styleAttributes = vColorFillJson[intCount]["data-style-attributes"];
                console.log(styleAttributes)
                if (styleAttributes && styleAttributes.length > 0) {
                    var arrStyleAttributes = styleAttributes.split(";");
                    for (var i = 0; i < arrStyleAttributes.length; i++) {
                        var arrStyle = arrStyleAttributes[i].split(":");
                        objStyleProperties = { ...objStyleProperties, [arrStyle[0]]: true };
                    }
                }
                Object.keys(vColorFillJson[intCount]).map((key) => {
                    if (key === "path") {
                        element.setAttribute("d", vColorFillJson[intCount][key]);
                    }
                    else if (key === "transform") {
                        element.setAttribute([key], `matrix(${vColorFillJson[intCount][key]})`);
                    }
                    else {
                        element.setAttribute([key], vColorFillJson[intCount][key]);
                    }
                    if (key === "id") {
                        element.setAttribute([key], `test_${vColorFillJson[intCount][key]}`);
                    }
                });
                svg.appendChild(element);
            }
            return svg.outerHTML;
        }
    }

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        let objTextElementProps = {};
        if (objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = objContext.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = objContext.CMSColorFillWrapper_Common_ModuleProcessor.GetTextElementProps(objContext, objElementHeader["iElementTextId"]);
        }
        var border = "none";
        if (objContext.state.ViewSolution) {
            border = "2px solid red";
        }
        if (objContext.state.ViewComparison) {
            border = objContext.state.ElementStatus === 1 ? "2px solid green" : "2px solid red";
        }
        return (
            <React.Fragment>
                <div id={`cms-color-fill-wrapper-${objContext.state.ElementJson["iElementId"]}`}
                    ielementid={objContext.state.ElementJson["iElementId"]}
                    ielementtypeid={objContext.state.ElementJson["iElementTypeId"]}
                    style={{ "border": border, "padding": "4px" }}>
                    {
                        (objContext.state.ViewSolution || (objContext.state.ViewComparison && objContext.state.ElementStatus !== 1)) &&
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashWrong.gif"} />
                    }
                    {
                        objContext.state.ViewComparison && objContext.state.ElementStatus === 1 &&
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashRight.gif"} />
                    }
                    {
                        objContext.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? <CMSText_TestApplication {...objTextElementProps} /> : ""
                    }
                    {
                        objContext.state.ElementJson.vElementJson.vCapturedColors &&
                        <div id={`color-fill-platte-${objContext.state.ElementJson.iElementId}`} className="color-fill-color-palette-wrapper">
                            {
                                objContext.state.ElementJson.vElementJson.vCapturedColors.map((color, i) => {
                                    return (
                                        <div key={`outer-circle-${objContext.state.ElementJson["iElementId"]}-${i}`}
                                            className="color-fill-outer-circle" style={{ "backgroundColor": color, "border": objContext.state.strSelectedColor === color ? "4px solid #000" : "none" }} onClick={() => { ChangeTextSelectionColor(color); }}>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                    <div>
                        {
                            !objContext.props.IsForServerRenderHtml &&
                            <div ref={objContext.ColorFillRef} id={`alphasvg_testapplication_${objContext.state.ElementJson.iElementId}`}></div>
                        }
                        {
                            objContext.props.IsForServerRenderHtml &&
                            <div ref={objContext.ColorFillRef} id={`alphasvg_testapplication_${objContext.state.ElementJson.iElementId}`} dangerouslySetInnerHTML={{ __html: GetSVGElement() }}></div>
                        }
                    </div>
                </div>
                {
                    (objContext.state.ViewSolution || (objContext.state.ViewComparison && objContext.state.ElementStatus !== 1)) &&
                    <div style={{ "border": "2px solid green", "padding": "4px", "marginTop": "4px" }}>
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashRight.gif"} />
                        <div ref={objContext.ColorFillSolutionRef} id={`alphasvg_load_solution_${objContext.state.ElementJson.iElementId}`}></div>
                    </div>
                }
            </React.Fragment>
        );
    };

    /**
    * @summary Calls the GetContent method.
    * */
    return GetContent();
};

export default CMSColorFillWrapper_TestApplication;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CMSColorFillWrapper_Common_ModuleProcessor; 