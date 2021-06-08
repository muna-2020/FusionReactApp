// React related impoprts.
import React, { useReducer, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import AddEdit from './AddEdit'
import * as Book_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Practice/Book/Book_Hook';
import * as Book_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Practice/Book/Book_MetaData';
import Book_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Practice/Book/Book_ModuleProcessor';
import  Object_SupportApplication_Demo_Book from '@shared/Object/SupportApplication/Demo/Practice/Book/Book';

//Components used in module.
import Grid from '@root/Framework/Blocks/Grid/Grid';

const Book = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Book_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["Book_ModuleProcessor"]: new Book_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Book_Hook, that contains all the custom hooks.
    * @returns null
    */
    Book_Hook.Initialize(objContext);
    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        let objTextResource = { Text: Object_Framework_Services_TextResource.GetData("/l.Demo/Modules/Book", props) };
        let intApplicationTypeForLanguageData = 7;
        let objData = {
            LanguageData: objContext.Book_ModuleProcessor.GetMultiLanguageData(props.Object_Cockpit_MainClient_MainClientLanguage["Data"], props.Object_Cockpit_Language["Data"], intApplicationTypeForLanguageData),
            RowData: props.Object_SupportApplication_Demo_Book["Data"],
            Filter: state.objFilter
        };
        
        
        return (
            //<div className="subject-container">
            //    <Grid
            //        Meta={Book_MetaData.GetMetaData()}
            //        Resource={objTextResource}
            //        Data={objData}
            //        //JConfiguration={props.JConfiguration}
            //        //Events={objContext.Book_ModuleProcessor.GetEvents(objContext)}
            //        CallBacks={objContext.Book_ModuleProcessor.GetCallBacks(objContext)}
            //        //ParentProps={{ ...props }}
            //        //ImagePath={props.JConfiguration.CockpitSkinPath + "/Images/Common/Icons/"}
            //    />
            //</div>
            <div>
                <h2>Books</h2>
                <table>
                    <tr>									
                        <th>BookId</th> &nbsp;
                        <th>GenreId</th> &nbsp;
                        <th>Edition</th>&nbsp;
                        <th>BookName</th>&nbsp;
                        <th>Author</th>&nbsp;
                        <th>Publisher</th>&nbsp;
                        <th>LanguageId</th>&nbsp;
                    </tr>
                    {props.Object_SupportApplication_Demo_Book["Data"].map((objValue, intIndex) => {
                        return (
                            objValue.cIsDeleted =='N' ?
                            <tr key={intIndex}>
                                <td>{objValue.uBookId}</td>&nbsp;
                                <td>{objValue.iGenreId}</td>&nbsp;
                                <td>{objValue.iEdition}</td>&nbsp;
                                <td>{objValue.t_Fusion_Demo_Book_Data[0].vBookName}</td>&nbsp;
                                <td>{objValue.t_Fusion_Demo_Book_Data[0].vAuthor}</td>&nbsp;
                                <td>{objValue.t_Fusion_Demo_Book_Data[0].vPublisher}</td>&nbsp;
                                <td>{objValue.t_Fusion_Demo_Book_Data[0].iLanguageId}</td>&nbsp;
                                <td><button onClick={() =>
                                        dispatch({ type: "SET_STATE", payload: { objEditValue: objValue, blnIsEdit: true } })
                                    }>Edit</button></td>    
                            </tr> : null
                        );
                    })
                    }
                </table>
            
                <React.Fragment>
                    {state.blnIsEdit ? <table>
                        <tr>
                            <td>GenreId</td>
                            <td><input type="text" value={state.objEditValue.iGenreId} onChange={(e) => StateChange(e.target.value, objContext,"iGenreId","" )} /></td>
                        </tr>
                        <tr>
                            <td>Edition</td>
                            <td><input type="text" value={state.objEditValue.iEdition} onChange={(e) => StateChange(e.target.value, objContext, "iEdition", "")} /></td>
                        </tr>
                        <tr>
                            <td>BookName</td>
                            <td><input type="text" value={state.objEditValue.t_Fusion_Demo_Book_Data[0].vBookName} onChange={(e) => StateChange(e.target.value, objContext, "vBookName", "t_Fusion_Demo_Book_Data")} /></td>
                        </tr>
                        <tr>
                            <td>Author</td>
                            <td><input type="text" value={state.objEditValue.t_Fusion_Demo_Book_Data[0].vAuthor} onChange={(e) => StateChange(e.target.value, objContext, "vAuthor", "t_Fusion_Demo_Book_Data")}/></td>
                        </tr>
                        <tr>
                            <td>Publisher</td>
                            <td><input type="text" value={state.objEditValue.t_Fusion_Demo_Book_Data[0].vPublisher} onChange={(e) => StateChange(e.target.value, objContext, "vPublisher", "t_Fusion_Demo_Book_Data")}/></td>
                        </tr>
                        <tr>
                            <td>LanguageId</td>
                            <td><input type="text" value={state.objEditValue.t_Fusion_Demo_Book_Data[0].iLanguageId} onChange={(e) => StateChange(e.target.value, objContext, "iLanguageId", "t_Fusion_Demo_Book_Data")}/></td>
                        </tr>
                        <tr>
                            <button onClick={() => Object_SupportApplication_Demo_Book.EditData({ "vEditData": objContext.state.objEditValue, ["uUserId"]: "7F0D1721-1A1B-4858-9FCC-AFBCE02B6BB8" },
                                (objReturn) => { dispatch({ type: "SET_STATE", payload: { objEditValue: {}, blnIsEdit: false } }) })}>Save</button>&nbsp;&nbsp;
                            <button onClick={() => Object_SupportApplication_Demo_Book.DeleteData({ "vDeleteData": objContext.state.objEditValue, ["uUserId"]: "7F0D1721-1A1B-4858-9FCC-AFBCE02B6BB8" }, (objReturn) => { dispatch({ type: "SET_STATE", payload: { objEditValue: {}, blnIsEdit: false } }) })}>Delete</button>&nbsp;&nbsp;
                            <button onClick={() => dispatch({ type: "SET_STATE", payload: { objEditValue: {}, blnIsEdit: false } }) }>Cancel</button>
                        </tr>

                    </table>
                        : <table>
                            <tr>
                                <td>GenreId</td>
                                <td><input type="text" value={state.objAddValue.iGenreId ? state.objAddValue.iGenreId : "" } onChange={(e) => StateChange(e.target.value, objContext, "iGenreId", "", false)} /></td>
                            </tr>
                            <tr>
                                <td>Edition</td>
                                <td><input type="text" value={state.objAddValue.iEdition ? state.objAddValue.iEdition : "" } onChange={(e) => StateChange(e.target.value, objContext, "iEdition", "", false)}/></td>
                            </tr>
                            <tr>
                                <td>BookName</td>
                                <td><input type="text" value={state.objAddValue.t_Fusion_Demo_Book_Data ? state.objAddValue.t_Fusion_Demo_Book_Data[0].vBookName : ""}  onChange={(e) => StateChange(e.target.value, objContext, "vBookName", "t_Fusion_Demo_Book_Data", false)}/></td>
                            </tr>
                            <tr>
                                <td>Author</td>
                                <td><input type="text" value={state.objAddValue.t_Fusion_Demo_Book_Data ? state.objAddValue.t_Fusion_Demo_Book_Data[0].vAuthor : ""} onChange={(e) => StateChange(e.target.value, objContext, "vAuthor", "t_Fusion_Demo_Book_Data", false)} /></td>
                            </tr>
                            <tr>
                                <td>Publisher</td>
                                <td><input type="text" value={state.objAddValue.t_Fusion_Demo_Book_Data ? state.objAddValue.t_Fusion_Demo_Book_Data[0].vPublisher : ""} onChange={(e) => StateChange(e.target.value, objContext, "vPublisher", "t_Fusion_Demo_Book_Data", false)} /></td>
                            </tr>
                            <tr>
                                <td>LanguageId</td>
                                <td><input type="text" value={state.objAddValue.t_Fusion_Demo_Book_Data ? state.objAddValue.t_Fusion_Demo_Book_Data[0].iLanguageId : ""} onChange={(e) => StateChange(e.target.value, objContext, "iLanguageId", "t_Fusion_Demo_Book_Data" , false)} /></td>
                            </tr>
                            <tr>
                                <button onClick={() => Object_SupportApplication_Demo_Book.AddData({ "vAddData": objContext.state.objAddValue, ["uUserId"]: "7F0D1721-1A1B-4858-9FCC-AFBCE02B6BB8" }, (objReturn) => { dispatch({ type: "SET_STATE", payload: { objAddValue: {} } }) })}>Add</button>&nbsp;
                            </tr>
                            
                        </table>}

                    
                    
                   
                
            </React.Fragment>
                
            </div>
            
        );
    };

    return (
        <React.Fragment>{
            props.isLoadComplete || state.isLoadComplete ?
                <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />
        }
        </React.Fragment>
    );

}

const StateChange = (strValue, objContext, strCol, strTable, blnIsEdit = true) => {
    if (blnIsEdit) {
        if (!strTable) {
            let objUpdateValue = { ...objContext.state.objEditValue, [strCol]: strValue }
            objContext.dispatch({ type: "SET_STATE", payload: { objEditValue: objUpdateValue } });
        }
        else {
            let objSubTable = { ...objContext.state.objEditValue[strTable][0], [strCol]: strValue }
            let objUpdateValue = { ...objContext.state.objEditValue, [strTable]: [objSubTable] }
            //let objUpdateValue = { ...objContext.state.objEditValue.strTable, [strCol]: strValue }
            objContext.dispatch({ type: "SET_STATE", payload: { objEditValue: objUpdateValue } });
        }
    }
    else {
        if (!strTable) {
            let objUpdateValue = { ...objContext.state.objAddValue, [strCol]: strValue }
            objContext.dispatch({ type: "SET_STATE", payload: { objAddValue: objUpdateValue } });
        }
        else {
            if (!objContext.state.objAddValue[strTable]) {
                var objUpdateValue = { ...objContext.state.objAddValue, [strTable]: [{ [strCol]: strValue }] }
                //let objSubTableValue = {...objContext.state.objAddValue[strTable][0], [strCol]: strValue}
                //var objUpdateValue = { ...objContext.state.objAddValue, [strTable]: [objSubTable] }
            }
            else {
                let objSubTable = {...objContext.state.objAddValue[strTable][0], [strCol]: strValue}
                var objUpdateValue = { ...objContext.state.objAddValue, [strTable]: [objSubTable] }
            }
            objContext.dispatch({ type: "SET_STATE", payload: { objAddValue: objUpdateValue } });
        }

    }
}


/**
* @name InitialDataParams
* @param {object} props props
* @summary required for SSR
* @returns {object} InitialDataParams 
*/
Book.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new Book_ModuleProcessor()).InitialDataParams(props));
};

export default connect(Base_Hook.MapStoreToProps(Book_ModuleProcessor.StoreMapList()))(Book);

