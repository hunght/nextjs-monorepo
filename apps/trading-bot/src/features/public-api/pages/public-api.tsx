import { Box, Input, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';

import { MainLayout } from '@/components/layout/main-layout';

import { useAppSelector } from 'redux/store';
import { DemoMuiBlock } from '../blocks/demo-mui.block';
import { Jumbotron } from '../blocks/jumbotron';
import { publicApiConfig } from '../public-api.config';

type Props = {
  children?: never;
};

export const PublicAPIPage: React.FC<Props> = () => {
  const { t } = useTranslation(publicApiConfig.i18nNamespaces);
  const profile = useAppSelector((state) => state.auth.profile);

  return (
    <>
      <NextSeo
        title={t('publicApi:page.title')}
        description="trading-bot nextjs monorepo example, https://github.com/hunght/nextjs-monorepo"
      />
      <MainLayout>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField id="outlined-error" label="API Key" variant="standard" />
          <TextField
            error
            id="outlined-error"
            label="API Secret"
            variant="standard"
          />
        </Box>

        <DemoMuiBlock />
        <Jumbotron />
      </MainLayout>
    </>
  );
};
