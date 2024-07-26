import LogoIcon from '@/../../public/icons/kyrpich-wall.svg';

import Link from 'next/link';

interface ILogoProps {
  close: () => void;
}

const Logo: React.FC<ILogoProps> = ({ close }) => {
  return (
    <Link href="/" className="flex gap-1" onClick={close}>
      <LogoIcon
        width={22}
        height={22}
        fill="white"
        className="md:size-7 fill-grey"
      />
      <div className="text-xl font-bold md:text-2xl text-grey">
        Bud<span className="text-accent">Stock</span>
      </div>
    </Link>
  );
};

export default Logo;
