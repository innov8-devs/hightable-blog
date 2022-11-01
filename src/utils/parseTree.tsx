import { Heading, Link, Table, Td, Text, Tr } from '@chakra-ui/react';

export const parseTree = (region, i) => {
  const props: Record<string, any> = {};

  switch (region?.nodeType) {
    case 'paragraph':
      return (
        <Text m={4} key={i}>
          {region?.content?.map((el, i) => {
            return parseTree(el, i);
          })}
        </Text>
      );

    case 'heading-1':
      return (
        <Heading m={4} size={'3xl'} fontWeight={400}>
          {region?.content?.map((el, i) => parseTree(el, i))}
        </Heading>
      );
    case 'heading-2':
      return (
        <Heading m={4}>
          {region?.content?.map((el, i) => parseTree(el, i))}
        </Heading>
      );
    case 'heading-4':
      return (
        <Heading m={4} size={'md'}>
          {region?.content?.map((el, i) => parseTree(el, i))}
        </Heading>
      );
    case 'heading-5':
      return (
        <Heading m={4} size={'sm'}>
          {region?.content?.map((el, i) => parseTree(el, i))}
        </Heading>
      );
    case 'heading-6':
      return (
        <Heading m={4} size={'xl'}>
          {region?.content?.map((el, i) => parseTree(el, i))}
        </Heading>
      );
    case 'hr':
      return <hr style={{ margin: 20 }} key={i} />;
    case 'table':
      return (
        <Table m={4} variant={'striped'} key={i}>
          <tbody>{region?.content?.map((row, i) => parseTree(row, i))}</tbody>
        </Table>
      );
    case 'table-row':
      return (
        <Tr m={1} key={i}>
          {region?.content?.map((data, j) => parseTree(data, j))}
        </Tr>
      );
    case 'table-cell':
      return (
        <Td m={1} key={i}>
          {region?.content.map((el, k) => parseTree(el, k))}
        </Td>
      );
    case 'text':
      region?.marks?.map((mark) => {
        switch (mark?.type) {
          case 'bold':
            props.fontWeight = 600;
        }
      });
      return <span style={{ ...props }}>{region?.value}</span>;
    case 'hyperlink':
      return (
        <Link href={region?.data?.uri} {...props} color={'#FF9916'}>
          {region?.content?.map((val, j) => parseTree(val, j))}
        </Link>
      );
  }
};
