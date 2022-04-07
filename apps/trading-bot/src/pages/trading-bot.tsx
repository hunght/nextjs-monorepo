import { BadRequest } from '@tsed/exceptions';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TradingBotPage } from '@/features/trading-bot/pages/trading-bot';
import { tradingBotConfig } from '@/features/trading-bot/trading-bot.config';

type Props = {
  /** Add TradingBotRoute props here */
};

export default function TradingBotRoute(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <TradingBotPage />;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { locale } = context;
  if (locale === undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = tradingBotConfig;
  return {
    props: {
      // i18nNamespaces.slice() is needed here to get rid off readonly
      ...(await serverSideTranslations(locale, i18nNamespaces.slice())),
    },
  };
};
