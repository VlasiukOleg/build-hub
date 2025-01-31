'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Button } from "@heroui/react";

import { useAppDispatch } from '@/redux/hooks';
import { clearQuantity } from '@/redux/materialsSlice';
import { toggleMovingPriceToOrder } from '@/redux/movingSlice';

import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { MdOutlineCancel } from 'react-icons/md';
import { LuWeight } from 'react-icons/lu';
import { FaPersonWalkingLuggage } from 'react-icons/fa6';
import { TbTruckDelivery } from 'react-icons/tb';
import { GiMoneyStack } from 'react-icons/gi';

interface IOrderBarProps {
  totalQuantity: number;
  totalWeight: number;
  totalPrice: number;
  deliveryPrice: number;
  deliveryType: string;
  movingPrice: number;
  isMovingAddToOrder: boolean;
}

const OrderBar: React.FC<IOrderBarProps> = ({
  totalQuantity,
  totalWeight,
  totalPrice,
  deliveryPrice,
  deliveryType,
  movingPrice,
  isMovingAddToOrder,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onClearOrder = () => {
    dispatch(clearQuantity(0));
    dispatch(toggleMovingPriceToOrder());
  };

  return (
    <div
      className={clsx(
        'flex flex-wrap items-center justify-between gap-2 fixed  left-1/2 transform -translate-x-1/2 bg-lightAccent w-full max-w-[448px] rounded-xl p-3 transition-all  z-10 md:max-w-[700px] xl:max-w-[1216px]',
        scrollPosition > 28 ? 'top-0' : 'top-[72px] xl:top-[88px]',
        totalQuantity > 0 ? 'opacity-1 visible' : 'opacity-0 invisible'
      )}
    >
      <div className="flex items-center gap-1 md:gap-3 xl:gap-5">
        <div className="p-1 rounded-lg bg-white text-black flex items-center gap-1 text-xs md:text-sm md:p-2 xl:text-lg xl:p-2 xl:gap-2">
          <LuWeight className="size-5  xl:size-7 text-grey" />
          {totalWeight.toFixed(2)} кг.
        </div>
        {isMovingAddToOrder && (
          <div className="p-1 rounded-lg bg-white text-black flex items-center gap-1 text-xs md:text-sm md:p-2 xl:text-lg xl:p-2 xl:gap-2">
            <FaPersonWalkingLuggage className="size-5  xl:size-7 text-grey" />
            {movingPrice} грн.
          </div>
        )}

        {deliveryType === 'delivery' && (
          <div className="p-1 rounded-lg bg-white text-black flex items-center gap-1 text-xs md:text-sm md:p-2 xl:text-lg xl:p-2 xl:gap-2">
            <TbTruckDelivery className="size-5  xl:size-7 text-grey" />
            {deliveryPrice} грн.
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="p-1 rounded-lg bg-white text-black flex gap-1 items-center text-xs md:text-sm md:p-2 xl:text-lg xl:p-2 xl:gap-2">
          <GiMoneyStack className="size-5  xl:size-7 text-grey" />
          {totalPrice.toFixed(2)} грн.
        </div>
        <Button
          isIconOnly
          aria-label="Go to Cart"
          onPress={() => router.push('/order')}
          className="bg-white h-7 md:h-9 md:w-9 xl:size-11"
          radius="sm"
        >
          <PiShoppingCartSimpleBold className="size-4 md:size-6 xl:size-8 text-green-500" />
        </Button>
        <Button
          isIconOnly
          aria-label="Clear Order"
          onPress={onClearOrder}
          className="bg-white h-7 md:h-9 md:w-9 xl:size-11"
          radius="sm"
        >
          <MdOutlineCancel className="size-4 md:size-6 xl:size-8 text-red-600" />
        </Button>
      </div>
    </div>
  );
};

export default OrderBar;
