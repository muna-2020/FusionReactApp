//Base classes/hooks.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

class CMSText_TestApplication_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name OnStartClick
     * @param {object} objContext { props, state, dispatch,["CMSText_TestApplication_ModuleProcessor"]}.
     * @summary this display the text for a specific time.
     */
    OnStartClick(objContext){
       let intTimeToHide = parseInt(objContext.state.ElementJson.vElementJson.iShowContentTime) * 1000;     
           objContext.dispatch({
             type: "SET_STATE",
             payload: {
              ...objContext.state,
              "HideText" : false,
               ElementJson: {
                 ...objContext.state.ElementJson,
                 vElementJson: {
                   ...objContext.state.ElementJson.vElementJson,
                   cIsToggleText: "N",
                 },
               },
             },
           });

           setTimeout(() => {
             objContext.dispatch({
               type: "SET_STATE",
               payload: {
                ...objContext.state,
                "HideText" : true,
                 ElementJson: {
                   ...objContext.state.ElementJson,
                   vElementJson: {
                     ...objContext.state.ElementJson.vElementJson,
                     cIsToggleText: "N",
                   },
                 },
               },
             });
           }, intTimeToHide);
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props component props.
     * @summary this returns the styles for the SSR.
     */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSText/CMSTextStyles.css"];
    }
}

export default CMSText_TestApplication_ModuleProcessor;
