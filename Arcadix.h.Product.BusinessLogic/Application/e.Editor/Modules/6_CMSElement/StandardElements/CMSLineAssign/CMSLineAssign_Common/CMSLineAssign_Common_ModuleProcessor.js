//Module related files
import CMSLineAssign_Editor_ContextMenu from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_Editor/CMSLineAssign_Editor_ContextMenu';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name CMSLineAssign_Common_ModuleProcessor
 * @summary Contains the LineAssign's editor version module specific methods.
 * */
class CMSLineAssign_Common_ModuleProcessor extends CMSLineAssign_Editor_ContextMenu {

    /**
     * @name HandleQuestionClick
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objSelectedQuestion selected question value
     */
    HandleQuestionClick(objParams) {
        const { objContext, objSelectedQuestion, objPoints } = objParams;
        let { iElementQuestionId, iSelectedQuestionNumber } = objSelectedQuestion;
        let { x, y, width, height } = objPoints;
        var arrBlnShowQuestionBorder = [...objContext.state.arrBlnShowQuestionBorder];
        var offset = { "x1": x, "y1": y + height / 2 };
        objContext.objLineCoordinates.current = {
            ...objContext.objLineCoordinates.current, [iSelectedQuestionNumber]: offset
        }
        if (objContext.state.arrBlnShowQuestionBorder[iSelectedQuestionNumber]) {
            arrBlnShowQuestionBorder[iSelectedQuestionNumber] = false;
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "arrBlnShowQuestionBorder": arrBlnShowQuestionBorder,
                    "intSelectedQuestionNumber": -1,
                    "iSelectedQuestionId": -1,
                    "blnRerender": false,
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson.vElementJson,
                            ["Values"]: [
                                ...objContext.state.ElementJson.vElementJson.Values.filter(ele => ele["iElementQuestionId"] !== iElementQuestionId)
                            ]
                        }
                    }
                }
            });
        }
        else {
            arrBlnShowQuestionBorder = arrBlnShowQuestionBorder.map((e) => { return false });
            arrBlnShowQuestionBorder[iSelectedQuestionNumber] = true;
            objContext.dispatch({ "type": "SET_STATE", "payload": { "arrBlnShowQuestionBorder": arrBlnShowQuestionBorder, "intSelectedQuestionNumber": iSelectedQuestionNumber, "iSelectedQuestionId": iElementQuestionId } });
        }

    }

    /**
     * @name HandleAnswerClick
     * @param {object} objContext
     * @param {object} objSelectedAnswer
     */
    HandleAnswerClick(objParams, blnUserAnswered = true) {
        const { objContext, objSelectedAnswer, objPoints } = objParams;
        let { iElementAnswerId, iSelectedAnswerNumber } = objSelectedAnswer;
        let { x, y, width, height } = objPoints;
        var arrFilteredValues = objContext.state.ElementJson.vElementJson.Values.filter(ele => ele["iElementAnswerId"] === iElementAnswerId && ele["iElementQuestionId"] === objContext.state.iSelectedQuestionId);
        if (objContext.state.intSelectedQuestionNumber > -1 && objContext.state.iSelectedQuestionId > -1 && arrFilteredValues.length === 0) {
            const { x1, y1 } = objContext.objLineCoordinates.current[objContext.state.intSelectedQuestionNumber];
            let objValue = {
                "iElementValueId": UniqueId.GetUniqueId(),
                "iElementQuestionId": objContext.state.iSelectedQuestionId,
                "iElementQuestionNumber": objContext.state.intSelectedQuestionNumber,
                "iElementAnswerId": iElementAnswerId,
                "iElementAnswerNumber": iSelectedAnswerNumber,
                "points": { x1, y1, "x2": x, "y2": y + height / 2 }
            };
            if (blnUserAnswered) {
                objValue = { ...objValue, "cIsUserAnswered": "Y"}
            }
            objContext.dispatch({
                "type": "SET_STATE", "payload": {
                    "ElementJson": {
                        ...objContext.state.ElementJson,
                        ["vElementJson"]: {
                            ...objContext.state.ElementJson.vElementJson,
                            ["Values"]: [
                                ...objContext.state.ElementJson.vElementJson.Values,
                                objValue
                            ]
                        }
                    }
                }
            });
        }
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSLineAssign/CMSLineAssignStyles.css"]
    };
}

export default CMSLineAssign_Common_ModuleProcessor;