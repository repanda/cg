import ProvisionProviders from '@/app/provision/provisions';
import Dashboard from './DashboardContent';

export default function ProvisionPage({ setIsAuthenticated }) {
  return (
    <Dashboard setIsAuthenticated={setIsAuthenticated} content={() => <ProvisionProviders/>} />
  );
};