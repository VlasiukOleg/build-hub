import Script from 'next/script';

import DisclosureCategories from '@/components/ui/DisclosureCategories/';

import data from '@/data/common.json';

import { Pages } from '@/@types';

interface IPageProps {
  params: { slug: Pages };
}

export const dynamicParams = false;
export const dynamic = 'error';
export const revalidate = false;

export function generateStaticParams() {
  return data.materialSlugs.map(slug => {
    return { slug };
  });
}

const Page: React.FC<IPageProps> = ({ params: { slug } }) => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-EEGRJKT26X"
      ></Script>
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EEGRJKT26X');
            `,
        }}
      />
      <DisclosureCategories slug={slug} />
    </>
  );
};

export default Page;
