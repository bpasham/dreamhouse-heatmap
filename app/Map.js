import React from 'react';
import colors from './colors';
import * as feed from './feed';

class Map extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        let self = this;
        props.properties.forEach(property => {
            L.marker([property.lat, property.long]).addTo(self.map);
        });
    }

    componentDidMount() {
        feed.on("interactions", event => {
            let property = this.props.properties.find(property => property.id == event.propertyId);
            let color = colors[event.eventType];
            let circle = L.circle([property.lat, property.long], 180, {
                color: color,
                weight: 0,
                fillColor: color,
                fillOpacity: 0.8
            }).addTo(this.map);
            setTimeout(function() {
                this.map.removeLayer(circle);
            }.bind(this), 1000);

        });
    }

    render() {
        return (
            <div className="map" ref={el => {
                    if (el && !this.map) {
                        this.map = L.map(el).setView([42.356045, -71.085650], 14);
                        L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC', maxZoom: 16}).addTo(this.map);
                    }
                }
            }>Map</div>
        );
    }

};

export default Map;