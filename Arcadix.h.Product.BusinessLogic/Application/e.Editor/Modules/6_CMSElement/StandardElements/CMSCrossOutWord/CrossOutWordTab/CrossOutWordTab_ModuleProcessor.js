// Base Module object
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Application State classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CrossOutWord_ModuleProcessor
 * @summary module processor for CrossOutWord tab. 
 */
class CrossOutWord_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name HandleCrossOutWordClick
     * @param {object} objContext
     * @param {string} strCrossOutWordType
     */
    HandleCrossOutWordClick(objContext, strCrossOutWordType) {
        var CrossOutWordRef = EditorState.GetReference(`CrossOutWordRef-${EditorState.GetProperty('CurrentCrossOutWordId')}`);
        if (CrossOutWordRef.current.GetCrossOutWordType) {
            CrossOutWordRef.current.GetCrossOutWordType(strCrossOutWordType);
        }
    }

}

export default CrossOutWord_ModuleProcessor;