import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    :root {
        --bg-primary: #703b09;
        --bg-secondary: linear-gradient(#cf8f2e, #bf8129);
        --bg-tertiary: #daa972;
        --txt-primary: #222;
        --txt-secondary: #f0f0f0;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        background: var(--bg-primary);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

`;
