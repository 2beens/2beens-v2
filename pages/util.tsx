import Head from 'next/head';
import Layout from '../components/layout';
import styles from '../styles/Common.module.css';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SerjTubin Util</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Util</h1>
      </main>
    </Layout>
  );
}
