import { Box, Input, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import { MainLayout } from '@/components/layout/main-layout';

import { useUserCreateAPICredentialMutation } from 'redux/api';
import { useAppSelector } from 'redux/store';

import { AddNewAPICard } from '../blocks/add-new-api-card';
import { Jumbotron } from '../blocks/jumbotron';
import { publicApiConfig } from '../public-api.config';

type Props = {
  children?: never;
};

export const PublicAPIPage: React.FC<Props> = () => {
  const { t } = useTranslation(publicApiConfig.i18nNamespaces);
  const profile = useAppSelector((state) => state.auth.profile);
  const [createAPICredential, { isLoading }] =
    useUserCreateAPICredentialMutation();
  return (
    <>
      <NextSeo
        title={t('publicApi:page.title')}
        description="trading-bot nextjs monorepo example, https://github.com/hunght/nextjs-monorepo"
      />
      <MainLayout>
        <AddNewAPICard
          loading={isLoading}
          onClickAdd={(data) => {
            createAPICredential(data);
          }}
        />
        <Jumbotron />
      </MainLayout>
    </>
  );
};
