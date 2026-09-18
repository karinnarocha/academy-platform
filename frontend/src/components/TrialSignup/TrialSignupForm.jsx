import { useState } from "react";
import { createTrialSignup } from "../../services/api";
import styles from "./TrialSignupForm.module.css";

const emptyChild = { first_name: "", last_name: "", date_of_birth: "", belt_rank: "White" };

export default function TrialSignupForm() {
    const [signupType, setSignupType] = useState("child"); // "self" or "child"
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(""); // only used for "self"
    const [children, setChildren] = useState([{ ...emptyChild }]);
    const [signature, setSignature] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    function updateChild(index, field, value) {
        const updated = [...children];
        updated[index][field] = value;
        setChildren(updated);
    }

    function addChild() {
        setChildren([...children, { ...emptyChild }]);
    }

    function removeChild(index) {
        setChildren(children.filter((_, i) => i !== index));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try {
            await createTrialSignup({
                signup_type: signupType,
                parent_first_name: firstName,
                parent_last_name: lastName,
                parent_email: email,
                parent_phone: phone,
                date_of_birth: signupType === "self" ? dateOfBirth : null,
                children: signupType === "child" ? children : [],
                signed_by: `${firstName} ${lastName}`,
                signature: signature,
            });
            setSuccess(true);
        } catch {
            setError("Something went wrong submitting the form. Please try again.");
        }
    }

    if (success) {
        return <p className={styles.success}>Thank you! You're all set for your trial class.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Trial Class Sign-Up</h2>
            {error && <p className={styles.error}>{error}</p>}

            <h3>Who is this trial for?</h3>
            <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                    <input
                        type="radio"
                        name="signupType"
                        value="self"
                        checked={signupType === "self"}
                        onChange={() => setSignupType("self")}
                    />
                    Myself
                </label>
                <label className={styles.radioLabel}>
                    <input
                        type="radio"
                        name="signupType"
                        value="child"
                        checked={signupType === "child"}
                        onChange={() => setSignupType("child")}
                    />
                    My child(ren)
                </label>
            </div>

            <h3>Your Information</h3>
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />

            {signupType === "self" && (
                <>
                    <h3>Your Date of Birth</h3>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                </>
            )}

            {signupType === "child" && (
                <>
                    <h3>Child(ren) Trying Out</h3>
                    {children.map((child, index) => (
                        <div key={index} className={styles.childRow}>
                            <input
                                type="text"
                                placeholder="Child first name"
                                value={child.first_name}
                                onChange={(e) => updateChild(index, "first_name", e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Child last name"
                                value={child.last_name}
                                onChange={(e) => updateChild(index, "last_name", e.target.value)}
                                required
                            />
                            <input
                                type="date"
                                value={child.date_of_birth}
                                onChange={(e) => updateChild(index, "date_of_birth", e.target.value)}
                                required
                            />
                            {children.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeChild(index)}
                                    className={styles.removeButton}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addChild} className={styles.addButton}>
                        + Add another child
                    </button>
                </>
            )}

            <h3>Liability Waiver</h3>
            <p className={styles.legalText}>
                In consideration for my attendance and participation (or my child's/children's participation)
                in this academy's martial arts training, I acknowledge the risks of martial arts training and
                agree to release the academy, its staff, and instructors from liability for any injury or loss.
                I authorize photo release for social media or advertising. If signing on behalf of a minor, I
                confirm I am their parent or legal guardian and am 18 years of age or older.
            </p>
            <input
                type="text"
                placeholder="Full name (as signature)"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                required
            />

            <button type="submit">Submit & Sign Waiver</button>
        </form>
    );
}