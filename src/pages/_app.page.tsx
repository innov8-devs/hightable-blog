import React from 'react';

import { ApolloProvider } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

import Layout from '../components/layouts/Layout';
import { client, theme, config } from '../config';

import '@fontsource/montserrat';
import '@fontsource/dm-serif-display';

Bugsnag.start({
  apiKey: config.BUGSNAG,
  plugins: [new BugsnagPluginReact()],
});

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hightable.africa/" />
        <meta property="og:title" content="HighTable" />
        <meta
          property="og:image"
          content="https://i.postimg.cc/7Ykc44Xx/Black-Hightable-with-tagline-1.png"
        />
        <meta
          property="og:description"
          content="HighTable Africa - Experience Africa like never before! Discover restaurants, nightlife, hotels, attractions, and activities across Africa.  With HighTable, you can plan your next trip, read honest and reliable peer reviews, make reservations, connect with communities, and more. "
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <ErrorBoundary>
        <ApolloProvider client={client}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </ApolloProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
