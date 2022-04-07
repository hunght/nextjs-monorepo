import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import { MainLayout } from '@/components/layout/main-layout';

import {
  useCreateAPICredentialMutation,
  useDeleteAPICredentialMutation,
} from 'redux/api';
import { useAppSelector } from 'redux/store';

import { AddNewAPICard } from '../blocks/add-new-api-card';
import { APICredentialTable } from '../blocks/api-credential-table';

import { publicApiConfig } from '../public-api.config';

type Props = {
  children?: never;
};

export const PublicAPIPage: React.FC<Props> = () => {
  const { t } = useTranslation(publicApiConfig.i18nNamespaces);
  const profile = useAppSelector((state) => state.auth.profile);
  const [
    deleteAPICredential,
    {
      isLoading: isDeleteLoading,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteAPICredentialMutation();
  const [createAPICredential, { isLoading, error, isSuccess }] =
    useCreateAPICredentialMutation();
  return (
    <>
      <NextSeo
        title={t('publicApi:page.title')}
        description="trading-bot nextjs monorepo example, https://github.com/hunght/nextjs-monorepo"
      />
      <MainLayout
        error={JSON.stringify(error || deleteError)}
        success={
          isSuccess
            ? 'Created new api credential success'
            : isDeleteSuccess
            ? 'Delete api success'
            : undefined
        }>
        <AddNewAPICard
          loading={isLoading || isDeleteLoading}
          onClickAdd={(data) => {
            createAPICredential(data);
          }}
        />
        <APICredentialTable
          apis={profile?.apiCredentials ?? []}
          onDeleteItem={(selectedId) => {
            deleteAPICredential({ id: selectedId });
          }}
        />
      </MainLayout>
    </>
  );
};
