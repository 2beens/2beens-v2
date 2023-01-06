import { Divider, Stack } from '@mantine/core';

export interface BlogPost {
  id: number;
  title: string;
  created_at: string;
  content: string;
  claps: number;
}

// {
//   "id":27,
//   "title":"Spot on prediction by Gates �",
//   "created_at":"2022-12-09T09:30:21.995481Z",
//   "content":"\\u003 cimg style=\"width: 30%; border-radius: 10px;\" src=\"https://file-box.serj-tubin.com/link/1670574586022266\"/\u003e",
//   "claps":0
// }

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Stack
      justify="flex-start"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        height: 300,
      })}
    >
      <h1>{post.title}</h1>
      <Divider my="xs" />
      {/* TODO: don't load content with pure html */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </Stack>
  );
}
