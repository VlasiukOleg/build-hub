import LogoIcon from '@/../../public/icons/kyrpich-wall.svg';

const Logo: React.FC = () => {
  return (
    <div className="flex gap-1">
      <LogoIcon width={22} height={22} fill="white" />
      <div className="text-xl font-medium">
        Bud<span className="text-accent">Stock</span>
      </div>
    </div>
  );
};

export default Logo;
