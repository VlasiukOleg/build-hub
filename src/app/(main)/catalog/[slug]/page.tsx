import DisclosureCategories from '@/components/ui/DisclosureCategories/';

import data from '@/data/common.json';

interface IPageProps {
  params: { slug: string };
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
  console.log(slug);
  return <DisclosureCategories slug={slug} />;
};

export default Page;
