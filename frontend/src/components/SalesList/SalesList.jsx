import { useEffect, useState } from "react";
import { getSales } from "../../services/api";
import { productLabel } from "../../constants/inventoryOptions";
import styles from "./SalesList.module.css";

// The backend saves times in UTC without the "Z", so we add it
function toDate(value) {
    return new Date(value + "Z");
}

export default function SalesList() {
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSales()
            .then(setSales)
            .catch((err) => setError(err.message));
    }, []);

    const now = new Date();
    const monthTotal = sales
        .filter((sale) => {
            const date = toDate(sale.sold_at);
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        })
        .reduce((sum, sale) => sum + sale.total, 0);

    return (
        <section className={styles.card}>
            <div className={styles.summary}>
                <span>Sold this month</span>
                <strong>${monthTotal.toFixed(2)}</strong>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {sales.length === 0 ? (
                <p className={styles.empty}>No sales yet.</p>
            ) : (
                <ul className={styles.list}>
                    {sales.map((sale) => (
                        <li key={sale.id} className={styles.row}>
                            <span className={styles.date}>
                                {toDate(sale.sold_at).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>
                            <span className={styles.name}>{productLabel(sale)}</span>
                            <span className={styles.qty}>× {sale.quantity}</span>
                            <span className={styles.total}>${sale.total.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}