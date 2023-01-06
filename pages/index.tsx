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
  const page = 1;
  const size = 5;
  const endpoint =
    process.env.NEXT_PUBLIC_MAIN_API_ENDPOINT +
    `/blog/page/${page}/size/${size}`;

  console.log('getting blogs from:', endpoint);

  let postsCount = 0;
  try {
    const res = await fetch(endpoint);

    if (res.status >= 300) {
      console.log('error' + res.status);
    } else {
      const posts = await res.json();
      console.log('successfully fetched posts');
      console.log(JSON.stringify(posts));
      postsCount = posts.total;
    }
  } catch (e) {
    if (typeof e === 'string') {
      console.log('str err:', e.toUpperCase());
    } else if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log('unkown error');
    }
  }

  return {
    props: {
      examplePost: `Received ${postsCount} blog posts will appear here`,
    },
  };
};
