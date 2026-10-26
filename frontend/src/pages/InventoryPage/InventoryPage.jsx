import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import AddStockForm from "../../components/AddStockForm/AddStockForm";
import InventoryList from "../../components/InventoryList/InventoryList";
import styles from "./InventoryPage.module.css";

export default function InventoryPage() {
    const [products, setProducts] = useState([]);

    function loadProducts() {
        getProducts().then(setProducts);
    }

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>Inventory</h1>
            <AddStockForm onAdded={loadProducts} />
            <InventoryList products={products} onChanged={loadProducts} />
        </div>
    );
}