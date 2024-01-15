import styles from "../styles/ProductCard.module.css";
import { useEffect, useState } from "react";
import { Product, handleAddToCart, handleRemoveFromCart } from "../types";

export interface ProductCardProps {
  product: Product,
  inCart?: boolean,
  handleAddToCart: handleAddToCart,
  handleRemoveFromCart?: handleRemoveFromCart,
}

const ProductCard = ({product, inCart, handleAddToCart, handleRemoveFromCart}: ProductCardProps) => {
    const [quantity, setQuantity] = useState(inCart ? product.cartQuantity : 1);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (inCart) setQuantity(product.cartQuantity);
    }, [inCart, product.cartQuantity]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(+e.target.value);
    };

    const handleAddWithShowCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleAddToCart(e, quantity);
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleAddToCart(e, quantity, true);
        toggleEdit();
    };

    const handleCancel = () => {
        setQuantity(product.cartQuantity);
        toggleEdit();
    };

    return(
        <div className={styles.product}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src={product.image} alt={product.title} />
            </div>
            <div className={styles.productInfo}>
                <p className={styles.title} id={`title-${product.id}-${inCart ? "cart" : ""}`}>{product.title}</p>
                <p className={styles.price}>
                    {Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})
                        .format(product.price)}
                </p>
                <div className={styles.controls}>
                    <div className={styles.quantity}>
                        <label htmlFor={`qty-${product.id}-${inCart ? "cart" : ""}`}>Quantity:</label>
                        {inCart && !isEditing ? (
                            <span className={styles.quantityText}>{quantity}</span>
                        ) : (
                            <input className={styles.quantityInput} id={`qty-${product.id}-${inCart ? "cart" : ""}`} type="number" value={quantity} onChange={handleInput} min={1} max={9} />
                        )}
                    </div>
                    <div className={styles.buttons}>
                        {!inCart? (
                            <button className={styles.btnPrimary} data-product-id={product.id} onClick={handleAddWithShowCart}>Add to cart</button>    
                            ) : isEditing ? (<>
                            <button className={styles.buttonIcon} data-product-id={product.id} onClick={handleConfirm} aria-label="Confirm">
                                <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
                            </button>    
                            <button className={styles.buttonIcon} data-product-id={product.id} onClick={handleCancel} aria-label="Cancel">
                                <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                            </button>    
                        </>) : (
                            <button className={styles.buttonIcon} data-product-id={product.id} onClick={toggleEdit} aria-label="Edit" aria-describedby={`title-${product.id}-${inCart ? "cart" : ""}`}>
                                <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
                            </button>    
                        )}
                        {inCart && 
                            <button className={styles.buttonIcon} data-product-id={product.id} onClick={handleRemoveFromCart} aria-label="Remove from cart" aria-describedby={`title-${product.id}-${inCart ? "cart" : ""}`}>
                                <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;