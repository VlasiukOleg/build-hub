import EmailIcon from '@/../../public/icons/email.svg';

const Email: React.FC = () => {
  return (
    <div className="flex gap-1 items-center">
      <EmailIcon width={14} height={14} fill="white" className="md:size-4" />
      <a
        href="mailto:budstock@gmail.com"
        className="text-sm font-medium md:text-lg"
      >
        budstock@gmail.com
      </a>
    </div>
  );
};

export default Email;
