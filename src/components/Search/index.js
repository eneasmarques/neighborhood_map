import React, { Component } from 'react';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { Container } from './styles';

export default class Search extends Component {
  state = {
    search: '',
    showPlace: false,
    places: [],
  };

  componentDidMount() {
    const { markers } = this.props;
    this.setState({ showPlace: false, places: markers });
  }

  // exibe as informações do lugar selecionado ao teclar clicar
  // em um lugar na lista de lugares ou em algum marcador
  showInfo = marker => {
    const { showInfo } = this.props;
    showInfo(marker);
    this.closeFilterMarkers();
  };

  // exibe as informações do lugar selecionado ao teclar enter
  // na lista de lugares
  handleKeyPress = (e, marker) => {
    if (e.key === 'Enter') {
      this.showInfo(marker);
    }
  };

  // mostra a listagem de lugares com base no valor
  // atribuído no campo de pesquisa
  showFilteredMarkers = async e => {
    this.setState({ search: e.target.value });

    const { markers, showMarker } = this.props;
    const regex = new RegExp(e.target.value, 'gi');
    const places = await markers.filter(({ name }) => name.match(regex));

    showMarker(places);
    this.setState({ places, showPlace: true });
  };

  // fecha a lista de lugares
  // limpa o campo de pesquisa
  closeFilterMarkers = () => {
    this.setState({ showPlace: false, search: '' });
  };

  render() {
    const { search, places, showPlace } = this.state;

    return (
      <Container>
        <h1>Neighborhood Map</h1>
        <input
          type="text"
          placeholder="Search Place"
          aria-label="Search Place"
          onChange={e => this.showFilteredMarkers(e)}
          onFocus={e => this.showFilteredMarkers(e)}
          value={search}
        />

        <ul>
          {showPlace &&
            places.length > 0 &&
            places.map(marker => (
              <li
                key={marker.id}
                onClick={() => this.showInfo(marker)}
                onKeyPress={e => this.handleKeyPress(e, marker)}
                tabIndex="0"
              >
                <FaMapMarkerAlt />
                {marker.name}
              </li>
            ))}
        </ul>
      </Container>
    );
  }
}
