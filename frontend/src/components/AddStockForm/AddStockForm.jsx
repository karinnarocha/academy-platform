import { useState } from "react";
import { addStock } from "../../services/api";
import { CATEGORIES, ITEMS } from "../../constants/inventoryOptions";
import SelectWithOther from "../SelectWithOther/SelectWithOther";
import styles from "./AddStockForm.module.css";

export default function AddStockForm({ onAdded }) {
    const [category, setCategory] = useState("Merch");
    const [item, setItem] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [saving, setSaving] = useState(false);
    const [resetKey, setResetKey] = useState(0); // changing this resets the dropdowns

    const isMerch = category === "Merch";
    const itemOptions = Object.keys(ITEMS[category]);
    const config = ITEMS[category][item] || { sizes: [], colors: [] };
    const canSubmit = item.trim() !== "" && Number(quantity) > 0;

    function changeCategory(value) {
        setCategory(value);
        setItem("");
        setSize("");
        setColor("");
    }

    function changeItem(value) {
        setItem(value);
        setSize("");
        setColor("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setSaving(true);

        try {
            await addStock({
                category,
                item: item.trim(),
                size: size.trim(),
                color: color.trim(),
                quantity: Number(quantity),
                cost: Number(cost) || 0,
                price: Number(price) || 0,
            });
            setMessage(`Added ${quantity} × ${item.trim()} ✅`);
            setItem("");
            setSize("");
            setColor("");
            setQuantity(1);
            setCost("");
            setPrice("");
            setResetKey(resetKey + 1);
            onAdded();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Add stock</h2>

            <div className={styles.grid}>
                <label className={styles.field}>
                    Category
                    <select value={category} onChange={(e) => changeCategory(e.target.value)}>
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </label>

                <SelectWithOther
                    key={`item-${category}-${resetKey}`}
                    label="Item"
                    placeholder="Choose item..."
                    options={itemOptions}
                    value={item}
                    onChange={changeItem}
                />

                {isMerch && (
                    <>
                        <SelectWithOther
                            key={`size-${item}-${resetKey}`}
                            label="Size"
                            placeholder="No size"
                            options={config.sizes}
                            value={size}
                            onChange={setSize}
                        />
                        <SelectWithOther
                            key={`color-${item}-${resetKey}`}
                            label="Color"
                            placeholder="No color"
                            options={config.colors}
                            value={color}
                            onChange={setColor}
                        />
                    </>
                )}

                <label className={styles.field}>
                    Quantity
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </label>

                <label className={styles.field}>
                    Cost each ($)
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                </label>

                <label className={styles.field}>
                    Sale price ($)
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {message && <p className={styles.message}>{message}</p>}

            <button type="submit" className={styles.submitButton} disabled={!canSubmit || saving}>
                {saving ? "Saving..." : "Add to inventory"}
            </button>
        </form>
    );
}