import React, { useReducer, useEffect } from "react";
import * as BusinesssLogic from "@shared/Application/e.Editor/Modules/6_CMSElement/CMSConstruct/ConstructAddEditBusinessLogic/ConstructAddEditBusinessLogic";
import { connect } from "react-redux";
import Tree from "@root/Application/e.Editor/PC/Modules/6_CMSElement/CMSConstruct/ConstructAddEdit/Tree/Tree";
import "@root/Application/e.Editor/PC/Modules/6_CMSElement/CMSConstruct/ConstructAddEdit/ConstructAddEdit.css";
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
//Modules used
import * as Helper from '@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Common/Helper';

const ConstructAddEdit = props => {
    const [state, dispatch] = useReducer(BusinesssLogic.reducer, {
        tabId: 0, // 0 = local , 1 = global , 2 = imageDetail
        arrNodes: [],
        SavedJSONData: {},
        SelectedImage: null
    });

    BusinesssLogic.useDataLoader(props); // custom hook useDatLoader
    BusinesssLogic.useDataLoaded(props, state, dispatch); // cusom hook useDataLoaded

    /**
     * this effect is responsible for adding nodes to store
     */
    useEffect(() => {
        if (props.constructaddedit) {
            dispatch({
                type: "ADDNODES",
                payload: BusinesssLogic.CreateTree(props.constructaddedit["Data"]["Data"])
            });
        }
    }, [props.constructaddedit]);

    /**
     * 
     */
    useEffect(() => {
        console.log("nodes", state.arrNodes);
    }, [state.arrNodes]);

    /**
     * 
     * @param {*} objNode 
     */
    const Nodeclick = objNode => {
        // let arrRequest = [
        //     {
        //         URL: "API/Object/Modules/ImageAddEdit/GetImageElementDetails",
        //         Params: { ImageId: objNode.Id }
        //     }
        // ];
        // ArcadixFetchData.Execute(arrRequest, objResult => {
        //     dispatch({
        //         type: "SETSELECTEDIMAGE",
        //         payload: objResult.imageelementdetails.Data[0]
        //     });
        // });
    };

    // /**
    //  * 
    //  * @param {*} min 
    //  * @param {*} max 
    //  */
    // function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    /**
     * 
     */
    const OkClick = () => {
        let objTextRef = ApplicationState.GetReference("CurrentTextRef");
        if (objTextRef && objTextRef.current && state.SelectedImage) {
            objTextRef.current.RenderImage({
                ...state.SelectedImage,
                ElementJson: {
                    ...state.SelectedImage.ElementJson,
                    iElementId: 0,
                    iElementAccessId: Helper.GetRandomInt(0, 9999999)
                }
            });
            props.closePopUp(props.objModal);
        }
    };

    /**
     * 
     * @param {*} strDate 
     */
    const getDate = (strDate) => {
        var objDate = new Date(strDate);
        return objDate.getDay() + ":" + objDate.getMonth() + ":" + objDate.getFullYear();
    }
    //==============================JSX
    return (
        <section>
            <div className="popupContent">
                <div className="tabPanel">
                    <nav>
                        <ul className="tabLists">
                            <li>
                                <a href="#">Lokal</a>
                            </li>
                            <li>
                                <a href="#">Global</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <div className="image-upload-grid">
                        <div class="folder-tree">
                            <Tree
                                JConfiguration={props.JConfiguration}
                                NodeData={state.arrNodes}
                                NodeClick={Nodeclick}
                            />
                        </div>
                        {!state.SelectedImage ? (
                            <div class="" >
                                <div className="brwsrObjSec prgrphSection">
                                    <h5 className="prgrphTitle">Bild wahlen</h5>
                                    <p>
                                        Ein Bild kann entweder vom Typ "Global" oder "Lokal" sein.
                                        Ein globales Bild steht durch die Objektverwaltung allen
                                        Aufgaben zur Verfugung und kann daher mehrfach verlinkt
                                        werden. Wird ein solches Bild bearbeitet wirkt sich diese
                                        Anderung jedoch auf alle Aufgaben aus in welchen dieses Bild
                                        verlinkt ist. Ein lokales Bild hingegen wird nur fur die
                                        aktuelle Aufgabe eingesetzt und eine Anderung desselben hat
                                        keine Auswirkungen auf andere Aufgaben.
                                   </p>
                                </div>

                                <div className="brwsrObjSec prgrphSection">
                                    <h5 className="prgrphTitle">Globales Bild wahlen:</h5>
                                    <p>
                                        Sie konnen entweder auf ein bereits bestehendes Bild im Baum
                                        klicken oder mit der rechten Maustaste auf einen Ordner im
                                        Baum klicken und ein neues Bild hochladen.
                                   </p>
                                </div>
                                <div className="brwsrObjSec prgrphSection">
                                    <h5 className="prgrphTitle">Lokales Bild wahlen:</h5>
                                    <p>
                                        Klicken Sie auf den Reiter "Lokal" und laden Sie das
                                        gewunschte Bild hoch.
                                   </p>
                                    <p />
                                    <p>
                                        Um das globale oder lokale Bild zu bestatigen klicken Sie im
                                        Fenster unten rechts auf "Ok".
                                   </p>
                                </div>
                            </div>
                        ) : (
                                <div class="object-detail">
                                    <h2>Bild</h2>
                                    <h3>Eigenschaften Bild:</h3>

                                    <table>
                                        <tr>
                                            <td>Name:</td>
                                            <td>{(state.SelectedImage["FileName"]) ? state.SelectedImage["FilePath"]["FileName"] : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Dateityp:</td>
                                            <td>{(state.SelectedImage["FileType"]) ? state.SelectedImage["FilePath"]["FileType"] : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>DateigrĂ¶sse (Kb):</td>
                                            <td>{(state.SelectedImage["FileSize"]) ? state.SelectedImage["FilePath"]["FileSize"] : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Titel:</td>
                                            <td>{(state.SelectedImage["ImageTitle"]) ? state.SelectedImage["FilePath"]["ImageTitle"] : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Titel anzeigen:</td>
                                            <td>{state.SelectedImage["ShowTitle"] && state.SelectedImage["ShowTitle"] === "N" ? "Nein" : "Ja"}</td>
                                        </tr>
                                        <tr>
                                            <td>Beschreibung anzeigen:</td>
                                            <td>{state.SelectedImage["ShowDescription"] && state.SelectedImage["ShowDescription"] === "N" ? "Nein" : "Ja"}</td>
                                        </tr>
                                        <tr>
                                            <td>Druckversion:</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Erstellt am:</td>
                                            <td>{(state.SelectedImage["ElementJson"] && state.SelectedImage["ElementJson"]["dtCreatedOn"]) ? getDate(state.SelectedImage["ElementJson"]["dtCreatedOn"]) : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Bearbeitet am:</td>
                                            <td>{(state.SelectedImage["ElementJson"] && state.SelectedImage["ElementJson"]["dtModifiedOn"]) ? getDate(state.SelectedImage["ElementJson"]["dtModifiedOn"]) : ""}</td>
                                        </tr>
                                    </table>

                                    <h3>
                                        Beschreibung:
                                   </h3>
                                    <p>-</p>
                                    <h2>Vorschau</h2>
                                    <img src={state.SelectedImage["FilePath"]} alt="" />

                                    <h2>Verlinkt in den folgenden Seiten</h2>
                                    <p>
                                        Dieses Bild wird in keiner Seite eingesetzt.
                                    </p>
                                </div>
                            )}
                    </div>
                </div>
                <footer>
                    <div className="fR">
                        <button className="btn btnOrnge" onClick={OkClick}>
                            Ok
                        </button>
                        <button className="btn btnOrnge" onClick={objEvt => props.closePopUp(props.objModal)}>Abbrechen </button>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default connect(BusinesssLogic.mapStateToProps)(ConstructAddEdit);
