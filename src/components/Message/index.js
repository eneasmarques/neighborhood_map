import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

import { Container } from './styles';

export default function Message({ msg }) {
  if (msg) {
    return (
      <Container>
        <FaMapMarkerAlt />
        <h1>{msg}</h1>
      </Container>
    );
  }
}
