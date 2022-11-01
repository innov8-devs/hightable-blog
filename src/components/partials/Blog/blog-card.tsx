import React, { FC } from 'react';

import { Box, Link, Text } from '@chakra-ui/react';

interface BlogCardProps {
  imgSrc: string;
  title: string;
  slug: string;
  category?: string;
}

const BlogCard: FC<BlogCardProps> = ({
  imgSrc,
  title,
  slug,
  category = 'lifestyle',
}) => {
  return (
    <Box
      borderRadius={'15px'}
      pos={'relative'}
      w={'100%'}
      h={'300px'}
      flexShrink={0}
      flexGrow={0}
      flexBasis={'auto'}
      bgImage={imgSrc}
      overflow={'hidden'}
      bgSize={'contain'}
      boxShadow={'0px 8px 20px 0.9px rgba(0, 0, 0, 0.12)'}
      mb={10}
    >
      <Link href={`/blogs/${slug}`}>
        <Text
          h={'4em'}
          p={4}
          bgColor={'#fff'}
          color={'#4B4B4B'}
          fontSize={'20px'}
          fontWeight={'600'}
          display={'-webkit-box'}
          style={{
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
          pos={'absolute'}
          bottom={0}
          width={'100%'}
        >
          {title}
        </Text>
      </Link>

      <Box
        pos={'absolute'}
        p={2}
        bg={'#FF9916'}
        color={'#fff'}
        top={0}
        right={0}
        textTransform={'capitalize'}
      >
        {category}
      </Box>
    </Box>
  );
};

export default BlogCard;
