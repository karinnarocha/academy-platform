import { useEffect, useState } from "react";
import { getStudents, createWaiver } from "../../services/api";
import styles from "./WaiverForm.module.css";

export default function WaiverForm({ onWaiverCreated }) {
    const [students, setStudents] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [waiverType, setWaiverType] = useState("liability");
    const [signedBy, setSignedBy] = useState("");
    const [signature, setSignature] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        getStudents().then(setStudents).catch(() => setError("Could not load students"));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try {
            const newWaiver = await createWaiver({
                student_id: Number(studentId),
                waiver_type: waiverType,
                signed_by: signedBy,
                signature: signature,
            });

            setStudentId("");
            setWaiverType("liability");
            setSignedBy("");
            setSignature("");

            if (onWaiverCreated) onWaiverCreated(newWaiver);
        } catch {
            setError("Could not create waiver");
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Add Waiver</h2>
            {error && <p className={styles.error}>{error}</p>}

            <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
                <option value="">Select student</option>
                {students.map((student) => (
                    <option key={student.id} value={student.id}>
                        {student.first_name} {student.last_name}
                    </option>
                ))}
            </select>

            <select value={waiverType} onChange={(e) => setWaiverType(e.target.value)}>
                <option value="liability">Liability</option>
                <option value="photo_release">Photo Release</option>
                <option value="medical">Medical</option>
                <option value="membership_agreement">Membership Agreement</option>
            </select>

            <input
                type="text"
                placeholder="Signed by (parent/guardian name)"
                value={signedBy}
                onChange={(e) => setSignedBy(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Signature (typed full name)"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                required
            />

            <button type="submit">Sign Waiver</button>
        </form>
    );
}