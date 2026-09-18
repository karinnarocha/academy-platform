const API_URL = "http://localhost:8000";

export async function checkHealth() {
    try {
        const res = await fetch(`${API_URL}/health`);
        if (!res.ok) throw new Error("Not ok");
        return "ok";
    } catch {
        return "error";
    }
}

export async function getStudents() {
    const res = await fetch(`${API_URL}/students/`);
    if (!res.ok) throw new Error("Failed to fetch students");
    return res.json();
}

export async function createStudent(studentData) {
    const res = await fetch(`${API_URL}/students/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
    });
    if (!res.ok) throw new Error("Failed to create student");
    return res.json();
}

export async function getWaivers() {
    const res = await fetch(`${API_URL}/waivers/`);
    if (!res.ok) throw new Error("Failed to fetch waivers");
    return res.json();
}

export async function createWaiver(waiverData) {
    const res = await fetch(`${API_URL}/waivers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(waiverData),
    });
    if (!res.ok) throw new Error("Failed to create waiver");
    return res.json();
}

export async function createTrialSignup(signupData) {
    const res = await fetch(`${API_URL}/trial-signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
    });
    if (!res.ok) throw new Error("Failed to submit trial signup");
    return res.json();
}