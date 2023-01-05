import { Divider, Space, Stack } from '@mantine/core';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';

export default function Home(props: { versionInfo: String }) {
  return (
    <Layout>
      <Head>
        <title>SerjTubin About</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        justify="flex-start"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          height: 300,
        })}
      >
        <h1>About Page</h1>
        <Space h="lg" />
        <Divider my="xs" label="Version info" labelPosition="center" />
        <h2>{props.versionInfo}</h2>
      </Stack>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  return {
    props: {
      versionInfo: versionInfo,
    },
  };
};

function isStatusOK(status: number): boolean {
  return status >= 200 && status < 300;
}
