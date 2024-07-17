'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

const Modal = dynamic(() => import('@/components/ui/Modal'));
import ButtonLink from '@/components/ui/ButtonLink';
import DeliveryTypeChoice from '@/components/ui/DeliveryTypeChoice/DeliveryTypeChoice';

import Map from '@/../public/images/kiev_district.png';

import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setDeliveryType, setDeliveryStorage } from '@/redux/deliverySlice';

interface IStorageMapProps {}

const storages = [
  { id: 1, location: 'Київ, вул. Марка Вовчка, 14 (Куренівка)' },
  { id: 2, location: 'Київ, пров. Деревообробний , 5  (Видубичі)' },
  { id: 3, location: 'Київ, пр-т Перемоги, 67. корпус-Nb (м. Нивки)' },
  { id: 4, location: 'Київ, вул.Бориспільська, 7' },
];

const StorageMap: React.FC<IStorageMapProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');

  const router = useRouter();
  const dispatch = useAppDispatch();

  const deliveryType = useAppSelector(state => state.delivery.deliveryType);
  const deliveryStorage = useAppSelector(
    state => state.delivery.deliveryStorage
  );

  const handleStorageClick = (location: string) => {
    setIsOpen(true);
    setSelectedStore(location);
  };

  const handleDeliveryType = (deliveryType: string) => {
    dispatch(setDeliveryStorage(selectedStore));
    dispatch(setDeliveryType(deliveryType));
    setIsOpen(false);
  };

  return (
    <section className="py-5 md:py-10 text-center">
      <h1 className="xl:text-2xl font-bold text-center mb-5 md:mb-10 md:text-lg">
        Оберіть найближчий до Вас склад завантаження
      </h1>
      <div className="relative mb-5 md:mb-10 xl:flex xl:items-center xl:justify-center">
        <div className="xl:w-[1000px] ">
          <Image src={Map} priority alt="map" />
        </div>

        <div className="">
          <ul className="flex gap-2">
            {storages?.map(storage => (
              <li
                key={storage.id}
                className={clsx(
                  'bg-accent rounded-full text-white  text-sm size-5 flex items-center justify-center absolute border-[1px] border-white md:size-7 md:text-base xl:size-9 xl:text-xl',
                  storage.id === 1 &&
                    'top-[42%] left-[42%] xl:top-[42%] xl:left-[42%]',
                  storage.id === 2 &&
                    'top-[60%] left-[51%] xl:top-[60%] xl:left-[51%]',
                  storage.id === 3 &&
                    'top-[47%] left-[15%] xl:top-[47%] xl:left-[21%]',
                  storage.id === 4 &&
                    'bottom-[28%] right-[22%] xl:bottom-[28%] xl:right-[22%]',
                  deliveryStorage === storage.location &&
                    'bg-white text-orange-500 border-orange-500 scale-[1.1] xl:border-[2px]'
                )}
              >
                <button onClick={() => handleStorageClick(storage.location)}>
                  {storage.id}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {deliveryStorage && (
        <ul className="flex flex-col gap-2 text-sm mb-5 md:text-base xl:text-xl">
          <li>Склад: {deliveryStorage}</li>
          <li>
            Тип доставки:{' '}
            {deliveryType === 'delivery'
              ? 'Доставка автотранспортом'
              : 'Cамовивіз зі складу'}
          </li>
        </ul>
      )}

      <ButtonLink
        variant="main"
        onClick={() => router.push('/catalog')}
        disabled={deliveryType === ''}
      >
        ПРОДОВЖИТИ
      </ButtonLink>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <DeliveryTypeChoice
          selectedStore={selectedStore}
          handleDeliveryType={handleDeliveryType}
        />
      </Modal>
    </section>
  );
};

export default StorageMap;
