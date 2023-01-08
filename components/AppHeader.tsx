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
  MediaQuery,
  Group,
  Center,
  Title,
} from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import AppCtx from '../contexts/app';
import { IconLogin, IconMoonStars, IconSun } from '@tabler/icons';

export default function AppHeader() {
  const theme = useMantineTheme();
  const appContext = useContext(AppCtx);

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Group position="apart">
        <Group>
          <MediaQuery largerThan="md" styles={{ display: 'none' }}>
            <Burger
              opened={appContext !== null && appContext.showNavbar}
              onClick={() => appContext?.toggleNavbar()}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
        </Group>

        <Group>
          <Center>
            <Title>👨‍💻</Title>
            <Text
              variant="gradient"
              gradient={{ from: 'indigo', to: 'red', deg: 45 }}
              sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
              ta="center"
              fz="xl"
              fw={700}
            >
              <Title order={3} size="h1">
                Personal Tech Sandbox Site
              </Title>
            </Text>
            <Title>👨‍💻</Title>
          </Center>
        </Group>

        <Group>
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

          <Switch
            size="md"
            color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
            onChange={() => {
              appContext?.toggleColorScheme();
            }}
            onLabel={
              <IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />
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
      </Group>
    </Header>
  );
}
