import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Objects required for module.
import Object_Framework_Services_TextResource from '@shared/Object/a.Framework/Services/TextResource/TextResource';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

class CMSPunctuations_Common_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList
     * @param {object} props component prop
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + `/e.Editor/Modules/6_CMSElement/CMSPunctuations`];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        // Text Resource
        let arrResourceParams = [`/e.Editor/Modules/6_CMSElement/CMSPunctuations`];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name HandlePunctuationsClick
     * @param {any} objContext {state, props, dispatch}
     * @param {any} strPunctuationValue punctuation html code/symbol 
     */
    HandlePunctuationsClick(objContext, strPunctuationValue, blnPunctuationSymbol = true) {

        //var code = strHtmlCode.replace(/&/g, "&amp");
        //var html = /[a-zA-Z]$/.test(objContext.ContentEditableRef.current.innerHTML) ? `${objContext.ContentEditableRef.current.innerHTML}&nbsp;${strHtmlCode}` : `${objContext.ContentEditableRef.current.innerHTML}${strHtmlCode}`;
        // adding html code for punctuation marks 
        //var strSentence = blnPunctuationSymbol ? `${objContext.ContentEditableRef.current.innerHTML}<span actualtype="punctuation-symbol" code="${code}">${strHtmlCode}</span>&nbsp;` : html;

        // punctuation symbols are added directly
        var strSentence = objContext.state.ElementJson.vElementJson.vSentence;
        if (!blnPunctuationSymbol && /[/?/,/./'/!/:/«/»/-]/g.test(strSentence[strSentence.length - 2])) {
            strSentence = strSentence.trim();
        }
        strSentence = strSentence + strPunctuationValue;
        if (objContext.state.ElementJson.vElementJson.vSentence.length === 0) {
            strSentence = strSentence.replace(/^\s*/, ""); // replace whitespace characters
        }
        objContext.dispatch({
            "type": "SET_STATE", "payload": {
                "blnTextChanged": true,
                "ElementJson": {
                    ...objContext.state.ElementJson,
                    ["vElementJson"]: {
                        ...objContext.state.ElementJson.vElementJson,
                        "vSentence": strSentence
                    }
                },
                "arrLastSentences": [...objContext.state.arrLastSentences, objContext.state.ElementJson.vElementJson.vSentence]
            }
        });
    }

    /**
     * @name RemoveEscapeCharacter
     * @param {any} strHtml
     */
    RemoveEscapeCharacter(strHtml) {
        if (strHtml) {
            const div = document.createElement("div");
            //strHtml = strHtml.replace(/[/?/,/./'/!/:/«/»/-]/g, " ");
            div.innerHTML = strHtml;
            var arrSpanNodes = div.querySelectorAll('[actualtype="punctuation-symbol"]');
            arrSpanNodes.forEach((ele) => {
                var code = ele.getAttribute("code");
                code = code.replace("&amp;", "&");
                ele.innerHTML = code;
            });
            return div.innerHTML.trim();
        }
        else {
            return strHtml.trim();
        }
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props component props.
    * @summary this returns the styles for the SSR.
    */
    GetDynamicStyles(props) {
        return [props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/6_CMSElement/CMSPunctuations/CMSPunctuationsStyles.css"]
    };
}

export default CMSPunctuations_Common_ModuleProcessor;