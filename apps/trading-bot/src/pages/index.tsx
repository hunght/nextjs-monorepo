import { BadRequest } from '@tsed/exceptions';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dashboardConfig } from '@/features/dashboard/dashboard.config';
import { DashBoardPage } from '@/features/dashboard/pages/dashboard';
import { homeConfig } from '@/features/home/home.config';
import { HomePage } from '@/features/home/pages/home.page';
import { useAppSelector, wrapper } from 'redux/store';

export default function RootRoute(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { status } = useAppSelector((state) => state.auth);
  if (status === 'loading') {
    return <div>loading...</div>;
  }
  if (status === 'authenticated') {
    return <DashBoardPage />;
  }
  return <HomePage />;
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const { locale } = context;
    const status = store.getState()?.auth.status;

    if (locale === undefined) {
      throw new BadRequest('locale is missing');
    }
    const { i18nNamespaces } =
      status === 'authenticated' ? dashboardConfig : homeConfig;
    return {
      props: {
        ...(await serverSideTranslations(locale, i18nNamespaces.slice())),
      },
    };
  }
);
