// React related imports.
import React from 'react';

/**
 * @name HeaderActionRow
 * @param {*} props
 * @summary The HeaderActionRow is designed to display the Text for the Column names.
 * @returns {object} JSX.
 */
const HeaderActionRow = props => {

    const GetContent = () => {
        var domGridActionButtons = props.ParentProps.CallBacks.GridActionButtons.map((objButtonData, intIndex) => {
            var strClassName = "button " + (objButtonData.ClassName ? objButtonData.ClassName : "brown-button");
            strClassName += props.Meta.EditMode ? " disabled" : "";
            return <button key={intIndex} className={strClassName} onClick={(event) => {
                props.Events.OnHeaderButtonClick(objButtonData, event);
                if (objButtonData.ModuleEvent)
                    objButtonData.ModuleEvent();
            }
            }><img src={props.ImageMeta != undefined ? props.ImageMeta[objButtonData.ImageType] : props.Resource.SkinPath + props.Resource.ImagePathDetails[objButtonData.ImageType]} />
                {objButtonData.Text}
            </button>;
        });
        return <tr key="header"><td key="header" className="edit-row-buttons" colSpan='9'>{domGridActionButtons} </td></tr>;
    }

    /**
     * JSX of the HeaderRow
     */
    return GetContent();
};

export default HeaderActionRow;