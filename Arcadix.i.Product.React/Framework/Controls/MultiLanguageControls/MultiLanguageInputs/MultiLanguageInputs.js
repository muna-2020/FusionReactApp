// React related imports.
import React from 'react';

/**
* @name MultiLanguageInputs
* @param {object} props props
* @summary This component displays the MultiLanguageInputs.
* @returns {Element} React.Fragement that encapsulated the Inputs Data.
*/
const MultiLanguageInputs = (props) => {

    /**
     * @name GetContent
     * @summary returns the Jsx of input elements.
     * @returns {Array}
     * */
    function GetContent() {
        let arrMultiLanguageInputs = [];
        props.Data.MultiLanguageData.map((objMultiLanguage, intIndex) => {
            arrMultiLanguageInputs = [...arrMultiLanguageInputs,
            <div className="language" id={props.Id + "_MultiLanguageInputs"}>
                {props.Data.MultiLanguageData.length > 1 ? <span>{objMultiLanguage["vLanguageCultureInfo"]}</span> : <React.Fragment />}
                {props.Meta.InputType == "TextArea" ?
                    <textarea
                        id={props.Meta.ValueColumn}
                        autoFocus={intIndex == 0 && props.Meta.AutoFocus}
                        className="textarea"
                        type="text"
                        onChange={(e) => props.Events.OnChange(e, objMultiLanguage)}
                        value={props.Data.DisplayData[props.Meta.DependingTableName] ? (props.Data.DisplayData[props.Meta.DependingTableName].filter(objTableData => objTableData["iLanguageId"] == objMultiLanguage["iLanguageId"]).length > 0 ? props.Data.DisplayData[props.Meta.DependingTableName].filter(objTableData => objTableData["iLanguageId"] == objMultiLanguage["iLanguageId"])[0][props.Meta.DisplayColumn] : "") : ""}
                    />
                    :
                    <input
                        id={props.Meta.ValueColumn}
                        autoFocus={intIndex == 0 && props.Meta.AutoFocus}
                        className="text-input"
                        type="text"
                        onChange={(e) => props.Events.OnChange(e, objMultiLanguage)}
                        onKeyDown={(e) => props.Events.OnKeyDown && props.Events.OnKeyDown(e)}
                        value={props.Data.DisplayData[props.Meta.DependingTableName] ? (props.Data.DisplayData[props.Meta.DependingTableName].filter(objTableData => objTableData["iLanguageId"] == objMultiLanguage["iLanguageId"]).length > 0 ? props.Data.DisplayData[props.Meta.DependingTableName].filter(objTableData => objTableData["iLanguageId"] == objMultiLanguage["iLanguageId"])[0][props.Meta.DisplayColumn] : "") : ""}
                    />
                }

            </div>
            ];
        });
        return arrMultiLanguageInputs;
    }

    return GetContent()
}

export default MultiLanguageInputs;

