import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { extendTheme } from '@chakra-ui/react';
import { createUploadLink } from 'apollo-upload-client';

import { AUTH_TOKEN } from './constants'; // eslint-disable-line

export const config = {
  BASE_URL:
    process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://gateway.hightable.africa',
  BUGSNAG: process.env.NEXT_PUBLIC_BUGSNAG,
  TOKEN_STORAGE: 'hightable',
  PAYSTACK_KEY: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
  HIGHTABLE_BUSINESS_URI:
    process.env.HIGHTABLE_BUSINESS_URI || 'https://business.hightable.africa',
  stripe: {
    LIVE: process.env.NEXT_PUBLIC_STRIPE_TEST,
    TEST: process.env.NEXT_PUBLIC_STRIPE_TEST,
  },
};

export const authLink = setContext((_, { headers }) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : '',
      },
    };
  }
});

export const httpLink = createUploadLink({
  uri: config.BASE_URL,
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: config.BASE_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          recommendRestaurants: offsetLimitPagination(),
          recommendEvents: offsetLimitPagination(),
        },
      },
    },
  }),
});

export const theme = extendTheme({
  fonts: {
    heading: 'DM Serif Display, serif;',
    body: 'Montserrat, sans-serif; ',
  },
  components: {
    button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  },
});

export default config;
