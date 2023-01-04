import { Footer, Text, Grid, Center } from '@mantine/core';

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
            <Text>2023: {props.versionInfo}</Text>
          </Center>
        </Grid.Col>
        <Grid.Col span="auto" />
      </Grid>
    </Footer>
  );
}
