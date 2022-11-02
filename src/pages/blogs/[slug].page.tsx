import React from 'react';

import { Box, Text, Image } from '@chakra-ui/react';
import Head from 'next/head';

import Sub from '../../components/partials/Global/Sub';
import config from '../../config';
import { parseTree } from '../../utils/parseTree';

const BlogArticle = ({ article }) => {
  return (
    <>
      <Head>
        <meta name="description" content={article?.previewDescription} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={article?.title} />
        <meta property="og:description" content={article?.previewDescription} />
        <meta name="keywords" content={article?.metaTags?.join(', ')} />
        <meta
          property="og:url"
          content={`https://blog.hightable.africa/blogs/${article?.slug}`}
        />
        <meta property="og:site_name" content="HighTable Africa" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article?.title} />
        <meta
          name="twitter:description"
          content={article?.previewDescription}
        />
        <meta name="twitter:image" content={`https:${article?.image}`} />
        <meta name="theme-color" content="#FF9916" />
      </Head>
      <div>
        <Box
          width={'100%'}
          bgSize={'cover'}
          minH={'40vh'}
          bgImage={'url("/images/blog.png")'}
          p={'50px 0'}
        >
          <Box maxW={'1200px'} margin={'auto'}>
            <Box
              textTransform={'capitalize'}
              background={'#ff9916'}
              w={'15vw'}
              p={1}
              color={'#fff'}
              mb={4}
            >
              {article?.category}
            </Box>
            <Text
              fontFamily={'DM Serif Display'}
              fontWeight={400}
              fontSize={'50px'}
              lineHeight={'100%'}
              color={'#ffffff'}
              mb={4}
            >
              {article?.title}
            </Text>
          </Box>
        </Box>
        <Box maxW={'1200px'} margin={'auto'}>
          <Text
            fontFamily={'DM Serif Display'}
            fontWeight={400}
            fontSize={'50px'}
            lineHeight={'100%'}
            color={'#000'}
            mb={4}
            mt={15}
          >
            {article?.title}
          </Text>
          <Image
            maxW={'50%'}
            src={`https:${article?.image}`}
            mt={10}
            mb={6}
            alt="heroImg"
          />
          {article?.content?.content?.map((region, i) => parseTree(region, i))}
          <Box h={100} />
          <Sub />
        </Box>
      </div>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const entry = await (
    await fetch(
      `${config.contentful.baseURL}/entries?access_token=${config.contentful.apiKey}&fields.slug=${params.slug}&content_type=blogPost`
    )
  ).json();

  const article = entry?.items[0]?.fields;
  if (article) {
    const assetId = article?.heroImage?.sys?.id;
    const image = (
      await (
        await fetch(
          `${config.contentful.baseURL}/assets/${assetId}?access_token=${config.contentful.apiKey}`
        )
      ).json()
    )?.fields?.file?.url;
    article.image = image;
  }

  let i = 0;
  for (const val of article?.content?.content) {
    if (val?.nodeType == 'embedded-asset-block') {
      const assetId = article.content.content[i]?.data?.target?.sys?.id;
      const image = (
        await (
          await fetch(
            `${config.contentful.baseURL}/assets/${assetId}?access_token=${config.contentful.apiKey}`
          )
        ).json()
      )?.fields?.file?.url;
      article.content.content[i] = { ...article.content.content[i], image };
    }
    i++;
  }

  return {
    props: {
      article,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  const res = await fetch(
    `${config.contentful.baseURL}/entries?access_token=${config.contentful.apiKey}`
  );
  const posts = (await res.json())?.items || [];
  const paths = posts.map(({ fields: { slug } }) => ({
    params: { slug: `${slug}` },
  }));
  return {
    paths,
    fallback: true,
    //The paths that have not been generated at build time will not result in a 404 page.
    //Instead, fallback: true This will be used to automatically render
    //the page with the required props.
  };
}

export default BlogArticle;
