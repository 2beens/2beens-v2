import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
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
              <Link href="/api/hello" target="_blank">api/hello</Link>
            </li>
          </ul>
        </div>
      </main>
    </Layout>
  )
}
