import Image from 'next/image';

import UPS from '@/../public/images/ups.png';

interface IAboutPageProps {}

const AboutPage: React.FC<IAboutPageProps> = () => {
  return (
    <section className="py-5 md:py-10 w-full">
      <div className="container">
        <div className="flex items-center justify-center">
          <Image src={UPS} alt="сторінка в розробці" width={800} />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
