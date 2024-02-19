import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Playfair_Display, Montserrat } from "next/font/google";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { userReducer } from "@/reducers";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-playfair",
});
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-montserrat",
});

const reducers = combineReducers({ user: userReducer });
export type IRootState = ReturnType<typeof reducers>;
const persistConfig = { key: "Foormies", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main
          className={`${playfair.variable} ${montserrat.variable} text-primary-700`}
        >
          <Component {...pageProps} />
        </main>
      </PersistGate>
    </Provider>
  );
}
