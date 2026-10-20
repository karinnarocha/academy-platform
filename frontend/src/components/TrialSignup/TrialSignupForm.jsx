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
    const [signedBy, setSignedBy] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    function updateChild(index, field, value) {
        setChildren(children.map((child, i) => (i === index ? { ...child, [field]: value } : child)));
    }

    function addChild() {
        setChildren([...children, { ...emptyChild }]);
    }

    function removeChild(index) {
        setChildren(children.filter((_, i) => i !== index));
    }

    function resetForm() {
        setSignupType("child");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setDateOfBirth("");
        setChildren([{ ...emptyChild }]);
        setSignedBy("");
        setAgreed(false);
        setError(null);
        setSuccess(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await createTrialSignup({
                signup_type: signupType,
                parent_first_name: firstName,
                parent_last_name: lastName,
                parent_email: email,
                parent_phone: phone,
                date_of_birth: signupType === "self" ? dateOfBirth : null,
                children: signupType === "child" ? children : [],
                signed_by: signedBy,
                agreed: agreed,
            });
            setSuccess(true);
        } catch (err) {
            setError(err.message || "Something went wrong submitting the form. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className={styles.successCard}>
                <p className={styles.successEmoji}>🥋</p>
                <h2>You're all set!</h2>
                <p>See you on the mat for your trial class.</p>
                <button type="button" onClick={resetForm} className={styles.secondaryButton}>
                    Sign up another person
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Trial Class Sign-Up</h2>

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Who is this trial for?</h3>
                <div className={styles.radioGroup}>
                    <label className={signupType === "self" ? `${styles.option} ${styles.selected}` : styles.option}>
                        <input
                            type="radio"
                            name="signupType"
                            value="self"
                            checked={signupType === "self"}
                            onChange={() => setSignupType("self")}
                        />
                        Myself
                    </label>
                    <label className={signupType === "child" ? `${styles.option} ${styles.selected}` : styles.option}>
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
            </section>

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Your Information</h3>
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
                    <label className={styles.fieldLabel}>
                        Date of birth
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                        />
                    </label>
                )}
            </section>

            {signupType === "child" && (
                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Child(ren) Trying Out</h3>
                    {children.map((child, index) => (
                        <div key={index} className={styles.childRow}>
                            <div className={styles.childHeader}>
                                <span>Child {index + 1}</span>
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
                            <label className={styles.fieldLabel}>
                                Date of birth
                                <input
                                    type="date"
                                    value={child.date_of_birth}
                                    onChange={(e) => updateChild(index, "date_of_birth", e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={addChild} className={styles.addButton}>
                        + Add another child
                    </button>
                </section>
            )}

            <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Liability Waiver</h3>
                <p className={styles.legalText}>
                    In consideration for my attendance and participation (or my child's/children's participation)
                    in this academy's martial arts training, I acknowledge the risks of martial arts training and
                    agree to release the academy, its staff, and instructors from liability for any injury or loss.
                    I authorize photo release for social media or advertising. If signing on behalf of a minor, I
                    confirm I am their parent or legal guardian and am 18 years of age or older.
                </p>

                <label className={styles.checkLabel}>
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    I have read and agree to the waiver, also agree that I sign this on behalf of my child(ren) if applicable. and i authorize my photo to be used for social media or advertising purposes.
                </label>

                <input
                    type="text"
                    placeholder="Type your full name to sign"
                    value={signedBy}
                    onChange={(e) => setSignedBy(e.target.value)}
                    required
                />
            </section>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitButton} disabled={!agreed || loading}>
                {loading ? "Sending..." : "Submit & Sign Waiver"}
            </button>
        </form>
    );
}
