import Logo from '@/components/ui/Logo';
import OpenBurgerMenuBtn from '../OpenBurgerMenuBtn';
import Phone from '@/components/ui/Phone';
import Email from '@/components/ui/Email';

interface IBurgerMenuProps {
  close: () => void;
}

const BurgerMenu: React.FunctionComponent<IBurgerMenuProps> = ({ close }) => {
  return (
    <div className="container flex h-full min-h-screen flex-col overflow-x-hidden">
      <header className="mb-24">
        <div className=" py-5 flex items-center justify-between">
          <Logo />
          <button
            onClick={close}
            className="px-2 py-3 bg-white/20 inline-block text-xs rounded-lg"
          >
            CLOSE
          </button>
        </div>
      </header>
      <nav className="flex-1">
        <ul className="flex flex-col gap-5 text-2xl items-center uppercase font-medium  md:text-[28px]">
          <li>Матеріали</li>
          <li>Послуги</li>
          <li>О проекті</li>
        </ul>
      </nav>

      <div className="flex flex-col items-center pb-12 gap-3">
        <Phone />
        <Email />
      </div>
    </div>
  );
};

export default BurgerMenu;
