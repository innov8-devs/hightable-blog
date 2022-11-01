import React, { FC } from 'react';

import { Box, Grid, Text } from '@chakra-ui/react';

import BlogCard from '../components/partials/Blog/blog-card';
import BlogCategory from '../components/partials/Blog/blogCategory';
import Sub from '../components/partials/Global/Sub';
import config from '../config';

interface HomeProps {
  posts: any;
}

const Home: FC<HomeProps> = ({ posts }) => {
  return (
    <>
      <Box
        width={'100%'}
        bgSize={'cover'}
        minH={'40vh'}
        bgImage={'url("/images/blog.png")'}
        p={'50px 0'}
      >
        <Box maxW={'1200px'} margin={'auto'}>
          <Box background={'#ff9916'} w={'15vw'} p={1} color={'#fff'} mb={4}>
            Category
          </Box>
          <Text
            fontFamily={'DM Serif Display'}
            fontWeight={400}
            fontSize={'50px'}
            lineHeight={'100%'}
            color={'#ffffff'}
            mb={4}
          >
            The best place to Have fun with loved ones this December
          </Text>
          <Box
            bg={'#ff9916'}
            p={3}
            color={'#fff'}
            borderRadius={'8px'}
            w={'15vw'}
          >
            Read More
          </Box>
        </Box>
      </Box>
      <Box
        background={'#ffffff'}
        boxShadow={'0px 2px 10px rgba(149, 157, 165, 0.2)'}
        borderRadius={'5px'}
        p={'35px 0'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {categories.map((category, i) => (
          <Text
            fontFamily={'Montserrat'}
            fontStyle={'italic'}
            fontWeight={600}
            fontSize={'18px'}
            lineHeight={'22px'}
            margin={'0 10px'}
            color={'#666670'}
            key={i}
          >
            {category}
          </Text>
        ))}
      </Box>
      <Box maxW={'1200px'} margin={'auto'}>
        <Box height={14} />
        <Text
          fontFamily={'DM Serif Display'}
          fontWeight={400}
          fontSize={'50px'}
          lineHeight={'100%'}
          color={'#091c2e'}
          mb={4}
        >
          Recent Posts
        </Text>
        <Box
          width={'100%'}
          overflowX={'scroll'}
          sx={{
            '&::-webkit-scrollbar': {
              height: '5px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'transparent',
              borderRadius: '5px',
            },
          }}
          mb={100}
        >
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            gap={5}
            placeItems={'center'}
          >
            {posts.map((blog, i) => (
              <BlogCard
                key={i}
                slug={blog.fields.slug}
                imgSrc={blog.fields.image}
                title={blog.fields.title}
                category={blog.fields.category}
              />
            ))}
          </Grid>
        </Box>
        <Text
          fontFamily={'DM Serif Display'}
          fontWeight={400}
          fontSize={'50px'}
          lineHeight={'100%'}
          color={'#091c2e'}
          mb={4}
          style={{ marginTop: '100px' }}
        >
          Blog Categories
        </Text>
        <Grid gap={4} mb={200} gridTemplateColumns={'repeat(4, 1fr)'}>
          {blogCategories.map((category, idx) => (
            <BlogCategory
              key={idx}
              idx={idx}
              title={category}
              img={`/images/blogCategory${idx + 1}.png`}
            />
          ))}
        </Grid>
      </Box>
      <Sub />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const res = await fetch(
    `${config.contentful.baseURL}/entries?access_token=${config.contentful.apiKey}`
  );
  const posts = (await res.json())?.items || [];

  let i = 0;
  for (const post of posts) {
    const assetId = post?.fields?.heroImage?.sys?.id;
    const image = (
      await (
        await fetch(
          `${config.contentful.baseURL}/assets/${assetId}?access_token=${config.contentful.apiKey}`
        )
      ).json()
    )?.fields?.file?.url;
    posts[i] = {
      ...post,
      fields: { ...post.fields, image },
    };
    i++;
  }

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
};
const categories = [
  'Featured',
  'Travel Tips',
  'Stories',
  'Upcoming Events',
  'Trending',
  'Be Inspired',
  'Category',
];

const blogCategories = [
  'Events',
  'Stories',
  'Gists',
  'Music',
  'Hotels',
  'Featured',
  'Travels',
  'Featured',
];
