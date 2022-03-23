import type { I18nActiveNamespaces } from '@/core/i18n/i18n-namespaces.type';

export type DashBoardConfig = {
  // Define installed namespaces in the type here
  // to allow full typechecking of your translation keys.
  i18nNamespaces: Readonly<I18nActiveNamespaces<'common' | 'dashboard'>>;
};

export const dashboardConfig: DashBoardConfig = {
  i18nNamespaces: ['common', 'dashboard'],
} as const;
