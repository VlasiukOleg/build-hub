'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import WeightIcon from '@/../public/icons/weight.svg';
import PriceIcon from '@/../public/icons/price.svg';
import CartIcon from '@/../public/icons/cart.svg';

import Cart from '@/../public/images/cart.png';

interface IOrderBarProps {
  totalQuantity: number;
  totalWeight: number;
  totalPrice: number;
}

const OrderBar: React.FC<IOrderBarProps> = ({
  totalQuantity,
  totalWeight,
  totalPrice,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-2 fixed  left-1/2 transform -translate-x-1/2 bg-lightAccent w-full max-w-[calc(100%-2rem)] rounded-xl p-3 transition-all  z-10',
        scrollPosition > 88 ? 'top-0' : 'top-[72px]',
        totalQuantity > 0 ? 'opacity-1' : 'opacity-0'
      )}
    >
      <div className="p-1 rounded-lg bg-white text-black flex items-center gap-1 text-xs">
        <WeightIcon width={20} height={20} className="size-5" /> {totalWeight}{' '}
        кг.
      </div>
      <div className="flex items-center gap-2">
        <div className="p-1 rounded-lg bg-white text-black flex gap-1 items-center text-xs">
          <PriceIcon width={20} height={20} className="size-5" />{' '}
          {totalPrice.toFixed(2)} грн.
        </div>
        <div>
          <Image src={Cart} width={32} height={32} alt="іконка корзини" />
        </div>
      </div>
    </div>
  );
};

export default OrderBar;
