import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    :root {
        --bg-primary: linear-gradient(#703b09, #632F07);
        --bg-secondary: linear-gradient(#cf8f2e, #A06420);
        --bg-tertiary: #daa972;
        --txt-primary: #222;
        --txt-secondary: #f0f0f0;
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 16px;
        background: var(--bg-primary);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        ::-webkit-scrollbar {
		    width: 0.25rem;
	    }

	    ::-webkit-scrollbar-track {
		    background: var(--bg-secondary);
	    }


	    ::-webkit-scrollbar-thumb {
		    background: var(--bg-primary);
	    }
    }

`;
