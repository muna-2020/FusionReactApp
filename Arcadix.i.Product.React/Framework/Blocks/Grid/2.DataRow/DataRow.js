// React related imports.
import React from 'react';

//Components used in module.
import DisplayRow from '@root/Framework/Blocks/Grid/2.DataRow/DisplayRow/DisplayRow';
import EditableRow from '@root/Framework/Blocks/Grid/2.DataRow/EditableRow/EditableRow';

/**
* @name DataRow
* @param {object} props 
* @summary This component Forms the Row Cells(td) based on the ControlType.
* @returns {object} returns a jsx with provied data that will be displayed in it.
*/
const DataRow = React.forwardRef((props, ref) => {

    /**
    * @name GetDisplayRow
    * @summary Returns newly added row on Add Click
    * @returns {object} React.Fragement that encapsulated the New Row.
    * */
    const GetDisplayRow = () => {
        return <DisplayRow
            Meta={{
                HeaderData: props.Meta.HeaderData,
                IsRowSelected: props.Meta.IsRowSelected,
                IsRowChecked: props.Meta.IsRowChecked,
                HideSelectionCheckBox: props.Meta.HideSelectionCheckBox
            }}
            Data={{
                RowData: props.Data.RowData,
                LanguageIds: props.Data.LanguageIds,
                DropDownData: props.Data.DropDownData,
                GridRowData: props.Data.GridRowData,
                IsHierarchicalGrid: props.Data.IsHierarchicalGrid,
            }}
            Resource={props.Resource}
            Events={{
                OnClickRow: props.Events.OnClickDisplayRow,
                OnCheckBoxChange: props.Events.OnCheckBoxChange,
                OnContextMenuClick: props.Events.OnContextMenuClick,
                OnDoubleClick: props.Events.OnDoubleClick,
                OnCollapseClick: props.Events.OnCollapseClick
            }}
            ParentProps={{ ...props, ...props.ParentProps }}
            ImageMeta={props.ImageMeta != undefined ? { ...props.ImageMeta } : undefined} 
        />
    }

    /**
    * @name GetEditableRow
    * @summary Returns newly added row on Add Click
    * @returns {object} React.Fragement that encapsulated the New Row.
    * */
    const GetEditableRow = () => {
        return <EditableRow
            Meta={{
                HeaderData: props.Meta.HeaderData,
                RowActionButtons: props.Meta.RowActionButtons
            }}
            Data={{
                RowData: props.Data.RowData,
                DropDownData: props.Data.DropDownData,
                GridRowData: props.Data.GridRowData
            }}
            Resource={props.Resource}
            Events={{
                OnClickRow : props.Events.OnClickEditableRow
            }}
            CallBacks={{
                CheckEditMode: props.CallBacks.CheckEditMode
            }}
            ParentProps={{ ...props, ...props.ParentProps }}
            ImageMeta={props.ImageMeta != undefined ? { ...props.ImageMeta } : undefined} 
            ref={ref}
        />
    }

    const GetContent = () => {
        if (props.Meta.EditableGrid) {
            return GetEditableRow();
        }
        else {
            return GetDisplayRow();
        }   
    }

    /**
     * JSX of the rows
     */
    return GetContent();
});

export default DataRow;