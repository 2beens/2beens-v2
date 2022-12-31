import {
  Footer,
  Text,
  Grid,
  createStyles,
  Selectors,
} from '@mantine/core';

export default function AppFooter() {
  return (
    <Footer height={60} p="md">
      <Grid justify="space-between" align="center">
        <Grid.Col span="auto">
          <Text>Serj, Berlin 2021/2022</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text>2022 — 4c2fe620a288e47cd6b83a81da59c119e223be46</Text>
        </Grid.Col>
        <Grid.Col span="auto">span=auto</Grid.Col>
      </Grid>
    </Footer>
  )
}