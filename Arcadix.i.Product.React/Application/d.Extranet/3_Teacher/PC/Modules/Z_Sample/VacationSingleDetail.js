import { connect } from 'react-redux'
import React from 'react';

function mapStateToProps(state) {
    return {
        selectedItem: state.ApplicationState.selectedItem ? state.ApplicationState.selectedItem : {}      
        
    }
}
class VacationSingleDetail extends React.Component {
    constructor(props) {
        super(props);        
    }
    render() {
        var selectedItemData = this.props.selectedItem ? this.props.selectedItem : {}   
      

        return (
            
            <div className="hdrTop ">
                <h2 className="pageTitle m0">Selected Vacation Details</h2>

                <div className="tableSection clear">
                    {this.props.selectedItem ? <table className="pupilTestDetailsTbl wid100">
                        <tbody>

                            <tr><td>UserId</td><td>{selectedItemData.uID}</td></tr>
                            <tr><td>FromDtae</td><td>{selectedItemData.FromDate}</td></tr>
                            <tr><td>ToDate</td><td>{selectedItemData.ToDate}</td></tr>
                            <tr><td>Reason</td><td>{selectedItemData.Reason}</td></tr>
                            <tr><td>Location</td><td>{selectedItemData.Location}</td></tr>
                            <tr><td>DateCreatedOn</td><td>{selectedItemData.dtCreatedOn}</td></tr>
                            <tr><td>DateModifiedOn</td><td>{selectedItemData.dtModifiedOn}</td></tr>




                        </tbody>
                    </table> : <div></div>}     
                                     
                   
                </div>
                </div> 
        );
    }

}

export default connect(mapStateToProps)(VacationSingleDetail);