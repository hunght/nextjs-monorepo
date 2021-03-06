import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { Banner } from '@/components/banner';
import { MainFooter } from '@/components/layout/main-footer';

import { CtaBlock } from '../blocks/cta-block';
import { FeaturesBlock } from '../blocks/features-block';

import { homeConfig } from '../home.config';

type Props = {
  children?: never;
};

export const HomePage: React.FC<Props> = () => {
  const { t } = useTranslation(homeConfig.i18nNamespaces);

  return (
    <>
      <NextSeo
        title={t('home:page.title')}
        description="See https://github.com/hunght/nextjs-monorepo"
      />
      <div className="flex flex-col h-screen">
        <main>
          <Banner />
          <FeaturesBlock />
          <CtaBlock />
        </main>
        <MainFooter />
      </div>
    </>
  );
};
