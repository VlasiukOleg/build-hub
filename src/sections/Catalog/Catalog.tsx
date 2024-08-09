import CatalogCard from '@/components/ui/CatalogCard';

import Shtukaturka from '@/../public/images/shtukaturka-450x300.webp';
import Gipsokarton from '@/../public/images/gipsokarton-450х300.webp';

const catalog = [
  {
    id: 1,
    text: 'Ручна та машина штукатурка',
    img: Shtukaturka,
    href: 'shtukaturka',
  },
  {
    id: 2,
    text: 'Гіпсокартон',
    img: Gipsokarton,
    href: 'gipsakarton',
  },
];

interface ICatalogProps {}

const Catalog: React.FC<ICatalogProps> = ({}) => {
  return (
    <section className="py-5 md:py-10">
      <div className="container">
        <h1 className="font-unbounded xl:text-2xl font-bold text-center mb-5  md:text-lg">
          Оберіть потрібну Вам категорію будівельних робіт
        </h1>
        <ul className="flex flex-wrap gap-5 uppercase font-medium text-xl md:text-base">
          {catalog.map(item => (
            <CatalogCard
              key={item.id}
              img={item.img}
              text={item.text}
              href={item.href}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Catalog;
