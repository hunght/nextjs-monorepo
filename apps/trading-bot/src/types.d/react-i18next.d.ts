/**
 * Types augmentation for translation keys to allow to typecheck
 * and suggesting keys to the t function. In case it's too slow
 * you can opt out by commenting the following code.
 * @link https://react.i18next.com/latest/typescript
 */
import 'react-i18next';
import type common from '../../public/locales/en/common.json';
import type dashboard from '../../public/locales/en/dashboard.json';
import type home from '../../public/locales/en/home.json';
import type publicApi from '../../public/locales/en/public-api.json';
import type system from '../../public/locales/en/system.json';
import type user from '../../public/locales/en/user.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      home: typeof home;
      dashboard: typeof dashboard;
      system: typeof system;
      user: typeof user;
      publicApi: typeof publicApi;
    };
  }
}
