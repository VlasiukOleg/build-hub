import LogoIcon from '@/../../public/icons/kyrpich-wall-blue.svg';

import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex gap-1">
      <LogoIcon
        width={22}
        height={22}
        fill="white"
        className="md:size-7 fill-accent"
      />
      <div className="text-xl font-medium md:text-2xl text-white">BudStock</div>
    </Link>
  );
};

export default Logo;
