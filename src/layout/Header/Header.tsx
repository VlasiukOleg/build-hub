import Logo from '@/components/ui/Logo';
import Phone from '@/components/ui/Phone';
import OpenBurgerMenuBtn from '@/components/common/OpenBurgerMenuBtn';

const Header: React.FC = () => {
  return (
    <header>
      <div className="container py-5 flex items-center justify-between">
        <Logo />
        <Phone />
        <OpenBurgerMenuBtn />
      </div>
    </header>
  );
};

export default Header;
