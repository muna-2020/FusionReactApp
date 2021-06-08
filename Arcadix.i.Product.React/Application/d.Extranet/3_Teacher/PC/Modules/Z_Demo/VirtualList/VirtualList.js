import React from 'react';
// import ApplicationState from '@root/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchAndCacheData from '@root/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import { connect } from 'react-redux';
import ScrollView from './ScrollView';

function mapStateToProps(state) {
    return {
        subject: state.Entity.subject
    }
}

class VirtualList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            storeData: [],
            isLoaded: false
        };

    }

    componentDidMount() {

        var objParams = {
            "SearchKeys": {
                "must": [
                    {
                        "match": {
                            "iApplicationTypeId": this.props.JConfiguration.ApplicationTypeId
                        }
                    },
                    {
                        "match": {
                            "iTargetDeviceId": 7
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc",
                        "missing": "_last",
                        "unmapped_type": "long"
                    }
                }
            ],
            "OutputColumns": ["iNavigationId", "iParentNavigationId", "vNavigationName", "vNavigationIcon", "iNavigationTypeId", "dtModifiedOn", "vURL", "t_Framework_Navigation_Data.iLanguageId", "t_Framework_Navigation_Data.vNavigationText"]
        };

        let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
        var objParams = 
            {"Params":{
                "URL": "API/Object/Taxonomy/Subject/Subject",
                "Params": {},
                "MethodType":"Get"    
            }};

        var res = new Promise((resolve, reject) => {
            objArcadixFetchAndCacheData.GetData("API/Object/Taxonomy/Subject/Subject",objParams, (objReturn) => {
                resolve(true);
            });
        });

        res.then((value) => {
            if (value == true) {
                this.setState({ storeData: this.props.subject.Data });
                this.setState({ isLoaded: true });
            }
        });

    }

    render() {
        console.log("storeData", this.state.storeData);
        return (
            <div>
                {
                    this.state.isLoaded && <ScrollView data={this.state.storeData} listSize={20} rowHeight={25} />
                }
            </div>
        );
    }
}

export default connect(mapStateToProps)(VirtualList);
