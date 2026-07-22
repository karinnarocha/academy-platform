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