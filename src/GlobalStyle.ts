import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Verdana';
    src: url('./assets/fa-solid-900.woff2');
    display: swap;
  }

  :root {
    --clr-primary: #218380;
    --clr-white: #ffffff;
    --clr-black: #000000;
    --ff-sans-serif: 'Verdana', sans-serif;
    --fs-400: 1rem;
    --fs-600: 1.5rem;
  }

  *,*::after,*::before {
    box-sizing: border-box;
    font-family:inherit;
    font-size:inherit;
    color: inherit;

  }

  body {
    margin: 0;
    padding: 0;
    color: var(--clr-black);
    font-family: var(--ff-sans-serif);
    font-size: var(--fs-400);
    line-height:normal;
    
  }

`;

export default GlobalStyle;
