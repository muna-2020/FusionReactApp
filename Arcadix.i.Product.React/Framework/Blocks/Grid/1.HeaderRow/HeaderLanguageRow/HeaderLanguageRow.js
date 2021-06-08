// React related imports.
import React from 'react';

/**
 * @name HeaderLanguageRow
 * @param {*} props
 * @summary The HeaderLanguageRow is designed to display the Text for the Language names.
 * @returns {object} React.Fragement that encapsulated the Column.
 */
const HeaderLanguageRow = props => {

    const GetContent = () => {
        return (
            <React.Fragment>
                {
                    props.Meta.HeaderData.map((objMeta, intIndex) => {
                        if (objMeta["cShowMultiLanguage"] && objMeta["cShowMultiLanguage"] === "Y") {
                            return (
                                props.Data.LanguageData.map((objMultiLanguage, intIndex) => {
                                    return <td key={intIndex}><span>{objMultiLanguage.vLanguageCultureInfo}</span></td>
                                })
                            )
                        }
                        else {
                            return <td key={intIndex}></td>; //this is needed to give spaces in case the colum is not multi language
                        }
                    })
                }
            </React.Fragment>
        );
    }


    /**
     * JSX of the HeaderRow
     */
    return GetContent();
};

export default HeaderLanguageRow;