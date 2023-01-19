import {
  Navbar,
  Text,
  Flex,
  Button,
  Group,
  Stack,
  Space,
  ThemeIcon,
  DefaultMantineColor,
  Divider,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const [active, setActive] = useState(links[0].link);

  const linkItems = links.map((link) => (
    <Button
      key={link.link}
      variant={active === link.link ? 'filled' : 'light'}
      onClick={() => {
        console.log('prev active', active);
        setActive(link.link);
        router.push(link.link);
        console.log('now active', active);
      }}
    >
      <Group position="left">
        <ThemeIcon color={link.iconColor}>{link.icon}</ThemeIcon>
        <Text size="sm">{link.label}</Text>
      </Group>
    </Button>
  ));

  return (
    <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
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
      <Navbar.Section>
        <Space h="lg" />
      </Navbar.Section>
      <Navbar.Section>
        <Stack
          justify="flex-start"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          })}
        >
          <Divider
            my="xs"
            label="Available API Routes"
            labelPosition="center"
          />
          <Button
            onClick={() => {
              window.open('/api/hello', '_ blank');
            }}
          >
            <p>/api/hello</p>
          </Button>
          <Button
            onClick={() => {
              window.open('/api/post/100', '_ blank');
            }}
          >
            <p>/api/post/100</p>
          </Button>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
