import Logo from '@/components/ui/Logo';
import Phone from '@/components/ui/Phone';

const Header: React.FC = () => {
  return (
    <header>
      <div className="container py-5 flex items-center justify-between">
        <Logo />
        <Phone />
        <div className="px-2 py-4 bg-white/20 inline-block text-xs rounded-lg">
          Menu
        </div>
      </div>
    </header>
  );
};

export default Header;
