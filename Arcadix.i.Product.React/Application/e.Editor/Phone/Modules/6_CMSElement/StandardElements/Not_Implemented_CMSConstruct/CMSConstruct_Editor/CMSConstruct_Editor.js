import React, { useReducer, useImperativeHandle, forwardRef } from 'react'
import * as BusinessLogic from '@shared/Application/e.Editor/Modules/6_CMSElement/CMSConstruct/CMSConstruct_Editor_BusinessLogic/CMSConstruct_Editor_BusinessLogic';
import { ReducerInit, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';
import { useScriptLoader } from '@root/Framework/Blocks/ScriptLoader/ScriptLoader';
//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

const CMSConstruct_Editor = (props, ref) => {
    const [state, dispatch] = useReducer(BusinessLogic.Reducer, ReducerInit({ ElementJson: props.ElementJson, PageId: props.PageId, ComponentKey: props.ComponentKey, isLoadComplete: false }, props))



    /**
     *  used to perform undo-redo
     */
    useImperativeHandle(props.forwardedRef, () => ({
        UndoRedo: (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, state, dispatch);
        }
    }), [state]);

    /**
    * use to get element json for saving as well as to receieve captured user response
    * 
    */
    useImperativeHandle(props.ElementRef, () => ({
        GetElementJson: () => {
            return state.ElementJson;
        }
    }), [state, props])

    //=======JSX
    return (
        <div type="constructinstance">

        </div>
    )
};

export default Helper.forwardComponent(CMSConstruct_Editor);