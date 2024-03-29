import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import Cart from "./Cart";
import { OutletContext } from "../types";

interface HeaderProps extends OutletContext {
  showCart: boolean,
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>,
}

const Header = ({products, error, isLoading, showCart, setShowCart, handleAddToCart, handleRemoveFromCart}: HeaderProps) => {
  const toggleShowCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLElement || e.target instanceof SVGElement)) return;
    const header = e.target.closest("header");
    if (!header) return;
    const sidebar = header.querySelector("section");
    if (showCart) {
      if (!sidebar) return;
      sidebar.classList.add(styles.shred);
      return;
    }
    setShowCart(!showCart)
  };

  const hideCart = (e: React.AnimationEvent<HTMLElement>) => {
    if (e.animationName === styles["slide-out"]) setShowCart(!showCart);
  }
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.h1}><Link to="/">FakeStore</Link></h1>
        <nav className={styles.nav}>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link to="/">Home</Link>
              <div className={`${styles.underline} ${location.pathname === "/" && styles.selected}`}></div>
            </li>
            <li className={styles.navItem}>
              <Link to="/shop">Shop</Link>
              <div className={`${styles.underline} ${location.pathname === "/shop" && styles.selected}`}></div>
            </li>
            <li className={styles.navItem}>
              <button className={styles.cart} onClick={toggleShowCart}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cart-outline</title><path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" /></svg>
                <span className={styles.cartItems}>{products.reduce((sum, product) => sum + product.cartQuantity, 0)}</span>
              </button>
              <div className={`${styles.underline} ${styles.underlineCart} ${location.pathname === "/cart" && styles.selectedCart}`}></div>
            </li>
          </ul>
        </nav>
      </div>
      {(location.pathname === "/" || location.pathname === "/shop") && products.length > 0 && showCart && (
        <section className={styles.cartSideBar} onAnimationEnd={hideCart}>
          <Cart products={products} error={error} isLoading={isLoading} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart}/>
        </section>
      )}
    </header>
  );
};

export default Header
