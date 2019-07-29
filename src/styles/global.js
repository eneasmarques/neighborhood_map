import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  text-rendering: optimizeLegibility;
  font-size: 16px;
}

html, body, #root {
  height: 100%;
}

input {
  font-family: Arial, Helvetica, sans-serif;
}

@media (max-width: 768px) {
  body {
    font-size: 10px !important;
  }
}
`;
