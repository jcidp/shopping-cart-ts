import { Link, useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import styles from "../styles/Cart.module.css";
import Loader from "./Loader";
import { OutletContext } from "../types";

const Cart = ({products, error, isLoading, handleAddToCart, handleRemoveFromCart}: OutletContext) => {
    const location = useLocation();

    if (error) return (<div className={styles.flexGrow}>
            <h2 className={styles.h2}>Error loading data</h2>
            <p className={styles.p}>Please try reloading the page.</p>
        </div>);
    if (isLoading) return (<div className={styles.flexGrow}>
            <Loader />
        </div>);

    const cartProducts = products.filter(product => product.cartQuantity > 0);

    if (cartProducts.length === 0) return (<div className={`${styles.summary} ${styles.flexGrow}`}>
        <h2 className={styles.h2}>Your cart is empty!</h2>
        {location.pathname === "/shop" ? (
            <p className={styles.p}>Add a product to your cart to see it here</p>
        ) : (
            <>
                <p className={styles.p}>Visit our shop and add what you like to your cart.</p>
                <Link className={styles.btnPrimary} to="/shop">Visit Shop</Link>
            </>
        )}
    </div>);

    const gridStyle = location.pathname === "/cart"
        ? {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            justifyItems: "center",
            columnGap: "1em",
        } : 
        undefined;


    return (<>
        <div className={styles.summary}>
            <h2 className={styles.h2}>Cart total: {Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})
                .format(cartProducts.reduce((sum, product) => 
                    sum + product.price * product.cartQuantity
                    , 0)
                )}</h2>
            <Link className={styles.btnPrimary} to="/thank-you">Go to Checkout</Link>
            {location.pathname !== "/cart" && 
                <Link className={styles.btnSecondary} to="/cart">Go to Cart</Link>
            }
        </div>
        <div style={gridStyle}>
            {cartProducts.map(product => 
                <ProductCard key={product.id} product={product} inCart={true} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart}/>
            )}
        </div>
    </>);
};

export default Cart;