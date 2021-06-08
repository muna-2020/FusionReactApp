import React, { forwardRef } from 'react';

const MultiMediaAddEdit = forwardRef((props, ref) => {

    const Element = props.ComponentController.GetComponent(`${props.Data.MediaType}AddEdit`);

    let { PreSelectNode, ...objData } = props.Data;

    const objElementProps = {
        ...props,
        ["Data"]: !props.Data.PreSelectNode || (props.Data.ActionType && props.Data.ActionType.toLowerCase() === "add") ? {} : {
            ...objData,
            ["ElementJson"]: { ...props.Data.PreSelectNode },
            ["ActionType"]: "edit"
        }
    };

    return (
        <Element ref={ref} {...objElementProps} />
    );
});

export default React.memo(MultiMediaAddEdit);
