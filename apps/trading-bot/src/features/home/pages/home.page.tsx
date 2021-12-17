import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { CtaBlock } from '../blocks/cta-block';
import { FeaturesBlock } from '../blocks/features-block';
import { HeroBlock } from '../blocks/hero-block';
import { homeConfig } from '../home.config';
import { Banner } from '@/components/banner';
import { MainLayout } from '@/components/layout/main-layout';

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
      <MainLayout>
        <Banner />
        <HeroBlock />
        <FeaturesBlock />
        <CtaBlock />
      </MainLayout>
    </>
  );
};
