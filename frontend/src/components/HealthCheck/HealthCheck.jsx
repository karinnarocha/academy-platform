import styles from "./HealthCheck.module.css";

function HealthCheck({ status }) {
    return (
        <div className={`${styles.container} ${status === "ok" ? styles.ok : styles.error}`}>
            {status === "ok" ? "✅ Backend is alive" : "❌ Backend not responding"}
        </div>
    );
}

export default HealthCheck;