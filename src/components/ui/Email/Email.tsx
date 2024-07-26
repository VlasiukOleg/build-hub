import EmailIcon from '@/../../public/icons/email.svg';

const Email: React.FC = () => {
  return (
    <div className="flex gap-1 items-center">
      <EmailIcon width={18} height={18} fill="white" className="md:size-5" />
      <a
        href="mailto:budstock@gmail.com"
        className="text-sm font-semibold md:text-lg"
      >
        budstock@gmail.com
      </a>
    </div>
  );
};

export default Email;
