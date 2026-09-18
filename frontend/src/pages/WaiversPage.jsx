import { useState } from "react";
import WaiverList from "../components/Waivers/WaiverList";
import WaiverForm from "../components/Waivers/WaiverForm";

export default function WaiversPage() {
    const [refreshKey, setRefreshKey] = useState(0);

    function handleWaiverCreated() {
        setRefreshKey((prev) => prev + 1);
    }

    return (
        <div>
            <WaiverForm onWaiverCreated={handleWaiverCreated} />
            <WaiverList key={refreshKey} />
        </div>
    );
}