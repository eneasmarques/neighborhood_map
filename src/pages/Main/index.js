import React, { Component } from 'react';
import foursquare from 'react-foursquare';

import Map from '../../components/Map/index';
import Search from '../../components/Search/index';
import Message from '../../components/Message/index';

import { Container } from './styles';

// Chaves de acesso para API do Foursquare
const foursquareKey = foursquare({
  clientID: 'B0QA5HQ0KEEUZKX34G520CVXTHX23KVEETRLCH0X24OWDSHV',
  clientSecret: 'Y3CX4R5CFIN0I5HID0ZE3JHH40XWYRMD1SDADFWZSE4S2DUS',
});

// Chave de acesso a API do Google Maps
const googleMapkey = 'AIzaSyDfVA8W2Ve5ez6bOxJPgPini3K3H8loSQ4';

// Valores iniciar de latitude e longitude
const lat = -2.7963467;
const lng = -40.5181817;
const params = {
  ll: `${lat},${lng}`,
  limit: 5,
};

export default class Main extends Component {
  // markers = lugares listados no mapa
  // isLoaded = verifica se as informações do mapa foram carregadas
  state = {
    markers: [],
    isLoaded: false,
  };

  componentDidMount() {
    // buscando lugares
    foursquareKey.venues
      .recommendations(params)
      .then(res => {
        const { code, errorType, errorDetail } = res.meta;

        // caso retorne algum erro será atribuído a error para que
        // seja mostrado para o usuário
        if (errorType) {
          this.setState({
            msg: `Code:${code}
            Type:${errorType}
            Detail:${errorDetail}`,
          });
          return;
        }

        const { results } = res.response.group;

        const markers = results.map(marker => {
          return {
            id: marker.venue.id,
            location: {
              lat: marker.venue.location.lat,
              lng: marker.venue.location.lng,
            },
            name: marker.venue.name,
            address: marker.venue.location.address,
            photo: `${marker.photo.prefix}200${marker.photo.suffix}`,
            isOpenInfo: false,
            isOpenMarker: true,
          };
        });

        // atribuindo o lugares retornados a markers
        // atribuindo true a isLoaded para que o mapa possa ser gerado
        this.setState({ markers, isLoaded: true });
      })
      .catch(error => {
        this.setState({ isLoaded: false, msg: error.message });
      });
    window.gm_authFailure = () => {
      this.setState({
        isLoaded: false,
        msg: 'Google Maps JavaScript API error.',
      });
    };
  }

  // altera o valor do estado do lugar enviado como parâmetro
  // para que seja aberto o InfoWindow
  showInfo = marker => {
    const { markers } = this.state;

    const updateMarkers = markers.map(m => {
      return {
        ...m,
        isOpenInfo: marker ? m.id === marker.id : false,
      };
    });

    this.setState({ markers: updateMarkers });
  };

  // recebe lista de lugares pesquisados
  // mostra apenas os lugares enviados como parâmetro
  showMarker = searchMarkers => {
    const { markers } = this.state;
    const updateMarkers = markers.map(marker => {
      return {
        ...marker,
        isOpenMarker: !!searchMarkers.find(searchMarker => {
          return searchMarker.id === marker.id;
        }),
      };
    });
    this.setState({ markers: updateMarkers });
  };

  render() {
    const { markers, isLoaded } = this.state;

    const msg =
      this.state.msg && this.state.msg.length > 0
        ? this.state.msg
        : 'Loading...';

    return !isLoaded ? (
      <Message msg={msg} />
    ) : (
      <Container>
        <Search
          markers={markers}
          showInfo={this.showInfo}
          showMarker={this.showMarker}
        />
        <div className="map" role="region" aria-label="map">
          <Map
            role="region"
            aria-label="map"
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapkey}&v=3`}
            defaultCenter={{ lat, lng }}
            defaultZoom={16}
            markers={markers}
            showInfo={this.showInfo}
          />
        </div>
      </Container>
    );
  }
}
