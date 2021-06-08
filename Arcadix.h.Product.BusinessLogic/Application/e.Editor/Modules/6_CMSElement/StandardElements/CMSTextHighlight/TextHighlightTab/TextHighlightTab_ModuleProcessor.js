// Base Module object
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Application State classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name TextHighlightTab_ModuleProcessor
 * @summary module processor for TextHighlight tab. 
 */
class TextHighlightTab_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name SaveSelectedColor
     * @param {any} objContext
     * @param {any} color
     * @summary This method saves the selected color in texthighlight element.
     */
    SaveSelectedColor(objContext, strSelectedColor, index) {
        var arrBlnShowBorderColor = [...objContext.state.arrBlnShowBorderColor];
        arrBlnShowBorderColor[index] = !arrBlnShowBorderColor[index];
        var arrSelectedColors = [...objContext.state.arrSelectedColors, strSelectedColor];
        var textHighlightRef = EditorState.GetReference(`TextHighlightRef-${EditorState.GetProperty('CurrentTextHighlightId')}`);
        if (textHighlightRef.current.SaveSelectedColor) {
            textHighlightRef.current.SaveSelectedColor(strSelectedColor, arrBlnShowBorderColor[index]);
        }
        objContext.dispatch({ "type": "SET_STATE", "payload": { "arrBlnShowBorderColor": arrBlnShowBorderColor, "arrSelectedColors": arrSelectedColors } });
    }

}

export default TextHighlightTab_ModuleProcessor;