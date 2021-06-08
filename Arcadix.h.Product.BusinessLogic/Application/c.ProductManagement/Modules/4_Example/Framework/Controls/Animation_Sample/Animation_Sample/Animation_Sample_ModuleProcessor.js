
/**
 * @name Animation_Sample_ModuleProcessor
 * @summary For Setting Application state for blnShowAnimation
 */
class Animation_Sample_ModuleProcessor {

    /**
     * @name MyTimer
     * @summary Setting time for Animation
     */
    MyTimer(objContext) {
           var intInterval = 0;
            intInterval = intInterval + 1;
            if (intInterval % 2 === 1) {
                ApplicationState.SetProperty("blnShowAnimation", true);
                setTimeout(function () {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                }, 5000);               
            } 
    };
}
export default Animation_Sample_ModuleProcessor;