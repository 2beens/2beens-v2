import { Center, Divider, Flex, Paper, Stack, Text } from '@mantine/core';
import { IconStar } from '@tabler/icons';

export interface BlogPost {
  id: number;
  title: string;
  created_at: string;
  content: string;
  claps: number;
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
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

        {/* TODO: don't load content with pure html */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </Paper>
    </div>
  );
}
