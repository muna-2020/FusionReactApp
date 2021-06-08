//Base classes.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name PageLanguageArea_ModuleProcessor
 * @summary Module object for PageLanguageArea component.
 * */
class PageLanguageArea_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module.
     * @return {Array} Array of object list.
     */
    static StoreMapList() {
        return [
            { StoreKey: "EditorState", DataKey: "blnIsLanguageIdChanged" }
        ];
    }
}

export default PageLanguageArea_ModuleProcessor;
