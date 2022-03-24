import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { MainLayout } from '@/components/layout/main-layout';
import { userConfig } from '../user.config';

type Props = {
  children?: never;
};

export const UserPage: React.FC<Props> = () => {
  const { t } = useTranslation(userConfig.i18nNamespaces);
  const { data: session } = useSession();

  return (
    <>
      <NextSeo
        title={t('user:page.title')}
        description="See https://github.com/hunght/nextjs-monorepo"
      />
      <MainLayout></MainLayout>
    </>
  );
};
