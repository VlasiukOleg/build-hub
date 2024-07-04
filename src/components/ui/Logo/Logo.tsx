import LogoIcon from '@/../../public/icons/kyrpich-wall.svg';

import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex gap-1">
      <LogoIcon width={22} height={22} fill="white" />
      <div className="text-xl font-medium">
        Bud<span className="text-accent">Stock</span>
      </div>
    </Link>
  );
};

export default Logo;
