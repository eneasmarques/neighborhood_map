import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import MapMarker from '../Marker/index';
import { Container } from './styles';

const MapContent = withScriptjs(
  withGoogleMap(props => (
    <Container role="region" aria-label="map">
      <GoogleMap
        defaultZoom={props.defaultZoom}
        defaultCenter={props.defaultCenter}
        defaultOptions={{ mapTypeControl: false }}
      >
        <MapMarker markers={props.markers} showInfo={props.showInfo} />
      </GoogleMap>
    </Container>
  ))
);

export default function Map(props) {
  const { googleMapURL, defaultCenter, defaultZoom, markers, showInfo } = props;

  console.log('Map:'.padEnd(10), typeof showInfo);

  return (
    <MapContent
      googleMapURL={googleMapURL}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      defaultCenter={defaultCenter}
      defaultZoom={defaultZoom}
      markers={markers}
      showInfo={showInfo}
    />
  );
}
