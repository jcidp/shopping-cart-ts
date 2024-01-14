import { Outlet, useLocation } from 'react-router-dom'
import styles from './App.module.css'
import Footer from './components/Footer'
import Header from './components/Header'
import useFetchAPI from './hooks/useFetchAPI';
import { useEffect, useState } from 'react';
import { Product, handleAddToCart, handleRemoveFromCart } from './types';

interface AppProps {
  children?: React.ReactNode,
}

function App(props: AppProps = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const {data, error, isLoading} = useFetchAPI();
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();

  if (location.pathname === "/thank-you" && products.reduce((sum, product) => sum + product.cartQuantity, 0) > 0) {
    setProducts(products.map(product => ({...product, cartQuantity: 0})));
  }
  useEffect(() => {
    if (location.pathname === "/") setShowCart(false);
  }, [location.pathname]);

  useEffect(() => {
    if (data) {
      console.log("Setting up products");
      setProducts(data.map(product => ({...product, cartQuantity: 0})));
    }
  }, [data])

  const handleAddToCart: handleAddToCart = (e, quantity, isEdit) => {
    if (!(e.target instanceof HTMLElement || e.target instanceof SVGElement)) return;
    const btn = e.target.closest("button");
    if (!btn?.dataset?.productId) return;
    const id = +btn.dataset.productId;
    setProducts(products.map(product => {
      const newQuantity = isEdit ? quantity : product.cartQuantity + quantity;
      if (product.id !== id) return product;
      return {...product, cartQuantity: newQuantity};
    }));
    if (products.reduce((sum, product) => sum + product.cartQuantity, 0) === 0) setShowCart(true);
  };

  const handleRemoveFromCart: handleRemoveFromCart = (e) => {
    if (!(e.target instanceof HTMLElement || e.target instanceof SVGElement)) return;
    const btn = e.target.closest("button");
    if (!btn?.dataset?.productId) return;
    const id = +btn.dataset.productId;
    setProducts(products.map(product => {
      if (product.id !== id) return product;
      return {...product, cartQuantity: 0}
    }));
  };

  return (
    <>
      <Header products={products} error={error} isLoading={isLoading} showCart={showCart} setShowCart={setShowCart} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} />
      <main className={styles.main}>
        {
          props.children ?
          props.children : 
          <Outlet context={{products, error, isLoading, handleAddToCart, handleRemoveFromCart}}/>
        }
      </main>
      <Footer />
    </>
  )
}

export default App
