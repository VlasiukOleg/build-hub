import Logo from '@/components/ui/Logo';
import Phone from '@/components/ui/Phone';
import OpenBurgerMenuBtn from '@/components/common/OpenBurgerMenuBtn';
import OpenDesktopMenuBtn from '@/components/common/OpenDesktopMenuBtn';

const Header: React.FC = () => {
  return (
    <header className="border-b-[1px] border-accent">
      <div className="container py-4 flex items-center justify-between">
        <Logo />
        <Phone />
        <div className="xl:hidden">
          <OpenBurgerMenuBtn />
        </div>
        <div className="hidden xl:block">
          <OpenDesktopMenuBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
