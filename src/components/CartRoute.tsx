import { useOutletContext } from "react-router-dom";
import Cart from "./Cart";
import { OutletContext } from "../types";

const CartRoute = () => {
    const {products, error, isLoading, handleAddToCart, handleRemoveFromCart}: OutletContext = useOutletContext();

    return <Cart products={products} error={error} isLoading={isLoading} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart}/>
};

export default CartRoute;