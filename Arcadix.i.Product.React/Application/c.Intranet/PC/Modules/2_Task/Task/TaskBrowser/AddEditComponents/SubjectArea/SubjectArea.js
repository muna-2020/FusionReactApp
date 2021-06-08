// React related imports.
import React, { useMemo } from 'react';

/**
 * @name SubjectArea
 * @param {object} props props
 * @summary This component is used for SubjectArea in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const SubjectArea = props => {

   /**
    * @name GetContent
    * @summary Forms the whole jsx required for the component.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        var Subject = props.ParentProps.ComponentController.GetComponent("Subject");
        return <div
            id="SubjectAreaDiv"
            className="task-tabcontent subjectarea"
        //style={{ display: (props.Data.DivToShow == "SubjectAreaDiv" ? "block" : "none") }}
        >
            {
                useMemo(() => <Subject
                    {...props.ParentProps}
                    IsForTaskPopup={true}
                    Events={{
                        SetSubjectOfficeRibbon: (objRibbonData) => props.Events.SetSubjectOfficeRibbon(objRibbonData)
                    }}
                    SetTaskPopupRibbon={props.Data.DivToShow == "SubjectAreaDiv" ? true : false}
                />
                    , [])
            }
        </div>
    }
    return (
        GetContent()
    )
}

export default SubjectArea;
