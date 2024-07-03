'use client';

import React from 'react';

import ButtonLink from '../ui/ButtonLink';
import ArrowIcon from '@/../public/icons/arrow.svg';

export interface ExamplesProps {}

export default function Examples(props: ExamplesProps) {
  return (
    <div className="py-10 flex items-center gap-2 flex-wrap">
      <ButtonLink href="examples" variant="main">
        Зв’яжіться з нами
      </ButtonLink>
      <ButtonLink href="examples" variant="main-icon">
        <ArrowIcon width={24} height={24} />
        Зв’яжіться з нами
      </ButtonLink>
      <ButtonLink href="examples" variant="main-icon">
        Зв’яжіться з нами
        <ArrowIcon width={24} height={24} />
      </ButtonLink>
      <div className="bg-orange-600 text-green-600">Testing BG and Color</div>
    </div>
  );
}
