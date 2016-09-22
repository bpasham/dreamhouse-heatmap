import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import PropertyGrid from './PropertyGrid';
import * as feed from './feed';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {properties: []};
    }

    componentDidMount() {
        getProperties(properties => {
            this.setState({properties: properties});
            feed.listen(properties);
        });
    }

    render() {
        return (
            <div className="container">
                <Map properties={this.state.properties}/>
                <PropertyGrid properties={this.state.properties}/>
            </div>
        );
    }

};

ReactDOM.render(<App/>, document.getElementById('app'));