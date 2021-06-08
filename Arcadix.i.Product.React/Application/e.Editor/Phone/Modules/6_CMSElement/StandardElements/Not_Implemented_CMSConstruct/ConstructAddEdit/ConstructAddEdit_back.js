import React, { Component } from "react";
import FileUpload from '../../../../Framework/Controls/FileUpload/FileUpload';
import { connect } from 'react-redux';
import ArcadixFetchandCacheData from '../../../../Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '../../../../Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchData from '../../../../Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import TreeView from '../AddEditTree/TreeView';
import ConstructPreview from './ConstructPreview/ConstructPreview';
function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            textresource: state.Entity.textresource,
            imageaddedit: state.Entity.constructaddedit,
            arrNodes: state.ApplicationState.arrConstructNodes
        };
    } else {
        return {};
    }
}
class ConstructAddEdit extends Component {

    constructor(props) {
        super(props);
        //  window.ServerJSON = ImgUploadJSON;
        this.displayConstructDetail = this.displayConstructDetail.bind(this);


        this.state = {
            tabId: 0,
            JSONData: this.props.constructaddedit ? this.props.constructaddedit.Data[0] : {},
            arrNodes: [],
            objSelectedConstructDetail: null,
            SavedFileName: '',
            SavedJSONData: {},
            SelectedImage: {},
            SelectedConstruct: {},
            TreeProps: this.props.constructaddedit ? this.listToTree(props.constructaddedit.Data) : false



        }
        this.OkActionClick = this.OkActionClick.bind(this);

    }

    OkActionClick() {
        this.removePopUp();
        if (this.state.tabId === 0) {
            if (this.state.SavedJSONData) {
                JConstructAddEditAndInsert_OkClick({
                    ActiveTab: this.state.tabId, ConstructProperties: {
                        ConstructId: this.state.SelectedConstruct.ConstructId,
                        ConstructType: this.state.SelectedConstruct.ConstructType,
                        ConstructElementId: this.state.SelectedConstruct.ConstructElementId
                    }
                });
            }
        }
        else {
            if (this.state.SelectedImage) {
                JConstructAddEditAndInsert_OkClick({
                    ActiveTab: this.state.tabId,
                    ImageProperties: {
                        ImageId: this.state.SelectedImage.ImageId,
                        ImageType: this.state.SelectedImage.ImageType
                    }
                });
            }
        }
    }
    componentWillMount() {
        //  this.generateTreeArray();
    }
    componentDidMount() {
        console.log('running constructaddedit component');
        if (!this.props.constructaddedit && !this.props.arrNodes) {
            var objArcadixFetchAndCacheData = new ArcadixFetchandCacheData();
            var objDataCalls = ConstructAddEdit.InitialDataParams(JConfiguration);
            objArcadixFetchAndCacheData.GetData(objDataCalls.DataCalls, (result) => {
                console.log("c result", result);
                this.generateTreeArray(result);
            });
        }
    }
    static InitialDataParams(JConfiguration, objParams) {

        let arrDataRequest = [
            {
                "URL": "API/Editor/Modules/ConstructAddEdit/ConstructAddEdit",

            }
        ];
        var objResourceParams = {
            "SearchKeys": {
                "must": [
                    {
                        "match": {
                            "Id": JConfiguration.LanguageCultureInfo + "/Editor/Modules/ConstructAddEdit"
                        }
                    }
                ]
            }
        };
        let arrResourceRequest = [
            {
                "URL": "API/Object/Blocks/TextResource/TextResource",
                "Params": objResourceParams
            }
        ];
        return { "DataCalls": arrDataRequest, "ResourceCalls": arrResourceRequest };
    }
    addImageUploader() {
        console.log('addding image uploader........');
        this.props.addPopUp({
            popUpName: ''
        })
    }
    displayConstructDetail(objNode) {
        ArcadixFetchData.GetData("api/editor/modules/constructaddedit/getdata", { ConstructId: objNode.Id }, (objResult) => {
            console.log("objResult", objResult);

            this.setState({
                SelectedConstruct: { ConstructId: objNode.Id, ConstructType: objNode.Type, ConstructElementId: objNode.ConstructElementId },
                objSelectedConstructDetail: {
                    ...objResult.Response.constructelementproperties.Data[0]
                }
            })
        });


        //   window.ImageDetails = ImageDetailJSON['Data']['GetPropertyDetailsData']
        console.log("constructId", objNode.Id);
    }
    renderPreview() {
        if (typeof (JObjectUtility_RestoreXMLWithSymbol) != 'undefined') {
            if (this.state.objSelectedConstructDetail) {
                return (<ConstructPreview ConstructHTML={JObjectUtility_RestoreXMLWithSymbol(this.state.objSelectedConstructDetail.BasicProperties.ElementHtml.HTML)} ConstructScript={JObjectUtility_RestoreXMLWithSymbol(this.state.objSelectedConstructDetail.BasicProperties.ElementHtml.Script)} />);
            }
            else {
                return "";
            }
        }
        else {
            return "";
        }
    }
    generateTreeArray(result) { // generates tree from the array 
        // generates tree from the array
        if (result && !this.props.arrNodes) {
            let arrSevNodes = result.constructaddedit.Data;

            ApplicationState.SetProperty("arrConstructNodes", this.listToTree([...arrSevNodes]));
        }


    }
    listToTree(list) {  // method to convert a list to tree based on parent child relation
        debugger
        console.log('list', list);
        var map = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i]['Id']] = i; // initialize the map
            list[i].children = []; // initialize the children
            list[i].expanded = false;
            list[i].deleted = false;
            list[i].folderId = i + 1;
            list[i].leaf = list.find(a => a['PId'] === list[i]['Id']) === undefined; // node which is not having any childs 
        }

        for (i = 0; i < list.length; i += 1) {
            node = list[i];

            if (node['PId'] !== "-1") { // remove nodes which are root nodes and without parent

                if (map[node['PId']] !== undefined) {  // check node's parent is present or not 
                    list[map[node['PId']]].children.push(node);
                }
                else {

                    console.log('parent node is not present', node);  // log the nodes without parent node
                }


            } else {
                roots.push(node);
            }


        }
        console.log('root', roots);
        return roots;

    }
    removePopUp() {
        console.log('removing from within popup');
        this.props.closePopUp(this.props.objModal);
    }

    conditionalRendering() {
        if (this.state.tabId === 1) {  // if tabId = 0 dispay local tab
            return (
                <div>
                    <div className="prgrphSection">
                        <h5 className="prgrphTitle">Eigenschaften Construct</h5>

                        <div className="prgrphRow">
                            <label className="prgrphCol label">Name</label>
                            <input type="text" className="prgrphCol popupIn" />
                            {/* <label className="prgrphCol label">Titel</label>
                            <input type="text" className="prgrphCol popupIn" /> */}
                        </div>
                        <div className="prgrphRow">
                            <label className="prgrphCol label">Logik</label>
                            <input type="checkbox" className="prgrphCol popupIn" />
                            {/* <label className="prgrphCol label">Beschreibung anzeigen</label>
                            <input type="checkbox" className="prgrphCol popupIn" /> */}
                        </div>
                        <div className="prgrphRow">
                            <label className="prgrphCol label">IsConstruc</label>
                            <input type="checkbox" className="prgrphCol popupIn" />
                            <label className="prgrphCol label">IsAnimateCC</label>
                            <input type="checkbox" className="prgrphCol popupIn" />
                            <label className="prgrphCol label">IsCustom</label>
                            <input type="checkbox" className="prgrphCol popupIn" />
                        </div>
                    </div>

                    <div className="prgrphSection">
                        <h5 className="prgrphTitle">Beschreibung</h5>
                        <div className="prgrphRow">
                            <textarea className="textarea" rows={3} />
                        </div>

                    </div>

                    <div className="prgrphSection">
                        <h5 className="prgrphTitle">Construct hochladen</h5>
                        <div className="prgrphRow">
                            <button className="btn btnDflt" >Datei auswahlen</button>
                        </div>
                    </div>
                    <div className="prgrphSection">
                        <h5 className="prgrphTitle">Zip Upload</h5>
                        <div className="prgrphRow">
                            <button className="btn btnDflt" >Datei auswahlen</button>
                        </div>
                    </div>
                </div>



            )
        }
        else if (this.state.tabId === 0 || this.state.tabId === 2) { // if tabId is 1 or 2 display global tab with tree folder as common
            return (
                <div>
                    <div className="tabCntnt">
                        <div className="fL listBlock">
                            <TreeView
                                arrNodes={this.props.arrNodes ? this.props.arrNodes : this.state.TreeProps}
                                // openContextMenu={this.openContextMenu} 
                                addPopUp={this.props.addPopUp}
                                displayNodeDetail={this.displayConstructDetail}
                            />
                        </div>
                        {
                            this.state.objSelectedConstructDetail != null ?
                                <div className="fR propertyWindowBlock">

                                    <table className="propertyWindow__table">
                                        <tbody>
                                            <tr>
                                                <td colSpan={2} className="PopupParagraphTitle">construct</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="ParagraphSubtitle">Properties construct</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="PopupParagraphTitle">Preview</td>
                                            </tr>
                                            {

                                                Object.keys(this.state.objSelectedConstructDetail.BasicProperties).map((key, index) => {
                                                    console.log(key, this.state.objSelectedConstructDetail.BasicProperties[key]);
                                                    if (key !== 'ElementHtml') {
                                                        return (<tr key={index}>
                                                            <td>{key}</td>
                                                            <td>{this.state.objSelectedConstructDetail.BasicProperties[key]}</td>
                                                        </tr>)
                                                    }


                                                })
                                            }
                                            <tr>
                                                <td colSpan={2} className="PopupParagraphTitle">Preview</td>
                                            </tr>
                                            <tr><td colSpan={2}>{this.renderPreview()}</td></tr>



                                        </tbody>
                                    </table>

                                </div>
                                : ""
                        }


                    </div>
                </div>


            )
        }

    }

    render() {
        return (
            <section>
                <div className="popupContent">
                    <div className="tabPanel">
                        <nav>
                            <ul className="tabLists">

                                <li><a href="#" onClick={() =>
                                    this.setState({ tabId: 1 })
                                }>Global</a></li>
                                <li><a href="#" onClick={() =>
                                    this.setState({ tabId: 0 })
                                }>Lokal</a></li>
                                <li><a href="#" >Collection</a></li>
                            </ul>
                        </nav>
                    </div>
                    {
                        this.conditionalRendering()
                    }

                    <footer>
                        <div className="fR">
                            <button className="btn btnOrnge" onClick={() => this.OkActionClick()} >Ok</button>
                            <button className="btn btnOrnge" onClick={this.removePopUp} >Abbrechen </button>
                        </div>

                    </footer>

                </div>
            </section>
        )
    }
}

export default connect(mapStateToProps)(ConstructAddEdit)