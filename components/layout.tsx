import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import { SimpleHeader } from './SimpleHeader'

export const siteTitle = '2beens v2'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div>
      <SimpleHeader links={
        [
          { "link": "/", "label": "Home" },
          { "link": "/about", "label": "About" },
          { "link": "/guestbook", "label": "Guestbook" },
          { "link": "/util", "label": "Util" },
        ]
      } />
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

        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
          </div>
        )}

        <main>{children}</main>
      </div>
    </div>
  )
}
