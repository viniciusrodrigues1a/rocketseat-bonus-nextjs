import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';
import Header from '@/components/Header/index';
import GlobalStyle from '../styles/GlobalStyle';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
