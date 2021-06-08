// React related imports.
import React, { useMemo } from 'react';

//Components used in module.
import HeaderTitleRow from "@root/Framework/Blocks/Grid/1.HeaderRow/HeaderTitleRow/HeaderTitleRow";
import HeaderActionRow from "@root/Framework/Blocks/Grid/1.HeaderRow/HeaderActionRow/HeaderActionRow";
import HeaderLanguageRow from "@root/Framework/Blocks/Grid/1.HeaderRow/HeaderLanguageRow/HeaderLanguageRow";

/**
 * @name HeaderRow
 * @param {*} props
 * @summary The Column is designed to display the HeaderTitleRow, HeaderLanguageRow, HeaderActionRow.
 * @returns {object} React.Fragement that encapsulated the Column.
 */
const HeaderRow = props => {

    /**
    * @name DataHeaders
    * @summary contains jsx for Header Data
    * @returns {objHeader} JSX
    */
    const GetContent = () => {
        return (
            <React.Fragment>
                <tr key="header">
                    {
                        props.ParentProps.Meta.EditableGrid || props.Meta.HideSelectionCheckBox
                            ?
                            <React.Fragment />
                            :
                            <td key="checkbox" style={{ width: '7px' }}><input type="checkbox" onChange={props.Events.HandleAllCheck} checked={props.Meta.Checked} /></td>
                    }
                    {
                        props.Data.IsHierarchicalGrid == "Y" ? <td key="checkbox" style={{ width: '7px' }}>{props.Data.HierarchicalGridHeaderText}</td> : ""
                    }
                    {
                        useMemo(() => <HeaderTitleRow {...props} />, [])
                    }
                    {
                        props.ParentProps.Meta.EditableGrid ? <td></td> : <React.Fragment />
                    }
                </tr>
                {
                    props.Meta.ShowLanguageHeader ?
                        <tr key="subMeta">
                            <td></td>{/* Empty td for the checkbox column*/}
                            {useMemo(() => <HeaderLanguageRow {...props} />, [])}
                        </tr>
                        : <React.Fragment />
                }
                {
                    props.Meta.EditableGrid ? <HeaderActionRow {...props} /> : <React.Fragment />
                }
            </React.Fragment>
        );
    }

    /**
     * JSX of the HeaderRow
     */
    return GetContent();
};

export default HeaderRow;