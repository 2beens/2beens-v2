import { useState } from 'react';
import {
  Navbar,
  Text,
  Flex,
  Button,
  Group,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IconHome, IconBook, IconTool, IconMan } from '@tabler/icons';

export default function AppNavbar() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Navbar.Section grow mt="md">
        <Flex
          mih={50}
          gap="sm"
          justify="flex-start"
          direction="column"
          wrap="wrap"
        >
          <Button variant="light" onClick={() => { router.push("/") }}>
            <Group position="apart">
              <IconHome size={16} />
              <Text>Home</Text>
            </Group>
          </Button>
          <Button variant="light" onClick={() => { router.push("/about") }}>
            <Group position="apart">
              <IconMan size={16} />
              <Text>About</Text>
            </Group>
          </Button>
          <Button variant="light" onClick={() => { router.push("/guestbook") }}>
            <Group position="apart">
              <IconBook size={16} />
              <Text>Guestbook</Text>
            </Group>
          </Button>
          <Button variant="light" onClick={() => { router.push("/util") }}>
            <Group position="apart">
              <IconTool size={16} />
              <Text>Util</Text>
            </Group>
          </Button>
        </Flex>
      </Navbar.Section>
      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
    </Navbar>
  )
}