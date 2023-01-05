import Head from 'next/head';
import Layout from '../components/Layout';
import { Container, Divider, Stack, Text } from '@mantine/core';
import styles from '../styles/Common.module.css';
import { GetServerSideProps } from 'next';

export default function Home(props: { examplePost: String }) {
  return (
    <Layout home>
      <Head>
        <title>Serj Tubin v2</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Container className={styles.description}>
          <Stack>
            <h1>Work in constant progress 👨🏼‍💻🛠</h1>
            <h3>*attempt to create a personal site with NextJS/React</h3>
            <Divider my="xs" label="Example Post" labelPosition="center" />
            <Text>{props.examplePost}</Text>
          </Stack>
        </Container>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const examplePostEndpoint = '/api/post/100';

  let examplePost: String;
  try {
    const response = await fetch(examplePostEndpoint);
    if (response.status >= 300) {
      examplePost = 'error' + response.status;
    } else {
      examplePost = await response.json();
    }
  } catch (e) {
    if (typeof e === 'string') {
      examplePost = e.toUpperCase();
    } else if (e instanceof Error) {
      examplePost = e.message;
    } else {
      examplePost = 'unkown error';
    }
  }

  return {
    props: {
      examplePost: examplePost,
    },
  };
};
