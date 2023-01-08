import { ScrollArea, Stack, Text } from '@mantine/core';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/Common.module.css';

interface GuestbookMessage {
  id: number;
  author: string;
  timestamp: number;
  message: string;
}

export default function Guestbook({
  messages,
}: {
  messages: GuestbookMessage[];
}) {
  const messageElements = messages.map((m) => <Text>{m.message}</Text>);

  return (
    <Layout>
      <Head>
        <title>SerjTubin Guestbook</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Guestbook</h1>
        <ScrollArea style={{ height: 'auto' }}>
          <Stack spacing={10}>{messageElements}</Stack>
        </ScrollArea>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const endpoint =
    process.env.NEXT_PUBLIC_MAIN_API_ENDPOINT + '/board/messages/last/240';

  console.log('getting guestbook messages from:', endpoint);

  let respMessages: GuestbookMessage[];
  try {
    const res = await fetch(endpoint);
    if (res.status >= 300) {
      console.log('error' + res.status);
    } else {
      respMessages = await res.json();
      return {
        props: {
          messages: respMessages,
        },
      };
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
      messages: [],
    },
  };
};
