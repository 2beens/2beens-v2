import { useContext } from 'react';
import {
  Navbar,
  Text,
  Flex,
  Button,
  Group,
  ThemeIcon,
  DefaultMantineColor,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import AppCtx from '../contexts/app';

interface AppNavbarProps {
  links: {
    link: string;
    label: string;
    icon: React.ReactNode;
    iconColor: DefaultMantineColor;
  }[];
}

export default function AppNavbar({ links }: AppNavbarProps) {
  const router = useRouter();
  const appContext = useContext(AppCtx);

  const linkItems = links.map((link) => (
    <Button key={link.link} variant="light" onClick={() => {
      router.push(link.link);
    }}>
      <Group position="left">
        <ThemeIcon color={link.iconColor} variant="light">
          {link.icon}
        </ThemeIcon>
        <Text size="sm">{link.label}</Text>
      </Group>
    </Button>
  ));

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!appContext?.showNavbar} width={{ sm: 200, lg: 300 }}>
      <Navbar.Section grow mt="md">
        <Flex
          mih={50}
          gap="sm"
          justify="flex-start"
          direction="column"
          wrap="wrap"
        >
          {linkItems}
        </Flex>
      </Navbar.Section>
      <Navbar.Section>{
        <Group>
          <Text>{appContext?.name}</Text>
          <Text>show navbar: {appContext?.showNavbar ? "true" : "false"}</Text>
        </Group>
      }</Navbar.Section>
    </Navbar>
  )
}