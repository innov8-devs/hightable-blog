import React, { FC } from 'react';

import { Box, Circle, Flex, Text } from '@chakra-ui/react';

interface BlogCategoryProps {
  img: string;
  idx: number;
  title: string;
}

const BlogCategory: FC<BlogCategoryProps> = ({ img, idx, title }) => {
  return (
    <Flex
      p={10}
      fontStyle={'italic'}
      fontWeight={500}
      fontSize={30}
      bgSize={'cover'}
      color={'#fff'}
      bgImage={img}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box>
        <Circle border={'1px solid #fff'} maxW={12} maxH={12} margin={'auto'}>
          {idx}
        </Circle>
        <Text>{title}</Text>
      </Box>
    </Flex>
  );
};

export default BlogCategory;
