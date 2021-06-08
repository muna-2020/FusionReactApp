
/**
 *@name HintButton_ModuleProcessor
 *@summary for event on click handling methods
 */
class HintButton_ModuleProcessor {

    /**
     * @name HintButtonClick
     * @summary Onclick of Button IsShowHint set to true
     * @param {any} props
     */
    HintButtonClick() {
        ApplicationState.SetProperty('IsShowHint', true);
        ApplicationState.SetProperty('IsShowAdditionalInformation', true);
    }
}

export default HintButton_ModuleProcessor ;

