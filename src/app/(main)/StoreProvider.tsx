'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { makeStore, AppStore } from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { CircularProgress } from '@heroui/react';
import { HeroUIProvider } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  const store = storeRef.current!;
  const persistor = persistStore(store);

  const router = useRouter();

  return (
    <HeroUIProvider navigate={href => router.push(href)} useHref={href => href}>
      <Provider store={storeRef.current}>
        <PersistGate
          loading={
            <div className="flex justify-center items-center h-screen">
              <CircularProgress label="Loading..." color="success" />
            </div>
          }
          persistor={persistor}
        >
          {children}
        </PersistGate>
      </Provider>
    </HeroUIProvider>
  );
}
