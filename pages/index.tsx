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
  // TODO: fetch posts

  return {
    props: {
      examplePost: 'TODO: blog posts will appear here',
    },
  };
};
