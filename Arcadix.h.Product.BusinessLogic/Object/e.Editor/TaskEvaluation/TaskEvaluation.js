//ArcadixFetchData imports
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

/**
 * @name Object_TaskEvaluation_TaskEvaluation
 * @summary Object_TaskEvaluation_TaskEvaluation
 * */
let Object_TaskEvaluation_TaskEvaluation = {

    /**
     * @name EvaluateTask
     * @param {object} objParams Call params
     * @param {any} fnCallback callback for the result
     * @summary Makes an API call to evaluate a task.
     */
    EvaluateTask: (objParams, fnCallback) => {
        let arrParams = [
            {
                "URL": "API/Object/Editor/TaskEvaluation/EvaluateTask",
                "Params": objParams
            }
        ];
        return new Promise((resolve, reject) => {
            ArcadixFetchData.Execute(arrParams, (objReturn) => {
                if (objReturn["taskevaluation"]["Data"].length > 0) {
                    resolve(objReturn["taskevaluation"]["Data"][0]);
                }
                else {
                    resolve(null);
                }
            });
        });
    }
};

export default Object_TaskEvaluation_TaskEvaluation;
