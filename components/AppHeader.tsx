import { useContext } from 'react';
import {
  Header,
  Text,
  TextInput,
  Burger,
  useMantineTheme,
  Button,
  ThemeIcon,
  PasswordInput,
  Grid,
  Switch,
  Group,
} from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import AppCtx from '../contexts/app';
import { IconLogin, IconMoonStars, IconSun } from '@tabler/icons';

export default function AppHeader() {
  const theme = useMantineTheme();
  const appContext = useContext(AppCtx);

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Grid justify="center" align="center">
        <Grid.Col span="auto">
          {/* <MediaQuery largerThan="sm" styles={{ display: 'none' }}> */}
          <Burger
            opened={appContext !== null && appContext.showNavbar}
            onClick={() => appContext?.toggleNavbar()}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
          {/* </MediaQuery> */}
        </Grid.Col>

        <Grid.Col span={10}>
          <Text>2BEENS</Text>
        </Grid.Col>

        <Grid.Col span="auto">
          <Button
            variant="subtle"
            onClick={() => {
              openModal({
                title: 'Login',
                children: (
                  <>
                    <TextInput label="Username" data-autofocus />
                    <PasswordInput placeholder="Password" label="Password" />
                    <Button
                      variant="light"
                      color="green"
                      fullWidth
                      onClick={() => {
                        closeAllModals();
                      }}
                      mt="md"
                    >
                      Go!
                    </Button>
                    <Button
                      variant="light"
                      color="red"
                      fullWidth
                      onClick={() => {
                        closeAllModals();
                      }}
                      mt="md"
                    >
                      Cancel
                    </Button>
                  </>
                ),
              });
            }}
          >
            <ThemeIcon color={'teal'}>
              <IconLogin />
            </ThemeIcon>
          </Button>
        </Grid.Col>

        <Grid.Col span="auto">
          <Group position="center">
            <Switch
              size="md"
              color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
              onChange={() => {
                appContext?.toggleTheme();
              }}
              onLabel={
                <IconSun
                  size={16}
                  stroke={2.5}
                  color={theme.colors.yellow[4]}
                />
              }
              offLabel={
                <IconMoonStars
                  size={16}
                  stroke={2.5}
                  color={theme.colors.blue[6]}
                />
              }
            />
          </Group>
        </Grid.Col>
      </Grid>
    </Header>
  );
}
