import {
  Footer,
  Text,
  Grid,
  Center
} from '@mantine/core';
import { GetServerSideProps } from 'next';

interface FooterProps {
  versionInfo: String;
}

export default function AppFooter(props: FooterProps) {
  return (
    <Footer height={60} p="md">
      <Grid justify="space-between" align="center">
        <Grid.Col span="auto">
          <Text>Serj, Berlin 2021/2022</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Center>
            <Text>2023: { props.versionInfo }</Text>
          </Center>
        </Grid.Col>
        <Grid.Col span="auto" />
      </Grid>
    </Footer>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => { 
  const versionEndpoint = process.env.NEXT_PUBLIC_MAIN_API_ENDPOINT + '/version';
  const response = await fetch(versionEndpoint);

  console.log('getting version info ...');

  let versionInfo: String;
  if (!isStatusOK(response.status)) {
    versionInfo = 'error' + response.status;
  } else {
    versionInfo = await response.json();
    console.log('version resp', response);
  }

  console.log('gotten version info', versionInfo);

  return {
    props: {
      versionInfo: versionInfo
    },
  }
}

function isStatusOK(status: number): boolean {
  return status >= 200 && status < 300
}
