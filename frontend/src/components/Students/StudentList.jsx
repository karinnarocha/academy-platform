import { useEffect, useState } from "react";
import { getStudents } from "../../services/api";
import styles from "./StudentList.module.css";

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getStudents()
            .then(setStudents)
            .catch(() => setError("Could not load students"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading students...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.list}>
            <h2>Students</h2>
            {students.length === 0 ? (
                <p>No students yet.</p>
            ) : (
                <ul>
                    {students.map((student) => (
                        <li key={student.id} className={styles.item}>
                            {student.first_name} {student.last_name} — {student.belt_rank} belt
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}