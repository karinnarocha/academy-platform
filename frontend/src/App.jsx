import { useEffect, useState } from "react";
import HealthCheck from "./components/HealthCheck/HealthCheck";
import NavBar from "./components/NavBar/NavBar";
import TrialSignupPage from "./pages/TrialSignupPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import SalesPage from "./pages/SalesPage/SalesPage";
import { checkHealth } from "./services/api";

function App() {
  const [status, setStatus] = useState("checking");
  const [page, setPage] = useState("trial");

  useEffect(() => {
    checkHealth().then(setStatus);
  }, []);

  return (
    <div>
      <h1>Martial Arts Academy Platform</h1>
      <HealthCheck status={status} />
      <NavBar current={page} onChange={setPage} />

      {page === "trial" && <TrialSignupPage />}
      {page === "inventory" && <InventoryPage />}
      {page === "sales" && <SalesPage />}
    </div>
  );
}

export default App;