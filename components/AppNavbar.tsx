import { useState } from 'react';
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
  const [opened, setOpened] = useState(false);

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
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
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
      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
    </Navbar>
  )
}