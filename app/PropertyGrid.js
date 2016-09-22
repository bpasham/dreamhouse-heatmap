import React from 'react';
import * as feed from './feed';


class PropertyGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {properties: []};
    }

    componentDidMount() {
        feed.on("interactions", function(event) {
            let properties = this.state.properties;
            let property = properties.find(property => property.id == event.propertyId);
            if (property) {
                property[event.eventType] = property[event.eventType] + 1;
                var timestamp = Date.now();
                property['new-' + event.eventType] = timestamp;
                this.setState({properties: properties});
                var self = this;
                setTimeout(() => {
                    if (property['new-' + event.eventType] === timestamp) {
                        property['new-' + event.eventType] = false;
                        self.setState({properties: properties});
                    }
                }, 1000);
            }
        }.bind(this));
    }

    componentWillReceiveProps(props) {
        this.setState({properties: props.properties});
    }

    render() {
        let sldsPath = getSLDSPath();
        let rows = this.state.properties.map(property =>
            <tr key={property.id}>
                <td data-label="Address">
                    <div className="slds-truncate">{property.address}</div>
                </td>
                <td data-label="City">
                    <div className="slds-truncate">{property.city}</div>
                </td>
                <td data-label="City">
                    <div className="slds-truncate">{property.state}</div>
                </td>
                <td data-label="Price">
                    <div className="slds-truncate right">{property.price.toLocaleString("en-US", {style:"currency", currency: "USD"})}</div>
                </td>
                <td data-label="View" className={property['new-view']?'new-view':''}>
                    <div className="slds-truncate right">{property.view}</div>
                </td>
                <td data-label="Favorite" className={property['new-favorite']?'new-favorite':''}>
                    <div className="slds-truncate right" >{property.favorite}</div>
                </td>
                <td data-label="Share" className={property['new-appointment']?'new-appointment':''}>
                    <div className="slds-truncate right">{property.appointment}</div>
                </td>
            </tr>
        );
        return (
            <table className="slds-table slds-table--bordered slds-table--cell-buffer">
                <thead>
                <tr className="slds-text-heading--label">
                    <th scope="col">
                        <div className="slds-truncate">Address</div>
                    </th>
                    <th scope="col">
                        <div className="slds-truncate">City</div>
                    </th>
                    <th scope="col">
                        <div className="slds-truncate">State</div>
                    </th>
                    <th scope="col">
                        <div className="slds-truncate right">Price</div>
                    </th>
                    <th scope="col" className="event-col">
                        <div className="slds-truncate right">
                            <span className="slds-icon_container">
                                <svg aria-hidden="true" className="slds-icon  slds-icon-text-default slds-icon--small">
                                    <use xlinkHref={sldsPath + "/assets/icons/utility-sprite/svg/symbols.svg#preview"}></use>
                                </svg>
                                <span className="slds-assistive-text">Warning Icon</span>
                            </span>
                        </div>
                    </th>
                    <th scope="col" className="event-col">
                        <div className="slds-truncate right">
                            <span className="slds-icon_container slds-icon-text-default">
                                <svg aria-hidden="true" className="slds-icon  slds-icon-text-default slds-icon--small">
                                    <use xlinkHref={sldsPath + "/assets/icons/utility-sprite/svg/symbols.svg#favorite"}></use>
                                </svg>
                                <span className="slds-assistive-text">Warning Icon</span>
                            </span>
                        </div>
                    </th>
                    <th scope="col" className="event-col">
                        <div className="slds-truncate right">
                            <span className="slds-icon_container slds-icon-text-default">
                                <svg aria-hidden="true" className="slds-icon  slds-icon-text-default slds-icon--small">
                                    <use xlinkHref={sldsPath + "/assets/icons/utility-sprite/svg/symbols.svg#event"}></use>
                                </svg>
                                <span className="slds-assistive-text">Warning Icon</span>
                            </span>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

};

export default PropertyGrid;