import { useState } from "react";
import { OTHER } from "../../constants/inventoryOptions";
import styles from "./SelectWithOther.module.css";

export default function SelectWithOther({ label, options, value, onChange, placeholder = "Choose..." }) {
    const [isOther, setIsOther] = useState(false);

    function handleSelect(e) {
        const choice = e.target.value;
        if (choice === OTHER) {
            setIsOther(true);
            onChange("");
        } else {
            setIsOther(false);
            onChange(choice);
        }
    }

    return (
        <label className={styles.field}>
            {label}
            <select value={isOther ? OTHER : value} onChange={handleSelect}>
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
                <option value={OTHER}>{OTHER}</option>
            </select>

            {isOther && (
                <input
                    type="text"
                    placeholder={`Type the ${label.toLowerCase()}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                />
            )}
        </label>
    );
}