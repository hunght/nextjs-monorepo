import { BadRequest } from '@tsed/exceptions';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { demoConfig } from '@/features/demo/demo.config';
import { DashBoardPage } from '@/features/demo/pages/dashboard';

type Props = {
  /** Add HomeRoute props here */
};

export default function DemoRoute(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <DashBoardPage />;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { locale } = context;
  if (locale === undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = demoConfig;
  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces.slice())),
    },
  };
};
