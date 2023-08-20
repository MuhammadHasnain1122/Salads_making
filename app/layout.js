'use client'

import Navbar from './Navbar';
import './globals.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { fetchBusinessLogic, fetchIngredients, fetchSalads, fetchSubscriptions, fetchSuppliers } from './store/dataSlice';

store.dispatch(fetchBusinessLogic());
store.dispatch(fetchIngredients());
store.dispatch(fetchSalads());
store.dispatch(fetchSubscriptions());
store.dispatch(fetchSuppliers());

export const metadata = {
  title: 'Salad Maker',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}