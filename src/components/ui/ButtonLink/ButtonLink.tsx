import Link from 'next/link';

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
        'inline-flex justify-center items-center rounded-md gap-4 text-xs font-medium leading-[1.5] bg-[#FF6033] text-white px-6 py-2 md:text-base xl:text-2xl',
        variant === 'main-icon' && 'py-[13.5px]',
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
