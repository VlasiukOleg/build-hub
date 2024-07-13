'use client';

import {
  DisclosurePanel,
  Radio,
  RadioGroup,
  Input,
  Field,
  Label,
} from '@headlessui/react';
import clsx from 'clsx';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setDeliveryPrice } from '@/redux/deliverySlice';

import { calculateMovingFee } from '@/utils/calculateMovingFee';
import { calculateDeliveryFee } from '@/utils/calculateDeliveryFee';

interface IDisclosureDeliveryPanelProps {
  totalWeight: number;
}

const elevators = [
  {
    name: 'Пасажирський ліфт',
    label: 'passenger',
  },
  { name: 'Вантажний ліфт', label: 'cargo' },
  { name: 'Без ліфта', label: 'nolift' },
];

const buildings = [
  {
    name: 'Новий дім/Хрущевка',
    label: 'new',
  },
  { name: 'Сталінка/Царський', label: 'old' },
];

const DisclosureDeliveryPanel: React.FC<IDisclosureDeliveryPanelProps> = ({
  totalWeight,
}) => {
  const movingPrice = useAppSelector(state => state.moving.movingPrice);
  const deliveryPrice = useAppSelector(state => state.delivery.deliveryPrice);
  const deliveryType = useAppSelector(state => state.delivery.deliveryType);
  const deliveryStorage = useAppSelector(
    state => state.delivery.deliveryStorage
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const deliveryFee = calculateDeliveryFee(totalWeight);
    dispatch(setDeliveryPrice(deliveryFee));
  }, [dispatch, totalWeight]);

  return (
    <DisclosurePanel className="mt-2 text-sm/5 text-white/50 md:text-lg xl:text-xl xl:mt-6">
      <div className="mb-3">
        Загальна вага: <span className="text-accent">{totalWeight} кг.</span>
      </div>
      <div className="mb-3">
        Склад: <span className="text-white">{deliveryStorage} </span>
      </div>
      <div className="mb-3">
        Тип доставки:{' '}
        <span className="text-white">
          {deliveryType === 'pickup'
            ? 'Самовивіз зі складу'
            : 'Доставка автотранспортом'}
        </span>
      </div>
      {deliveryType === 'delivery' && (
        <div className="md:flex md:gap-5 md:items-center xl:flex-col xl:items-start">
          <div className="bg-white/5 text-center rounded-lg border-[1px] border-accent p-2 md:flex-[50%] xl:w-[50%]">
            Ціна доставки: {deliveryPrice} грн.
          </div>
        </div>
      )}
    </DisclosurePanel>
  );
};

export default DisclosureDeliveryPanel;
