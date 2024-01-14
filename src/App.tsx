import { Outlet } from 'react-router-dom'
import styles from './App.module.css'
import Footer from './components/Footer'
import Header from './components/Header'
import useFetchAPI from './hooks/useFetchAPI';
import { useEffect, useState } from 'react';
import { Product } from './types';

interface AppProps {
  children?: React.ReactNode,
}

function App(props: AppProps = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const {data, error, isLoading} = useFetchAPI();

  useEffect(() => {
    if (data) {
      console.log("Setting up products");
      setProducts(data.map(product => ({...product, cartQuantity: 0})));
    }
  }, [data])

  return (
    <>
      <Header />
      <main className={styles.main}>
        {
          props.children ?
          props.children : 
          <Outlet context={{products, error, isLoading,}}/>
        }
      </main>
      <Footer />
    </>
  )
}

export default App
