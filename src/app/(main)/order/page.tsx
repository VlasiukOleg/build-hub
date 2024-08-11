import Script from 'next/script';

import OrderList from '@/components/common/OrderList';

interface IOrderPageProps {}

const OrderPage: React.FC<IOrderPageProps> = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-EEGRJKT26X"
      ></Script>
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EEGRJKT26X');
            `,
        }}
      />
      <section className="py-5 md:py-10 w-full">
        <div className="container">
          <h1 className="text-center text-grey font-bold mb-2 md:text-lg md:mb-4 xl:text-2xl xl:mb-6">
            Оформити замовлення
          </h1>
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default OrderPage;
