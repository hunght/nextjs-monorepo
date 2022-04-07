import type { I18nActiveNamespaces } from '@/core/i18n/i18n-namespaces.type';

export type TradingBotConfig = {
  // Define installed namespaces in the type here
  // to allow full typechecking of your translation keys.
  i18nNamespaces: Readonly<I18nActiveNamespaces<'common' | 'tradingBot'>>;
};

export const tradingBotConfig: TradingBotConfig = {
  i18nNamespaces: ['common', 'tradingBot'],
} as const;
