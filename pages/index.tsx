import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import styles from '../styles/Home.module.css';
import { Button } from '@mantine/core';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          Available Routes:
          <ul>
            <li>
              <Button
                onClick={() => {
                  window.open('/api/hello', '_ blank');
                }}
              >
                <p>/api/hello</p>
              </Button>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/guestbook">Guestbook</Link>
            </li>
            <li>
              <Link href="/util">Util</Link>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  );
}
