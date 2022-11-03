import React, { FC, useState } from 'react';

import { Box, Grid, Link, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';

import BlogCard from '../components/partials/Blog/blog-card';
import BlogCategory from '../components/partials/Blog/blogCategory';
import None from '../components/partials/Global/None';
import Sub from '../components/partials/Global/Sub';
import config from '../config';

import 'pure-react-carousel/dist/react-carousel.es.css';

interface HomeProps {
  posts: any;
}

const Home: FC<HomeProps> = ({ posts }) => {
  const [blogCategory, setBlogCategory] = useState('');

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Discover all the latest news, tips, trends and more in the hospitality world."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="HighTable Blog - News, Tips and Advice from global hospitality, travel etc trends."
        />
        <meta
          property="og:description"
          content="Discover all the latest news, tips, trends and more in the hospitality world."
        />
        <meta
          property="og:image"
          content="https://i.postimg.cc/7Ykc44Xx/Black-Hightable-with-tagline-1.png"
        />
        <meta property="og:url" content="https://blog.hightable.africa/" />
        <meta property="og:site_name" content="HighTable Africa" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="HighTable Blog - News, Tips and Advice from global hospitality, travel etc trends."
        />
        <meta
          name="twitter:description"
          content="Discover all the latest news, tips, trends and more in the hospitality world."
        />
        <meta name="twitter:image" content={`/images/hightable.png`} />
        <meta name="theme-color" content="#FF9916" />
      </Head>
      <Box
        width={'100%'}
        bgSize={'cover'}
        h={'40vh'}
        bgImage={'url("/images/blog.png")'}
        p={'50px 0'}
        pl={3}
      >
        <Box maxW={'1200px'} margin={'auto'} height={'100%'}>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={posts?.length}
            infinite={true}
            interval={5000}
            isPlaying={true}
          >
            <Slider>
              {posts?.map((blog, i) => (
                <Slide key={i} index={i}>
                  <Box
                    background={'#ff9916'}
                    w={'180px'}
                    p={1}
                    color={'#fff'}
                    mb={4}
                  >
                    {blog?.fields?.category}
                  </Box>
                  <Text
                    fontFamily={'DM Serif Display'}
                    fontWeight={400}
                    fontSize={{ md: '50px', base: '30px' }}
                    lineHeight={'100%'}
                    color={'#ffffff'}
                    mb={4}
                  >
                    {blog?.fields?.title}
                  </Text>
                  <Link href={`/blogs/${blog?.fields?.slug}`}>
                    <Box
                      bg={'#ff9916'}
                      p={3}
                      color={'#fff'}
                      borderRadius={'8px'}
                      w={'180px'}
                    >
                      Read More
                    </Box>
                  </Link>
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        </Box>
      </Box>
      <Box
        background={'#ffffff'}
        boxShadow={'0px 2px 10px rgba(149, 157, 165, 0.2)'}
        borderRadius={'5px'}
        p={'35px 0'}
        display={{ base: 'none', md: 'flex' }}
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
          fontSize={{ md: '50px', base: '30px' }}
          lineHeight={'100%'}
          color={'#091c2e'}
          mb={4}
        >
          Recent Posts{blogCategory && `(${blogCategory})`}
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
            p={2}
          >
            {posts
              ?.filter((el) => el?.fields?.category?.includes(blogCategory))
              .map((blog, i) => (
                <BlogCard
                  key={i}
                  slug={blog.fields.slug}
                  imgSrc={blog?.fields?.image}
                  title={blog.fields.title}
                  category={blog.fields.category}
                />
              ))}
          </Grid>
          {posts?.filter((el) => el?.fields?.category?.includes(blogCategory))
            ?.length == 0 && (
            <None noTop name={'Sorry, No blog posts on that category yet'} />
          )}
        </Box>
        <Text
          fontFamily={'DM Serif Display'}
          fontWeight={400}
          fontSize={{ md: '50px', base: '30px' }}
          lineHeight={'100%'}
          color={'#091c2e'}
          mb={4}
          style={{ marginTop: '100px' }}
        >
          Blog Categories
        </Text>
        <Grid
          p={2}
          gap={4}
          mb={200}
          gridTemplateColumns={{
            lg: 'repeat(4, 1fr)',
            md: 'repeat(3, 1fr)',
            sm: 'repeat(2, 1fr)',
            base: 'repeat(1, 1fr)',
          }}
        >
          {blogCategories.map((category, idx) => (
            <BlogCategory
              onClick={() => {
                setBlogCategory(category == 'Featured' ? '' : category);
              }}
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
    `${config.contentful.baseURL}/entries?access_token=${config.contentful.apiKey}&content_type=blogPost`
  );
  const posts = (await res.json())?.items || [];

  let i = 0;
  for (const post of posts) {
    const assetId = post?.fields?.heroImage?.sys?.id;
    if (assetId) {
      const image = (
        await (
          await fetch(
            `${config.contentful.baseURL}/assets/${assetId}?access_token=${config.contentful.apiKey}`
          )
        ).json()
      )?.fields?.file?.url;
      if (image) {
        posts[i] = {
          ...post,
          fields: { ...post.fields, image },
        };
      }
    } else {
      posts[i] = {
        ...post,
        fields: { ...post.fields, image: '/images/blog.png' },
      };
    }
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
