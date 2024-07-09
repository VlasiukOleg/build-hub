import Image from 'next/image';
import Link from 'next/link';

import CatalogCard from '@/components/ui/CatalogCard';

import Shtukaturka from '../../../../public/images/shtukaturka-450x300.webp';
import Gipsokarton from '../../../../public/images/gipsokarton-450х300.webp';

const catalog = [
  {
    id: 1,
    text: 'Ручна та машина штукатурка',
    img: Shtukaturka,
  },
  {
    id: 2,
    text: 'Гіпсокартон',
    img: Gipsokarton,
  },
];

interface IMaterialsPageProps {}

const MaterialsPage: React.FC<IMaterialsPageProps> = () => {
  return (
    <section className="py-5 md:py-10">
      <div className="container">
        <ul className="flex flex-wrap gap-5 uppercase font-medium text-xl md:text-base">
          {catalog.map(item => (
            <CatalogCard key={item.id} img={item.img} text={item.text} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MaterialsPage;
