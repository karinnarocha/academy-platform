import styles from "./NavBar.module.css";

const TABS = [
    { id: "trial", label: "Trial" },
    { id: "inventory", label: "Inventory" },
    { id: "sales", label: "Sales" },
];

export default function NavBar({ current, onChange }) {
    return (
        <nav className={styles.nav}>
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    className={current === tab.id ? `${styles.tab} ${styles.active}` : styles.tab}
                    onClick={() => onChange(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}