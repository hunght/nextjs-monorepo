import type { EmotionCache } from '@emotion/react';
import { isNonEmptyString } from '@nexttop.dev/core-lib';
import * as Sentry from '@sentry/browser';
import { appWithTranslation } from 'next-i18next';
import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import { AppProviders } from '../app-providers';

/**
 * Import global styles, global css or polyfills here
 * i.e.: import '@/assets/theme/style.scss'
 */
import 'tailwindcss/tailwind.css';

/**
 * Local fonts
 * @link https://fontsource.org/docs/guides/nextjs
 */
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
// @link https://fontsource.org/docs/variable-fonts
import '@fontsource/inter/variable.css';

import { sentryBrowserInitConfig } from '@/config/sentry.config';

// Workaround for https://github.com/zeit/next.js/issues/8592
export type AppProps = NextAppProps & {
  /** Will be defined only is there was an error */
  err?: Error;
  emotionCache?: EmotionCache;
};

if (
  process.env.NEXT_PUBLIC_SENTRY_DSN &&
  isNonEmptyString(process.env.NEXT_PUBLIC_SENTRY_DSN)
) {
  Sentry.init(sentryBrowserInitConfig);
}

/**
 * @link https://nextjs.org/docs/advanced-features/custom-app
 */
const MyApp = (appProps: AppProps) => {
  const { Component, pageProps, emotionCache, err } = appProps;
  return (
    <AppProviders emotionCache={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* Workaround for https://github.com/vercel/next.js/issues/8592 */}
      <Component {...pageProps} err={err} />
    </AppProviders>
  );
};

/**
 * Generally don't enable getInitialProp if you don't need to,
 * all your pages will be served server-side (no static optimizations).
 */
/*
MyApp.getInitialProps = async appContext => {
   // calls page's `getInitialProps` and fills `appProps.pageProps`
   const appProps = await App.getInitialProps(appContext)
   return { ...appProps }
}
*/

export default appWithTranslation(MyApp);
