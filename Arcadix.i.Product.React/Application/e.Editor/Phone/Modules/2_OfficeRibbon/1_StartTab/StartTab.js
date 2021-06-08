// React specific imports
import React, { useEffect, useImperativeHandle, useReducer } from "react";

//react-redux related imports.
import { connect } from 'react-redux';

//Base classes/hooks.
import * as StartTab_Hook from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/1_StartTab/StartTab_Hook";

//Module related fies.
import StartTab_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/1_StartTab/StartTab_ModuleProcessor";
import * as StartTab_MetaData from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/1_StartTab/StartTab_MetaData";

//Base classes/methods.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Text Action import.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

//Selection related imports.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

//Store related imports.
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

/**
 * @name StartTab
 * @param {object} props props from parent.
 * @summary this component has Text manipulation operation of editor Office Ribbon.
 * @returns {any} StartTab Component.
 */
const StartTab = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, StartTab_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { state, dispatch, props, ["StartTab_ModuleProcessor"]: new StartTab_ModuleProcessor() };

    /**
     * @param {object} objContext  { state, dispatch, props, ["StartTab_ModuleProcessor"] }.
     * @param {HTML_Event} objEvent Client event.
     * @summary changes font-family of selected.
     */
    const ChangeFont = (objContext, objEvent) => {
        const strFontFamily = objEvent.target.innerText;
        objContext.StartTab_ModuleProcessor.ChangeFont(objContext, strFontFamily);
    };

    /**
     * @name useEffect
     * @summary this add events to the document to close any opened office ribbon menu(s) on click.
     * */
    useEffect(() => {
        let objStartDropDown = {
            blnShowFonts: false,
            blnShowFontSizes: false,
            blnShowFontColorPalate: false,
            blnShowBckgColorPalate: false,
            blnShowLineHeight: false
        };
        const CloseDropDown = () => {
            objContext.StartTab_ModuleProcessor.SetState(objStartDropDown, objContext);
        };
        document.addEventListener('click', CloseDropDown, true);
        return () => {
            document.removeEventListener('click', CloseDropDown, true);
        };
    }, [objContext.state]);

    /**
     * @name useImperativeMethods
     * @param {object} objContext {state, props, dispatch, StartTabRef}.
     * @summary Imperative methods.
     */
    useImperativeHandle(objContext.props.StartTabRef, () => ({
     "Text_EditorClick" : () => {
        let objSelection = Selection.GetWindowSelection();
      if(objSelection && objSelection.SourceElement && objSelection.SourceElement !== null){
        let objNode =  objSelection.SourceElement;
        let strActiveStyleClass = "", strFontFamily = objContext.state.strActiveFont,  intFontSize = objContext.state.intActiveFontSize;
            if(objNode.closest(".PageOutputContentLargeText") !== null){
                strActiveStyleClass = "PageOutputContentLargeText";
            }else if(objNode.closest(".PageOutputContentTitle") !== null){
                strActiveStyleClass = "PageOutputContentTitle";
            }else {
                strActiveStyleClass =  "PageOutputContentText";
            }
          if(objNode !== null && window.getComputedStyle(objNode, null).fontFamily !== null && window.getComputedStyle(objNode, null).fontFamily !== ""){
              strFontFamily = window.getComputedStyle(objNode, null).fontFamily;            
          }
          if(objNode != null && window.getComputedStyle(objNode, null).fontSize !== null && window.getComputedStyle(objNode, null).fontSize !== ""){
            intFontSize = window.getComputedStyle(objNode, null).fontSize.split("px")[0];     
                objContext.dispatch({
                    type : "SET_STATE",
                    payload : {
                        "strActiveStyleClass" : strActiveStyleClass,
                        "intActiveFontSize" : intFontSize,
                        "strActiveFont" : strFontFamily
                    }
                });
          } 
        }
     }
    }),[objContext.props, objContext.state]);

   /**
    * @name useEffect
    * @summary adds reference attached to useImperative method, provides method for adding a new tab for selected elements.
    */
    useEffect(() => {
    EditorState.SetReference("StartTabRef", objContext.props.StartTabRef);
    }, []);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {JSX} JSX of the Component.
     */
    const GetContent = () => {
        let objImageMeta = StartTab_MetaData.GetImageMeta();
        return (
            <div className="office-ribbon start-tab editor-office-ribbon" id="EditorOfficeRibbon">
                <div className="ribbon-slider" id="EditorSliderDiv">
                    {/* ===============clipboard=====start*/}
                    <div className="clipboard">
                        <div className="flex-start">
                            <div className="paste-block" onClick={objEvt => TextActions.Clipboard.ShowClipboardPopup(objContext)}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.PasteImage,
                                        ToolTipText: "Insert"
                                    }}
                                    ParentProps={props}
                                />
                                <span>Insert</span>
                            </div>
                            <div className="right-block">
                                <div className="flex-start" onClick={objEvt => TextActions.Clipboard.Cut()}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.CutImage,
                                            ToolTipText: "Cut"
                                        }}
                                        ParentProps={props}
                                    />
                                    <span>Cut</span>
                                </div>
                                <div className="flex-start" onClick={objEvt => TextActions.Clipboard.Copy()}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.CopyImage,
                                            ToolTipText: "Copy"
                                        }}
                                        ParentProps={props}
                                    />
                                    <span>Copy</span>
                                </div>
                                <div className="flex-start" onClick={objEvt => TextActions.Clipboard.Paste()}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.PasteFromWordImage,
                                            ToolTipText: "Paste"
                                        }}
                                        ParentProps={props}
                                    />
                                    <span>Paste</span>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-text">Clipboard</div>
                    </div>
                    {/**============font============start */}
                    <div className="font">
                        <div className="font-block">
                            <div className="font-family">
                                <span onClick={objEvt => objContext.StartTab_ModuleProcessor.SetState({ "blnShowFonts": state.blnShowFonts ? false : true }, objContext)}>
                                    {state.strActiveFont}
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.FontStyleDownImage,
                                        }}
                                        ParentProps={props}
                                    />
                                </span>
                                <ul onClick={objEvt => ChangeFont(objContext, objEvt)} style={{ display: state.blnShowFonts ? "block" : "none" }} className="font-family-list" id="font-family-list">
                                    <li style={{ fontFamily: 'Tahoma' }}>Tahoma</li>
                                    <li style={{ fontFamily: 'Verdana' }} >Verdana</li>
                                    <li style={{ fontFamily: 'Arial' }} >Arial</li>
                                    <li style={{ fontFamily: 'Comic Sans MS' }} >Comic Sans MS</li>
                                    <li style={{ fontFamily: 'Courier New' }} >Courier New</li>
                                    <li style={{ fontFamily: 'Georgia' }} >Georgia</li>
                                    <li style={{ fontFamily: 'Times New Roman' }} >Times New Roman</li>
                                    <li style={{ fontFamily: 'Calibri' }} >Calibri</li>
                                    <li style={{ fontFamily: 'Cambria' }} >Cambria</li>
                                    <li style={{ fontFamily: 'Consolas' }} >Consolas</li>
                                    <li style={{ fontFamily: 'Corsiva' }} >Corsiva</li>
                                    <li style={{ fontFamily: 'Impact' }} >Impact</li>
                                    <li style={{ fontFamily: 'Trebuchet MS' }} >Trebuchet MS</li>
                                    <li style={{ fontFamily: 'Karminaitalic' }} >KarminaLF Italic</li>
                                    <li style={{ fontFamily: 'Karminaregular' }} >KarminaLF Regular</li>
                                    <li style={{ fontFamily: 'KarminaSansextrabold' }} >KarminaSansLF Extrabold</li>
                                    <li style={{ fontFamily: 'KarminaSansheavy' }} > KarminaSansLF Heavy</li>
                                    <li style={{ fontFamily: 'Karminaitalic' }} > KarminaSansLF Italic</li>
                                    <li style={{ fontFamily: 'KarminaSans' }} >KarminaSansLF</li>
                                    <li style={{ fontFamily: 'KarminaSansbold' }} >KarminaSansbold</li>
                                    <li style={{ fontFamily: 'KarminaSans' }} >KarminaSans</li>
                                </ul>
                            </div>
                            <div className="font-family">
                                <span onClick={objEvt => objContext.StartTab_ModuleProcessor.SetState({ "blnShowFontSizes": state.blnShowFontSizes ? false : true }, objContext)}>
                                    {state.intActiveFontSize + " "}
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.FontStyleDownImage,
                                        }}
                                        ParentProps={props}
                                    />
                                </span>
                                <ul style={{ display: state.blnShowFontSizes ? "block" : "none" }} className="font-size-list" id="font-size-list">
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 1)}>1</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 2)}>2</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 3)}>3</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 4)}>4</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 5)}>5</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 6)}>6</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 7)}>7</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 8)}>8</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 9)}>9</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 10)}>10</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 11)}>11</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 12)}>12</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 13)}>13</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 14)}>14</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 15)}>15</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 16)}>16</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 17)}>17</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 18)}>18</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 19)}>19</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 20)}>20</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 21)}>21</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 22)}>22</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 23)}>23</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 24)}>24</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 25)}>25</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 26)}>26</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 27)}>27</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 28)}>28</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 29)}>29</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 30)}>30</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 31)}>31</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 32)}>32</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 33)}>33</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 34)}>34</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 35)}>35</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 36)}>36</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 37)}>37</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 38)}>38</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 39)}>39</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 40)}>40</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 41)}>41</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 42)}>42</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 43)}>43</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 44)}>44</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 45)}>45</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 46)}>46</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 47)}>47</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 48)}>48</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 49)}>49</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 50)}>50</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 51)}>51</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 52)}>52</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 53)}>53</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 54)}>54</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 55)}>55</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 56)}>56</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 57)}>57</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 58)}>58</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 59)}>59</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 60)}>60</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 61)}>61</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 62)}>62</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 63)}>63</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 64)}>64</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 65)}>65</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 66)}>66</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 67)}>67</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 68)}>68</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 69)}>69</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 70)}>70</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 71)}>71</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, 72)}>72</li>
                                </ul>
                            </div>
                            <div className="items" onClick={objEvt => { if (state.intActiveFontSize !== 72) { objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, state.intActiveFontSize + 1); } }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.IncreaseFontImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => { if (state.intActiveFontSize !== 1) { objContext.StartTab_ModuleProcessor.ChangeFontSize(objContext, state.intActiveFontSize - 1); } }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.DecreaseFontImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Font.RemoveFormatting()}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.EraseImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                        </div>
                        <div className="font-block">
                            <div className="items" onClick={objEvt => TextActions.Font.WeightAndStyle("fontWeight", "Bold")} >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.FettImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Font.WeightAndStyle("fontStyle", "Italic")} >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.KursivImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Font.TextDecoration("Underline")}  >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.UnderlineImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Font.TextDecoration("StrikeThrough")} >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.StrikethroughImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Font.SuperScriptSubScript("SuperScript")}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.SuperscriptImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Font.SuperScriptSubScript("SubScript")} >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.SubscriptImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items bgColor" onClick={objEvt => console.log('text background')} >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.TextBackgroundImage,
                                    }}
                                    Events={{
                                        OnClickEventHandler: () => { objEvt => objContext.StartTab_ModuleProcessor.SetState({ "blnShowBckgColorPalate": state.blnShowBckgColorPalate ? false : true }, objContext) }
                                    }}
                                    ParentProps={props}
                                />
                                <div style={{ display: state.blnShowBckgColorPalate ? "block" : 'none' }} className="color-palette" id="colorPalette">
                                    <h3 className="palette-header"> Farbpalette </h3>
                                    <div className="color-block">
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#fff")} className="box" style={{ background: "#fff" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#f2f2f2")} className="box" style={{ background: "#f2f2f2" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#d8d8d8")} className="box" style={{ background: "#d8d8d8" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#bfbfbf")} className="box" style={{ background: "#bfbfbf" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#a5a5a5")} className="box" style={{ background: "#a5a5a5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#7f7f7f")} className="box" style={{ background: "#7f7f7f" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "black")} className="box" style={{ background: "black" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#7f7f7f")} className="box" style={{ background: "#7f7f7f" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#595959")} className="box" style={{ background: "#595959" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#3f3f3f")} className="box" style={{ background: "#3f3f3f" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#262626")} className="box" style={{ background: "#262626" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#0c0c0c")} className="box" style={{ background: "#0c0c0c" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#e7e6e6")} className="box" style={{ background: "#e7e6e6" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#d0cece")} className="box" style={{ background: "#d0cece" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#aeabab")} className="box" style={{ background: "#aeabab" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#757070")} className="box" style={{ background: "#757070" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#3a3838")} className="box" style={{ background: "#3a3838" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#171616")} className="box" style={{ background: "#171616" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#44546a")} className="box" style={{ background: "#44546a" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#d6dce4")} className="box" style={{ background: "#d6dce4" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#adb9ca")} className="box" style={{ background: "#adb9ca" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#8496b0")} className="box" style={{ background: "#8496b0" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#323f4f")} className="box" style={{ background: "#323f4f" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#222a35")} className="box" style={{ background: "#222a35" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#4472c4")} className="box" style={{ background: "#4472c4" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#d9e2f3")} className="box" style={{ background: "#d9e2f3" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#b4c6e7")} className="box" style={{ background: "#b4c6e7" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#8eaadb")} className="box" style={{ background: "#8eaadb" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#2f5496")} className="box" style={{ background: "#2f5496" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#1f3864")} className="box" style={{ background: "#1f3864" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#ed7d31")} className="box" style={{ background: "#ed7d31" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#fbe5d5")} className="box" style={{ background: "#fbe5d5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#f7cbac")} className="box" style={{ background: "#f7cbac" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#f4b183")} className="box" style={{ background: "#f4b183" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#c55a11")} className="box" style={{ background: "#c55a11" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#833c0b")} className="box" style={{ background: "#833c0b" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#a5a5a5")} className="box" style={{ background: "#a5a5a5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#ededed")} className="box" style={{ background: "#ededed" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#dbdbdb")} className="box" style={{ background: "#dbdbdb" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#c9c9c9")} className="box" style={{ background: "#c9c9c9" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#7b7b7b")} className="box" style={{ background: "#7b7b7b" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#525252")} className="box" style={{ background: "#525252" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#ffc000")} className="box" style={{ background: "#ffc000" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#fff2cc")} className="box" style={{ background: "#fff2cc" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#fee599")} className="box" style={{ background: "#fee599" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#ffd965")} className="box" style={{ background: "#ffd965" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#bf9000")} className="box" style={{ background: "#bf9000" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#7f6000")} className="box" style={{ background: "#7f6000" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#5b9bd5")} className="box" style={{ background: "#5b9bd5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#deebf6")} className="box" style={{ background: "#deebf6" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#bdd7ee")} className="box" style={{ background: "#bdd7ee" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#9cc3e5")} className="box" style={{ background: "#9cc3e5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#2e75b5")} className="box" style={{ background: "#2e75b5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#1e4e79")} className="box" style={{ background: "#1e4e79" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#70ad47")} className="box" style={{ background: "#70ad47" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#e2efd9")} className="box" style={{ background: "#e2efd9" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#c5e0b3")} className="box" style={{ background: "#c5e0b3" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#a8d08d")} className="box" style={{ background: "#a8d08d" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#538135")} className="box" style={{ background: "#538135" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#375623")} className="box" style={{ background: "#375623" }} />
                                        </div>
                                    </div>
                                    <h3 className="palette-header">
                                        Standard Colors
                                        </h3>
                                    <div className="Standard-colors">
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#c00000")} className="box" style={{ background: "#c00000" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#ff0000")} className="box" style={{ background: "#ff0000" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#ffc000")} className="box" style={{ background: "#ffc000" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#ffff00")} className="box" style={{ background: "#ffff00" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#92d050")} className="box" style={{ background: "#92d050" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#00b050")} className="box" style={{ background: "#00b050" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#00b0f0")} className="box" style={{ background: "#00b0f0" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#0070c0")} className="box" style={{ background: "#0070c0" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#002060")} className="box" style={{ background: "#002060" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeBckgTextColor(objContext, "#7030a0")} className="box" style={{ background: "#7030a0" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="items TextColor" >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.ColorTextImage,
                                    }}
                                    Events={{
                                        OnClickEventHandler: () => { objEvt => objContext.StartTab_ModuleProcessor.SetState({ "blnShowFontColorPalate": state.blnShowFontColorPalate ? false : true }, objContext) }
                                    }}
                                    ParentProps={props}
                                />
                                <div style={{ display: state.blnShowFontColorPalate ? "block" : 'none' }} className="color-palette" id="colorPalette">
                                    <h3 className="palette-header">
                                        Farbpalette
                                        </h3>
                                    <div className="color-block">
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#fff")} className="box" style={{ background: "#fff" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#f2f2f2")} className="box" style={{ background: "#f2f2f2" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#d8d8d8")} className="box" style={{ background: "#d8d8d8" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#bfbfbf")} className="box" style={{ background: "#bfbfbf" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#a5a5a5")} className="box" style={{ background: "#a5a5a5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#7f7f7f")} className="box" style={{ background: "#7f7f7f" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "black")} className="box" style={{ background: "black" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#7f7f7f")} className="box" style={{ background: "#7f7f7f" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#595959")} className="box" style={{ background: "#595959" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#3f3f3f")} className="box" style={{ background: "#3f3f3f" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#262626")} className="box" style={{ background: "#262626" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#0c0c0c")} className="box" style={{ background: "#0c0c0c" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#e7e6e6")} className="box" style={{ background: "#e7e6e6" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#d0cece")} className="box" style={{ background: "#d0cece" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#aeabab")} className="box" style={{ background: "#aeabab" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#757070")} className="box" style={{ background: "#757070" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#3a3838")} className="box" style={{ background: "#3a3838" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#171616")} className="box" style={{ background: "#171616" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#44546a")} className="box" style={{ background: "#44546a" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#d6dce4")} className="box" style={{ background: "#d6dce4" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#adb9ca")} className="box" style={{ background: "#adb9ca" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#8496b0")} className="box" style={{ background: "#8496b0" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#323f4f")} className="box" style={{ background: "#323f4f" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#222a35")} className="box" style={{ background: "#222a35" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#4472c4")} className="box" style={{ background: "#4472c4" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#d9e2f3")} className="box" style={{ background: "#d9e2f3" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#b4c6e7")} className="box" style={{ background: "#b4c6e7" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#8eaadb")} className="box" style={{ background: "#8eaadb" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#2f5496")} className="box" style={{ background: "#2f5496" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#1f3864")} className="box" style={{ background: "#1f3864" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#ed7d31")} className="box" style={{ background: "#ed7d31" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#fbe5d5")} className="box" style={{ background: "#fbe5d5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#f7cbac")} className="box" style={{ background: "#f7cbac" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#f4b183")} className="box" style={{ background: "#f4b183" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#c55a11")} className="box" style={{ background: "#c55a11" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#833c0b")} className="box" style={{ background: "#833c0b" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#a5a5a5")} className="box" style={{ background: "#a5a5a5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#ededed")} className="box" style={{ background: "#ededed" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#dbdbdb")} className="box" style={{ background: "#dbdbdb" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#c9c9c9")} className="box" style={{ background: "#c9c9c9" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#7b7b7b")} className="box" style={{ background: "#7b7b7b" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#525252")} className="box" style={{ background: "#525252" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#ffc000")} className="box" style={{ background: "#ffc000" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#fff2cc")} className="box" style={{ background: "#fff2cc" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#fee599")} className="box" style={{ background: "#fee599" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#ffd965")} className="box" style={{ background: "#ffd965" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#bf9000")} className="box" style={{ background: "#bf9000" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#7f6000")} className="box" style={{ background: "#7f6000" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#5b9bd5")} className="box" style={{ background: "#5b9bd5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#deebf6")} className="box" style={{ background: "#deebf6" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#bdd7ee")} className="box" style={{ background: "#bdd7ee" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#9cc3e5")} className="box" style={{ background: "#9cc3e5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#2e75b5")} className="box" style={{ background: "#2e75b5" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#1e4e79")} className="box" style={{ background: "#1e4e79" }} />
                                        </div>
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#70ad47")} className="box" style={{ background: "#70ad47" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#e2efd9")} className="box" style={{ background: "#e2efd9" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#c5e0b3")} className="box" style={{ background: "#c5e0b3" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#a8d08d")} className="box" style={{ background: "#a8d08d" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#538135")} className="box" style={{ background: "#538135" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#375623")} className="box" style={{ background: "#375623" }} />
                                        </div>
                                    </div>
                                    <h3 className="palette-header">
                                        Standard Colors
                                       </h3>
                                    <div className="Standard-colors">
                                        <div className="color-flex">
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#c00000")} className="box" style={{ background: "#c00000" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#ff0000")} className="box" style={{ background: "#ff0000" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#ffc000")} className="box" style={{ background: "#ffc000" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#ffff00")} className="box" style={{ background: "#ffff00" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#92d050")} className="box" style={{ background: "#92d050" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#00b050")} className="box" style={{ background: "#00b050" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#00b0f0")} className="box" style={{ background: "#00b0f0" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#0070c0")} className="box" style={{ background: "#0070c0" }} />

                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#002060")} className="box" style={{ background: "#002060" }} />
                                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeTextColor(objContext, "#7030a0")} className="box" style={{ background: "#7030a0" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* ===============color text==================== */}
                        </div>
                        <div className="bottom-text">Font</div>
                    </div>
                    {/**============paragraph=======start */}
                    <div className="paragraph">
                        <div className="paragraph-block">
                            <div className="items" onClick={objEvt => TextActions.Pargraph.ToggleList("InsertUnorderedList")}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.BulletImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Pargraph.ToggleList("InsertOrderedList")} >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.NumberedImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Pargraph.SetIndent("Outdent")}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.DecreaseIndentImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Pargraph.SetIndent("Indent")}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.IncreaseIndentImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                        </div>
                        <div className="paragraph-block">
                            <div className="items" onClick={objEvt => TextActions.Pargraph.TextAlign("JustifyLeft")} >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.AlignLeftImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Pargraph.TextAlign("JustifyCenter")}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.AlignCenterImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Pargraph.TextAlign("JustifyRight")} >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.AlignRightImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="items" onClick={objEvt => TextActions.Pargraph.TextAlign("JustifyFull")}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.JustifyImage,
                                    }}
                                    ParentProps={props}
                                />
                            </div>

                        </div>
                        <div className="bottom-text">Paragraph</div>
                    </div>
                    {/**============styles==========start */}
                    <div className="styles">
                        <div className="styles-flex">
                            <div className="styles-block" >
                                <div className="item" 
                                        style={{
                                            cursor : "grab",
                                            background: objContext.state.strActiveStyleClass === "PageOutputContentLargeText" ? "#ffe8bf" : "", 
                                            outline: objContext.state.strActiveStyleClass === "PageOutputContentLargeText" ? "1px solid #fbaf2a" : ""}}
                                            onClick={objEvt => TextActions.Styles.ApplyStyleClass("PageOutputContentLargeText", () => {
                                                objContext.dispatch({
                                                    type : "SET_STATE",
                                                    payload : {
                                                        strActiveStyleClass : "PageOutputContentLargeText"
                                                    }
                                                })
                                            })} >
                                    <h3>AaBbCc</h3>
                                    <p>Bold</p>
                                </div>
                                <div className="item" 
                                style={{
                                    background: objContext.state.strActiveStyleClass === "PageOutputContentTitle" ? "#ffe8bf" : "", 
                                    outline: objContext.state.strActiveStyleClass === "PageOutputContentTitle" ? "1px solid #fbaf2a" : "",
                                    cursor : "grab"}}
                                onClick={objEvt => TextActions.Styles.ApplyStyleClass('PageOutputContentTitle', () => {
                                    objContext.dispatch({
                                        type : "SET_STATE",
                                        payload : {
                                            strActiveStyleClass : "PageOutputContentTitle"
                                        }
                                    })
                                })} >
                                    <h3>AaBbCc</h3>
                                    <p>Heading</p>
                                </div>
                                <div className="item"  
                                style={{
                                    cursor : "grab",
                                    background: objContext.state.strActiveStyleClass === "PageOutputContentText" ? "#ffe8bf" : "", 
                                    outline: objContext.state.strActiveStyleClass === "PageOutputContentText" ? "1px solid #fbaf2a" : ""}} 
                                    onClick={objEvt => TextActions.Styles.ApplyStyleClass('PageOutputContentText', () => {
                                        objContext.dispatch({
                                            type : "SET_STATE",
                                            payload : {
                                                strActiveStyleClass : "PageOutputContentTitle"
                                            }
                                        })
                                    })} >
                                    <h3>AaBbCc</h3>
                                    <p>Normal</p>
                                </div>
                                <div className="scroll-bar">
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.FontStyleUpImage,
                                        }}
                                        ParentProps={props}
                                    />
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.FontStyleDownImage,
                                        }}
                                        ParentProps={props}
                                    />
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.FontStyleEndImage,
                                        }}
                                        ParentProps={props}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bottom-text">Styles</div>
                    </div>
                    {/**============Editing=========start */}
                    <div className="to-edit">
                        <div className="items" onClick={objEvt => objContext.StartTab_ModuleProcessor.ShowSearchAndReplace('search')}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.SearchImage,
                                }}
                                ParentProps={props}
                            />
                            <span>Find</span>
                        </div>
                        <div className="items" onClick={objEvt => objContext.StartTab_ModuleProcessor.ShowSearchAndReplace('replace')} >
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.ReplaceImage,
                                }}
                                ParentProps={props}
                            />
                            <span>Replace</span>
                        </div>
                        <div className="items" onClick={objEvt => TextActions.Editing.PaintFormat(objContext)}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.PasteFromWordImage,
                                }}
                                ParentProps={props}
                            />
                            <span>Format Painter</span>
                        </div>
                        <div className="bottom-text">Editing</div>
                    </div>
                    {/**============align===========start */}
                    <div className="align">
                        <div className="items" onClick={() => { objContext.StartTab_ModuleProcessor.NudgeUp(); }}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.NudgeUpImage,
                                }}
                                ParentProps={props}
                            />
                            <span>Up</span>
                        </div>
                        <div className="items" onClick={() => { objContext.StartTab_ModuleProcessor.NudgeDown(); }}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.NudgeDownImage,
                                }}
                                ParentProps={props}
                            />
                            <span>Down</span>
                        </div>
                        <div className="items" style={{ position: "relative" }}>
                            <div onClick={objEvt => objContext.StartTab_ModuleProcessor.SetState({ "blnShowLineHeight": state.blnShowLineHeight ? false : true }, objContext)}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.RowHeightImage,
                                    }}
                                    ParentProps={props}
                                />
                                <span>Row Height</span>
                            </div>
                            <div className="lh-context" style={{ display: state.blnShowLineHeight ? "block" : "none" }} >
                                <ul>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeLineHeight(0.5)}>                                        
                                        {state.strLineHeight === "0.5"
                                            &&
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objImageMeta.Icon_YesImage,
                                                }}
                                                ParentProps={props}
                                            />
                                        }
                                        0.5
                                        </li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeLineHeight(1)}>
                                        {state.strLineHeight === "1"
                                            &&
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objImageMeta.Icon_YesImage,
                                                }}
                                                ParentProps={props}
                                            />
                                        }
                                        1</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeLineHeight(1.5)}>
                                        {state.strLineHeight === "1.5"
                                            &&
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objImageMeta.Icon_YesImage,
                                                }}
                                                ParentProps={props}
                                            />
                                        }
                                        1.5</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeLineHeight(2)}>
                                        {state.strLineHeight === "2"
                                            &&
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objImageMeta.Icon_YesImage,
                                                }}
                                                ParentProps={props}
                                            />
                                        }
                                        2</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeLineHeight(2.5)}>
                                        {state.strLineHeight === "2.5"
                                            &&
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objImageMeta.Icon_YesImage,
                                                }}
                                                ParentProps={props}
                                            />
                                        }
                                        2.5</li>
                                    <li onClick={objEvt => objContext.StartTab_ModuleProcessor.ChangeLineHeight(3)}>
                                        {state.strLineHeight === "3"
                                            &&
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objImageMeta.Icon_YesImage,
                                                }}
                                                ParentProps={props}
                                            />
                                        }
                                        3</li>
                                </ul>
                                <hr style={{ border: "0.5px solid gainsboro", margin: "5px 0" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

export default connect(Base_Hook.MapStoreToProps(StartTab_ModuleProcessor.StoreMapList()))(StartTab);