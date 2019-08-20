import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { Info } from './styles';

export default class MapMarker extends Component {
  render() {
    const { markers, showInfo } = this.props;

    return (
      markers &&
      markers.map(
        marker =>
          marker.isOpenMarker && (
            <Marker
              key={marker.id}
              position={{
                lat: marker.location.lat,
                lng: marker.location.lng,
              }}
              onClick={() => showInfo(marker)}
              tabIndex={0}
            >
              {marker.isOpenInfo && (
                <InfoWindow onCloseClick={() => showInfo()}>
                  <Info aria-label="Location Details">
                    <h1>{marker.name}</h1>
                    <p>{marker.address}</p>
                    <img src={marker.photo} alt={marker.name} />
                    <p>Font: Foursquare API</p>
                  </Info>
                </InfoWindow>
              )}
            </Marker>
          )
      )
    );
  }
}
