import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import { MainLayout } from '@/components/layout/main-layout';

import { useTradingBotsQuery } from 'redux/api';
import { useAppSelector } from 'redux/store';

import { TradingBotTable } from '../blocks/list-table';

import { PresetBots } from '../blocks/preset-bots';
import { tradingBotConfig } from '../trading-bot.config';

type Props = {
  children?: never;
};

export const TradingBotPage: React.FC<Props> = () => {
  const { t } = useTranslation(tradingBotConfig.i18nNamespaces);
  const profile = useAppSelector((state) => state.auth.profile);
  const { data, isLoading, error } = useTradingBotsQuery();

  return (
    <>
      <NextSeo
        title={t('tradingBot:page.title')}
        description="trading-bot nextjs monorepo example, https://github.com/hunght/nextjs-monorepo"
      />
      <MainLayout error={JSON.stringify(error)}>
        <PresetBots>
          <TradingBotTable
            apis={data?.data ?? []}
            onDeleteItem={(selectedId) => {
              console.log(`==== selectedId ===`);
              console.log(selectedId);
              console.log('==== end log ===');
            }}
          />
        </PresetBots>
      </MainLayout>
    </>
  );
};
