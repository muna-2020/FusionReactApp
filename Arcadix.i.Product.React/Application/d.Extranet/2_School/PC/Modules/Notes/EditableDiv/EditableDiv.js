// React related imports
import React, { forwardRef, useRef} from 'react';

/**
* @name EditableDiv
* @param {object} props props
* @summary This component consists of three editable notes.
* @returns {object} React.Fragement that encapsulated the notes div.
*/
const EditableDiv = forwardRef((props, ref) => {
    return (
        <React.Fragment>
            <div id={props.NoteId} ref={ref} contentEditable={true} dangerouslySetInnerHTML={{ __html: props.NoteObject["vNote"] }} className="notes-text" />
        </React.Fragment>
        )
})

export default EditableDiv;