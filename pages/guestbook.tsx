import {
  Badge,
  Divider,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Center,
} from '@mantine/core';
import { IconMan, IconPencil } from '@tabler/icons';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getTimestampString } from '../shared/libs/common';
import { GuestbookMessage } from '../shared/libs/guestbook/GuestbookMessage';

export default function Guestbook({
  messages,
}: {
  messages: GuestbookMessage[];
}) {
  const messageElements = messages.map((m) => (
    <Group key={m.id}>
      <div style={{ width: 250 }}>
        <Badge
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          fullWidth
        >
          {getTimestampString(new Date(m.timestamp * 1000))}
          <span style={{ color: 'black' }}>@</span>
          {m.author}
        </Badge>
      </div>
      <Text>{m.message}</Text>
    </Group>
  ));

  const [author, setAuthor] = useState('anon');
  const [message, setMessage] = useState('');

  const sendNewMessage = async (author: string, message: string) => {
    if (!message) {
      return;
    }

    const requestBody: {
      author: string;
      message: string;
    } = {
      author: author ? author : 'anon',
      message: message,
    };

    const endpoint =
      process.env.NEXT_PUBLIC_MAIN_API_ENDPOINT + '/board/messages/new';

    const response = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status >= 300) {
      response.text().then((text) => {
        console.error(text);
      });
      return;
    }

    const respData = await response.text();
    console.log('resp', respData);
    const newMessageId = respData.split(':')[1];
    console.warn(newMessageId);

    // TODO: refresh messages
  };

  return (
    <Layout>
      <Head>
        <title>SerjTubin Guestbook</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Center>
          <h1>Guestbook</h1>
        </Center>
        <Stack style={{ marginTop: 0, marginBottom: 'auto' }}>
          <Grid>
            <Grid.Col span={4}>
              <TextInput
                value={author}
                onChange={(event) => setAuthor(event.currentTarget.value)}
                onKeyUp={(event) => {
                  if (event.code === 'Enter') {
                    sendNewMessage(author, message);
                  }
                }}
                placeholder="anon"
                icon={<IconMan size={14} />}
                label="Author"
                radius="md"
                styles={(theme) => ({
                  input: {
                    '&:focus-within': {
                      borderColor: theme.colors.blue[7],
                    },
                  },
                })}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <TextInput
                value={message}
                onChange={(event) => setMessage(event.currentTarget.value)}
                onKeyUp={(event) => {
                  if (event.code === 'Enter') {
                    sendNewMessage(author, message);
                  }
                }}
                placeholder="Message here..."
                icon={<IconPencil size={14} />}
                label="Message"
                radius="md"
                withAsterisk
                styles={(theme) => ({
                  input: {
                    '&:focus-within': {
                      borderColor: theme.colors.blue[7],
                    },
                  },
                })}
              />
            </Grid.Col>
          </Grid>

          <Divider />

          <ScrollArea style={{ height: 'auto' }}>
            <Stack spacing={10}>{messageElements}</Stack>
          </ScrollArea>
        </Stack>
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
