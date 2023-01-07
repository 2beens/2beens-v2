import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import AppCtx, { AppContextInterface } from '../contexts/app';
import { useLocalStorage, useToggle } from '@mantine/hooks';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [showNavbar, toggleNavbar] = useToggle([true, false]);
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'dark',
  });

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));

  const appContext: AppContextInterface = {
    name: 'Using React Context in a Typescript App!!',
    // TODO: fix this
    // @ts-ignore
    apiVersion: props.versionInfo,
    showNavbar: showNavbar,
    toggleNavbar: toggleNavbar,
    colorScheme: colorScheme,
    toggleColorScheme: toggleColorScheme,
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
          colorScheme: colorScheme,
        }}
      >
        <ModalsProvider>
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </AppCtx.Provider>
  );
}

App.getInitialProps = async () => {
  const versionEndpoint =
    process.env.NEXT_PUBLIC_MAIN_API_ENDPOINT + '/version';

  let versionInfo: String;
  try {
    const response = await fetch(versionEndpoint);
    if (!isStatusOK(response.status)) {
      versionInfo = 'error' + response.status;
    } else {
      versionInfo = await response.text();
    }
  } catch (e) {
    if (typeof e === 'string') {
      versionInfo = e.toUpperCase();
    } else if (e instanceof Error) {
      versionInfo = e.message;
    } else {
      versionInfo = 'unkown error';
    }
  }

  return { versionInfo: versionInfo };
};

function isStatusOK(status: number): boolean {
  return status >= 200 && status < 300;
}
