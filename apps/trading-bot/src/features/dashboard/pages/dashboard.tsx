import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import AppBarMenu from '@/components/app-bar-menu';

import { Banner } from '@/components/banner';
import { MainLayout } from '@/components/layout/main-layout';
import BotTableBlock from '../blocks/bot-table';
import { dashboardConfig } from '../dashboard.config';

type Props = {
  children?: never;
};

export const DashBoardPage: React.FC<Props> = () => {
  const { t } = useTranslation(dashboardConfig.i18nNamespaces);

  return (
    <>
      <NextSeo
        title={t('dashboard:page.title')}
        description="trading-bot nextjs monorepo example, https://github.com/hunght/nextjs-monorepo"
      />
      <MainLayout>
        <Banner />
        <AppBarMenu />
        <BotTableBlock />
      </MainLayout>
    </>
  );
};
