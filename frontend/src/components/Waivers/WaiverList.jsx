import { useEffect, useState } from "react";
import { getWaivers } from "../../services/api";
import styles from "./WaiverList.module.css";

export default function WaiverList() {
    const [waivers, setWaivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getWaivers()
            .then(setWaivers)
            .catch(() => setError("Could not load waivers"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading waivers...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.list}>
            <h2>Waivers</h2>
            {waivers.length === 0 ? (
                <p>No waivers yet.</p>
            ) : (
                <ul>
                    {waivers.map((waiver) => (
                        <li key={waiver.id} className={styles.item}>
                            {waiver.waiver_type} — signed by {waiver.signed_by} (student #{waiver.student_id})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}