import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import AppCtx, { AppContextInterface } from '../contexts/app';
import { useToggle } from '@mantine/hooks';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [showNavbar, toggleNavbar] = useToggle([true, false]);
  const appContext: AppContextInterface = {
    name: 'Using React Context in a Typescript App!!',
    showNavbar: showNavbar,
    toggleNavbar: toggleNavbar,
  };

  return (
    <AppCtx.Provider value={appContext}>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <ModalsProvider>
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </AppCtx.Provider>
  );
}
