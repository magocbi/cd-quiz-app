import { createGlobalStyle } from 'styled-components';
// font

const GlobalStyle = createGlobalStyle`


  :root {
    --clr-primary: #218380;
    --clr-white: #ffffff;
    --clr-black: #000000;
    --ff-sans-serif: Verdana, sans-serif;
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

  hr {
    width: 100%;
    color: hsla(0,0%,0%,.15)
  }

`;

export default GlobalStyle;
