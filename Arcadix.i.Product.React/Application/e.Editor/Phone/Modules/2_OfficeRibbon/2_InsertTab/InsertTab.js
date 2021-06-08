// React related imports.
import React, { useEffect, useReducer } from "react";

//react-redux related imports.
import { connect } from 'react-redux';

//Module related fies.
import * as InsertTab_Hooks from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/2_InsertTab/InsertTab_Hooks";
import InsertTab_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/2_InsertTab/InsertTab_ModuleProcessor";
import * as InsertTab_MetaData from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/2_InsertTab/InsertTab_MetaData";

//Base classes/methods.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Text Action import.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

/**
 * @name InsertTab
 * @summary This Component is responsible for the Insert tab operation of office ribbon.
 * @returns {JSX} InsertTab Component.
 */
const InsertTab = props => {

    /**
     * @summary Gets the state and dispatch for the component. Initializes the UndoRedo for the component.
     * */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, InsertTab_Hooks.GetInitialState(props));

    /**
    * @name objContext
    * @summary Combines the props, state, dispatch and other objects that are required throughout the component.
    * */
    let objContext = { state, props, dispatch, ["InsertTab_ModuleProcessor"]: new InsertTab_ModuleProcessor() }; //objeContext

    /**
     * @name useEffect
     * @summry this add events to the document to close any opened office ribbon menu(s) on click.
     * */
    useEffect(() => {
        let objInsertDropDown = {
            blnshowEmoticons: false,
            blnshowSymbol: false,
        };
        const CloseDropDown = (objEvent) => {
            objContext.InsertTab_ModuleProcessor.SetState(objInsertDropDown, objContext);
        };
        document.addEventListener('click', CloseDropDown, true);
        return () => {
            document.removeEventListener('click', CloseDropDown, true);
        }
    }, [objContext.state]);

    /**
     * @name AddEmoticon
     * @param {HTML_Event} objEvent Event object.
     * @summary add emoticon to the TextEditor.
     */
    const AddEmoticon = (objEvent) => {
        objEvent.persist();
        if (objEvent.target.tagName.toLowerCase() === 'img' && objEvent.target.getAttribute('type').toLowerCase() === 'emoticon') {
            let objEmoticon = document.createElement('img');
            objEmoticon.src = objEvent.target.getAttribute('src');
            objEmoticon.setAttribute('draggable', false);
            objEmoticon.setAttribute('style', "pointer-events: none; touch-action: none;");
            TextActions.Illustrations.AddEmoticon(objEmoticon, 'emoticon');
        }
    };

    /**
     * @param {object} objEvent drage event.
     * @param {string} strType element type.
     * @summary set dataTranser value with key ActiveDragElement and type of element being dragged.
     */
    const OnElementDragStart = (objEvent, strType) => {
        objEvent.dataTransfer.setData("ActiveDragElement", strType);
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        let objTextResource = props.TextResource;
        let objImageMeta = InsertTab_MetaData.GetImageMeta();
        let objLinkTabTextResource = Localization.TextFormatter(objTextResource, "LinksTab")
        return (
            <div className="office-ribbon insert-tab editor-office-ribbon" id="EditorOfficeRibbon" >
                <div className="ribbon-slider" id="EditorSliderDiv">
                    <div className="container">
                        <div className="container-block">
                            <div className="container-image-left" onClick={objEvent => objContext.InsertTab_ModuleProcessor.ReplaceContainer(35)}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.ContainerTemplate_icon_35Image,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="container-arrow">
                                <div className="item" onClick={objEvent => objContext.InsertTab_ModuleProcessor.InsertContainerAbove(35)}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.RotateAnticlockwiseImage,
                                        }}
                                        ParentProps={props}
                                    />
                                </div>
                                <div className="item" onClick={objEvent => objContext.InsertTab_ModuleProcessor.InsertContainerBelow(35)}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.RotateClockwiseImage,
                                        }}
                                        ParentProps={props}
                                    />
                                </div>
                            </div>
                            <div className="container-image-left" onClick={objEvent => objContext.InsertTab_ModuleProcessor.ReplaceContainer(36)}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.ContainerTemplate_icon_36Image,
                                    }}
                                    ParentProps={props}
                                />
                            </div>
                            <div className="container-arrow" >
                                <div className="item" onClick={objEvent => objContext.InsertTab_ModuleProcessor.InsertContainerAbove(36)}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.RotateAnticlockwiseImage,
                                        }}
                                        ParentProps={props}
                                    />
                                </div>
                                <div className="item" onClick={objEvent => objContext.InsertTab_ModuleProcessor.InsertContainerBelow(36)}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.RotateClockwiseImage,
                                        }}
                                        ParentProps={props}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bottom-text">Container</div>
                    </div>
                    <div className="illustration">
                        <div className="illustration-block">
                            <div className="images-flex">
                                <div className="image-block" onClick={objEvent => objContext.InsertTab_ModuleProcessor.AddSubElement("Image", objContext)}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.Insert_ImageImage,
                                        }}
                                        Meta={{
                                            Draggable: false
                                        }}
                                        ParentProps={props}
                                    />
                                    <span>image </span>
                                </div>
                                <div className="img-right">
                                    <div className="item relative">
                                        <div className="flex align-middle" onClick={objEvent => objContext.InsertTab_ModuleProcessor.SetState({ "blnshowEmoticons": state.blnshowEmoticons ? false : true }, objContext)}>
                                            <WrapperComponent
                                                ComponentName={"Image"}
                                                Data={{
                                                    Image: objImageMeta.Insert_EmoticonImage,
                                                }}
                                                ParentProps={props}
                                            />
                                            <span>Insert emoticon</span>
                                        </div>
                                        <div onClick={objEvent => AddEmoticon(objEvent)}
                                            className="emoji-grid" style={{ display: state.blnshowEmoticons ? "grid" : "none" }} >
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_AngryImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_AstonishedImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_BlinkImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_SadImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_DoubtImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_DevilImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_EuhImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_GlassesImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_GreenCheecksImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_LaughImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_NervImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_PairImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_PartyHatImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_PuzzledImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_SadImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_ShyImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_SmileImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_SunglassesImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_TongueImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_SilenceImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_WhatImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                            <span className="emoji-icon">
                                                <WrapperComponent
                                                    ComponentName={"Image"}
                                                    Data={{
                                                        Image: objImageMeta.Emoticons_ZenImage,
                                                        Type: "Emoticon"
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item" onClick={objEvt => objContext.InsertTab_ModuleProcessor.ShowClipartPopup(objContext)}>
                                        <WrapperComponent
                                            ComponentName={"Image"}
                                            Data={{
                                                Image: objImageMeta.Insert_ClipartImage,
                                            }}
                                            ParentProps={props}
                                        />
                                        <span>Clip-Art einfügen</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-text">Illustrations</div>
                    </div>
                    {/* =============links============================ */}
                    <div className="link">
                        <div className="link-block">
                            <div className="item" onClick={objEvent => TextActions.Link.ShowLinkPopup(objContext)}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Insert_LinkImage,
                                        ToolTipText: Localization.TextFormatter(objLinkTabTextResource, "Insert_Link")
                                    }}
                                    ParentProps={props}
                                />
                                <span>{Localization.TextFormatter(objLinkTabTextResource, "Insert_Link")}</span>
                            </div>
                            <div className="item" onClick={objEvent => TextActions.Link.ShowMailPopup()}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.EmailImage,
                                        ToolTipText: Localization.TextFormatter(objLinkTabTextResource, "Insert_Mail")
                                    }}
                                    ParentProps={props}
                                />
                                <span>{Localization.TextFormatter(objLinkTabTextResource, "Insert_Mail")}</span>
                            </div>
                            <div className="item" onClick={objEvent => TextActions.Link.RemoveLink()}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.DeleteLinkImage,
                                        ToolTipText: Localization.TextFormatter(objLinkTabTextResource, "Delete_Link")
                                    }}
                                    ParentProps={props}
                                />
                                <span>{Localization.TextFormatter(objLinkTabTextResource, "Delete_Link")}</span>
                            </div>
                        </div>
                        <div className="bottom-text">Links</div>
                    </div>
                    <div className="symbol">
                        <div className="symbol-block">
                            <div className="item relative">
                                <div onClick={objEvent => objContext.InsertTab_ModuleProcessor.SetState({ "blnshowSymbol": state.blnshowSymbol ? false : true }, objContext)}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.SymbolsImage,
                                        }}
                                        ParentProps={props}
                                    />
                                    <span>Symbol</span>
                                </div>
                                <div id="Insert-Symbol" style={{ display: state.blnshowSymbol ? 'grid' : 'none' }}>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("×")} className="symbol-icon">×</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("÷")} className="symbol-icon">÷</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("Ø")} className="symbol-icon">Ø</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("Ω")} className="symbol-icon">Ω</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("α")} className="symbol-icon">α</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("β")} className="symbol-icon">β</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("γ")} className="symbol-icon">γ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("δ")} className="symbol-icon">δ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("ε")} className="symbol-icon">ε</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("ζ")} className="symbol-icon">ζ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("η")} className="symbol-icon">η</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("θ")} className="symbol-icon">θ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("ι")} className="symbol-icon">ι</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("κ")} className="symbol-icon">κ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("λ")} className="symbol-icon">λ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("μ")} className="symbol-icon">μ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("ν")} className="symbol-icon">ν</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("ξ")} className="symbol-icon">ξ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("Ο")} className="symbol-icon">Ο</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("π")} className="symbol-icon">π</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("ρ")} className="symbol-icon">ρ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("ς")} className="symbol-icon">ς</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("σ")} className="symbol-icon">σ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("τ")} className="symbol-icon">τ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("υ")} className="symbol-icon">υ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("φ")} className="symbol-icon">φ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("χ")} className="symbol-icon">χ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("ψ")} className="symbol-icon">ψ</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("ω")} className="symbol-icon">ω</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("•")} className="symbol-icon">•</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("←")} className="symbol-icon">←</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("↑")} className="symbol-icon">↑</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("→")} className="symbol-icon">→</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("↓")} className="symbol-icon">↓</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("↔")} className="symbol-icon">↔</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("∑")} className="symbol-icon">∑</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("−")} className="symbol-icon">−</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("∞")} className="symbol-icon">∞</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("∩")} className="symbol-icon">∩</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("≈")} className="symbol-icon">≈</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("≠")} className="symbol-icon">≠</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("≡")} className="symbol-icon">≡</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("≤")} className="symbol-icon">≤</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("≥")} className="symbol-icon">≥</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("–")} className="symbol-icon">–</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("—")} className="symbol-icon">—</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("‰")} className="symbol-icon">‰</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("‹")} className="symbol-icon">‹</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("›")} className="symbol-icon">›</span>
                                    <span onClick={objEvent => TextActions.Symbol.AddSymbol("€")} className="symbol-icon">€</span>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-text">Symbol</div>
                    </div>
                    <div draggable={false} className="Leerschlag" onClick={objEvent => TextActions.AddSpace(objContext.props)}>
                        <div className="Leerschlag-block">
                            <div className="item">
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.LeerschlagImage,
                                    }}
                                    ParentProps={props}
                                />
                                <span>Blank space</span>
                            </div>
                        </div>
                        <div className="bottom-text">Blank space</div>
                    </div>
                    <div className="media">
                        <div className="media-flex">
                            <div className="item" >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Insert_ImageImage,
                                    }}
                                    Meta={{
                                        Draggable: true
                                    }}
                                    Events={{
                                        OnDragStartEventHandler: (objEvent) => OnElementDragStart(objEvent, "Image")
                                    }}
                                    ParentProps={props}
                                />
                                <span>Insert Picture</span>
                            </div>
                            <div className="item">
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Insert_VideoImage,
                                    }}
                                    Meta={{
                                        Draggable: true
                                    }}
                                    Events={{
                                        OnDragStartEventHandler: (objEvent) => OnElementDragStart(objEvent, "Video")
                                    }}
                                    ParentProps={props}
                                />
                                <span>Insert video</span>
                            </div>
                            <div className="item">
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Insert_AudioImage,
                                    }}
                                    Meta={{
                                        Draggable: true
                                    }}
                                    Events={{
                                        OnDragStartEventHandler: (objEvent) => OnElementDragStart(objEvent, "Audio")
                                    }}
                                    ParentProps={props}
                                />
                                <span>Insert audio</span>
                            </div>
                            <div className="item">
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Insert_SmallAudioImage,
                                    }}
                                    Meta={{
                                        Draggable: true
                                    }}
                                    Events={{
                                        OnDragStartEventHandler: (objEvent) => OnElementDragStart(objEvent, "Audio"),
                                        OnClickEventHandler: (objEvent) => { objContext.InsertTab_ModuleProcessor.AddSubElement("SmallAudio", objContext) }
                                    }}
                                    ParentProps={props}
                                />
                                <span>Insert audio</span>
                            </div>
                            <div className="item">
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Insert_TextImage,
                                    }}
                                    Meta={{
                                        Draggable: true
                                    }}
                                    Events={{
                                        OnDragStartEventHandler: (objEvent) => OnElementDragStart(objEvent, "Text")
                                    }}
                                    ParentProps={props}
                                />
                                <span>Insert text</span>
                            </div>
                        </div>
                        <div className="bottom-text">Slideshow</div>
                    </div>
                    <div className="Slideshow">
                        <div className="Slideshow-block">
                            <div className="item">
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.SlideshowImage,
                                    }}
                                    Meta={{
                                        Draggable: true
                                    }}
                                    Events={{
                                        OnDragStartEventHandler: (objEvent) => OnElementDragStart(objEvent, "MultiPageElement")
                                    }}
                                    ParentProps={props}
                                />
                                <span>Slideshow</span>
                            </div>
                        </div>
                        <div className="bottom-text">Slideshow</div>
                    </div>
                    <div className="InsertInfo">
                        <div className="InsertInfo-block">
                            <div className="item" onClick={objEvent => objContext.InsertTab_ModuleProcessor.AddSubElement("overlay", objContext)}
                                onDragStart={objEvent => objContext.InsertTab_ModuleProcessor.AddSubElement("overlay", objContext)}
                                draggable={false}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Info_GreenImage,
                                    }}
                                    ParentProps={props}
                                />
                                <span>Insert Info</span>
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

export default connect(Base_Hook.MapStoreToProps(InsertTab_ModuleProcessor.StoreMapList()))(InsertTab)