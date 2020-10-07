import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';
import GlobalStyle from '../styles/GlobalStyle';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
