import { useState } from "react";
import { sellProduct, deleteProduct } from "../../services/api";
import { productLabel } from "../../constants/inventoryOptions";
import styles from "./InventoryList.module.css";

export default function InventoryList({ products, onChanged }) {
    const [error, setError] = useState(null);

    async function handleSell(product) {
        const ok = window.confirm(`Sell 1 × ${productLabel(product)} for $${product.price.toFixed(2)}?`);
        if (!ok) return;
        setError(null);
        try {
            await sellProduct(product.id, 1);
            onChanged();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete(product) {
        const ok = window.confirm(`Delete ${productLabel(product)} from inventory? This can't be undone.`);
        if (!ok) return;
        setError(null);
        try {
            await deleteProduct(product.id);
            onChanged();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <section className={styles.card}>
            <h2 className={styles.title}>In stock</h2>

            {error && <p className={styles.error}>{error}</p>}

            {products.length === 0 ? (
                <p className={styles.empty}>No products yet. Add your first item above.</p>
            ) : (
                <ul className={styles.list}>
                    {products.map((product) => {
                        const isOut = product.quantity === 0;
                        const isLow = !isOut && product.quantity <= product.low_stock_at;

                        return (
                            <li key={product.id} className={styles.row}>
                                <div className={styles.info}>
                                    <span className={styles.name}>{productLabel(product)}</span>
                                    <span className={styles.meta}>
                                        {product.category} · ${product.price.toFixed(2)}
                                    </span>
                                </div>

                                <span
                                    className={`${styles.qty} ${isLow ? styles.low : ""} ${isOut ? styles.out : ""}`}
                                >
                                    {isOut ? "Out" : product.quantity}
                                    {isLow && " ⚠️"}
                                </span>

                                <button
                                    type="button"
                                    className={styles.sellButton}
                                    onClick={() => handleSell(product)}
                                    disabled={isOut}
                                >
                                    Sell
                                </button>

                                <button
                                    type="button"
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(product)}
                                    aria-label="Delete product"
                                >
                                    ✕
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}