import Head from 'next/head'
import { useContext } from 'react';
import {
  AppShell,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  ThemeIcon,
} from '@mantine/core';
import styles from './layout.module.css'
import Link from 'next/link'
import AppNavbar from './AppNavbar';
import { IconBook2, IconHome, IconLogin, IconMan, IconTools } from '@tabler/icons';
import AppCtx from '../contexts/app';

export const siteTitle = '2beens v2'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const theme = useMantineTheme();
  const appContext = useContext(AppCtx);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <AppNavbar links={[
          { link: "/", label: "Home", icon: <IconHome size={16} />, iconColor: 'red' },
          { link: "/about", label: "About", icon: <IconMan size={16} />, iconColor: 'indigo' },
          { link: "/guestbook", label: "Guestbook", icon: <IconBook2 size={16} />, iconColor: 'pink' },
          { link: "/util", label: "Util", icon: <IconTools size={16} />, iconColor: 'teal' },
        ]} />
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          <Text>App Footer</Text>
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={appContext !== null && appContext.showNavbar}
                onClick={() => appContext?.toggleNavbar()}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>2BEENS</Text>

            <Button variant="subtle">
              <ThemeIcon color={'teal'} variant="light">
                <IconLogin />
              </ThemeIcon>
            </Button>
          </div>
        </Header>
      }
    >
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <main>{children}</main>

        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
          </div>
        )}
      </div>
    </AppShell>
  )
}
