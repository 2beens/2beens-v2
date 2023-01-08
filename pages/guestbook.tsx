import {
  Badge,
  Divider,
  Grid,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { IconMan, IconPencil } from '@tabler/icons';
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
  const messageElements = messages.map((m) => (
    <Group key={m.id}>
      <div style={{ width: 250 }}>
        <Badge
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          fullWidth
        >
          {getTimestampString(new Date(m.timestamp * 1000))} @{m.author}
        </Badge>
      </div>
      <Text>{m.message}</Text>
    </Group>
  ));

  return (
    <Layout>
      <Head>
        <title>SerjTubin Guestbook</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1>Guestbook</h1>

        <Stack>
          <Grid>
            <Grid.Col span={4}>
              <TextInput
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
  //   const exampleMessages = `
  // [{"id":0,"author":"serj","timestamp":1593969797,"message":"aaaa"},{"id":1,"author":"anon","timestamp":1593969813,"message":"blabla"},{"id":2,"author":"anon","timestamp":1593971100,"message":"bbbb"},{"id":3,"author":"anon","timestamp":1593971115,"message":"cccc"},{"id":4,"author":"anon","timestamp":1593971146,"message":"cccc"},{"id":5,"author":"anon","timestamp":1593971184,"message":"cccc2"},{"id":6,"author":"anon","timestamp":1593971343,"message":"here?"},{"id":7,"author":"anon","timestamp":1593971517,"message":"sure <3"},{"id":8,"author":"abc","timestamp":1593971528,"message":"123"},{"id":9,"author":"abc","timestamp":1594150817,"message":"456"},{"id":10,"author":"abc","timestamp":1594150942,"message":"321"},{"id":11,"author":"anon","timestamp":1594237433,"message":"anybody? anything? nothing?"},{"id":12,"author":"anon","timestamp":1595164511,"message":"obrisi me"},{"id":13,"author":"adju","timestamp":1595840974,"message":"Hi there"},{"id":14,"author":"adju","timestamp":1595840999,"message":"!"},{"id":15,"author":"del","timestamp":1595841084,"message":"test"},{"id":16,"author":"serj","timestamp":1595845612,"message":"hi <3"},{"id":17,"author":"anon","timestamp":1596200903,"message":"hey"},{"id":18,"author":"anon","timestamp":1596200916,"message":"like this stuff =)"},{"id":19,"author":"anon","timestamp":1596200938,"message":"one, two"},{"id":20,"author":"anon","timestamp":1596200993,"message":"I'm OK, thanks :)"},{"id":21,"author":"rantoholic","timestamp":1601629296,"message":"greets from devRant"},{"id":22,"author":"serj","timestamp":1602411596,"message":"cheers mate 🍻(hope this emoji does not screw up my aerospike lol)"},{"id":23,"author":"anon","timestamp":1603214466,"message":"hi"},{"id":24,"author":"дервента-рулез","timestamp":1611103357,"message":"Апелујем на мир и суздржаност."},{"id":25,"author":"ercegu","timestamp":1611407115,"message":"Suzdrzanost jedva izdrzava, do pucanja je dosla, jedva ceka jos 4 dana do informacije"},{"id":26,"author":"anon","timestamp":1612107258,"message":"aaa"},{"id":27,"author":"anon","timestamp":1612107374,"message":"🎉"},{"id":28,"author":"anon","timestamp":1613140928,"message":"hi"},{"id":29,"author":"serj","timestamp":1613399045,"message":"👋"},{"id":30,"author":"anon","timestamp":1615118806,"message":"hehe"},{"id":31,"author":"anon","timestamp":1615362851,"message":"is it true nobody uses Vue?"},{"id":32,"author":"bramzor","timestamp":1621262675,"message":"Hey"},{"id":33,"author":"brams","timestamp":1621262676,"message":"hello"},{"id":34,"author":"momzor","timestamp":1621262707,"message":"need web sockets here"},{"id":35,"author":"serj","timestamp":1621413048,"message":"I know, but this is considered as more like a old school visitor board, than a chat. If I change it to be a chat, I'll support it with websockets, ofc"},{"id":36,"author":"serj","timestamp":1621413108,"message":"I know, but this is considered as more like an old school visitor board, than a chat. If I change it to be a chat, I'll support it with websockets, for real-time updates, ofc"},{"id":37,"author":"вашер-дервента","timestamp":1630571807,"message":"Зна се шта су наши снови. https://www.youtube.com/watch?v=ArQpePBE88Q"},{"id":38,"author":"za-ercega","timestamp":1631273168,"message":"Dervetna & Novi"},{"id":39,"author":"ко-је-ерцег?","timestamp":1635805582,"message":"Свуда пођи, Дервенти дођи. Никуда не пођи, Дервенти не дођи."},{"id":40,"author":"anon","timestamp":1637090194,"message":"ama neka bolan"},{"id":41,"author":"anon","timestamp":1643160601,"message":"А сатраше визитори, не би Бог одскроловао да видим шта сам последње послао."},{"id":42,"author":"anon","timestamp":1644152601,"message":"test"},{"id":43,"author":"anon","timestamp":1644152624,"message":"sve je Vida kriv"},{"id":44,"author":"anon","timestamp":1645612293,"message":"who is Vida?"},{"id":45,"author":"anon","timestamp":1663571682,"message":"hey, I know you are logging my ip and I know you created this visitor board when you are drunk"},{"id":46,"author":"анинимус","timestamp":1664995459,"message":"Ама нека де, аноне, добро. Нека. Остави. Де."},{"id":47,"author":"anon","timestamp":1665334304,"message":"i know you wrote this when you are drugged "},{"id":48,"author":"anon","timestamp":1669372628,"message":"Cool"},{"id":49,"author":"anon","timestamp":1669456523,"message":"tracing was just added here"},{"id":50,"author":"theabbie","timestamp":1671474836,"message":"Hello Random Internet Stranger"},{"id":51,"author":"serj","timestamp":1672065637,"message":"hello back to you internet stranger 👋"}]
  // `;
  //   let respMessages: GuestbookMessage[] = JSON.parse(exampleMessages);

  //   return {
  //     props: {
  //       messages: respMessages.reverse(),
  //     },
  //   };

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

function getTimestampString(date: Date) {
  const hourInfo =
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2);

  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const dateInfo =
    ('0' + d).slice(-2) + '/' + ('0' + (m + 1)).slice(-2) + '/' + y;

  return dateInfo + ' ' + hourInfo;
}
