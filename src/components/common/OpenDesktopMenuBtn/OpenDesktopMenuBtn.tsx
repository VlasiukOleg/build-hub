'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';

interface IOpenDesktopMenuBtnProps {}

const OpenDesktopMenuBtn: React.FC<IOpenDesktopMenuBtnProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex relative">
      <nav
        className={clsx(
          'bg-bgWhite border-[1px] border-accent px-4 py-4 rounded-l-lg transition-all duration-500 absolute w-[401px] left-[-401px]',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <ul className="flex font-semibold  gap-5 uppercase">
          <Link href="/catalog/" onClick={() => setIsOpen(!isOpen)}>
            Матеріали
          </Link>
          <Link href="/services" onClick={() => setIsOpen(!isOpen)}>
            Послуги
          </Link>
          <Link href="/about" onClick={() => setIsOpen(!isOpen)}>
            О проекті
          </Link>
        </ul>
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'px-2 py-4 font-semibold bg-bgWhite border-[1px] border-accent inline-block rounded-lg relative z-10 text-accent ',
          isOpen && 'rounded-l-none border-l-0 pl-[3.5px]'
        )}
      >
        {isOpen ? 'CLOSE' : 'MENU'}
      </button>
    </div>
  );
};

export default OpenDesktopMenuBtn;
