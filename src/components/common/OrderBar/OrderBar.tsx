'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import { useAppDispatch } from '@/redux/hooks';
import { clearQuantity } from '@/redux/materialsSlice';
import { toggleMovingPriceToOrder } from '@/redux/movingSlice';

import WeightIcon from '@/../public/icons/weight.svg';
import PriceIcon from '@/../public/icons/price.svg';
import DeliveryIcon from '@/../public/icons/delivery-truck.svg';
import MovingIcon from '@/../public/icons/moving.svg';

import Cart from '@/../public/images/cart.png';
import Remove from '@/../public/images/remove.png';

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
        scrollPosition > 88 ? 'top-0' : 'top-[72px] xl:top-[88px]',
        totalQuantity > 0 ? 'opacity-1' : 'opacity-0'
      )}
    >
      <div className="flex items-center gap-1 md:gap-3 xl:gap-5">
        <div className="p-1 rounded-lg bg-white text-black flex items-center gap-1 text-xs md:text-sm md:p-2 xl:text-lg xl:p-3 xl:gap-2">
          <WeightIcon width={20} height={20} className="size-5 xl:size-7" />{' '}
          {totalWeight} кг.
        </div>
        {isMovingAddToOrder && (
          <div className="p-1 rounded-lg bg-white text-black flex items-center gap-1 text-xs md:text-sm md:p-2 xl:text-lg xl:p-3 xl:gap-2">
            <MovingIcon width={20} height={20} className="size-5  xl:size-7" />{' '}
            {movingPrice} грн.
          </div>
        )}

        {deliveryType === 'delivery' && (
          <div className="p-1 rounded-lg bg-white text-black flex items-center gap-1 text-xs md:text-sm md:p-2 xl:text-lg xl:p-3 xl:gap-2">
            <DeliveryIcon
              width={20}
              height={20}
              className="size-5  xl:size-7"
            />{' '}
            {deliveryPrice} грн.
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="p-1 rounded-lg bg-white text-black flex gap-1 items-center text-xs md:text-sm md:p-2 xl:text-lg xl:p-3 xl:gap-2">
          <PriceIcon width={20} height={20} className="size-5 xl:size-7" />{' '}
          {totalPrice.toFixed(2)} грн.
        </div>
        <div>
          <Image
            src={Cart}
            width={32}
            height={32}
            alt="іконка корзини"
            className="size-8 md:size-9 xl:size-14"
          />
        </div>
        <button>
          <Image
            src={Remove}
            width={28}
            height={28}
            alt="іконка видалення"
            className="size-7 md:size-8 xl:size-12"
            onClick={onClearOrder}
          />
        </button>
      </div>
    </div>
  );
};

export default OrderBar;
