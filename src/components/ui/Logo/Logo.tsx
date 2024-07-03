import LogoIcon from '@/../../public/icons/kyrpich-wall.svg';

const Logo: React.FC = () => {
  return (
    <div className="flex gap-1">
      <LogoIcon width={24} height={24} fill="white" />
      <div className="text-xl font-medium">
        Bud<span className="text-accent">Stock</span>
      </div>
    </div>
  );
};

export default Logo;
