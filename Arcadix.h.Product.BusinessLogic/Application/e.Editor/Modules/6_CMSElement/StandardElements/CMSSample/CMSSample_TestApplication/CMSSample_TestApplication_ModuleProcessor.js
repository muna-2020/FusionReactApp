//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';


/**
 * @name CMSSample_TestApplication_ModuleProcessor
 * @summary Contains the Sample's test application version module specific methods.
 * */
class CMSSample_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name GetElementJsonForComponent
     * @param {object} objContext {state, props, dispatch, CMSSample_TestApplication_ModuleProcessor}
     * @param {object} objLoadSolutionType Load Solution Type
     * @summary Make the values uncheked for the test application version
     * @returns {object} Element Json modified according to test application viewing
     */
    GetElementJsonForComponent(objContext) {
        let objElementJson;
        objElementJson = {
            ...objContext.props.ElementJson,
            ["vElementJson"]: {
                ...objContext.props.ElementJson["vElementJson"],
                ["Values"]: ['SampleValue']
            }
        };
        return objElementJson;
    }

    /**
     * @name GetLoadSolutionType
     * @param {object} objContext {state, props, dispatch, CMSSample_TestApplication_ModuleProcessor}
     * @summary Gets the type of load solution case.
     * @returns {object} Load Solution types.
     */
    GetLoadSolutionType(objContext) {
        let objReturnData = {
            "ViewSolution": false,
            "ViewComparison": false,
            "LoadUserResponse": false
        };
        return objReturnData;
    }

    /**
     * @name OnCheckChange
     * @param {object} objContext {state, props, dispatch, CMSSample_TestApplication_ModuleProcessor}
     * @param {object} objValue Sample value object
     * @summary Trigerred when the Sample is checked/unchecked
     */
    OnClick(objContext, objValue) {
        alert('Clicked From TestApplication');
    }
}

export default CMSSample_TestApplication_ModuleProcessor;
