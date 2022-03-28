import type { I18nActiveNamespaces } from '@/core/i18n/i18n-namespaces.type';

export type PublicAPIConfig = {
  // Define installed namespaces in the type here
  // to allow full typechecking of your translation keys.
  i18nNamespaces: Readonly<I18nActiveNamespaces<'common' | 'publicApi'>>;
};

export const publicApiConfig: PublicAPIConfig = {
  i18nNamespaces: ['common', 'publicApi'],
} as const;
