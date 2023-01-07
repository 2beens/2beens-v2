import { Center, Divider, Flex, Paper, Stack, Text } from '@mantine/core';
import { IconStar } from '@tabler/icons';
import { sanitize } from 'isomorphic-dompurify';

export interface BlogPost {
  id: number;
  title: string;
  created_at: string;
  content: string;
  claps: number;
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
  const cleanedPostHTML = sanitize(post.content);

  return (
    <div
      style={{ marginBottom: '70px', marginLeft: '30px', marginRight: '30px' }}
    >
      <Paper shadow="md" p="md">
        <Flex gap="md" justify="flex-end" align="flex-end" direction="row">
          <IconStar />
          <Text>{post.claps}</Text>
        </Flex>
        <Center>
          <h1>{post.title}</h1>
        </Center>

        <Divider style={{ marginBottom: '20px' }} size={2} />

        <div dangerouslySetInnerHTML={{ __html: cleanedPostHTML }} />
      </Paper>
    </div>
  );
}
