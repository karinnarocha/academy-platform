const API_URL = "http://localhost:8000";

// Reads the response, or throws the backend's error message (e.g. "Only 2 left in stock.")
async function readJson(res) {
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || "Something went wrong. Please try again.");
    }
    return res.json();
}

// ---------- HEALTH ----------

export async function checkHealth() {
    try {
        const res = await fetch(`${API_URL}/health`);
        if (!res.ok) throw new Error("Not ok");
        return "ok";
    } catch {
        return "error";
    }
}

// ---------- STUDENTS ----------

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

// ---------- WAIVERS ----------

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

// ---------- TRIAL SIGNUP ----------

export async function createTrialSignup(signupData) {
    const res = await fetch(`${API_URL}/trial-signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
    });
    return readJson(res);
}

// ---------- INVENTORY ----------

export async function getProducts() {
    const res = await fetch(`${API_URL}/products/`);
    return readJson(res);
}

export async function addStock(data) {
    const res = await fetch(`${API_URL}/products/add-stock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return readJson(res);
}

export async function deleteProduct(id) {
    const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
    return readJson(res);
}

// ---------- SALES ----------

export async function sellProduct(productId, quantity = 1) {
    const res = await fetch(`${API_URL}/sales/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, quantity }),
    });
    return readJson(res);
}

export async function getSales() {
    const res = await fetch(`${API_URL}/sales/`);
    return readJson(res);
}