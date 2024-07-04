import clsx from 'clsx';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  variant?: 'burger' | 'simple';
}

const Modal: React.FC<IModalProps> = ({ isOpen, close, children, variant }) => {
  return (
    <>
      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel
            transition
            className={clsx(
              variant === 'burger'
                ? 'h-full w-full xl:max-w-[704px]  bg-accent p-12  data-[enter]:duration-100 data-[enter]:data-[closed]:-translate-x-full data-[leave]:duration-300 data-[leave]:data-[closed]:translate-x-full'
                : 'max-h-[90%] min-w-[328px] sm:max-w-[480px] md:max-w-[700px] xl:max-w-[900px]'
            )}
          >
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
