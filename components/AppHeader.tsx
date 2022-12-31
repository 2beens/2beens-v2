import { useContext } from "react";
import {
  Header,
  Text,
  MediaQuery,
  TextInput,
  Burger,
  useMantineTheme,
  Button,
  ThemeIcon,
  PasswordInput,
} from '@mantine/core';
import { openModal, closeAllModals } from '@mantine/modals';
import AppCtx from "../contexts/app";
import { IconLogin } from "@tabler/icons";

export default function AppHeader() {
  const theme = useMantineTheme();
  const appContext = useContext(AppCtx);

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        {/* <MediaQuery largerThan="sm" styles={{ display: 'none' }}> */}
        <Burger
          opened={appContext !== null && appContext.showNavbar}
          onClick={() => appContext?.toggleNavbar()}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
        {/* </MediaQuery> */}

        <Text>2BEENS</Text>

        <Button
          variant="subtle"
          onClick={() => {
            openModal({
              title: 'Login',
              children: (
                <>
                  <TextInput label="Username" data-autofocus />
                  <PasswordInput
                    placeholder="Password"
                    label="Password"
                  />
                  <Button variant="light" color="green" fullWidth onClick={() => { closeAllModals() }} mt="md">
                    Go!
                  </Button>
                  <Button variant="light" color="red" fullWidth onClick={() => { closeAllModals() }} mt="md">
                    Cancel
                  </Button>
                </>
              ),
            });
          }}
        >
          <ThemeIcon color={'teal'} variant="light">
            <IconLogin />
          </ThemeIcon>
        </Button>
      </div>
    </Header>
  )
}