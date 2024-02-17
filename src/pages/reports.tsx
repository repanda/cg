import RapportProviders from "@/app/repport/reports";
import Dashboard from "./DashboardContent";

export default function ReportPage({ setIsAuthenticated }) {
    return (
        <Dashboard setIsAuthenticated={setIsAuthenticated} content={() => <RapportProviders/>} />
    )
}