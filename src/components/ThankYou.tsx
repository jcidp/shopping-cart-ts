import styles from "../styles/ThankYou.module.css";
import { Link } from "react-router-dom"

const ThankYou = () => {
    return (<div className={styles.pageContent}>
        <h2>Thank you for your fake order!</h2>
        <p>You should <em>not</em> receive an email with the delivery details</p>
        <p>We're exiting to have you as a fake customer :)</p>
        <Link className={styles.btnPrimary} to="/">Return Home</Link>
    </div>);
};

export default ThankYou;