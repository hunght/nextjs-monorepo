import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import BotTableBlock from '../blocks/bot-table';

import { demoConfig } from '../demo.config';
import AppBarMenu from '@/components/app-bar-menu';

import { MainLayout } from '@/components/layout/main-layout';

type Props = {
  children?: never;
};

export const DashBoardPage: React.FC<Props> = () => {
  const { t } = useTranslation(demoConfig.i18nNamespaces);

  return (
    <>
      <NextSeo
        title={t('demo:page.title')}
        description="trading-bot nextjs monorepo example, https://github.com/hunght/nextjs-monorepo"
      />
      <MainLayout>
        <AppBarMenu />
        <BotTableBlock />
      </MainLayout>
    </>
  );
};
