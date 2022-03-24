import { BadRequest } from '@tsed/exceptions';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dashboardConfig } from '@/features/dashboard/dashboard.config';
import { DashBoardPage } from '@/features/dashboard/pages/dashboard';

type Props = {
  /** Add HomeRoute props here */
};

export default function DashBoardRoute(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data: session, status } = useSession();

  const loading = status === 'loading';
  if (loading) {
    return <div />;
  }
  if (session) {
    return <DashBoardPage />;
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { locale } = context;
  if (locale === undefined) {
    throw new BadRequest('locale is missing');
  }
  const { i18nNamespaces } = dashboardConfig;
  return {
    props: {
      ...(await serverSideTranslations(locale, i18nNamespaces.slice())),
    },
  };
};
