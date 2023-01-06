import Head from 'next/head';
import Layout from '../components/Layout';
import {
  Center,
  Container,
  Divider,
  Group,
  Image,
  Pagination,
  Stack,
  Text,
} from '@mantine/core';
import styles from '../styles/Common.module.css';
import { GetServerSideProps } from 'next';
import BlogPostCard, { BlogPost } from '../components/BlogPost';
import { useState } from 'react';

interface GetPostsResponse {
  posts: BlogPost[];
  total: number;
}

const blogsPageSize = 5;

export default function Home(props: GetPostsResponse) {
  const blogPosts = props.posts.map((post) => (
    <BlogPostCard key={post.id} post={post} />
  ));

  const pagesTotal = Math.ceil(props.total / blogsPageSize);
  const [activePage, setPage] = useState(1);

  return (
    <Layout home>
      <Head>
        <title>Serj Tubin v2</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Stack>
          <h1>Work in constant progress 👨🏼‍💻🛠</h1>
          <h3>*attempt to create a personal site with NextJS/React</h3>
          <div style={{ width: 340, marginLeft: 'auto', marginRight: 'auto' }}>
            <Image
              radius={120}
              src="/ja-sa-jacksonom.jpg"
              alt="Me with Jackson JS22-7"
              caption="Jackson JS22-7"
            />
          </div>
        </Stack>
        <Divider
          my="xs"
          label={`${props.posts.length} blog posts loaded `}
          labelPosition="center"
        />
        <Stack spacing={10}>{blogPosts}</Stack>
        <Pagination page={activePage} onChange={setPage} total={pagesTotal} />
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<
  GetPostsResponse
> = async () => {
  const page = 1;
  const size = blogsPageSize;
  const endpoint =
    process.env.NEXT_PUBLIC_MAIN_API_ENDPOINT +
    `/blog/page/${page}/size/${size}`;

  console.log('getting blogs from:', endpoint);

  let postsData: GetPostsResponse;
  try {
    const res = await fetch(endpoint);
    if (res.status >= 300) {
      console.log('error' + res.status);
    } else {
      postsData = await res.json();
      return {
        props: {
          posts: postsData.posts,
          total: postsData.total,
        },
      };
    }
  } catch (e) {
    if (typeof e === 'string') {
      console.log('str err:', e.toUpperCase());
    } else if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log('unkown error');
    }
  }

  return {
    props: {
      posts: [],
      total: 0,
    },
  };
};
