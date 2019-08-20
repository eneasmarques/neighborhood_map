import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  border-radius: 2px;
  top: 10px;
  left: 10px;
  background: #fff;
  z-index: 10;
  padding: 10px;
  min-width: 350px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;

  h1 {
    font-size: 2em;
    margin-bottom: 10px;
    text-align: center;
  }

  input {
    font-size: 1.3em;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid rgb(0, 0, 0, 0.1);
    color: #333;
    box-shadow: none;
  }

  ul {
    font-size: 1.3em;
    color: #333;
    list-style-type: none;
  }

  li {
    padding: 10px;
    cursor: pointer;
  }

  li:focus {
    background: rgb(0, 0, 0, 0.1);
  }

  li svg {
    margin: 0 10px;
    vertical-align: text-bottom;
  }

  @media (max-width: 768px) {
    min-width: 250px;
  }
`;
