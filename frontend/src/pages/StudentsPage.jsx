import { useState } from "react";
import StudentList from "../components/Students/StudentList";
import StudentForm from "../components/Students/StudentForm";

export default function StudentsPage() {
    const [refreshKey, setRefreshKey] = useState(0);

    function handleStudentCreated() {
        setRefreshKey((prev) => prev + 1);
    }

    return (
        <div>
            <StudentForm onStudentCreated={handleStudentCreated} />
            <StudentList key={refreshKey} />
        </div>
    );
}