import clsx from 'clsx';

export interface IButtonLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'main' | 'main-icon';
  className?: string;
  disabled?: boolean;
}

const ButtonLink: React.FC<IButtonLinkProps> = ({
  children,
  variant,
  className = '',
  disabled,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        'font-unbounded inline-flex justify-center items-center rounded-md gap-4 text-xs font-medium leading-[1.5] bg-accent text-white px-6 py-2 md:text-base xl:text-2xl',
        variant === 'main-icon' && 'py-[13.5px]',
        disabled && 'bg-gray-500 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonLink;
