import { useState } from "react";
import { createStudent } from "../../services/api";
import styles from "./StudentForm.module.css";

export default function StudentForm({ onStudentCreated }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [beltRank, setBeltRank] = useState("White");
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try {
            const newStudent = await createStudent({
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                belt_rank: beltRank,
            });

            setFirstName("");
            setLastName("");
            setDateOfBirth("");
            setBeltRank("White");

            if (onStudentCreated) onStudentCreated(newStudent);
        } catch {
            setError("Could not create student");
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Add Student</h2>
            {error && <p className={styles.error}>{error}</p>}

            <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
            />
            <select value={beltRank} onChange={(e) => setBeltRank(e.target.value)}>
                <option value="White">White</option>
                <option value="Blue">Blue</option>
                <option value="Purple">Purple</option>
                <option value="Brown">Brown</option>
                <option value="Black">Black</option>
            </select>

            <button type="submit">Add Student</button>
        </form>
    );
}