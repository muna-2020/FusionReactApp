// React related imports.
import React, { useReducer, useEffect, useRef } from 'react';

//Text action related import.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

/**
 * @name Toolbar
 * @param {object} props props from parent
 * @summary Text Editor Toolbar.
 * @returns {any} Toolbar_Editor
 */
const Toolbar = (props) => {

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component
     */
    const GetContent = () => {
        return (<div className="text-tool-bar">
            <div className="font-dropdown">
                <button onclick="toggle_fonts()">
                    <span>Arial</span>
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/FontStyleDown.svg" />
                </button>
                <ul id="fonts-list" className="fonts-list">
                    <li>Arial</li>
                    <li>Helvetica</li>
                    <li>Verdana</li>
                    <li>Calibri</li>
                    <li>Noto</li>
                    <li>Lucida Sans</li>
                    <li>Gill Sans</li>
                    <li>Century Gothic</li>
                    <li>Candara</li>
                    <li>Futara</li>
                </ul>
            </div>
            <div className="font-size-dropdown">
                <button onclick="toggle_font_size()">
                    <span>12</span>
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/FontStyleDown.svg" />
                </button>
                <ul id="font-size-list" className="font-size-list">
                    <li>8</li>
                    <li>10</li>
                    <li>12</li>
                    <li>14</li>
                    <li>16</li>
                </ul>
            </div>
            <div className="text-style">
                <div className="item bold-text"  onClick={objEvt => TextActions.Font.WeightAndStyle("fontWeight", "Bold")}>
                    <img src="https://img.icons8.com/android/2x/bold.png" />
                </div>
                <div className="item"  onClick={objEvt => TextActions.Font.WeightAndStyle("fontStyle", "Italic")}>
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Kursiv.svg" />
                </div>
                <div className="item">
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Underline.svg" />
                </div>
                <div className="item btn-item">
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/ColorText.svg" />
                    <button className="down-btn" onclick="show_font_colors()">
                        <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/FontStyleDown.svg" />
                    </button>
                    <div id="font-colors" className="font-colors">
                        <div className="font-color-palette">
                            <div className="color-item" style={{ backgroundColor: '#BFEDD2' }} title="Light Green" />
                            <div className="color-item" style={{ backgroundColor: '#FBEEB8' }} title="Light Yellow" />
                            <div className="color-item" style={{ backgroundColor: '#F8CAC6' }} title="Light Red" />
                            <div className="color-item" style={{ backgroundColor: '#ECCAFA' }} title="Light Purple" />
                            <div className="color-item" style={{ backgroundColor: '#C2E0F4' }} title="Light Blue" />
                            <div className="color-item" style={{ backgroundColor: '#000000' }} title="Black" />
                            <div className="color-item" style={{ backgroundColor: '#fff' }} title="White" />
                            <div className="color-item" title="Remove color">
                                <svg width={24} height={24}>
                                    <path stroke="#000" strokeWidth={2} d="M21 3L3 21" fillRule="evenodd" />
                                </svg>
                            </div>
                            <div className="color-item" />
                            <div className="color-item" title="Custom Color">
                                <svg width={24} height={24}>
                                    <path d="M12 3a9 9 0 0 0 0 18 1.5 1.5 0 0 0 1.1-2.5c-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fillRule="nonzero" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item btn-item">
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/TextBackground.svg" />
                    <button className="down-btn" onclick="show_bg_colors()">
                        <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/FontStyleDown.svg" />
                    </button>
                    <div id="bg-colors" className="bg-colors">
                        <div className="bg-color-palette">
                            <div className="color-item" style={{ backgroundColor: '#BFEDD2' }} title="Light Green" />
                            <div className="color-item" style={{ backgroundColor: '#FBEEB8' }} title="Light Yellow" />
                            <div className="color-item" style={{ backgroundColor: '#F8CAC6' }} title="Light Red" />
                            <div className="color-item" style={{ backgroundColor: '#ECCAFA' }} title="Light Purple" />
                            <div className="color-item" style={{ backgroundColor: '#C2E0F4' }} title="Light Blue" />
                            <div className="color-item" style={{ backgroundColor: '#000000' }} title="Black" />
                            <div className="color-item" style={{ backgroundColor: '#fff' }} title="White" />
                            <div className="color-item" title="Remove color">
                                <svg width={24} height={24}>
                                    <path stroke="#000" strokeWidth={2} d="M21 3L3 21" fillRule="evenodd" />
                                </svg>
                            </div>
                            <div className="color-item" />
                            <div className="color-item" title="Custom Color">
                                <svg width={24} height={24}>
                                    <path d="M12 3a9 9 0 0 0 0 18 1.5 1.5 0 0 0 1.1-2.5c-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fillRule="nonzero" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Erase.svg" />
                </div>
            </div>
            <div className="list-indent">
                <div className="item btn-item">
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/AlignLeft.svg" />
                    <button className="down-btn" onclick="show_aligntext_items()">
                        <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/FontStyleDown.svg" />
                    </button>
                    <div id="aligntext-list" className="aligntext-list">
                        <div className="aligntext-list-item">
                            <div className="aligntext-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/AlignCenter.svg" />
                            </div>
                            <div className="aligntext-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/AlignCenter.svg" />
                            </div>
                            <div className="aligntext-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/AlignRight.svg" />
                            </div>
                            <div className="aligntext-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Justify.svg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item btn-item">
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Numbered.svg" />
                    <button className="down-btn" onclick="show_ol_items()">
                        <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/FontStyleDown.svg" />
                    </button>
                    <div id="ordered-list" className="ordered-list">
                        <div className="ordered-list-item">
                            <div className="ol-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Numbered.svg" />
                            </div>
                            <div className="ol-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Numbered.svg" />
                            </div>
                            <div className="ol-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Numbered.svg" />
                            </div>
                            <div className="ol-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Numbered.svg" />
                            </div>
                            <div className="ol-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Numbered.svg" />
                            </div>
                            <div className="ol-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Numbered.svg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item btn-item">
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Bullet.svg" />
                    <button className="down-btn" onclick="show_ul_items()">
                        <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/FontStyleDown.svg" />
                    </button>
                    <div id="unordered-list" className="unordered-list">
                        <div className="unordered-list-item">
                            <div className="ul-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Bullet.svg" />
                            </div>
                            <div className="ul-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Bullet.svg" />
                            </div>
                            <div className="ul-item">
                                <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/Bullet.svg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/DecreaseIndent.svg" />
                </div>
                <div className="item">
                    <img src="https://devfusionlernlupe.arcadixdevelopment.com/Intranet/Themes/Default/c.Intranet/Skin2018/Images/editor/IncreaseIndent.svg" />
                </div>
            </div>
        </div>)
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

/**
 * @name Toolbar.DynamicStyles
 * @param {object} props props
 * @summary required for loading css
 * @returns {any} Styles array
 */
Toolbar.DynamicStyles = (props) => {
    return [
        props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/7_Text/Toolbar/Toolbar.css"
    ];
};

export default Toolbar;
