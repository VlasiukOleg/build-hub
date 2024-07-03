import Logo from '@/components/ui/Logo';
import Phone from '@/components/ui/Phone';

const Header: React.FC = () => {
  return (
    <header>
      <div className="container py-5">
        <Logo />
        <Phone />
      </div>
    </header>
  );
};

export default Header;
