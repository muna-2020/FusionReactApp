// React related imports.
import React from 'react';

/**
 * @name HeaderTitleRow
 * @param {*} props
 * @summary The HeaderTitleRow is designed to display the Text for the Column names.
 * @returns {object} React.Fragement that encapsulated the Column.
 */
const HeaderTitleRow = props => {

    const GetContent = () => {
        return (
            <React.Fragment>
                {
                    props.Meta.HeaderData && props.Meta.HeaderData.map((objMeta, intIndex) => {
                        return <React.Fragment>
                            <td key={intIndex} style={{ width: objMeta.iWidth + "px" }}
                                colSpan={objMeta["cShowMultiLanguage"] && objMeta["cShowMultiLanguage"].toLowerCase() === "y" ? props.Data.LanguageData.length : 1}>
                                {objMeta.IsMandatory == "Y" ?
                                    <b>{Localization.TextFormatter(props.Resource.Text, objMeta.vTextResourceKey)}</b>
                                    :
                                    <span><nobr>{Localization.TextFormatter(props.Resource.Text, objMeta.vTextResourceKey)}</nobr></span>
                                }
                            </td>
                        </React.Fragment>
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

export default HeaderTitleRow;