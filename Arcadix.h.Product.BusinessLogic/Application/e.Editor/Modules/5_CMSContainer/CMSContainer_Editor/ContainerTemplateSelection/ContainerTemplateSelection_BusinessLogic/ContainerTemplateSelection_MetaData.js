//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Module related imports
import * as CMSContainer_Editor_MetaData from '@shared/Application/e.Editor/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor_MetaData';

//Container Template Controller.
import ContainerTemplateController_Pc from "@root/Application/e.Editor/PC/Controller/ContainerTemplateController/ContainerTemplateController";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

    /**
     * @name GetDefaultContainerObject
     * @param {string} intTemplateId TemplateId of container element.
     * @summary Forms a default object for container
     * @returns {object} Default Container Object
    */
    export const GetDefaultContainerObject = (intTemplateId) => {
        let objContainer = {
            "iContainerId": UniqueId.GetUniqueId(),
            "iContainerTypeId": "5",
            "iOrder": "1",
            "vElementVerticalAlignment": "top",
            "vElementHorizontalAlignment": "center",
            "cShowCalculator": "N",
            "cShowCalculatorOnLoad": "N",
            "cIsQuestionTitleEditable": "N",
            "cIsAnswerTitleEditable": "N",
            "cIsSetHeight": "Y",
            "cIsParentContainer": "N",
            "Elements": [],
            "iContainerTemplateId": intTemplateId
        };
        return objContainer;
    };

    /**
     * @name FormTextElementJson
     * @param {object} objElementDetail 
     * @param {object} objElementJson
     * @summary this form the text elementjson based on type of text. 
     */
    const FormTextElementJson = (objElementDetail, objElementJson) => {
        let objTextJson = {};
        if (objElementDetail.TextType && (objElementDetail.TextType == "Question"||  objElementDetail.TextType == "Answer")) {
            let strText = objElementDetail.TextType === "Question" ? "Aufgabe" : "Antwort";
              objTextJson = {
                  ...BaseCMSElement.AttachRef({
                      ...objElementJson,
                      vElementJson: {
                      ...objElementJson.vElementJson,
                      isQuestionOrAnswerType: "Y",
                      vClassNames: "pink-heading grid-1",
                      vText: strText,
                      },
                      iOrder: objElementDetail.iOrder,
                  }),
              };
        } else {
           objTextJson = objElementJson;
        }
        return objTextJson;
      };
  
      /**
       * @name GetDefaultElementsJson  
       * @summary this add default elements json to the container.
       */
      const AddDefaultElementsToContainerJson = async (arrDefaultElements, objContainerJson) => {
          let arrElementstToAdd = [];
          let arrDefaultElementsToAdd = arrDefaultElements.filter(objTemp => {
              if(objContainerJson.Elements.find(objContainerElement => parseInt(objContainerElement.iOrder) === parseInt(objTemp.iOrder)))
                return false;
              else 
                return true;
          });
          if (arrDefaultElementsToAdd.length > 0) {
               arrElementstToAdd = await Promise.all(arrDefaultElementsToAdd.map(async objTempElement => {
                  let objElementJson = await CMSContainer_Editor_MetaData.GetDefaultElementJson({}, objTempElement.iOrder, objTempElement.vElementTypeName);
                  if(objElementJson.iElementTypeId === 1){
                       objElementJson = FormTextElementJson(objTempElement, objElementJson);                    
                  }
                 return { ...BaseCMSElement.AttachRef(objElementJson) };                             
              }));
           }          
           objContainerJson = {
             ...objContainerJson,
             ["Elements"]: [...objContainerJson.Elements,...arrElementstToAdd],
           };
           return objContainerJson;
      };
  
    /**
     * @name SelectContainer
     * @param {object} objContext {props, state, dispatch}.
     * @param {int} intTemplateId selected template id.
     * @summary update the active container on selecting container.
     */
    export const GetContainerWithDefaultElements =  ( intTemplateId, fnCallback) => {
          let objContainer =  CMSContainer_Editor_MetaData.GetDefaultContainerJson(intTemplateId);
          let objReturnJson;
          (async function(){
            let objTemp = await ContainerTemplateController_Pc.GetTemplate(intTemplateId).load();
            let arrDefaultElements = objTemp.default.GetDefaultElements();
             objReturnJson =  await AddDefaultElementsToContainerJson(arrDefaultElements, objContainer);
             fnCallback(objReturnJson);
          })();           
    };

    /**
     * @name GetContainersWithDefaultElements
     * @summary this returns the container with default elements.
     */
   export const GetContainersWithDefaultElements = (arrContainers, fnCallback) => {
    let arrRetunData = [];
    (async function(){
        arrContainers.forEach(async objContainer => {             
            let objTemp = await ContainerTemplateController_Pc.GetTemplate(objContainer.iContainerTemplateId).load();
            let arrDefaultElements = objTemp.default.GetDefaultElements();
            let objReturnJson =  await AddDefaultElementsToContainerJson(arrDefaultElements, objContainer);
            arrRetunData = [...arrRetunData, objReturnJson];
        });    
       fnCallback(arrRetunData);
    })();           
   };

   /**
    * @name GetPageJsonWithDefaultElements
    * @param {array} arrPageJsons 
    * @param {callback} fnCallback 
    * @summary return pagejson with default elements.
    */
   export const GetPageJsonWithDefaultElements = (arrPageJsons, fnCallback) => {
        (async function(){
            let arrPageJson = [];
            let arrPagePromises = [];
        arrPageJsons.forEach(objPage => {
            arrPagePromises.push(new Promise((pageResolve) => {
                let arrContainer = [];
                let arrContainerPromises = [];
                objPage.Containers.forEach(objContainer => {
                    arrContainerPromises.push(new Promise((containerResolve) => {
                        ContainerTemplateController_Pc.GetTemplate(objContainer.iContainerTemplateId).load().then(objTemp => {
                            let arrDefaultElements = objTemp.default.GetDefaultElements();
                             AddDefaultElementsToContainerJson(arrDefaultElements, objContainer).then(objUpdateContainer => {
                                arrContainer = [...arrContainer, {...objUpdateContainer}];
                                containerResolve();
                            });
                        });
                    }))
                });
                Promise.all(arrContainerPromises).then(() => {
                    arrPageJson = [...arrPageJson,{ ...objPage,"Containers" : arrContainer}];
                    pageResolve();
                }); 
            }));
        });
        Promise.all(arrPagePromises).then(() => {
            fnCallback(arrPageJson);
        })       
        })();         
   };

    /**
     * @name GetTabDataObject
     * @returns {object} returns template and tab mapping object
     * */
    export const GetTabDataObject = () => {
        return {
            "ContainerTemplateInfo": {
                "TabInfo": [
                    {
                        "TabContent": [
                            { "iContainerTemplateId": "35" },
                            { "iContainerTemplateId": "36" }
                        ]
                    },
                    {
                        "TabContent": [
                            { "iContainerTemplateId": "37" },
                            { "iContainerTemplateId": "56" },
                            { "iContainerTemplateId": "35" },
                            { "iContainerTemplateId": "53" },
                            { "iContainerTemplateId": "27" }
                        ]
                    },
                    {
                        "TabContent": [
                            { "iContainerTemplateId": "34" },
                            { "iContainerTemplateId": "55" },
                            { "iContainerTemplateId": "36" },
                            { "iContainerTemplateId": "41" }
                        ]
                    },
                    {
                        "TabContent": [
                            { "iContainerTemplateId": "39" },
                            { "iContainerTemplateId": "40" },
                            { "iContainerTemplateId": "54" }
                        ]
                    }
                ]
            }
        };
    };