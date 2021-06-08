import React from 'react';
import * as Common from '@root/Application/e.Editor/PC/Modules/6_CMSElement/CMSEmpty/CMSEmpty_Common/CMSEmpty_Common';
//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

/*
* -------------------Required Imports--------------------------------------------------
*/
import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';
import * as BusinessLogic from '@shared/Application/e.Editor/Modules/6_CMSElement/CMSEmpty/CMSEmpty_Editor/CMSEmpty_Editor';

//---------------------------------------------------------------------------------------

const CMSEmpty_Editor = (props, ref) => {

    /**
     *  Default state Initializationm can be directly copy pasted into the new Element Component change naming convention as per Element
     */
    const [state, dispatch] = useReducer(BusinessLogic.Reducer, UndoRedoInitialize({ ElementJson: props.ElementJson, PageId: props.PageId, ComponentKey: props.ComponentKey, isLoadComplete: false }, props));
    /**
     *  COPY and PASTE this !!!!
     * objContext is craeted to be used in business logic.
     */
    let objContext = { state, dispatch, props };
    /**
     * This is required to be implemented to enable save
     */

    useImperativeHandle(props.ElementRef, () => ({
        GetElementJson: () => {
            // Implement this method as per each Element
        }
    }), [state, props]);

    /**
     * COPY and PASTE this !!!!
     *  used to perform undo-redo.
     */
    useImperativeHandle(props.forwardedRef, () => ({
        UndoRedo: (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, state, dispatch);
        }
    }), [state]);

    /**
     * @name EventHandler
     * @param {HTML_Event} objEvent HTML event.
     * @summary event handler to be snet to commmon method
     */
    const EventHandler = (objEvent) => {
    };


    /**  
     * COPY and PASTE this !!!!
     * This sends state changes images to parent to be used for undo-redo purpose on a container level. 
     */
    useEffect(() => {
        if (props.PreserveElementState) {
            props.PreserveElementState(state.ElementJson.iElementId, state);
        }
    }, [state.StateHistory]);

    return (
        <div>
            {Common.renderCommonJSX({
                EventName: EventHandler
            })}
            <span>Your Editor specific JSX</span>
        </div>
    );
};

/**
 * These steps must always be implemented to allow connect HOC to work with forwardRef HOC.
 * Copy-Paste and then chenge the component name to your component name.
 */
const ConnectedElement = connect(BusinessLogic.MapStateToProps)(CMSEmpty_Editor)
export default Helper.forwardComponent(ConnectedElement);