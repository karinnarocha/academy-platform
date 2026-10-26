import SalesList from "../../components/SalesList/SalesList";
import styles from "./SalesPage.module.css";

export default function SalesPage() {
    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>Sales</h1>
            <SalesList />
        </div>
    );
}