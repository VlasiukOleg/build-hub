import Image from 'next/image';

import Map from '../../../../public/images/kiev_district.png';
import clsx from 'clsx';

interface IStorageMapProps {}

const storages = [
  { id: 1, location: 'Київ, вул. Марка Вовчка, 14 (Куренівка)' },
  { id: 2, location: 'Київ, пров. Деревообробний , 5  (Видубичі)' },
  { id: 3, location: 'Київ, пр-т Перемоги, 67. корпус-Nb (м. Нивки)' },
  { id: 4, location: 'Київ, вул.Бориспільська, 7' },
];

const StorageMap: React.FC<IStorageMapProps> = () => {
  return (
    <section className="py-5 md:py-10">
      <h1 className="xl:text-2xl font-bold text-center mb-5 md:mb-10 md:text-lg">
        Оберіть найближчий до Вас склад завантаження
      </h1>
      <div className="relative">
        <Image
          src={Map}
          alt="map"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="">
          <ul className="flex gap-2">
            {storages?.map(storage => (
              <li
                key={storage.id}
                className={clsx(
                  'bg-accent rounded-full  text-sm size-5 flex items-center justify-center absolute border-[1px] border-white md:size-7 md:text-base xl:size-9 xl:text-xl',
                  storage.id === 1 && 'top-[34%] left-[42%]',
                  storage.id === 2 && 'top-[49%] left-[51%]',
                  storage.id === 3 && 'top-[41%] left-[21%]',
                  storage.id === 4 && 'bottom-[38%] right-[18%]'
                )}
              >
                {storage.id}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StorageMap;
