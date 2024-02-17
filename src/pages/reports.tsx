import RapportProviders from "@/app/repport/reports";
import Dashboard from "./DashboardContent";

export default function ReportPage({ setIsAuthenticated }) {
    return (
        <Dashboard  title='Report' setIsAuthenticated={setIsAuthenticated} content={() => <RapportProviders/>} />
    )
}