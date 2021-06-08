// React related imports.
import React, { useEffect, forwardRef, useRef } from 'react';

//Application State classes.
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//Component used.
import CMSText_Editor from '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor';

/**
 * @name UndoRedo
 * @param {any} Component
 * @summar this handle the UndoRedo operation for CMSText.
 */
const UndoRedo = (Component) => {
    let WrappedComp = forwardRef((props, ref) => {
        return <Component {...props} UndoRedoRef={ref} />
    });
    return forwardRef((sprops, ref) => {
        let ComponentRef = useRef(null);
        let ComponentKey = "element_" + sprops.ElementJson.iElementId;
        if (sprops.TextEditorId) {
            ComponentKey = "texteditor_" + sprops.ElementJson.iElementId;
        }
        useEffect(() => {
            EditorState.SetReference(ComponentKey, ComponentRef);
        }, [sprops]);
        return (
            <WrappedComp ElementRef={ref} ref={ComponentRef} {...sprops} ComponentKey={ComponentKey} />
        );
    })
};

const WrapperComponent = UndoRedo(CMSText_Editor);

/**
 * @name CMSText_Wrapper
 * @param {object} props props from parent.
 * @param {any} ref ref to component.
 * @summary Wrapper Component for CMSText.
 */
const CMSText_Wrapper = React.memo((props, ref) => {
    return (
        <WrapperComponent {...props} />
    );
}, (prevProps, nextProps) => {
        return prevProps.ElementJson.iElementId === nextProps.ElementJson.iElementId;
});

export default CMSText_Wrapper;
