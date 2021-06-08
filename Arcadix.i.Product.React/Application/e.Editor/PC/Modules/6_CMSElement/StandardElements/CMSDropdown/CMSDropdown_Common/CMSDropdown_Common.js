//React imports
import React from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSDropdown_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSDropdown
 * @returns {any} returns the cms Dropdown's JSX
 */
const CMSDropdown_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary Returns the body of the dropdown element.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let strWidth = Context.state.ElementJson["vElementJson"]["cIsFixedWidth"] === "Y" ? Context.state.ElementJson["vElementJson"]["iWidth"] + "px" : undefined;
        let objPreSelect, strBackgroundColor;
        let objTextResource = EditorState.GetProperty("CommonTextResource");
        if (AppType === "TestApplication") {
            objPreSelect = Context.state.ElementJson["vElementJson"]["Values"].filter(objTempData => objTempData["cIsCorrectValue"] === "Y")[0];
            if (Context.state.ViewComparison && Context.state.ElementStatus !== null) {
                if (Context.state.ElementStatus === 1) {
                    strBackgroundColor = "lightgreen";
                }
                else if (Context.state.ElementStatus === 2) {
                    strBackgroundColor = "pink";
                }
            }
        }
        let objStyle = {
            "width": strWidth,
            "backgroundColor": strBackgroundColor
        };
        return (
           <React.Fragment>
                    <select
                        contentEditable={false}
                        ielementid={Context.state.ElementJson["iElementId"]} ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                        className="cms-dropdown"
                        onChange={Events.OnSelectionChange ? (event) => { Events.OnSelectionChange(event.target.value); } : Events.OnSelectionChange}
                        onDoubleClick={Events.ShowDropdownSidebar ? (event) => { Events.ShowDropdownSidebar(event); } : Events.ShowDropdownSidebar}
                        style={objStyle}
                    >
                        {
                            Context.state.ElementJson["vElementJson"]["cHidePleaseSelect"] === "N" ?
                                <option value={-1}>
                                    {
                                        Context.state.ElementJson["vElementJson"]["cIsDefaultTextEmpty"] === "N" ?
                                            Context.state.ElementJson["vElementJson"]["vDefaultText"] ?
                                                Context.state.ElementJson["vElementJson"]["vDefaultText"] :
                                                AppType === "Editor" ?
                                                    Context.CMSDropdown_Editor_ModuleProcessor.TextFormatter(objTextResource, "Dropdown_StandardTextInDropdown") :
                                                    Context.CMSDropdown_TestApplication_ModuleProcessor.TextFormatter(objTextResource, "Dropdown_StandardTextInDropdown")
                                            : ""
                                    }
                                </option> : ""
                        }
                        {
                            Context.state.ElementJson["vElementJson"]["Values"].map(objTempValue => {
                                return (
                                    <option
                                        key={objTempValue["iElementDropdownValueId"]}
                                        value={objTempValue["iElementDropdownValueId"]}
                                        selected={objPreSelect && objPreSelect["iElementDropdownValueId"] === objTempValue["iElementDropdownValueId"]}>
                                        {objTempValue["vText"]}
                                    </option>
                                );
                            })
                        }
                    </select>
                    {
                        Context.state.ViewComparison ?
                            Context.state.ElementStatus === 1 ?
                                <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif"} />
                            :
                            <span style={{ display: "flex", alignItems: "center", }}>
                                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Cross.gif"} />
                                    <span style={{ backgroundColor: "lightblue", border: "1px solid black", marginLeft: "5px", paddingLeft: "3px", paddingRight: "3px" }}>
                                        {
                                            Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempData => objTempData["cIsCorrectValue"] === "Y")[0]["vText"]
                                        }
                                    </span>
                                </span>
                            : ""
                    }
                    {
                        Context.state.ViewSolution ?
                            <span style={{ backgroundColor: "lightblue", border: "1px solid black", marginLeft: "5px", paddingLeft: "3px", paddingRight: "3px" }}>
                                {
                                    Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempData => objTempData["cIsCorrectValue"] === "Y")[0]["vText"]
                                }
                            </span> : ""
                    }
            </React.Fragment>
        );
    };

    return GetContent();
};

export default CMSDropdown_Common;
