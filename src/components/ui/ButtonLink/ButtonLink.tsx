'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Icon1 from '@/../public/icons/arrow.svg';

import clsx from 'clsx';

export interface ButtonLinkProps {
  children: React.ReactNode;
  href: string;
  variant?: 'main' | 'main-icon';
  className?: string;
}

export default function ButtonLink({
  href,
  children,
  variant,
  className = '',
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      href={`/${href}`}
      className={clsx(
        'inline-flex justify-center items-center gap-4 text-sm font-medium leading-[1.5] bg-[#FF6033] text-white px-8 py-4 md:text-base md:py-[17.5px]',
        variant === 'main-icon' && 'py-[13.5px]',
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
