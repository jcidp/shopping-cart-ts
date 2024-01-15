import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
    return (
        <section className={styles.heroSection}>
            <div className={styles.heroText}>
                <h2>The store with things you don't really want!</h2>
                <p>Add an item to your cart and go to the checkout to "buy" it ;)</p>
                <Link className={styles.btnPrimary} to="/shop">Shop Now</Link>
            </div>
        </section>
    );
};

export default Home;