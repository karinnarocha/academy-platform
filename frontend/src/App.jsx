import { useEffect, useState } from "react";
import HealthCheck from "./components/HealthCheck/HealthCheck";
import { checkHealth } from "./services/api";

function App() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    checkHealth().then(setStatus);
  }, []);

  return (
    <div>
      <h1>Martial Arts Academy Platform</h1>
      <HealthCheck status={status} />
    </div>
  );
}

export default App;