import { sayHello } from '@nexttop.dev/core-lib';
import { AsyncMessage, Message } from '@nexttop.dev/ui-lib';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { DemoApiBlock } from '../blocks/demo-api.block';
import { demoConfig } from '../demo.config';
import { Banner } from '@/components/banner';
import { MainLayout } from '@/components/layout/main-layout';
import { DemoMuiBlock } from '@/features/demo/blocks/demo-mui.block';
import { Jumbotron } from '@/features/demo/blocks/jumbotron';

type Props = {
  children?: never;
};

export const DemoPage: React.FC<Props> = () => {
  const { t } = useTranslation(demoConfig.i18nNamespaces);

  return (
    <>
      <NextSeo
        title={t('demo:page.title')}
        description="trading-bot nextjs monorepo example, https://github.com/hunght/nextjs-monorepo"
      />
      <MainLayout>
        <Banner />
        <h3>I'm the trading-bot</h3>
        <Jumbotron />
        <ul>
          <li>{`Foo says: ${sayHello('World')} from @nexttop.dev/core-lib`}</li>
          <li>
            <Message message={'Bar react component from @nexttop.dev/ui-lib'} />
          </li>
          <li>
            <AsyncMessage apiUrl={'/api/hello'} />
          </li>
        </ul>
        <Image
          src={'/shared-assets/images/nextjs-logo.png'}
          alt={'logo'}
          width={400}
          height={240}
        />
        <div className={'pt-8'} />
        <DemoMuiBlock />
        <div className={'pt-8'} />
        <DemoApiBlock />
      </MainLayout>
    </>
  );
};
