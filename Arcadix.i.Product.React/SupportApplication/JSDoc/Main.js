import React from 'react';
import FileDetails from './Modules/FileDetails/FileDetails'

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
   
    render() {
        return (
            <div>
                <FileDetails JConfiguration={JConfiguration} />
            </div>);
    }
}

export default Main;