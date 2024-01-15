import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import styles from "../styles/ThankYou.module.css";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    const getErrorMessage = (error: unknown) => {
      if (isRouteErrorResponse(error)) return `${error.status}: ${error.statusText}`;
      if (error instanceof Error) return error.message;
      return "Unexpected error";
    }

    const errorMessage = getErrorMessage(error);

    return (
        <div className={styles.pageContent}>
            <h2>Oh no!</h2>
            <p>An error has occurred.</p>
            <p>
                <i>{errorMessage}</i>
            </p>
            <Link className={styles.btnPrimary} to="/">Return Home</Link>
        </div>
    );
};

export default ErrorPage;