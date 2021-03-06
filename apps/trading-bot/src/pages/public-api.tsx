import { BadRequest } from '@tsed/exceptions';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PublicAPIPage } from '@/features/public-api/pages/public-api';
import { publicApiConfig } from '@/features/public-api/public-api.config';

type Props = {
  /** Add PublicAPIRoute props here */
};

export default function PublicAPIRoute(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <PublicAPIPage />;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { locale } = context;
  if (locale === undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = publicApiConfig;
  return {
    props: {
      // i18nNamespaces.slice() is needed here to get rid off readonly
      ...(await serverSideTranslations(locale, i18nNamespaces.slice())),
    },
  };
};
