//React imports
import React from 'react';

//UndoRedo Imports
import { UndoRedo } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

//Performance related imports.
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @name ElementWrapper
 * @sumamry Returns a memoized instance of CMS<Element>_Editor. Now, if a new element is added then the data of rest of the elements wont be lost. Wraps the element inside undo redo.
 * */
const ElementWrapper = React.memo((props, ref) => {
    let Element = UndoRedo(props.ElementProps.ComponentController.GetElement(props.ElementProps.ElementJson["vElementTypeName"]));
    let intElementId = props.ElementProps.ElementJson.iElementId;
    let strElementType = props.ElementProps.ElementJson.vElementTypeName;
    var blnRenderElement = props.ElementProps.IsForServerRenderHtml ? props.ElementProps.JConfiguration["SSR_Editor"]["InteractionTypes"].includes(strElementType) ? true : false : true;
    return (
        <PerformanceProfiler ComponentName={"CMS" + strElementType + "_Editor_" + intElementId} JConfiguration={props.ElementProps.JConfiguration}>
            {blnRenderElement === true ? <Element {...props.ElementProps} /> : <React.Fragment />}
        </PerformanceProfiler>
    );
}, (prevProps, nextProps) => {
        return prevProps.ElementProps.ElementJson.iElementId === nextProps.ElementProps.ElementJson.iElementId && (nextProps.ElementProps.ElementJson.Ref && nextProps.ElementProps.ElementJson.Ref.current !== null);
});

export default ElementWrapper;
